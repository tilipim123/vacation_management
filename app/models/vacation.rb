class Vacation < ApplicationRecord
  belongs_to :collaborator

  validates :start_date, presence: true
  validates :end_date, presence: true
  validate :validate_vacation_duration
  validate :validate_start_date_after_hire_date
  validate :validate_no_overlapping_vacations

  private

  def validate_vacation_duration
    if (end_date - start_date).to_i < 10
      errors.add(:end_date, "must be at least 10 days after the start date.")
    end
  end

  def validate_start_date_after_hire_date
    if start_date < collaborator.hire_date + 1.year
      errors.add(:start_date, "must be at least 12 months after the hire date.")
    end
  end

  def validate_no_overlapping_vacations
    if collaborator.vacations.where("start_date <= ? AND end_date >= ?", end_date, start_date).any?
      errors.add(:base, "There is already a vacation scheduled for this period.")
    end
  end
end
