module Api
  class ActivitiesController < ApplicationController
    before_action :authenticate_api_user!

    def index
      @activities = Activity.order(:id)

      render json: @activities
    end
  end
end
