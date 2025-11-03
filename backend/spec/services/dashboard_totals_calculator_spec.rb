require 'rails_helper'

RSpec.describe DashboardTotalsCalculator, type: :service do
  let(:customer) { create(:customer) }

  describe '#totals' do
    it 'applies half-to-even rounding for .5 cases on final sum (e.g., 10.005 -> 10.00)' do
      create(:order,
             customer: customer,
             status: 'completed',
             total_amount: 10.00,
             exchange_rate: 1.0005,
             has_partial_refund: false)

      totals = described_class.new(customer_id: customer.id, dashboard_currency: 'RUB').totals

      expect(totals.total_amount_ordered).to eq(10.00)
      expect(totals.currency).to eq('RUB')
    end

    it 'applies half-to-even rounding for .5 up to even (e.g., 10.015 -> 10.02)' do
      create(:order,
             customer: customer,
             status: 'completed',
             total_amount: 10.01,
             exchange_rate: 1.0005,
             has_partial_refund: false)

      totals = described_class.new(customer_id: customer.id, dashboard_currency: 'RUB').totals

      expect(totals.total_amount_ordered).to eq(10.02)
    end

    it 'converts totals using exchange_rate and excludes non-relevant statuses and partial refunds' do
      # Relevant orders
      create(:order, customer: customer, status: 'paid',      total_amount: 100.00, exchange_rate: 1.00,   has_partial_refund: false)
      create(:order, customer: customer, status: 'completed', total_amount: 200.00, exchange_rate: 0.5000, has_partial_refund: false)

      # Excluded by status
      create(:order, customer: customer, status: 'pending',   total_amount: 999.00, exchange_rate: 10.0,   has_partial_refund: false)

      # Excluded by partial refund
      create(:order, customer: customer, status: 'paid',      total_amount: 999.00, exchange_rate: 10.0,   has_partial_refund: true)

      totals = described_class.new(customer_id: customer.id, dashboard_currency: 'RUB').totals

      # 100.00 * 1.00 + 200.00 * 0.5 = 200.00
      expect(totals.total_amount_ordered).to eq(200.00)
      expect(totals.total_orders_count).to eq(2)
    end
  end
end


