# Data Model: Личный кабинет покупателя — дашборд заказов

**Feature**: 001-customer-orders-dashboard  
**Date**: 2025-11-03  
**Status**: Complete

## Overview

Модель данных для личного кабинета покупателя интернет-магазина Sonaka. Определяет сущности, атрибуты, связи и правила валидации для дашборда заказов, списка ранее купленных товаров и детального просмотра заказов.

## Entities

### Customer (Покупатель)

**Описание**: Владелец заказов, пользователь личного кабинета.

**Атрибуты**:
- `id` (Primary Key, UUID или BIGINT)
- `email` (String, NOT NULL, UNIQUE, indexed)
- `first_name` (String, NULL)
- `last_name` (String, NULL)
- `created_at` (DateTime, NOT NULL)
- `updated_at` (DateTime, NOT NULL)

**Relationships**:
- `has_many :orders` → Order
- `has_many :order_items, through: :orders` → OrderItem

**Validations**:
- Email format validation
- Email uniqueness

**Indexes**:
- `email` (для аутентификации и быстрого поиска)

**Notes**: Аутентификация уже реализована (assumptions spec.md), поэтому здесь только базовые поля для идентификации.

---

### Order (Заказ)

**Описание**: Заказ покупателя со статусом, датой, валютой и позициями.

**Атрибуты**:
- `id` (Primary Key, UUID или BIGINT)
- `customer_id` (Foreign Key → Customer, NOT NULL, indexed)
- `order_number` (String, NOT NULL, UNIQUE, indexed) — человекочитаемый номер заказа
- `status` (String/Enum, NOT NULL, indexed) — значения: 'pending', 'paid', 'completed', 'cancelled', 'refunded', 'partially_refunded'
- `currency` (String(3), NOT NULL) — ISO 4217 код валюты (USD, RUB, EUR и т.д.)
- `exchange_rate` (Decimal(10,6), NULL) — курс валюты заказа к валюте дашборда на дату заказа
- `total_amount` (Decimal(10,2), NOT NULL) — общая сумма в валюте заказа
- `item_count` (Integer, NOT NULL) — количество позиций
- `order_date` (Date, NOT NULL, indexed) — дата заказа
- `created_at` (DateTime, NOT NULL)
- `updated_at` (DateTime, NOT NULL)
- `has_partial_refund` (Boolean, DEFAULT false, indexed) — маркер частичного возврата (FR-013)

**Relationships**:
- `belongs_to :customer` → Customer
- `has_many :order_items` → OrderItem

**Validations**:
- `order_number` uniqueness
- `status` presence and inclusion in allowed values
- `currency` length (3) and presence
- `total_amount` presence, >= 0
- `item_count` presence, > 0
- `order_date` presence

**Indexes**:
- `customer_id` (для фильтрации заказов покупателя)
- `status` (для фильтрации по статусам, FR-010)
- `order_date` (для сортировки по дате)
- `has_partial_refund` (для быстрого исключения частичных возвратов)
- Composite: `[customer_id, status, order_date DESC]` (для оптимизации дашборда)

**State Transitions**: Статусы заказа:
```
pending → paid → completed
         ↓       ↓
      cancelled refunded
      
partially_refunded (любой статус может стать partially_refunded)
```

**Business Rules**:
- FR-010: В списки и расчёты включаются только 'paid' и 'completed'
- FR-013: Заказы с `has_partial_refund = true` исключаются целиком
- FR-002: Для мультивалютности используется `currency` и `exchange_rate`

---

### OrderItem (Позиция заказа)

**Описание**: Позиция в заказе с товаром, количеством и ценой на момент покупки.

**Атрибуты**:
- `id` (Primary Key, UUID или BIGINT)
- `order_id` (Foreign Key → Order, NOT NULL, indexed)
- `product_id` (Foreign Key → Product, NOT NULL, indexed)
- `product_name` (String, NOT NULL) — название товара на момент покупки (FR-005: Edge Cases)
- `product_image_url` (String, NULL) — URL изображения на момент покупки
- `quantity` (Integer, NOT NULL)
- `unit_price` (Decimal(10,2), NOT NULL) — цена за единицу в валюте заказа на момент покупки
- `total_price` (Decimal(10,2), NOT NULL) — quantity × unit_price
- `created_at` (DateTime, NOT NULL)
- `updated_at` (DateTime, NOT NULL)

**Relationships**:
- `belongs_to :order` → Order
- `belongs_to :product` → Product

**Validations**:
- `order_id` presence
- `product_id` presence
- `product_name` presence
- `quantity` presence, > 0
- `unit_price` presence, >= 0
- `total_price` presence, >= 0
- `total_price` должно равняться `quantity × unit_price` (application-level validation)

**Indexes**:
- `order_id` (для загрузки позиций заказа)
- `product_id` (для агрегации "ранее купленных", FR-006)
- Composite: `[product_id, order_id]` (для оптимизации запросов)

**Business Rules**:
- FR-005: Цена и название сохраняются как были на момент покупки (дублирование для истории)
- FR-011: Агрегация "ранее купленных" по `product_id` (все варианты/SKU свёртываются)

