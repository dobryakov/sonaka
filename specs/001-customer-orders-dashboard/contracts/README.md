# API Contracts: Личный кабинет покупателя

**Feature**: 001-customer-orders-dashboard  
**Date**: 2025-11-03  
**Spec Format**: OpenAPI 3.0.3

## Overview

REST API контракты для личного кабинета покупателя интернет-магазина Sonaka. Определяет эндпоинты, схемы запросов/ответов и правила работы с данными заказов.

## Files

- `openapi.yaml` — полная спецификация OpenAPI 3.0.3

## Endpoints

### `/api/v1/dashboard`
**Method**: `GET`  
**Summary**: Получить дашборд заказов (User Story 1)

**Features**:
- FR-001: Список заказов текущего аутентифицированного покупателя
- FR-002: Общая сумма заказанного (без налогов и доставки)
- FR-003: Ключевые поля заказа (номер, дата, статус, сумма)
- FR-009: Бесконечная лента через пагинацию (ленивая загрузка)
- FR-010: Только релевантные статусы ('paid', 'completed')
- FR-013: Исключение заказов с частичным возвратом

**Performance**: SC-001 — 95% запросов < 2s

**Parameters**:
- `page` (query, optional): Номер страницы (default: 1)
- `per_page` (query, optional): Элементов на странице (default: 20, max: 100)

**Response**: `DashboardResponse` с orders, totals, pagination

### `/api/v1/orders/{order_id}`
**Method**: `GET`  
**Summary**: Получить детали заказа (User Story 3)

**Features**:
- FR-004: Открытие деталей любого заказа
- FR-005: Изображение, название, количество, цена на момент покупки
- FR-012: Значения в валюте заказа, банковское округление до 2 знаков

**Performance**: SC-002 — 90% запросов < 30s

**Parameters**:
- `order_id` (path, required): ID заказа

**Response**: `OrderDetailResponse` с order, items, subtotals

### `/api/v1/previously_purchased`
**Method**: `GET`  
**Summary**: Получить список ранее купленных товаров (User Story 2)

**Features**:
- FR-006: Список ранее купленных с агрегированным количеством
- FR-007: Учитываются только купленные заказы (FR-010)
- FR-011: Агрегация по карточке товара (варианты/SKU свёрнуты)

**Performance**: SC-004 — 80% используют для повторных покупок

**Response**: `PreviouslyPurchasedResponse` с items

## Authentication

Все эндпоинты требуют Bearer JWT токен:
```
Authorization: Bearer <token>
```

## Error Responses

### 401 Unauthorized
```
{
  "error": "Unauthorized",
  "message": "Необходима аутентификация"
}
```

### 404 Not Found
```
{
  "error": "NotFound",
  "message": "Заказ не найден"
}
```

### 500 Internal Server Error
```
{
  "error": "InternalServerError",
  "message": "Произошла ошибка при загрузке данных"
}
```

## Edge Cases

### Пустые состояния (FR-008)
- Нет заказов → `orders: []`, `totals.total_amount_ordered: 0`
- Нет покупок → `items: []`

### Мультивалютность (FR-002)
- Заказы в разных валютах конвертируются через `exchange_rate`
- Все суммы в ответах в валюте дашборда

### Отсутствующие изображения (FR-005: Edge Cases)
- `product_image_url: null` → отобразить плейсхолдер на фронтенде

### Частичный возврат (FR-013)
- Заказ с `has_partial_refund = true` исключается целиком из дашборда

## Validation Rules

### OrderStatus
Разрешённые значения:
- `pending` — ожидает оплаты
- `paid` — оплачен
- `completed` — завершён
- `cancelled` — отменён
- `refunded` — возвращён
- `partially_refunded` — частично возвращён

Только `paid` и `completed` учитываются в списках и расчётах (FR-010).

### Currency
ISO 4217 трёхбуквенный код (USD, RUB, EUR и т.д.).

### Amounts
Банковское округление до 2 знаков после запятой (FR-012).

## Versioning

API версионируется через путь: `/api/v1/...`

## Base URL

Development: `http://localhost:10001/api/v1`  
Production: TBD (настраивается через `.env`)

## Testing

Контракты используются для:
1. Contract tests на бэкенде (проверка соответствия OpenAPI spec)
2. Mock API на фронтенде (для разработки без бэкенда)
3. Документация для разработчиков

## Generated Artifacts

From `openapi.yaml` можно сгенерировать:
- TypeScript типы для фронтенда
- Mock сервер для локальной разработки
- API документация (Swagger UI, ReDoc)

## References

- [OpenAPI Specification 3.0.3](https://swagger.io/specification/)
- Feature Spec: `../spec.md`
- Data Model: `../data-model.md`
- Research: `../research.md`

