# Sonaka — Личный кабинет покупателя (Дашборд заказов)

## Быстрый старт

1) Подготовьте переменные окружения (создайте `.env` в корне):

```bash
# Пример значений (скопируйте в .env)
BACKEND_PORT=10001
FRONTEND_PORT=10002
POSTGRES_PORT=10003
POSTGRES_USER=sonaka
POSTGRES_PASSWORD=sonaka_dev_password
POSTGRES_DB=sonaka_dev
RAILS_ENV=development
VITE_API_BASE_URL=http://localhost:10001/api/v1
```

2) Запустите сервисы в Docker:

```bash
docker compose up -d --build
```

- Backend: http://localhost:10001
- Frontend (SPA): http://localhost:10002

## База данных и сиды

Подготовьте схему и загрузите сиды (из контейнера backend или локально в dev‑окружении):

```bash
# В контейнере backend
docker compose exec backend bash -lc "ruby bin/rails db:migrate && ruby bin/rails db:seed"
```

## Тесты

### Backend (RSpec)
```bash
# Полный запуск
docker compose exec backend bash -lc "RAILS_ENV=test bundle exec rspec"

# Выборочно (сервисы/запросы)
docker compose exec backend bash -lc "RAILS_ENV=test bundle exec rspec spec/services/"
docker compose exec backend bash -lc "RAILS_ENV=test bundle exec rspec spec/requests/"
```

### Frontend (Jest)
```bash
docker compose exec frontend bash -lc "npm test -- --watch=false"
```

### E2E (Playwright)
```bash
docker compose run --rm e2e
```

## Полезные команды

- Пересобрать контейнеры: `docker compose build --no-cache`
- Логи сервиса: `docker compose logs -f backend` (или `frontend`, `postgres`)
- Остановить всё: `docker compose down`
- Полный ресет окружения (очистка БД): `docker compose down -v && docker compose up -d postgres backend`

## API

- `GET /api/v1/dashboard` теперь, помимо `orders`, `totals` и `pagination`, возвращает `previously_purchased_items` со структурой:
  - `product_id`, `product_name`, `product_image_url`, `total_quantity`, `last_purchased_date`

## CI

В репозитории настроен GitHub Actions (`.github/workflows/ci.yml`) с джобами:
- `backend` — миграции/сиды и RSpec
- `frontend` — установка зависимостей и unit‑тесты
- `e2e` — подъём docker‑сервисов и запуск Playwright

## Архитектура

- Порты сервисов > 10000, конфигурация через `.env`
- Разделение сервисов: `backend`, `frontend`, `postgres`, `e2e`
- REST API (Rails) и SPA (React)
