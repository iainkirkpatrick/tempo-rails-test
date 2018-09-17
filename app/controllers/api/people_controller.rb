module Api
  class PeopleController < ApplicationController
    before_action :authenticate_api_user!

    def index
      @people = Person.order(:id)

      render json: @people
    end
  end
end
