class User

=begin
    :address,
    :address2,
    :attr_print,
    :cardnumber,
    :city,
    :denied,
    :email,
    :fines_amount,
    :first_name,
    :id,
    :last_name,
    :loans,
    :phone,
    :reserves,
    :restriction_av,
    :restriction_fines,
    :restriction_or,
    :restriction_ori,
    :restriction_overdue,
    :user_category,
    :username,
    :warning,
    :xaccount
    :zipcode,
=end
  # Used by access_token model
  attr_reader(
    :username,
    :id
  )

  include ActiveModel::Model
  include ActiveModel::Serialization
  include ActiveModel::Validations

  def as_json options = {}
    result = super(except: ['xml'])
    if @denied
      result[:denied_reasons] = {restriction_av: @restriction_av, restriction_ori: @restriction_ori}
    else
      result[:denied_reasons] = nil
    end
    if @warning
      result[:warning_reasons] = {restriction_fines: @restriction_fines, restriction_or: @restriction_or, restriction_overdue: @restriction_overdue}
    else
      result[:warning_reasons] = nil
    end
    return result
  end

  def initialize username, xml=nil
    @username = username
    @xml = xml
    parse_xml if @xml
  end

  def self.find id
    # not implemented
    return nil
  end

  def self.find_by_username username
    base_url = APP_CONFIG['koha']['base_url']
    user =  APP_CONFIG['koha']['user']
    password =  APP_CONFIG['koha']['password']

    url = "#{base_url}/members/get?borrower=#{username}&userid=#{user}&password=#{password}"
    response = RestClient.get url
    item = self.new username, response.body
    return item
  rescue => error
    # TODO: Perhaps not swollow error here since was fucked by this
    # puts error.inspect
    return nil
  end

  def self.authenticate cardnumber, personalnumber
    base_url = APP_CONFIG['koha']['base_url']
    auth_url = APP_CONFIG['koha']['auth_url']
    user =  APP_CONFIG['koha']['user']
    password =  APP_CONFIG['koha']['password']

    # Escape cardnumber and personalnumber
    cardnumber = URI.encode_www_form_component(cardnumber)
    personalnumber = URI.encode_www_form_component(personalnumber)

    url = "#{auth_url}?cardnumber=#{cardnumber}&personalnumber=#{personalnumber}&userid=#{user}&password=#{password}"
    response = RestClient.get url
    xml = Nokogiri::XML(response.body).remove_namespaces!
    if xml.search('//response/match').text.present?
      return xml.search('//response/match').text.eql?("true")
    end
  rescue => error
    return false
  end

  def has_borrowed_item? biblio_id
    return !@loans.select{|loan| loan[:biblionumber].eql? biblio_id}.empty?
  end

  def has_reserved_item? biblio_id
    return !@reserves.select{|reserve| reserve[:biblionumber].eql? biblio_id}.empty?
  end

  def parse_xml
    xml = Nokogiri::XML(@xml).remove_namespaces!
    {
      "categorycode" => "user_category",
      "borrowernumber" => "id",
      "surname" => "last_name",
      "firstname" => "first_name",
      "address" => "address",
      "address2" => "address2",
      "zipcode" => "zipcode",
      "city" => "city",
      "cardnumber" => "cardnumber", #?
      "email" => "email",
      "phone" => "phone",
      "userid" => "xaccount"
    }.each do |xml_source, attr_target|
      value = xml.search("//response/borrower/#{xml_source}")
      if value.text.present?
        if attr_target == "id"
          instance_variable_set("@#{attr_target}", value.text.to_i)
        else
          instance_variable_set("@#{attr_target}", value.text)
        end
      else
        instance_variable_set("@#{attr_target}", nil)
      end
    end

    @denied = false # spärrad
    @warning = false # ska varnas
    @fines_amount = nil # bötesbelopp
    @restriction_fines = false # böter mer än 69 kr
    @restriction_av = false # avstängd
    @restriction_or = false # obetald räkning
    @restriction_ori = false # obetald räkning inkasso
    @restriction_overdue = false # 2a krav

    # TBD remove this, when AV is moved from patron category
    if @user_category == 'AV'
      @restriction_av = true
      @denied = true
    end

    xml.xpath('//response/debarments').each do |debarment|
      if debarment.xpath('comment').text.starts_with?('AV, ')
        @restriction_av = true
        @denied = true
      end
      if debarment.xpath('comment').text.starts_with?('OR, ')
        @restriction_or = true
        @warning = true
      end
      if debarment.xpath('comment').text.starts_with?('ORI, ')
        @restriction_ori = true
        @denied = true
      end
      if debarment.xpath('comment').text.starts_with?('OVERDUES_PROCESS ')
        @restriction_overdue = true
        @warning = true
      end
    end

    xml.xpath('//response/flags').each do |flag|
      if flag.xpath('name').text == 'CHARGES'
        if flag.xpath('amount').text.to_i > 69
          @restriction_fines = true
          @warning = true
        end
        @fines_amount = flag.xpath('amount').text
      end
    end

    @loans = []
    xml.xpath('//response/issues').each do |issue|
      if issue.xpath('returndate').text.blank?
        biblionumber = issue.xpath('biblionumber').text
        itemnumber = issue.xpath('itemnumber').text
        @loans << {biblionumber: biblionumber, itemnumber: itemnumber}
      end
    end

    @reserves = []
    xml.xpath('//response/reserves/anon').each do |reserve|
        biblionumber = reserve.xpath('biblionumber').text
        itemnumber = reserve.xpath('itemnumber').text
        @reserves << {biblionumber: biblionumber, itemnumber: itemnumber}
    end

    if xml.search('//response/attributes[code="PRINT"]/attribute').text.present?
      @attr_print = xml.search('//response/attributes[code="PRINT"]/attribute').text
    end

    if xml.search('//response/attributes[code="ORG"]/attribute').text.present?
      @organisation = xml.search('//response/attributes[code="ORG"]/attribute').text
    end
  end

end
