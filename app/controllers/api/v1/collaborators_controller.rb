# app/controllers/api/v1/collaborators_controller.rb

module Api
  module V1
    class CollaboratorsController < ApplicationController
      before_action :set_collaborator, only: [:show, :update, :destroy]

      def index
        collaborators = Collaborator.all
        render json: collaborators
      end

      def show
        render json: @collaborator.as_json(include: :vacations)
      end

      def create
        collaborator = Collaborator.new(collaborator_params)

        if collaborator.save
          render json: collaborator, status: :created
        else
          render json: collaborator.errors, status: :unprocessable_entity
        end
      end

      def update
        if @collaborator.update(collaborator_params)
          render json: @collaborator
        else
          render json: @collaborator.errors, status: :unprocessable_entity
        end
      end

      def destroy
        @collaborator.destroy
        head :no_content
      end

      private

      def set_collaborator
        @collaborator = Collaborator.find(params[:id])
      end

      def collaborator_params
        params.require(:collaborator).permit(:name, :position, :hire_date)
      end
    end
  end
end
