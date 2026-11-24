module Api
  class AlertController < ApplicationController
    def index
      # Fetches alert message from external alert service
      # Requires FORMS_ALERT_URL environment variable to be set
      # Example: FORMS_ALERT_URL=http://localhost:4103/setup/alert
      alert_url = ENV['FORMS_ALERT_URL']
      
      if alert_url.blank?
        @response[:message] = nil
        return render_json(200)
      end

      begin
        response = Net::HTTP.get(URI(alert_url))
        @response[:message] = response
        render_json(200)
      rescue StandardError => e
        Rails.logger.warn("Failed to fetch alert from #{alert_url}: #{e.message}")
        @response[:message] = nil
        render_json(200)
      end
    end
  end
end
