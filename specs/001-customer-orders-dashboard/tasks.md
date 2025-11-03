# Tasks: Личный кабинет покупателя — дашборд заказов

Feature: 001-customer-orders-dashboard

## Фазы

- Phase 1: Setup (инициализация проекта и окружения)
- Phase 2: Foundational (блокирующие основы для всех историй)
- Phase 3: User Story 1 — Дашборд заказов (P1)
- Phase 4: User Story 2 — Ранее купленные товары (P2)
- Phase 5: User Story 3 — Детали заказа (P3)
- Phase 6: Polish & Cross-Cutting

## Зависимости (истории)

US1 → US2 → US3

## Примеры параллельного выполнения

- Backend контейнеризация [P] параллельно с Frontend контейнеризацией [P]
- Создание Rails моделей [P] параллельно с настройкой React сервисов API [P]
- UI компоненты списка заказов [P] параллельно с UI агрегатов дашборда [P]

## Критерии независимого тестирования по историям

- US1: Открытие дашборда под тестовым пользователем показывает список релевантных заказов и правильную «Общую сумму заказанного» согласно правилам статусов и мультивалютности; пустое состояние корректно.
- US2: Список «ранее купленных» отображает агрегированные количества по товарам, варианты/SKU свёрнуты; пустое состояние корректно.
- US3: Детали заказа показывают позиции с изображением/плейсхолдером, названием, количеством, ценами на момент покупки и корректные итоги; валюта заказа соблюдена.

## Implementation Strategy

- MVP: Реализовать полностью US1 (Backend + Frontend) с автотестами и контейнерами.
- Далее инкрементально: US2, затем US3. Запускать селективные тесты по изменённым частям.

---

## Phase 1: Setup

- [X] T001 Создать `.env` с параметрами портов и БД в `/home/ubuntu/sonaka/.env`
- [X] T002 [P] Добавить `docker-compose.yml` со службами backend(10001), frontend(10002), postgres(10003) в `/home/ubuntu/sonaka/docker-compose.yml`
- [X] T003 [P] Создать `backend/Dockerfile` для Rails API в `/home/ubuntu/sonaka/backend/Dockerfile`
- [X] T004 [P] Создать `frontend/Dockerfile` для React SPA в `/home/ubuntu/sonaka/frontend/Dockerfile`
- [X] T005 Конфигурировать README раздел «Запуск» в `/home/ubuntu/sonaka/README.md`

## Phase 2: Foundational

- [X] T006 Настроить Rails API каркас (routes, версии API) в `/home/ubuntu/sonaka/backend/config/routes.rb`
- [X] T007 Настроить подключение к PostgreSQL в `/home/ubuntu/sonaka/backend/config/database.yml`
- [X] T008 [P] Определить миграции сущностей Customer, Product в `/home/ubuntu/sonaka/backend/db/migrations/`
- [X] T009 [P] Определить миграции сущностей Order, OrderItem (индексы для SC-001/002) в `/home/ubuntu/sonaka/backend/db/migrations/`
- [X] T010 Добавить сиды тестовых данных в `/home/ubuntu/sonaka/backend/db/seeds.rb`
- [X] T011 Настроить фронтенд проект (React + TS) в `/home/ubuntu/sonaka/frontend/package.json`
- [X] T012 [P] Создать общий API слой и базовый клиент в `/home/ubuntu/sonaka/frontend/src/services/api.ts`
- [X] T013 [P] Настроить локализацию RU в `/home/ubuntu/sonaka/frontend/src/i18n.ts`
- [X] T014 Подготовить общие UI-компоненты (EmptyState, LoadingSpinner) в `/home/ubuntu/sonaka/frontend/src/components/common/`

## Phase 3: User Story 1 — Дашборд заказов (P1)

- [X] T015 [US1] Добавить модели и валидации `Order`, `OrderItem` в `/home/ubuntu/sonaka/backend/app/models/`
- [X] T016 [P] [US1] Реализовать сервис `DashboardTotalsCalculator` с фильтрами статусов, исключением частичных возвратов и конвертацией валют в `/home/ubuntu/sonaka/backend/app/services/dashboard_totals_calculator.rb`
- [X] T017 [P] [US1] Реализовать сериалайзеры `OrderSerializer`, `DashboardSerializer` в `/home/ubuntu/sonaka/backend/app/serializers/`
- [X] T018 [US1] Создать контроллер `api/v1/dashboard_controller.rb` c GET `/dashboard` в `/home/ubuntu/sonaka/backend/app/controllers/api/v1/dashboard_controller.rb`
- [X] T019 [P] [US1] Обновить `routes.rb` для маршрута `/api/v1/dashboard` в `/home/ubuntu/sonaka/backend/config/routes.rb`
- [X] T020 [US1] Добавить запросы на стороне фронтенда `dashboardService.getDashboard()` в `/home/ubuntu/sonaka/frontend/src/services/dashboardService.ts`
- [X] T021 [P] [US1] Создать типы `Dashboard`, `OrderSummary` в `/home/ubuntu/sonaka/frontend/src/types/`
- [X] T022 [P] [US1] Реализовать компоненты `DashboardTotals` и `OrdersList` в `/home/ubuntu/sonaka/frontend/src/components/Dashboard/`
- [X] T023 [US1] Создать страницу `DashboardPage.tsx` и маршрутизацию в `/home/ubuntu/sonaka/frontend/src/pages/DashboardPage.tsx`
- [X] T024 [US1] Добавить бесконечную ленту `useInfiniteScroll` в `/home/ubuntu/sonaka/frontend/src/hooks/useInfiniteScroll.ts`
- [X] T025 [US1] Интегрировать RU-локализацию строк дашборда в `/home/ubuntu/sonaka/frontend/src/locales/ru/dashboard.json`
 - [X] T049 [US1] Реализовать банковское округление (half‑to‑even) в `DashboardTotalsCalculator` и сериалайзерах
 - [X] T050 [US1] Написать unit‑тесты на округление (краевые кейсы .5) в `spec/services/dashboard_totals_calculator_spec.rb`
 - [X] T051 [US1] Unit‑тесты на точность сумм и конвертацию валют в `spec/services/dashboard_totals_calculator_spec.rb`
 - [X] T052 [US1] Контрактные тесты `/dashboard` в `spec/requests/api/v1/dashboard_spec.rb` (мультивалюта, статусы, возвраты)

