<!--
Sync Impact Report
 - Version change: 1.0.0 → 1.1.0
- Modified principles: Template placeholders → конкретные принципы проекта
- Added sections: "Технологический стек и архитектура", "Рабочий процесс и контроль качества"
- Removed sections: none
- Templates requiring updates:
  ✅ .specify/templates/plan-template.md (раздел Constitution Check ссылается на конституцию)
  ✅ .specify/templates/spec-template.md (акцент на тестируемые пользовательские сценарии)
  ✅ .specify/templates/tasks-template.md (структура фаз и тестов согласуется)
  ✅ .specify/templates/agent-file-template.md (общие гайды; изменений не требуется)
  ✅ .specify/templates/checklist-template.md (общая форма; изменений не требуется)
  ⚠ Pending: plan-template.md ссылается на отсутствующий путь `.specify/templates/commands/plan.md` — требуется либо обновить ссылку, либо добавить файл команд.
- Follow-up TODOs:
  - TODO(RATIFICATION_DATE): Уточнить дату первоначального принятия конституции.
-->

# Sonaka Constitution

## Core Principles

### Контейнер‑первая архитектура (Docker‑Compose)
Все приложения и инфраструктурные зависимости MUST быть упакованы в Docker и
запускаться через docker-compose, разделяя функциональность по сервисам.
Сервисные порты MUST быть > 10000. Конфигурация MUST храниться в `.env` и
использоваться в `docker-compose.yml`.

Rationale: Предсказуемость окружений, воспроизводимость сборок, простота CI/CD.

### Автоматизированное тестирование как обязательство
Проект MUST содержать автотесты для backend, frontend и пользовательского
интерфейса (E2E/UI). При изменениях кода SHOULD запускаться релевантный набор
тестов. Тестовые данные MUST поставляться отдельно и загружаться в БД для
быстрого старта разработчиков и CI.

Rationale: Снижение регрессий, ускорение интеграций, прозрачные приемочные
критерии.

### Язык интерфейса — русский
Веб‑интерфейс MUST быть локализован на русском языке по умолчанию. Строки MUST
быть вынесены в ресурсы локализации; отсутствующие ключи считаются дефектом.

Rationale: Соответствие целевой аудитории и контентной стратегии.

### Бэкенд: Ruby on Rails + PostgreSQL
Серверная часть MUST быть реализована на Ruby on Rails с БД PostgreSQL. Все
изменения схемы MUST оформляться миграциями. Для разработки и тестов MUST быть
доступен набор сидов/фикстур и команда(ы) для их загрузки.

API‑контракт: Бэкенд MUST предоставлять только REST API (без серверного HTML).
Формат ответов MUST быть стабильным JSON; версии API SHOULD быть обозначены в
пути (/v1/...) или заголовках.

Rationale: Быстрая разработка, зрелая экосистема, надежное хранение данных.

### Фронтенд: React с фирменным UI
Фронтенд MUST быть реализован на React, использовать фирменный стиль (мягкие
светло‑зелёные цвета, трендовые анимации, glass‑morphism), при этом соблюдая
веб‑доступность и производительность. Анимации SHOULD не ухудшать UX на слабых
устройствах; необходимо предусмотреть предпочитаемое уменьшение движения.

Архитектура клиента: Фронтенд MUST быть одностраничным приложением (SPA),
которое потребляет REST API бэкенда; сетевые вызовы SHOULD быть инкапсулированы
в сервисном слое с централизованной обработкой ошибок и авторизации.

Rationale: Единый бренд‑опыт и современный UX без компромиссов к доступности.

## Технологический стек и архитектура

- Стек: Docker, Ruby on Rails (backend), React (frontend), PostgreSQL (database).
- Сервисы разделены по ответственности и описаны в `docker-compose.yml`.
- Порты сервисов > 10000; конфигурация через `.env`.
 - Взаимодействие фронтенд↔бэкенд: REST API (JSON), версионированные эндпоинты.
