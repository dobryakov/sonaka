# API Contracts: Интеграция дизайна Figma

**Feature**: Интеграция дизайна Figma  
**Phase**: Phase 1 - Design & Contracts  
**Date**: 2025-01-27

## Обзор

Это frontend-only фича, которая **не изменяет** существующие API контракты. Данный документ описывает используемые API endpoints для справки и обеспечения совместимости.

**Важно**: API контракты остаются без изменений. Frontend использует существующие endpoints для получения данных и применяет к ним новый визуальный стиль.

---

## Используемые API Endpoints

### 1. GET /api/v1/dashboard

**Описание**: Получение данных дашборда личного кабинета

**Метод**: `GET`  
**URL**: `/api/v1/dashboard`  
**Query Parameters** (опционально):
- `page` (number): Номер страницы для пагинации
- `per_page` (number): Количество элементов на странице

**Response** (200 OK):
```json
{
  "orders": [
    {
      "id": 123,
      "order_number": "ORD-2025-001",
      "order_date": "2025-01-27T10:30:00Z",
      "status": "completed",
      "total_amount": 15000.50,
      "currency": "RUB",
      "item_count": 3
    }
  ],
  "totals": {
    "total_orders_count": 15,
    "total_amount_ordered": 150000.00,
    "currency": "RUB"
  },
  "previously_purchased_items": [
    {
      "product_id": 456,
      "product_name": "Ортопедическая подушка",
      "product_image_url": "https://example.com/image.jpg",
      "total_quantity": 2,
      "last_purchased_date": "2025-01-20T14:00:00Z"
    }
  ],
  "pagination": {
    "current_page": 1,
    "total_pages": 3,
    "per_page": 10
  }
}
```

**Типы данных** (TypeScript):

```typescript
type OrderStatus = 'pending' | 'paid' | 'completed' | 'cancelled' | 'refunded' | 'partially_refunded';

type OrderSummary = {
  id: number;
  order_number: string;
  order_date: string; // ISO date
  status: OrderStatus;
  total_amount: number;
  currency: string; // ISO 4217
  item_count?: number;
};

type DashboardTotals = {
  total_orders_count: number;
  total_amount_ordered: number;
  currency: string;
};

type PreviouslyPurchasedItem = {
  product_id: number;
  product_name: string;
  product_image_url?: string | null;
  total_quantity: number;
  last_purchased_date?: string | null; // ISO date
};

type Pagination = {
  current_page: number;
  total_pages: number;
  per_page: number;
};

type DashboardResponse = {
  orders: OrderSummary[];
  totals: DashboardTotals;
  previously_purchased_items?: PreviouslyPurchasedItem[];
  pagination: Pagination;
};
```

**Использование в frontend**:
- Компонент `DashboardPage` использует этот endpoint для получения данных
- Данные отображаются в компонентах:
  - `StatCard` - для отображения totals
  - `OrderCard` - для отображения списка заказов
  - `ProductItem` - для отображения ранее купленных товаров

---

### 2. GET /api/v1/orders/:id

**Описание**: Получение деталей конкретного заказа

**Метод**: `GET`  
**URL**: `/api/v1/orders/:id`  
**Path Parameters**:
- `id` (number | string): ID заказа

**Response** (200 OK):
```json
{
  "id": 123,
  "order_number": "ORD-2025-001",
  "order_date": "2025-01-27T10:30:00Z",
  "status": "completed",
  "total_amount": 15000.50,
  "currency": "RUB",
  "items": [
    {
      "product_id": 456,
      "product_name": "Ортопедическая подушка",
      "product_image_url": "https://example.com/image.jpg",
      "quantity": 2,
      "price": 7500.25
    }
  ],
  "shipping_address": {
    "street": "ул. Примерная, д. 1",
    "city": "Москва",
    "postal_code": "123456"
  }
}
```

**Типы данных** (TypeScript):