## Phase 4: User Story 2 — Ранее купленные товары (P2)

- [ ] T026 [US2] Добавить агрегацию ранее купленных в сервисе (SQL GROUP BY product_id) в `/home/ubuntu/sonaka/backend/app/services/dashboard_totals_calculator.rb`
- [ ] T027 [P] [US2] Расширить сериалайзер `DashboardSerializer` полем `previously_purchased_items` в `/home/ubuntu/sonaka/backend/app/serializers/dashboard_serializer.rb`
- [ ] T028 [US2] Обновить endpoint `/dashboard` для возврата агрегата покупок в `/home/ubuntu/sonaka/backend/app/controllers/api/v1/dashboard_controller.rb`
- [ ] T029 [US2] Реализовать `dashboardService.getPreviouslyPurchased()` или использовать данные из `/dashboard` в `/home/ubuntu/sonaka/frontend/src/services/dashboardService.ts`
- [ ] T030 [P] [US2] Создать компонент `PreviouslyPurchasedList` в `/home/ubuntu/sonaka/frontend/src/components/Dashboard/PreviouslyPurchasedList.tsx`
- [ ] T031 [US2] Добавить RU-локализацию строк ранее купленных в `/home/ubuntu/sonaka/frontend/src/locales/ru/previouslyPurchased.json`

## Phase 5: User Story 3 — Детали заказа (P3)

- [ ] T032 [US3] Реализовать контроллер `orders_controller.rb` c GET `/orders/{order_id}` в `/home/ubuntu/sonaka/backend/app/controllers/api/v1/orders_controller.rb`
- [ ] T033 [P] [US3] Добавить сериалайзер `OrderItemSerializer` и расширения `OrderSerializer` в `/home/ubuntu/sonaka/backend/app/serializers/`
- [ ] T034 [US3] Обновить `routes.rb` для маршрута `/api/v1/orders/:order_id` в `/home/ubuntu/sonaka/backend/config/routes.rb`
- [ ] T035 [P] [US3] Реализовать `ordersService.getOrderDetails(orderId)` в `/home/ubuntu/sonaka/frontend/src/services/ordersService.ts`
- [ ] T036 [P] [US3] Создать компоненты `OrderDetailsView` и `OrderItemCard` в `/home/ubuntu/sonaka/frontend/src/components/OrderDetails/`
- [ ] T037 [US3] Создать страницу `OrderDetailsPage.tsx` и роут из списка заказов в `/home/ubuntu/sonaka/frontend/src/pages/OrderDetailsPage.tsx`
- [ ] T038 [US3] Добавить RU-локализацию строк деталей заказа в `/home/ubuntu/sonaka/frontend/src/locales/ru/orderDetails.json`

## Phase 6: Polish & Cross-Cutting

- [ ] T039 Добавить индексы БД по производительности (customer_id, status, order_date, has_partial_refund) в `/home/ubuntu/sonaka/backend/db/migrations/`
- [ ] T040 [P] Включить обработку ошибок и сообщения на русском в `/home/ubuntu/sonaka/backend/app/controllers/application_controller.rb`
- [ ] T041 [P] Доработать доступность и стили (glass-morphism, prefers-reduced-motion) в `/home/ubuntu/sonaka/frontend/src/`
- [ ] T042 Настроить выборочный запуск автотестов (RSpec, Jest) в `/home/ubuntu/sonaka/.github/workflows/ci.yml`
 - [ ] T043 [P] Добавить Docker‑сервис e2e (Playwright) в `/home/ubuntu/sonaka/docker-compose.yml`
 - [ ] T044 [P] Инициализировать Playwright: конфиг, базовые spec'и в `/home/ubuntu/sonaka/frontend/tests/e2e/`
 - [ ] T045 Настроить скрипты запуска e2e (headless) в `/home/ubuntu/sonaka/frontend/package.json`
 - [ ] T046 Включить e2e‑джобу в CI `/home/ubuntu/sonaka/.github/workflows/ci.yml` (отдельный job)
 - [ ] T047 Подготовить фикстуры/сиды для e2e и команды запуска в README
 - [ ] T048 Добавить шаг загрузки сидов в CI (`rails db:prepare && rails db:seed`) перед unit/integration/e2e
 - [ ] T053 Сгенерировать большие тест‑данные (1M заказов) через сиды/фабрики для перф‑замеров
 - [ ] T054 Добавить перф‑тесты (профилирование и p95 latency) на `/dashboard` в CI (отдельный job)
 - [ ] T055 Зафиксировать бюджет перфоманса и фейки данных в `quickstart.md`

---

## Dependencies

1. Завершить Phase 1 и Phase 2 до начала US1-US3
2. US1 завершить перед US2
3. US2 завершить перед US3

---

## Формат валидации

Все задачи соответствуют формату чеклиста: `- [ ] T### [P?] [US?] Описание с путём файла`.


