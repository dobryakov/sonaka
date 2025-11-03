export type OrderItem = {
  id: number;
  product_id: number;
  product_name: string;
  product_image_url?: string | null;
  quantity: number;
  unit_price: number;
  total_price: number;
};

export type OrderDetails = {
  id: number;
  order_number: string;
  order_date: string; // ISO date
  status: 'pending' | 'paid' | 'completed' | 'cancelled' | 'refunded' | 'partially_refunded';
  total_amount: number;
  currency: string;
  item_count: number;
  order_items: OrderItem[];
};


