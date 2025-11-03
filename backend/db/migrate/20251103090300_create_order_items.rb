class CreateOrderItems < ActiveRecord::Migration[7.1]
  def change
    create_table :order_items do |t|
      t.bigint :order_ref_id, null: false
      t.bigint :product_id, null: false
      t.string :product_name, null: false
      t.string :product_image_url
      t.integer :quantity, null: false
      t.decimal :unit_price, precision: 10, scale: 2, null: false
      t.decimal :total_price, precision: 10, scale: 2, null: false
      t.timestamps
    end
    add_foreign_key :order_items, :orders, column: :order_ref_id
    add_foreign_key :order_items, :products, column: :product_id
    add_index :order_items, [:product_id, :order_ref_id]
  end
end


