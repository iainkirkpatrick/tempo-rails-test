class Person < ApplicationRecord
  has_many :activities, :through => :periods
end
