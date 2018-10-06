class CreatePeriods < ActiveRecord::Migration[5.2]
  def change
    create_table :periods do |t|
      t.datetime :start_time
      t.datetime :end_time
      t.belongs_to :person
      t.belongs_to :activity

      t.timestamps
    end
  end
end
