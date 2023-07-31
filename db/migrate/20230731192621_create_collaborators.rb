class CreateCollaborators < ActiveRecord::Migration[7.0]
  def change
    create_table :collaborators do |t|
      t.string :name
      t.string :position
      t.date :hire_date

      t.timestamps
    end
  end
end
