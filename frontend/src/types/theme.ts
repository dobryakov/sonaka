// Цветовая палитра
export const colors = {
  primary: '#06b6d4',      // cyan-500
  primaryLight: '#22d3ee',  // cyan-400
  primaryDark: '#0ea5e9',   // sky-500
} as const;

// Статусы заказов
export type OrderStatus = 'pending' | 'processing' | 'completed' | 'cancelled';

export const orderStatusColors: Record<OrderStatus, string> = {
  pending: '#06b6d4',
  processing: '#22d3ee',
  completed: '#10b981',
  cancelled: '#6b7280',
};

// Градиенты
export const gradients = {
  primary: 'linear-gradient(135deg, #06b6d4 0%, #22d3ee 100%)',
  secondary: 'linear-gradient(135deg, #22d3ee 0%, #0ea5e9 100%)',
} as const;

