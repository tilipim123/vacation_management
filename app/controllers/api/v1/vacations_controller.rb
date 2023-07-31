# app/controllers/api/v1/vacations_controller.rb

module Api
  module V1
    class VacationsController < ApplicationController
      before_action :set_collaborator
      before_action :set_vacation, only: [:show, :update, :destroy]

      def index
        vacations = @collaborator.vacations
        render json: vacations
      end

      def show
        render json: @vacation
      end

      def create
        vacation = @collaborator.vacations.build(vacation_params)

        if vacation.save
          render json: vacation, status: :created
        else
          if vacation.errors[:base].present?
            render json: { base: vacation.errors[:base].first }, status: :unprocessable_entity
          else
            render json: vacation.errors, status: :unprocessable_entity
          end
        end
      end

      def update
        if @vacation.update(vacation_params)
          render json: @vacation
        else
          render json: @vacation.errors, status: :unprocessable_entity
        end
      end

      def destroy
        @vacation.destroy
        head :no_content
      end

      private

      def set_collaborator
        @collaborator = Collaborator.find(params[:collaborator_id])
      end

      def set_vacation
        @vacation = @collaborator.vacations.find(params[:id])
      end

      def vacation_params
        params.require(:vacation).permit(:start_date, :end_date)
      end
    end
  end
end
