require 'rest-client'
class Api::PubmedController < ApplicationController
  def show
    begin
      id = params[:id]
      response = RestClient.get "//eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=#{id}&retmode=json"
      render body: response.body, status: 200, content_type: 'application/json'
    rescue RestClient::Exception => e
      render json: {error: e.message}, status: e.http_code
    end
  end
end
