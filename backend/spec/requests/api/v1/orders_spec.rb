require 'rails_helper'

RSpec.describe 'Api::V1::Orders', type: :request do
  describe 'GET /api/v1/orders/:order_id' do
    let(:customer) { create(:customer) }
    let(:order) { create(:order, customer: customer, status: 'completed', item_count: 2, total_amount: 123.45, currency: 'RUB') }
    let!(:item1) do
      create(
        :order_item,
        order: order,
        quantity: 1,
        product: create(:product),
        product_name: 'Товар A',
        unit_price: 100.0,
        total_price: 100.0
      )
    end
    let!(:item2) do
      create(
        :order_item,
        order: order,
        quantity: 3,
        product: create(:product),
        product_name: 'Товар B',
        unit_price: 50.0,
        total_price: 150.0
      )
    end

    it 'returns order details with items' do
      get "/api/v1/orders/#{order.id}"

      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)
      expect(json['id']).to eq(order.id)
      expect(json['order_number']).to eq(order.order_number)
      expect(json['currency']).to eq('RUB')
      expect(json['order_items']).to be_an(Array)
      expect(json['order_items'].size).to eq(2)
      expect(json['order_items'].first).to include('product_name', 'quantity', 'unit_price', 'total_price')
    end

    it 'returns 404 when order not found' do
      get "/api/v1/orders/0"
      expect(response).to have_http_status(:not_found)
    end
  end
end


