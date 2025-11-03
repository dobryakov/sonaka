class OrderItem < ApplicationRecord
  belongs_to :order, foreign_key: :order_ref_id
  belongs_to :product

  validates :order, presence: true
  validates :product_id, presence: true
  validates :product_name, presence: true
  validates :quantity, presence: true, numericality: { greater_than: 0 }
  validates :unit_price, presence: true, numericality: { greater_than_or_equal_to: 0 }
  validates :total_price, presence: true, numericality: { greater_than_or_equal_to: 0 }

  validate :total_price_matches_quantity_times_unit_price

  private

  def total_price_matches_quantity_times_unit_price
    return if quantity.blank? || unit_price.blank? || total_price.blank?

    expected = (quantity * unit_price).round(2)
    if (total_price - expected).abs > 0.005
      errors.add(:total_price, 'must equal quantity × unit_price')
    end
  end
end


