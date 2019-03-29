require 'rest-client'
class Api::OrdersController < ApplicationController
  def create
    base_url = APP_CONFIG['fjarrkontrollen']['base_url']
    access_token =  APP_CONFIG['fjarrkontrollen']['access_token']
    headers = {content_type: :json, accept: :json, authorization: "Bearer #{access_token}"}
    # TODO: Fix this mess:
    params["authenticated_x_account"] = validate_token ? @current_username : nil;
    params["order"]["authenticated_x_account"] = validate_token ? @current_username : nil;
    response = RestClient.post "#{base_url}/orders", params.to_json, headers
  end
end
