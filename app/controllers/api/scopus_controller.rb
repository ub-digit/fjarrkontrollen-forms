require 'rest-client'
class Api::ScopusController < ApplicationController
  def show
    doi = params[:doi]
    scopus_api_key = APP_CONFIG['scopus']['api_key']

    headers = {
      "X-ELS-APIKey" => scopus_api_key,
      "X-ELS-ResourceVersion" => "XOCS",
      "Accept" => "application/atom+xml",
      :params => {
        count: 1,
        start: 0,
        view: 'COMPLETE',
        query: "DOI(#{doi})"
      }
    }

    begin
      response = RestClient.get 'https://api.elsevier.com/content/search/index:SCOPUS', headers
      xml_body = force_utf8(response.body)

      puts xml_body

      xml = Nokogiri::XML(xml_body).remove_namespaces!

      if xml.search('//feed/entry/error').text.present?
        error_msg = xml.search('//feed/entry/error').text
        render json: {error: error_msg}, status: 500
      else
        #original_pubtype = xml.search('//feed/entry/subtype').text
        publication_types = {
          "ar" => "publication_journal-article",
          "ip" => "publication_journal-article",
          "bk" => "publication_book",
          "bz" => "publication_magazine-article",
          "ch" => "publication_book-chapter",
          "cp" => "conference_paper",
          "cr" => "conference_other",
          "ed" => "publication_editorial-letter",
          "er" => "publication_magazine-article",
          "le" => "publication_editorial-letter",
          "re" => "publication_book-review"
        }

        json = {}

        json['title'] = xml.search('//entry/title').text

        if xml.search('//entry/coverDate').text.present?
          json['pubyear'] = xml.search('//entry/coverDate').text.byteslice(0..3)
        end

        if xml.search('//entry/issn').text.present?
          json['issn'] = fix_issn(xml.search('//entry/issn').text)
        end

        json['journal_title'] = xml.search('//entry/publicationName').text
        json['volume'] = xml.search('//entry/volume').text
        json['issue'] = xml.search('//entry/issueIdentifier').text
        json['pages'] = xml.search('//entry/pageRange').text

        authors = []
        sequences = []
        xml.search('//entry/author').map do |author|
          sequence = author.attr('seq')
          next if sequences.include? sequence # Omit author if it is a duplication
          authors << author.search('given-name').text
          sequences << sequence
        end
        json['authors'] = authors.join(', ')

        render json: json, status: 200
      end
    rescue RestClient::Exception => e  #rescue RestClient::ExceptionWithResponse => e
      render json: {error: e.message}, status: e.http_code
    end
  end

private
  # Some issn data is delivered with unwanted info and without hyphen char
  def fix_issn issn
    return issn if issn.length == 9 && issn[4] == '-'
    issn.sub!("(ISSN)", "")
    issn.issnip!
    return issn.insert(4, '-') if issn.length == 8
    return issn
  end

  def force_utf8(str)
    if !str.force_encoding("UTF-8").valid_encoding?
      str = str.force_encoding("ISO-8859-1").encode("UTF-8")
    end
    return str
  end
end


