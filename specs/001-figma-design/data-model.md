# Data Model: Интеграция дизайна Figma

**Feature**: Интеграция дизайна Figma  
**Phase**: Phase 1 - Design & Contracts  
**Date**: 2025-01-27

## Обзор

Это frontend-only фича, которая не изменяет структуру данных на backend. Данные приходят из существующего REST API. Данный документ описывает структуру компонентов и их props, а также TypeScript типы для визуальных элементов.

## Компоненты и их структура

### 1. Sidebar (Боковое меню навигации)

**Компонент**: `Sidebar`  
**Файл**: `frontend/src/components/Sidebar/Sidebar.tsx`

**Props**:
```typescript
interface SidebarProps {
  activeRoute?: string; // Текущий активный маршрут
  onNavigate?: (route: string) => void; // Callback для навигации
}
```

**Состояние**:
- `isCollapsed?: boolean` - свернуто ли меню (для мобильных устройств)
- `isExpanded?: boolean` - развернуто ли меню (для десктопа)

**Элементы**:
- Логотип Sonaka (анимированный)
- Список пунктов меню:
  - Главная страница (Dashboard)
  - Мои заказы (Orders)
  - Детали заказа (Order Details) - если есть активный заказ
- Визуальное выделение активного пункта

**Стили**:
- Glass-morphism эффект для фона
- Анимация появления (fade-in, slide-in)
- Hover-эффекты для пунктов меню
- Градиентный акцент для активного пункта

---

### 2. Card (Базовые карточки с glass-morphism)

**Компонент**: `Card`  
**Файл**: `frontend/src/components/Card/Card.tsx`

**Props**:
```typescript
interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'glass' | 'gradient';
  hoverable?: boolean;
  onClick?: () => void;
}
```

**Состояние**: Нет внутреннего состояния (контролируемый компонент)

**Стили**:
- `variant='glass'`: Glass-morphism эффект (по умолчанию)
- `variant='gradient'`: Градиентный фон
- `hoverable={true}`: Hover-эффект с усилением тени

---

### 3. GradientTitle (Градиентные заголовки)

**Компонент**: `GradientTitle`  
**Файл**: `frontend/src/components/GradientTitle/GradientTitle.tsx`

**Props**:
```typescript
interface GradientTitleProps {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6; // HTML heading level
  variant?: 'primary' | 'secondary';
  className?: string;
}
```

**Стили**:
- Градиент от `#06b6d4` к `#22d3ee` (primary)
- Анимация появления (fade-in, slide-up)

---

### 4. OrderCard (Карточка заказа)

**Компонент**: `OrderCard`  
**Файл**: `frontend/src/components/Dashboard/OrderCard.tsx` (обновление существующего)

**Props**:
```typescript
interface OrderCardProps {
  order: {
    id: string;
    status: 'pending' | 'processing' | 'completed' | 'cancelled';
    total: number;
    date: string;
    items_count: number;
  };
  onClick?: () => void;
}
```

**Состояние**: Нет внутреннего состояния

**Визуальные элементы**:
- Иконка статуса (цветовая индикация)
- Градиентный заголовок с номером заказа
- Информация о заказе (дата, сумма, количество товаров)
- Кнопка "Подробнее" (hover-эффект)
- Glass-morphism эффект для карточки

