require 'rest-client'
class Api::OrdersController < ApplicationController
  def create
    base_url = APP_CONFIG['fjarrkontrollen']['base_url']
    access_token =  APP_CONFIG['fjarrkontrollen']['access_token']
    headers = {content_type: :json, accept: :json, authorization: "Bearer #{access_token}"}
    params["authenticated_x_account"] = validate_token ? @current_username : nil;
    begin
      response = RestClient.post "#{base_url}/orders", params.to_json, headers
      render body: response.body, status: response.code, content_type: 'application/json'
    rescue RestClient::Exception => e
      render json: {error: e.message}, status: e.http_code
    end
  end
end
