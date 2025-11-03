# Research: Интеграция дизайна Figma

**Feature**: Интеграция дизайна Figma  
**Phase**: Phase 0 - Outline & Research  
**Date**: 2025-01-27

## Research Tasks

### 1. Выбор подхода к стилизации в React

**Research Question**: Какой подход к стилизации использовать для применения дизайн-системы из Figma: CSS-in-JS, CSS Modules, или обычный CSS?

**Decision**: CSS Modules + CSS переменные (custom properties)

**Rationale**:
- CSS Modules обеспечивают изоляцию стилей и простоту поддержки
- CSS переменные (custom properties) позволяют легко управлять цветовой палитрой и темой
- Нет необходимости в дополнительных зависимостях (styled-components, emotion)
- Простота тестирования и отладки
- Хорошая производительность (нет runtime overhead)
- Поддержка Vite из коробки

**Alternatives Considered**:
- **styled-components / emotion**: Отклонено из-за runtime overhead и дополнительных зависимостей
- **Tailwind CSS**: Отклонено из-за необходимости полной перестройки существующих компонентов
- **Inline styles**: Отклонено из-за сложности поддержки и невозможности использовать псевдоклассы

**Implementation Notes**:
- Использовать CSS Modules для компонентов (`.module.css`)
- Глобальные стили (theme, animations) в обычных `.css` файлах
- CSS переменные для цветовой палитры и градиентов
- Импорт глобальных стилей в `main.tsx`

---

### 2. Выбор библиотеки анимаций

**Research Question**: Какую библиотеку использовать для анимаций: framer-motion, react-spring, или нативные CSS animations?

**Decision**: CSS animations (keyframes) + CSS transitions с поддержкой prefers-reduced-motion

**Rationale**:
- Производительность: CSS animations выполняются на GPU, нет JavaScript overhead
- Простота: Не требует дополнительных зависимостей
- Доступность: Легко добавить поддержку `prefers-reduced-motion` через media queries
- Размер бандла: Нет дополнительных зависимостей
- Достаточно для задач: fade-in, slide-up, float эффекты реализуемы через CSS

**Alternatives Considered**:
- **framer-motion**: Отклонено из-за размера бандла (~50KB gzipped) и избыточности для простых анимаций
- **react-spring**: Отклонено из-за сложности API для простых анимаций и размера бандла
- **React Transition Group**: Отклонено из-за необходимости дополнительной логики для простых случаев

**Implementation Notes**:
- Keyframes для fade-in, slide-up, float в `animations.css`
- CSS transitions для hover-эффектов
- Использовать `@media (prefers-reduced-motion: reduce)` для уменьшения анимаций
- Для сложных анимаций (например, анимированный логотип) можно использовать `requestAnimationFrame` или рассмотреть framer-motion в будущем

---

### 3. Подход к тестированию визуальных эффектов

**Research Question**: Как тестировать визуальные эффекты (glass-morphism, градиенты, анимации) для обеспечения качества?

**Decision**: Комбинация компонентных тестов (React Testing Library) + E2E тестов (Playwright) + визуальная проверка

**Rationale**:
- **Компонентные тесты**: Проверка наличия правильных CSS классов и атрибутов
- **E2E тесты**: Проверка функциональности и базовой визуализации
- **Визуальная проверка**: Ручная проверка соответствия дизайну Figma (snapshot testing слишком хрупкий для визуальных эффектов)

**Alternatives Considered**:
- **Visual Regression Testing (Chromatic, Percy)**: Отклонено из-за сложности настройки и необходимости дополнительных сервисов
- **Snapshot testing**: Отклонено из-за хрупкости и неспособности проверить реальный визуальный вид
- **CSS unit tests**: Отклонено из-за избыточности (CSS проверяется через компонентные тесты)

**Implementation Notes**:
- Тестировать наличие CSS классов и data-атрибутов через React Testing Library
- Проверять применение CSS переменных через computed styles (если необходимо)
- E2E тесты для проверки видимости элементов и базовой функциональности
- Документировать требования к визуальной проверке в тестах
- Для критических компонентов (Sidebar, карточки) добавить комментарии в тесты о необходимости визуальной проверки

---

### 4. Реализация glass-morphism эффектов

**Research Question**: Как реализовать glass-morphism эффекты (полупрозрачность с размытием фона) с поддержкой браузеров?

**Decision**: CSS `backdrop-filter: blur()` с fallback для старых браузеров

**Rationale**:
- Современные браузеры поддерживают `backdrop-filter` (Chrome 76+, Firefox 103+, Safari 9+)
- Fallback через полупрозрачный фон для браузеров без поддержки
- Простая реализация через CSS классы

**Implementation Notes**:
- Использовать `backdrop-filter: blur(10px)` для размытия
- `background: rgba(255, 255, 255, 0.1)` для полупрозрачности
- `@supports (backdrop-filter: blur())` для проверки поддержки
- Fallback: более непрозрачный фон для браузеров без поддержки
- Добавить базовые классы в `glass-morphism.css`

**Code Example**:
```css
.glass-card {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

@supports not (backdrop-filter: blur()) {
  .glass-card {
    background: rgba(255, 255, 255, 0.8);
  }
}
```

---

### 5. Организация цветовой палитры и градиентов

**Research Question**: Как организовать цветовую палитру и градиенты для единообразного использования?

**Decision**: CSS переменные (custom properties) в глобальном файле `theme.ts` или `theme.css`

**Rationale**:
- Легко изменять цвета в одном месте
- Поддержка темной темы в будущем
- Простота использования в CSS и TypeScript
- Нет необходимости в дополнительных библиотеках

**Implementation Notes**:
- Определить цвета в CSS переменных: `--color-primary`, `--color-primary-light`, `--color-primary-dark`
- Градиенты через CSS переменные: `--gradient-primary`
- TypeScript типы для цветов (опционально) для автодополнения
- Использовать в компонентах через CSS переменные

**Color Palette** (из спецификации):
- Primary: `#06b6d4` (cyan-500)
- Primary Light: `#22d3ee` (cyan-400)
- Primary Dark: `#0ea5e9` (sky-500)

---

### 6. Поддержка доступности (a11y)

**Research Question**: Как обеспечить доступность при добавлении анимаций и визуальных эффектов?

**Decision**: Использовать `prefers-reduced-motion` и соблюдать WCAG 2.1 Level AA

**Rationale**:
- `prefers-reduced-motion` - стандартный способ поддержки пользователей с чувствительностью к движению
- WCAG 2.1 Level AA - стандарт доступности для веб-приложений

**Implementation Notes**:
- Добавить `@media (prefers-reduced-motion: reduce)` для отключения/упрощения анимаций
- Сохранить функциональность без анимаций
- Проверить контрастность цветов (минимум 4.5:1 для текста)
- Убедиться, что интерактивные элементы имеют достаточный размер для тач-интерфейсов
- Добавить ARIA-метки для анимированных элементов, если необходимо

---

## Summary of Decisions

1. **Стилизация**: CSS Modules + CSS переменные
2. **Анимации**: CSS animations/transitions (нативные)
3. **Тестирование**: Компонентные тесты + E2E + визуальная проверка
4. **Glass-morphism**: CSS `backdrop-filter` с fallback
5. **Цветовая палитра**: CSS переменные в глобальном файле
6. **Доступность**: `prefers-reduced-motion` + WCAG 2.1 AA

Все NEEDS CLARIFICATION из Technical Context разрешены.