- CI/CD должен:
  - собирать и публиковать образы;
  - поднимать окружение для тестов (включая загрузку тест‑данных в БД);
  - выполнять юнит/интеграционные/Е2Е‑тесты выборочно по измененным областям.

## Рабочий процесс и контроль качества

- Все PR MUST проходить проверку соответствия принципам этой конституции.
- Перед мержем MUST проходить линтеры и тесты; для UI‑изменений — E2E/UI‑тесты.
- Для данных MUST быть предоставлены сиды/фикстуры и команды загрузки.
- Локализация MUST покрывать новые UI‑строки; отсутствия ключей не допускаются.

## Governance

- Конституция имеет приоритет над частными практиками в репозитории.
- Поправки вносятся через PR с описанием изменений, миграционным планом и
  оценкой влияния на шаблоны `.specify/templates/*`.
- Версионирование: semver
  - MAJOR — несовместимые изменения принципов/разделов.
  - MINOR — добавление новых принципов/разделов или существенное расширение.
  - PATCH — уточнения формулировок без изменения смысла.
- Compliance‑review: каждый PR MUST включать явную отметку о прохождении
  Constitution Check в планах/спецификациях.

**Version**: 1.1.0 | **Ratified**: TODO(RATIFICATION_DATE) | **Last Amended**: 2025-11-03
# [PROJECT_NAME] Constitution
<!-- Example: Spec Constitution, TaskFlow Constitution, etc. -->

## Core Principles

### [PRINCIPLE_1_NAME]
<!-- Example: I. Library-First -->
[PRINCIPLE_1_DESCRIPTION]
<!-- Example: Every feature starts as a standalone library; Libraries must be self-contained, independently testable, documented; Clear purpose required - no organizational-only libraries -->

### [PRINCIPLE_2_NAME]
<!-- Example: II. CLI Interface -->
[PRINCIPLE_2_DESCRIPTION]
<!-- Example: Every library exposes functionality via CLI; Text in/out protocol: stdin/args → stdout, errors → stderr; Support JSON + human-readable formats -->

### [PRINCIPLE_3_NAME]
<!-- Example: III. Test-First (NON-NEGOTIABLE) -->
[PRINCIPLE_3_DESCRIPTION]
<!-- Example: TDD mandatory: Tests written → User approved → Tests fail → Then implement; Red-Green-Refactor cycle strictly enforced -->

### [PRINCIPLE_4_NAME]
<!-- Example: IV. Integration Testing -->
[PRINCIPLE_4_DESCRIPTION]
<!-- Example: Focus areas requiring integration tests: New library contract tests, Contract changes, Inter-service communication, Shared schemas -->

### [PRINCIPLE_5_NAME]
<!-- Example: V. Observability, VI. Versioning & Breaking Changes, VII. Simplicity -->
[PRINCIPLE_5_DESCRIPTION]
<!-- Example: Text I/O ensures debuggability; Structured logging required; Or: MAJOR.MINOR.BUILD format; Or: Start simple, YAGNI principles -->

## [SECTION_2_NAME]
<!-- Example: Additional Constraints, Security Requirements, Performance Standards, etc. -->

[SECTION_2_CONTENT]
<!-- Example: Technology stack requirements, compliance standards, deployment policies, etc. -->

## [SECTION_3_NAME]
<!-- Example: Development Workflow, Review Process, Quality Gates, etc. -->

[SECTION_3_CONTENT]
<!-- Example: Code review requirements, testing gates, deployment approval process, etc. -->

## Governance
<!-- Example: Constitution supersedes all other practices; Amendments require documentation, approval, migration plan -->

[GOVERNANCE_RULES]
<!-- Example: All PRs/reviews must verify compliance; Complexity must be justified; Use [GUIDANCE_FILE] for runtime development guidance -->

**Version**: [CONSTITUTION_VERSION] | **Ratified**: [RATIFICATION_DATE] | **Last Amended**: [LAST_AMENDED_DATE]
<!-- Example: Version: 2.1.1 | Ratified: 2025-06-13 | Last Amended: 2025-07-16 -->
