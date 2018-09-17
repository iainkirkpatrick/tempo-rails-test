module Api
  class PeopleController < ApplicationController
    def index
      @people = Person.order(:id)

      render json: @people
    end
  end
end
