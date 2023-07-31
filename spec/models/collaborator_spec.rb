# spec/models/collaborator_spec.rb
require 'rails_helper'

RSpec.describe Collaborator, type: :model do
  it { should validate_presence_of(:name) }
  it { should validate_presence_of(:position) }
  it { should validate_presence_of(:hire_date) }
  it { should have_many(:vacations).dependent(:destroy) }
end
