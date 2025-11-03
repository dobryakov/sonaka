class Order < ApplicationRecord
  belongs_to :customer
  has_many :order_items, dependent: :destroy

  enum status: {
    pending: 'pending',
    paid: 'paid',
    completed: 'completed',
    cancelled: 'cancelled',
    refunded: 'refunded',
    partially_refunded: 'partially_refunded'
  }

  validates :order_number, presence: true, uniqueness: true
  validates :status, presence: true, inclusion: { in: statuses.keys }
  validates :currency, presence: true, length: { is: 3 }
  validates :total_amount, presence: true, numericality: { greater_than_or_equal_to: 0 }
  validates :item_count, presence: true, numericality: { greater_than: 0 }
  validates :order_date, presence: true

  scope :relevant, -> { where(status: %w[paid completed], has_partial_refund: false) }
end


