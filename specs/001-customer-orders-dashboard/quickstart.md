# Quick Start Guide: Личный кабинет покупателя

**Feature**: 001-customer-orders-dashboard  
**Date**: 2025-11-03

## Overview

Быстрый старт для разработки и тестирования личного кабинета покупателя. Включает настройку Docker-окружения, загрузку тестовых данных и запуск автотестов.

## Prerequisites

- Docker >= 20.10
- Docker Compose (v2, команда `docker compose`)
- Git (для клонирования репозитория)

## Project Structure

```text
/home/ubuntu/sonaka/
├── backend/           # Ruby on Rails API
├── frontend/          # React SPA
├── docker-compose.yml # Определение сервисов
├── .env              # Конфигурация (порты, БД и т.д.)
└── specs/            # Документация
    └── 001-customer-orders-dashboard/
```

## Setup

### 1. Clone and Navigate

```bash
cd /home/ubuntu/sonaka
```

### 2. Environment Configuration

Создайте `.env` в корне проекта:

```bash
# Backend
BACKEND_PORT=10001
BACKEND_DB_HOST=postgres
BACKEND_DB_PORT=5432
BACKEND_DB_NAME=sonaka_dev
BACKEND_DB_USER=sonaka
BACKEND_DB_PASSWORD=sonaka_dev_password

# Frontend
FRONTEND_PORT=10002
REACT_APP_API_BASE_URL=http://localhost:10001/api/v1

# Database
POSTGRES_PORT=10003
POSTGRES_DB=sonaka_dev
POSTGRES_USER=sonaka
POSTGRES_PASSWORD=sonaka_dev_password

# Optional: Redis for caching
REDIS_PORT=10004
```

### 3. Build Docker Images

```bash
docker compose build
```

### 4. Start Services

```bash
docker compose up -d
```

Это запустит:
- PostgreSQL на порту 10003
- Backend API на порту 10001
- Frontend SPA на порту 10002

### 5. Setup Database

```bash
# Создание БД и миграции
docker compose exec backend ruby bin/rails db:create
docker compose exec backend ruby bin/rails db:migrate

# Загрузка тестовых данных
docker compose exec backend ruby bin/rails db:seed
```

### 6. Verify

Откройте в браузере:
- Frontend: http://localhost:10002
- Backend API docs: http://localhost:10001/api/docs (если настроено)

Проверьте логи:
```bash
docker compose logs -f backend
docker compose logs -f frontend
```

## Test Data

Сид создаёт:

### Customer
- Email: `test@sonaka.ru`
- Password: `password123`

### Products
- Ортопедическая подушка Premium (ID: 10)
- Одеяло из бамбука (ID: 15)
- Матрас Memory Foam (ID: 20)
- И ещё 10+ товаров

### Orders
- 3 завершённых заказа (status: 'completed')
- 2 оплаченных заказа (status: 'paid')
- 1 отменённый заказ (status: 'cancelled') — не отображается
- 1 заказ с частичным возвратом (has_partial_refund: true) — исключается

### OrderItems
- Позиции с различными количествами и ценами
- Некоторые с отсутствующими изображениями (для тестирования плейсхолдеров)
- Мультивалютные заказы (RUB, USD)

## Development Workflow

### Backend Development

```bash
# Войти в контейнер
docker compose exec backend bash

# Генерация миграции
bin/rails generate migration AddFieldToOrders field:type

# Запуск миграций
bin/rails db:migrate

# Создание модели
bin/rails generate model OrderItem order:references product:references

# RSpec тесты
RAILS_ENV=test bundle exec rspec

# Выборочные тесты (только изменённые компоненты)
RAILS_ENV=test bundle exec rspec spec/services/
RAILS_ENV=test bundle exec rspec spec/controllers/api/v1/
```

### Frontend Development

```bash
# Войти в контейнер
docker compose exec frontend bash

# Установка зависимостей
npm install

# Запуск dev сервера (hot reload)
npm start

# Jest тесты
npm test

# Выборочные тесты
npm test -- DashboardService
npm test -- OrdersList.test.tsx
```

### Database Access

```bash
# PostgreSQL CLI
docker compose exec postgres psql -U sonaka -d sonaka_dev

# Выполнить SQL
docker compose exec backend ruby bin/rails dbconsole
```

## Testing

### Backend Tests (RSpec)

```bash
# Все тесты
docker compose exec backend bash -lc "RAILS_ENV=test bundle exec rspec"

# Unit тесты моделей
docker compose exec backend bash -lc "RAILS_ENV=test bundle exec rspec spec/models/"

# Service объекты
docker compose exec backend bash -lc "RAILS_ENV=test bundle exec rspec spec/services/"

# Integration тесты контроллеров
docker compose exec backend bash -lc "RAILS_ENV=test bundle exec rspec spec/requests/"
```