```typescript
type OrderDetails = {
  id: number;
  order_number: string;
  order_date: string; // ISO date
  status: OrderStatus;
  total_amount: number;
  currency: string;
  items: OrderItem[];
  shipping_address?: ShippingAddress;
  // ... другие поля
};

type OrderItem = {
  product_id: number;
  product_name: string;
  product_image_url?: string | null;
  quantity: number;
  price: number;
};

type ShippingAddress = {
  street: string;
  city: string;
  postal_code: string;
  // ... другие поля
};
```

**Использование в frontend**:
- Компонент `OrderDetailsPage` использует этот endpoint
- Детали заказа отображаются с применением нового визуального стиля

---

## Маппинг статусов заказов

Для визуального отображения статусы заказов маппятся следующим образом:

| API Status | Frontend Display Status | Color | Icon |
|------------|------------------------|-------|------|
| `pending` | "Ожидается" | `#06b6d4` (бирюзовый) | ⏳ |
| `paid` | "Оплачен" | `#22d3ee` (голубой) | ✅ |
| `processing` | "В обработке" | `#22d3ee` (голубой) | ⚙️ |
| `completed` | "Завершён" | `#10b981` (зелёный) | ✓ |
| `cancelled` | "Отменён" | `#6b7280` (серый) | ✗ |
| `refunded` | "Возвращён" | `#6b7280` (серый) | ↺ |
| `partially_refunded` | "Частично возвращён" | `#f59e0b` (жёлтый) | ↻ |

**Примечание**: Маппинг статусов выполняется в компоненте `OrderCard` через функцию `getOrderStatusColor()` и `getOrderStatusLabel()`.

---

## Обработка ошибок

**Стандартные коды ответов**:
- `200 OK`: Успешный запрос
- `400 Bad Request`: Неверные параметры запроса
- `401 Unauthorized`: Требуется аутентификация
- `404 Not Found`: Ресурс не найден
- `500 Internal Server Error`: Ошибка сервера

**Обработка в frontend**:
- Ошибки отображаются в компонентах `EmptyState` или специальных компонентах ошибок
- Все сообщения об ошибках локализованы на русский язык
- Визуальное оформление ошибок соответствует новому дизайну

---

## Пагинация

**Параметры пагинации**:
- `page`: Номер страницы (начиная с 1)
- `per_page`: Количество элементов на странице (по умолчанию 10)

**Response**:
```json
{
  "pagination": {
    "current_page": 1,
    "total_pages": 3,
    "per_page": 10
  }
}
```

**Использование в frontend**:
- Пагинация отображается в компонентах списков (OrdersList, PreviouslyPurchasedList)
- Визуальное оформление соответствует новому дизайну

---

## Изображения товаров

**Поле**: `product_image_url`  
**Тип**: `string | null | undefined`

**Обработка в frontend**:
- Если `product_image_url` отсутствует или `null`, отображается placeholder с иконкой
- Placeholder оформлен в стиле дизайн-системы
- Изображения должны загружаться с поддержкой lazy loading

---

## Валидация данных

**Проверки на frontend**:
- Все обязательные поля должны присутствовать
- Числовые значения должны быть валидными числами
- Даты должны быть в формате ISO 8601
- Статусы должны соответствовать допустимым значениям

**Fallback значения**:
- Если `item_count` отсутствует, используется `0`
- Если `previously_purchased_items` отсутствует, используется пустой массив `[]`
- Если `product_image_url` отсутствует, используется placeholder

---

## Совместимость

**Версия API**: `v1`  
**Формат**: JSON  
**Кодировка**: UTF-8

**Backward Compatibility**: ✅ Полная совместимость
- Frontend использует существующие endpoints без изменений
- Новые визуальные компоненты не требуют изменений в API
- Все существующие поля остаются без изменений

---

## Тестирование API контрактов

**Contract Tests**:
- Тесты контрактов находятся в `backend/spec/contract/`
- Тесты проверяют соответствие API ответов ожидаемой структуре
- При изменении API контрактов (если потребуется в будущем) тесты должны быть обновлены

**Frontend Integration Tests**:
- Тесты в `frontend/tests/integration/` проверяют корректность работы с API
- Мокирование API ответов для изоляции тестов компонентов

