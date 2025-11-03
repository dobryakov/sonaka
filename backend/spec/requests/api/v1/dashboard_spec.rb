require 'rails_helper'

RSpec.describe 'GET /api/v1/dashboard', type: :request do
  let(:customer) { create(:customer) }

  it 'returns response according to contract and filters non-relevant orders' do
    # Relevant
    o1 = create(:order, customer: customer, status: 'paid',      total_amount: 120.00, exchange_rate: 1.0,   has_partial_refund: false, order_date: Date.today)
    o2 = create(:order, customer: customer, status: 'completed', total_amount: 80.00,  exchange_rate: 0.5,   has_partial_refund: false, order_date: Date.today - 1)

    # Excluded
    create(:order, customer: customer, status: 'pending',   total_amount: 999, exchange_rate: 10.0,  has_partial_refund: false)
    create(:order, customer: customer, status: 'paid',      total_amount: 999, exchange_rate: 10.0,  has_partial_refund: true)

    get "/api/v1/dashboard", params: { customer_id: customer.id, page: 1, per_page: 20 }

    expect(response).to have_http_status(:ok)
    json = JSON.parse(response.body)

    expect(json).to include('orders', 'totals', 'pagination')
    expect(json['orders']).to be_an(Array)
    expect(json['orders'].size).to eq(2)
    expect(json['orders'].map { |o| o['id'] }).to contain_exactly(o1.id, o2.id)

    expect(json['totals']).to include('total_orders_count', 'total_amount_ordered', 'currency')
    expect(json['totals']['total_orders_count']).to eq(2)
    # 120 * 1.0 + 80 * 0.5 = 160.00
    expect(json['totals']['total_amount_ordered']).to eq(160.0)
    expect(json['totals']['currency']).to be_a(String)

    expect(json['pagination']).to include('current_page', 'total_pages', 'per_page')
  end
end