### Frontend Tests (Jest + RTL)

```bash
# Все тесты
docker compose exec frontend npm test

# Компоненты
docker compose exec frontend npm test -- src/components/

# Сервисы
docker compose exec frontend npm test -- src/services/
```

### E2E Tests (Playwright)

```bash
# Запустить в отдельном контейнере (tbd в docker-compose.yml)
docker compose exec e2e npx playwright test

# Веб-интерфейс для отладки
docker compose exec e2e npx playwright show-report
```

## Running Specific Tests

### User Story 1: Dashboard

```bash
# Backend contract test
docker compose exec backend bash -lc "RAILS_ENV=test bundle exec rspec spec/requests/api/v1/dashboard_spec.rb"

# Frontend component test
docker compose exec frontend npm test -- DashboardPage.test.tsx

# E2E test
docker compose exec e2e npx playwright test dashboard.spec.ts
```

### User Story 2: Previously Purchased

```bash
# Backend
docker compose exec backend bash -lc "RAILS_ENV=test bundle exec rspec spec/requests/api/v1/previously_purchased_spec.rb"

# Frontend
docker compose exec frontend npm test -- PreviouslyPurchasedList.test.tsx
```

### User Story 3: Order Details

```bash
# Backend
docker compose exec backend bash -lc "RAILS_ENV=test bundle exec rspec spec/requests/api/v1/orders_spec.rb"

# Frontend
docker compose exec frontend npm test -- OrderDetailsView.test.tsx
```

## Performance Testing

### SC-001: Dashboard Load < 2s

```bash
# Нагрузочный тест (если настроен k6/locust)
docker compose exec perf-tests k6 run load_tests/dashboard.js

# Или через curl для быстрой проверки
time curl -H "Authorization: Bearer $TOKEN" http://localhost:10001/api/v1/dashboard
```

### SC-002: Order Details < 30s

```bash
time curl -H "Authorization: Bearer $TOKEN" http://localhost:10001/api/v1/orders/1
```

## Cleanup

### Reset Database

```bash
# Полный сброс с перезагрузкой seeds
docker compose exec backend ruby bin/rails db:reset
```

### Clean Containers

```bash
# Остановить контейнеры
docker compose down

# Удалить volumes (БД очистится!)
docker compose down -v

# Полная очистка
docker compose down -v --rmi all
```

## API Notes

- `GET /api/v1/dashboard` возвращает поля `orders`, `totals`, `pagination`, а также `previously_purchased_items` со структурой: `product_id`, `product_name`, `product_image_url`, `total_quantity`, `last_purchased_date`.
- В модели данных `OrderItem` используется внешний ключ `order_ref_id` (ассоциация `belongs_to :order, foreign_key: :order_ref_id`).

## Troubleshooting

### Backend не запускается

```bash
# Проверить логи
docker compose logs backend

# Проверить подключение к БД
docker compose exec backend ruby bin/rails db:version

# Пересоздать контейнер
docker compose up -d --force-recreate backend
```

### Frontend: API недоступен

```bash
# Проверить CORS настройки backend
docker compose exec backend cat config/initializers/cors.rb

# Проверить URL в фронтенде
docker compose exec frontend cat .env
```

### Миграции не применяются

```bash
# Проверить статус
docker compose exec backend ruby bin/rails db:migrate:status

# Откатить последнюю
docker compose exec backend ruby bin/rails db:rollback

# Запустить заново
docker compose exec backend ruby bin/rails db:migrate
```

### Тесты падают

```bash
# Подготовка test БД
docker compose exec backend ruby bin/rails db:create db:migrate RAILS_ENV=test

# Очистить кэш
docker compose exec frontend npm run clear-cache

# Перезапустить контейнеры тестов
docker compose restart backend frontend

# Полный ресет окружения
docker compose down -v && docker compose up -d postgres backend
```

## Next Steps

1. Прочитать документацию:
   - [Specification](spec.md)
   - [Data Model](data-model.md)
   - [Research](research.md)
   - [API Contracts](contracts/)

2. Запустить автотесты для проверки окружения

3. Начать разработку по плану из `tasks.md` (будут созданы командой `/speckit.tasks`)

4. Периодически обновлять seeds для новых тестовых сценариев

## References

- [Constitution](../../.specify/memory/constitution.md)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Rails Guides](https://guides.rubyonrails.org/)
- [React Documentation](https://react.dev/)
- [Playwright Documentation](https://playwright.dev/)

## Support

При проблемах проверьте:
1. Логи контейнеров
2. `.env` конфигурацию
3. Порты не заняты другими приложениями
4. Docker daemon запущен

