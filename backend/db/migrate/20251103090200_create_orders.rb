class CreateOrders < ActiveRecord::Migration[7.1]
  def change
    create_table :orders do |t|
      t.references :customer, null: false, foreign_key: true
      t.string :order_number, null: false
      t.string :status, null: false
      t.string :currency, limit: 3, null: false
      t.decimal :exchange_rate, precision: 10, scale: 6
      t.decimal :total_amount, precision: 10, scale: 2, null: false, default: 0
      t.integer :item_count, null: false
      t.date :order_date, null: false
      t.boolean :has_partial_refund, default: false
      t.timestamps
    end
    add_index :orders, :order_number, unique: true
    add_index :orders, :status
    add_index :orders, :order_date
    add_index :orders, :has_partial_refund
    add_index :orders, [:customer_id, :status, :order_date]
  end
end