**Статусы заказов**:
- `pending`: Бирюзовый (#06b6d4)
- `processing`: Голубой (#22d3ee)
- `completed`: Зелёный (#10b981)
- `cancelled`: Серый (#6b7280)

---

### 5. StatCard (Карточка статистики)

**Компонент**: `StatCard`  
**Файл**: `frontend/src/components/Dashboard/StatCard.tsx` (новый компонент)

**Props**:
```typescript
interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'gradient';
}
```

**Состояние**: Нет внутреннего состояния

**Визуальные элементы**:
- Иконка (опционально)
- Градиентное число (value)
- Заголовок (title)
- Описание (description, опционально)
- Анимация появления (fade-in, slide-up)

---

### 6. ProductItem (Элемент списка товаров)

**Компонент**: `ProductItem`  
**Файл**: `frontend/src/components/Dashboard/ProductItem.tsx` (обновление существующего)

**Props**:
```typescript
interface ProductItemProps {
  product: {
    id: string;
    name: string;
    image_url?: string;
    quantity: number;
    last_purchased_date: string;
  };
}
```

**Состояние**: Нет внутреннего состояния

**Визуальные элементы**:
- Изображение товара (или placeholder с иконкой)
- Название товара
- Количество
- Дата последней покупки
- Hover-эффект

---

### 7. FloatingBackground (Анимированный фон)

**Компонент**: `FloatingBackground`  
**Файл**: `frontend/src/components/common/FloatingBackground.tsx` (новый компонент)

**Props**:
```typescript
interface FloatingBackgroundProps {
  variant?: 'default' | 'minimal';
  disabled?: boolean; // Для prefers-reduced-motion
}
```

**Состояние**: Нет внутреннего состояния

**Визуальные элементы**:
- Градиентные круги с эффектом плавания (float)
- Анимация через CSS keyframes
- Отключение при `prefers-reduced-motion`

---

## TypeScript типы

**Файл**: `frontend/src/types/theme.ts` (новый файл)

```typescript
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
```

---

## CSS переменные (Custom Properties)

**Файл**: `frontend/src/styles/theme.css` (новый файл)

```css
:root {
  /* Цвета */
  --color-primary: #06b6d4;
  --color-primary-light: #22d3ee;
  --color-primary-dark: #0ea5e9;
  
  /* Градиенты */
  --gradient-primary: linear-gradient(135deg, #06b6d4 0%, #22d3ee 100%);
  --gradient-secondary: linear-gradient(135deg, #22d3ee 0%, #0ea5e9 100%);
  
  /* Glass-morphism */
  --glass-bg: rgba(255, 255, 255, 0.1);
  --glass-border: rgba(255, 255, 255, 0.3);
  --glass-blur: 10px;
  
  /* Анимации */
  --transition-fast: 0.2s;
  --transition-normal: 0.3s;
  --transition-slow: 0.5s;
}
```

---

## Валидация и правила

### Визуальная валидация

1. **Glass-morphism**: Все карточки должны иметь эффект размытия фона
2. **Цветовая схема**: Все элементы должны использовать цвета из палитры
3. **Градиенты**: Заголовки должны использовать градиент primary или secondary
4. **Анимации**: Все переходы должны быть плавными (≤ 0.5 сек)
5. **Адаптивность**: Интерфейс должен работать на экранах от 320px

### Доступность

1. **prefers-reduced-motion**: Анимации должны уменьшаться или отключаться
2. **Контрастность**: Минимум 4.5:1 для текста
3. **Размер тач-таргетов**: Минимум 44x44px для интерактивных элементов
4. **ARIA-метки**: Для анимированных элементов, если необходимо

---

## Состояния компонентов

### Empty States (Пустые состояния)

**Компонент**: `EmptyState`  
**Файл**: `frontend/src/components/common/EmptyState.tsx` (новый компонент)

**Props**:
```typescript
interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
}
```

**Использование**:
- Когда нет заказов
- Когда нет товаров
- При ошибке загрузки данных

---

### Loading States (Состояния загрузки)

**Компонент**: `LoadingSpinner` (уже существует, требует обновления стилей)

**Обновления**:
- Применить бирюзовые цвета к спиннеру
- Добавить glass-morphism эффект к контейнеру загрузки

---

## Взаимосвязи компонентов

```
DashboardPage
├── Sidebar (новый)
├── FloatingBackground (новый)
├── StatCard[] (новый)
│   └── Card (базовый, новый)
├── OrderCard[] (обновление)
│   └── Card (базовый, новый)
│   └── GradientTitle (новый)
└── ProductItem[] (обновление)
    └── Card (базовый, новый)
```

---

## Локализация

Все строки UI должны быть в локализационных файлах:

**Файл**: `frontend/src/locales/ru/translation.json` (расширение)

```json
{
  "sidebar": {
    "dashboard": "Главная",
    "orders": "Мои заказы"
  },
  "orders": {
    "status": {
      "pending": "Ожидается",
      "processing": "В обработке",
      "completed": "Завершён",
      "cancelled": "Отменён"
    },
    "details": "Подробнее",
    "empty": "У вас пока нет заказов"
  },
  "stats": {
    "total_orders": "Всего заказов",
    "total_amount": "Общая сумма"
  }
}
```

