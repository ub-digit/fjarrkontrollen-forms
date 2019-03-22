require 'rest-client'
class Api::OrdersController < ApplicationController
  def create
    base_url = APP_CONFIG['fjarrkontrollen']['base_url']
    headers = {content_type: :json, accept: :json}
    if validate_token
      headers[:x_authenticated_xaccount] = @current_username
    end
    response = RestClient.post "#{base_url}/orders", params.to_json, headers
    puts "RESPONSE"
    puts response.inspect
  end
end
