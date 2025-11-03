# Quick Start: Интеграция дизайна Figma

**Feature**: Интеграция дизайна Figma  
**Phase**: Phase 1 - Design & Contracts  
**Date**: 2025-01-27

## Обзор

Этот документ описывает быстрый старт для разработчиков, работающих над интеграцией дизайн-системы из Figma во frontend приложение личного кабинета Sonaka.

## Предварительные требования

- Docker и Docker Compose установлены
- Node.js 18+ (в контейнере)
- Доступ к репозиторию проекта
- Доступ к каталогу Figma (директория `figma/`)

## Запуск проекта

### 1. Клонирование и настройка

```bash
# Клонировать репозиторий (если еще не клонирован)
git clone <repository-url>
cd sonaka

# Создать .env файл (если еще не создан)
cp .env.example .env

# Убедиться, что порты настроены (> 10000)
# FRONTEND_PORT=10002
# BACKEND_PORT=10001
# POSTGRES_PORT=10003
```

### 2. Запуск через Docker Compose

```bash
# Запустить все сервисы
docker-compose up -d

# Проверить статус
docker-compose ps

# Просмотр логов
docker-compose logs -f frontend
```

### 3. Доступ к приложению

- **Frontend**: http://localhost:10002
- **Backend API**: http://localhost:10001/api/v1

## Структура проекта

### Frontend

```
frontend/
├── src/
│   ├── components/          # React компоненты
│   │   ├── Sidebar/         # НОВЫЙ: Боковое меню
│   │   ├── Card/            # НОВЫЙ: Базовые карточки
│   │   └── GradientTitle/   # НОВЫЙ: Градиентные заголовки
│   ├── styles/              # НОВЫЙ: Глобальные стили
│   │   ├── theme.css        # CSS переменные и тема
│   │   ├── animations.css   # Keyframes для анимаций
│   │   └── glass-morphism.css # Glass-morphism стили
│   ├── types/               # TypeScript типы
│   └── services/            # API сервисы
└── tests/                   # Тесты
```

## Разработка

### Добавление нового компонента

1. **Создать компонент**:
```bash
cd frontend/src/components
mkdir -p NewComponent
touch NewComponent/NewComponent.tsx
touch NewComponent/NewComponent.module.css
```

2. **Использовать базовые стили**:
```typescript
import styles from './NewComponent.module.css';
import { Card } from '../Card/Card';

export function NewComponent() {
  return (
    <Card variant="glass" hoverable>
      {/* Содержимое */}
    </Card>
  );
}
```

3. **Использовать CSS переменные**:
```css
/* NewComponent.module.css */
.container {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
  color: var(--color-primary);
}
```

### Применение glass-morphism

```css
.glass-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}
```

### Использование градиентов

```css
.gradient-title {
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

### Добавление анимаций

```css
/* В animations.css */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Использование */
.animated-element {
  animation: fadeInUp 0.5s ease-out;
}

/* Поддержка prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  .animated-element {
    animation: none;
  }
}
```

### Локализация

1. **Добавить строки в локализацию**:
```json
// frontend/src/locales/ru/translation.json
{
  "new_component": {
    "title": "Заголовок",
    "description": "Описание"
  }
}
```

2. **Использовать в компоненте**:
```typescript
import { useTranslation } from 'react-i18next';

export function NewComponent() {
  const { t } = useTranslation();
  return <h1>{t('new_component.title')}</h1>;
}
```

## Тестирование

### Запуск тестов

```bash
# Запустить все тесты
docker-compose exec frontend npm test

# Запустить E2E тесты
docker-compose run --rm e2e npm run test:e2e

# Запустить тесты в watch режиме
docker-compose exec frontend npm test -- --watch
```

### Написание тестов

```typescript
// NewComponent.test.tsx
import { render, screen } from '@testing-library/react';
import { NewComponent } from './NewComponent';

describe('NewComponent', () => {
  it('should render with glass-morphism class', () => {
    render(<NewComponent />);
    const element = screen.getByTestId('new-component');
    expect(element).toHaveClass('glass-card');
  });
});
```

## Стилизация

### Цветовая палитра

Используйте CSS переменные:
- `--color-primary`: `#06b6d4` (бирюзовый)
- `--color-primary-light`: `#22d3ee` (светло-бирюзовый)
- `--color-primary-dark`: `#0ea5e9` (голубой)

### Градиенты

- `--gradient-primary`: градиент от бирюзового к голубому
- `--gradient-secondary`: градиент от светло-бирюзового к голубому

### Анимации

- `--transition-fast`: 0.2s
- `--transition-normal`: 0.3s
- `--transition-slow`: 0.5s

## Проверка дизайна

### Визуальная проверка

1. Открыть приложение в браузере: http://localhost:10002
2. Проверить соответствие дизайну из Figma:
   - Цветовая схема
   - Glass-morphism эффекты
   - Градиентные заголовки
   - Анимации
   - Адаптивность (мобильные устройства)

### Проверка доступности

1. Открыть DevTools (F12)
2. Проверить контрастность цветов (минимум 4.5:1)
3. Проверить работу с клавиатурой (Tab, Enter, Escape)
4. Проверить поддержку `prefers-reduced-motion`:
   - Chrome DevTools → Rendering → Emulate CSS media feature → prefers-reduced-motion: reduce

## Отладка

### Логи frontend

```bash
docker-compose logs -f frontend
```

### Hot Reload

Vite автоматически перезагружает страницу при изменении файлов. Убедитесь, что:
- Файлы сохранены
- Docker контейнер запущен
- Порт 10002 открыт

### Проблемы с CSS

1. Проверить, что CSS файлы импортированы в компонентах
2. Проверить, что CSS переменные определены в `theme.css`
3. Проверить, что глобальные стили импортированы в `main.tsx`

## Следующие шаги

1. Изучить [data-model.md](data-model.md) для понимания структуры компонентов
2. Изучить [contracts/api-contracts.md](contracts/api-contracts.md) для понимания API
3. Изучить [research.md](research.md) для понимания технических решений
4. Начать реализацию компонентов согласно плану

## Полезные ссылки

- [Документация React](https://react.dev/)
- [Документация CSS Modules](https://github.com/css-modules/css-modules)
- [Документация CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [Документация backdrop-filter](https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

