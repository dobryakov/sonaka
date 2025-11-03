class Customer < ApplicationRecord
  has_many :orders, dependent: :destroy
  has_many :order_items, through: :orders

  validates :email, presence: true, uniqueness: true
end


