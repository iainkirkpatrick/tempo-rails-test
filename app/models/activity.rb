class Activity < ApplicationRecord
  has_many :people, :through => :periods
end
