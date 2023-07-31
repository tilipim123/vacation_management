# spec/models/vacation_spec.rb
require 'rails_helper'

RSpec.describe Vacation, type: :model do
  let(:collaborator) { FactoryBot.create(:collaborator) }

  it { should belong_to(:collaborator) }

  it { should validate_presence_of(:start_date) }
  it { should validate_presence_of(:end_date) }

  it 'validates vacation duration' do
    vacation = FactoryBot.build(:vacation, start_date: Date.today, end_date: Date.today + 9.days)
    expect(vacation).not_to be_valid
    expect(vacation.errors[:end_date]).to include('must be at least 10 days after the start date.')

    vacation.end_date = Date.today + 10.days
    expect(vacation).to be_valid
  end

  it 'validates start date after hire date' do
    hire_date = Date.today - 1.year
    collaborator.update(hire_date: hire_date)

    vacation = FactoryBot.build(:vacation, collaborator: collaborator, start_date: hire_date + 11.months)
    expect(vacation).not_to be_valid
    expect(vacation.errors[:start_date]).to include('must be at least 12 months after the hire date.')

    vacation.start_date = hire_date + 1.year
    expect(vacation).to be_valid
  end

  it 'validates no overlapping vacations' do
    FactoryBot.create(:vacation, collaborator: collaborator, start_date: Date.today, end_date: Date.today + 10.days)

    vacation = FactoryBot.build(:vacation, collaborator: collaborator, start_date: Date.today + 5.days, end_date: Date.today + 15.days)
    expect(vacation).not_to be_valid
    expect(vacation.errors[:base]).to include('There is already a vacation scheduled for this period.')

    vacation.start_date = Date.today + 11.days
    expect(vacation).to be_valid
  end
end
