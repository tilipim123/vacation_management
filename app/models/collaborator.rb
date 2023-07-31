class Collaborator < ApplicationRecord
  has_many :vacations

  validates :name, presence: true
  validates :position, presence: true
  validates :hire_date, presence: true
end
