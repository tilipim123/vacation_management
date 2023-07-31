# spec/factories/factories.rb
FactoryBot.define do
  factory :collaborator do
    name { Faker::Name.name }
    position { Faker::Job.title }
    hire_date { Faker::Date.between(from: 5.years.ago, to: Date.today) }
  end

  factory :vacation do
    start_date { Faker::Date.between(from: Date.today, to: 1.year.from_now) }
    end_date { Faker::Date.between(from: start_date, to: 1.year.from_now) }
    collaborator
  end
end
