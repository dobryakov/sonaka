import api from './api';
import type { OrderDetails } from '../types/order';

export async function getOrderDetails(orderId: number | string): Promise<OrderDetails> {
  return await api.get<OrderDetails>(`/orders/${orderId}`);
}


