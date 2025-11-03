class CreateProducts < ActiveRecord::Migration[7.1]
  def change
    create_table :products do |t|
      t.string :name, null: false
      t.string :slug, null: false
      t.string :primary_image_url
      t.text :description
      t.decimal :price, precision: 10, scale: 2
      t.string :currency, limit: 3
      t.boolean :is_active, default: true, null: false

      t.timestamps
    end

    add_index :products, :slug, unique: true
    add_index :products, :is_active
  end
end


