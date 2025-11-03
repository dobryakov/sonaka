import api from './api';
import type { DashboardResponse, PreviouslyPurchasedItem } from '../types/dashboard';

export async function getDashboard(params?: { page?: number; per_page?: number }): Promise<DashboardResponse> {
  const search = new URLSearchParams();
  if (params?.page) search.set('page', String(params.page));
  if (params?.per_page) search.set('per_page', String(params.per_page));
  return api.get<DashboardResponse>(`/dashboard${search.toString() ? `?${search.toString()}` : ''}`);
}

export async function getPreviouslyPurchased(params?: { page?: number; per_page?: number }): Promise<PreviouslyPurchasedItem[]> {
  const dashboard = await getDashboard(params);
  return dashboard.previously_purchased_items ?? [];
}