---

### Product (Товар)

**Описание**: Товар магазина для агрегации "ранее купленных".

**Атрибуты**:
- `id` (Primary Key, UUID или BIGINT)
- `name` (String, NOT NULL) — текущее название
- `slug` (String, NOT NULL, UNIQUE) — URL-friendly идентификатор
- `primary_image_url` (String, NULL) — основное изображение
- `description` (Text, NULL)
- `price` (Decimal(10,2), NULL) — текущая цена (может быть null для товаров вне каталога)
- `currency` (String(3), NULL)
- `is_active` (Boolean, DEFAULT true, indexed) — товар доступен в каталоге
- `created_at` (DateTime, NOT NULL)
- `updated_at` (DateTime, NOT NULL)

**Relationships**:
- `has_many :order_items` → OrderItem

**Validations**:
- `name` presence
- `slug` presence and uniqueness
- `price` >= 0 if present

**Indexes**:
- `slug` (для поиска товаров)
- `is_active` (для фильтрации активных товаров)

**Business Rules**:
- FR-011: Агрегация "ранее купленных" по `product_id` (варианты/SKU игнорируются на уровне OrderItem)
- Edge Cases: Если изображение отсутствует, используется плейсхолдер (FR-005)

---

### DashboardTotals (Вычисляемая сущность)

**Описание**: Виртуальная сущность для агрегированных данных дашборда.

**Атрибуты** (вычисляемые, не хранятся в БД):
- `total_orders_count` (Integer) — количество релевантных заказов
- `total_amount_ordered` (Decimal(10,2)) — общая сумма в валюте дашборда (FR-002)
- `currency` (String(3)) — валюта дашборда (откуда-то определяется)
- `previously_purchased_items` (Array<Hash>) — список товаров с агрегированным количеством:
  - `product_id` (Integer)
  - `product_name` (String) — текущее название
  - `product_image_url` (String) — текущее изображение
  - `total_quantity` (Integer) — суммарное количество по всем заказам

**Computed From**:
- Order: фильтруются только `status IN ('paid', 'completed')` и `has_partial_refund = false` (FR-010, FR-013)
- OrderItem: агрегируются по `product_id` с суммированием `quantity` (FR-011)
- Currency conversion: `total_amount_ordered = SUM(order.total_amount * order.exchange_rate)` (FR-002)

**Service**: `DashboardTotalsCalculator` (см. research.md)

**Business Rules**:
- FR-002: Только суммы товаров, без налогов и доставки
- FR-006: Только релевантные заказы (FR-010)
- FR-011: Агрегация по карточке товара, не по SKU
- Edge Cases: Пустой результат → показать сообщение о пустом состоянии (FR-008)

---

## Relationships Summary

```
Customer
  └── has_many :orders (Order)
       └── has_many :order_items (OrderItem)
            └── belongs_to :product (Product)

DashboardTotals (вычисляемая)
  └── computed from Order + OrderItem + Product
```

---

## Validation Rules Summary

### Order
- Статус только из белого списка: 'paid', 'completed' (FR-010)
- `has_partial_refund = true` → исключение из всех расчётов (FR-013)
- `exchange_rate` NULL → валюта заказа совпадает с валютой дашборда

### OrderItem
- `unit_price × quantity = total_price` (application-level)
- `product_name` и `product_image_url` дублируются для истории (Edge Cases)

### Dashboard Calculations
- Только `status IN ('paid', 'completed')` и `has_partial_refund = false`
- Агрегация товаров по `product_id`, суммирование `quantity`
- Конвертация валют через `exchange_rate`

---

## Indexes for Performance

**Optimized for SC-001 (< 2s) и SC-002 (< 30s)**:

1. `Order.customer_id` — фильтрация по покупателю
2. `Order.status` — фильтрация релевантных заказов
3. `Order.order_date` — сортировка
4. `Order.has_partial_refund` — исключение частичных возвратов
5. **Composite**: `Order[customer_id, status, order_date DESC]` — дашборд одним запросом
6. `OrderItem.order_id` — загрузка позиций заказа
7. `OrderItem.product_id` — агрегация "ранее купленных"
8. `Product.slug` — поиск товаров

---

## Edge Cases Handling

1. **Отсутствие изображения** (FR-005): `product_image_url` может быть NULL, отображается плейсхолдер
2. **Изменение цены/названия** (Edge Cases): дублируются в `order_items.product_name` и `order_items.unit_price`
3. **Мультивалютность** (FR-002): хранятся `currency` и `exchange_rate` в Order
4. **Пустые состояния** (FR-008): Пустая история → понятное сообщение, нулевая сумма
5. **Частичный возврат** (FR-013): флаг `has_partial_refund` исключает весь заказ
6. **Варианты/SKU** (FR-011): агрегация по `product_id`, а не по вариантам

---

## Migration Sequence

1. Create `customers` table (если не существует)
2. Create `products` table
3. Create `orders` table with indexes
4. Create `order_items` table with indexes
5. Add foreign key constraints
6. Seed test data (см. quickstart.md)

