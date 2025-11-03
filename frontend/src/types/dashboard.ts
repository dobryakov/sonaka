export type OrderSummary = {
  id: number;
  order_number: string;
  order_date: string; // ISO date
  status: 'pending' | 'paid' | 'completed' | 'cancelled' | 'refunded' | 'partially_refunded';
  total_amount: number;
  currency: string; // ISO 4217
  item_count?: number;
};

export type DashboardTotals = {
  total_orders_count: number;
  total_amount_ordered: number;
  currency: string;
};

export type PreviouslyPurchasedItem = {
  product_id: number;
  product_name: string;
  product_image_url?: string | null;
  total_quantity: number;
  last_purchased_date?: string | null; // ISO date
};

export type Pagination = {
  current_page: number;
  total_pages: number;
  per_page: number;
};

export type DashboardResponse = {
  orders: OrderSummary[];
  totals: DashboardTotals;
  previously_purchased_items?: PreviouslyPurchasedItem[];
  pagination: Pagination;
};


