---
description: "Task list for feature implementation: Интеграция дизайна Figma"
---

# Tasks: Интеграция дизайна Figma

**Input**: Design documents from `/specs/001-figma-design/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Тесты не включены в данный план, так как они не были явно запрошены в спецификации. При необходимости тесты можно добавить позже.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `frontend/src/`, `frontend/tests/`
- Все пути указаны относительно корня репозитория

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Create styles directory structure: frontend/src/styles/
- [X] T002 Create theme.css with CSS variables in frontend/src/styles/theme.css
- [X] T003 Create animations.css with keyframes in frontend/src/styles/animations.css
- [X] T004 Create glass-morphism.css with base styles in frontend/src/styles/glass-morphism.css
- [X] T005 Create TypeScript theme types in frontend/src/types/theme.ts
- [X] T006 Import global styles in frontend/src/main.tsx
- [X] T007 [P] Create component directories: frontend/src/components/Sidebar/, frontend/src/components/Card/, frontend/src/components/GradientTitle/

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T008 [P] Implement base Card component in frontend/src/components/Card/Card.tsx
- [X] T009 [P] Create Card.module.css with glass-morphism styles in frontend/src/components/Card/Card.module.css
- [X] T010 [P] Implement GradientTitle component in frontend/src/components/GradientTitle/GradientTitle.tsx
- [X] T011 [P] Create GradientTitle.module.css with gradient styles in frontend/src/components/GradientTitle/GradientTitle.module.css
- [X] T012 [P] Implement FloatingBackground component in frontend/src/components/common/FloatingBackground.tsx
- [X] T013 [P] Create FloatingBackground.module.css with float animations in frontend/src/components/common/FloatingBackground.module.css
- [X] T014 [P] Implement EmptyState component in frontend/src/components/common/EmptyState.tsx
- [X] T015 [P] Create EmptyState.module.css with styling in frontend/src/components/common/EmptyState.module.css
- [X] T016 Update LoadingSpinner component styles in frontend/src/components/common/LoadingSpinner.module.css (apply theme colors)
- [X] T017 [P] Add localization strings to frontend/src/i18n.ts (sidebar, orders, stats sections)

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Единообразный визуальный стиль интерфейса (Priority: P1) 🎯 MVP

**Goal**: Применить единообразный визуальный стиль с glass-morphism эффектами, бирюзовыми/голубыми оттенками и плавными анимациями ко всем элементам интерфейса

**Independent Test**: Открыть любой экран личного кабинета и убедиться, что применены фирменные цвета (#06b6d4, #22d3ee, #0ea5e9), glass-morphism эффекты и общий стиль соответствует дизайну из Figma

### Implementation for User Story 1

- [ ] T018 [US1] Apply theme CSS variables to global styles in frontend/src/styles/theme.css
- [ ] T019 [US1] Update DashboardPage component to use theme colors in frontend/src/pages/DashboardPage.tsx
- [ ] T020 [US1] Apply glass-morphism effects to all card containers in DashboardPage
- [ ] T021 [US1] Add FloatingBackground component to DashboardPage layout
- [ ] T022 [US1] Update all existing buttons to use theme colors in frontend/src/components/common/
- [ ] T023 [US1] Apply gradient effects to page headings using GradientTitle component
- [ ] T024 [US1] Ensure all transitions use CSS variables (--transition-fast, --transition-normal, --transition-slow)
- [ ] T025 [US1] Add prefers-reduced-motion support for all animations in frontend/src/styles/animations.css
- [ ] T026 [US1] Update color scheme for all interactive elements (links, buttons, hover states)
- [ ] T027 [US1] Apply glass-morphism to main content containers and wrappers

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently. All screens should use consistent visual style.

---

## Phase 4: User Story 2 - Навигация с боковым меню (Priority: P1)

**Goal**: Реализовать боковое меню (Sidebar) для навигации между разделами с визуальным выделением активного раздела и анимированным логотипом

**Independent Test**: Открыть личный кабинет и убедиться, что боковое меню отображается, показывает все разделы, и активный раздел визуально выделен

### Implementation for User Story 2

- [ ] T028 [P] [US2] Implement Sidebar component structure in frontend/src/components/Sidebar/Sidebar.tsx
- [ ] T029 [P] [US2] Create Sidebar.module.css with glass-morphism and navigation styles in frontend/src/components/Sidebar/Sidebar.module.css
- [ ] T030 [US2] Add animated logo to Sidebar component
- [ ] T031 [US2] Implement navigation menu items list in Sidebar (Dashboard, Orders, etc.)
- [ ] T032 [US2] Add active route detection and visual highlighting in Sidebar
- [ ] T033 [US2] Implement navigation callback handling in Sidebar
- [ ] T034 [US2] Add hover effects for menu items in Sidebar.module.css
- [ ] T035 [US2] Implement collapse/expand functionality for mobile devices in Sidebar
- [ ] T036 [US2] Add fade-in and slide-in animations for Sidebar appearance
- [ ] T037 [US2] Integrate Sidebar into DashboardPage layout in frontend/src/pages/DashboardPage.tsx
- [ ] T038 [US2] Update routing to work with Sidebar navigation in frontend/src/
- [ ] T039 [US2] Add responsive behavior for Sidebar on mobile devices (min 320px)

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently. Sidebar should be fully functional with navigation.

---

## Phase 5: User Story 3 - Улучшенное отображение заказов (Priority: P2)

**Goal**: Отображать список заказов в виде стильных карточек с иконками статусов, градиентными заголовками и информацией о заказах

**Independent Test**: Открыть раздел "Мои заказы" и убедиться, что заказы отображаются в карточках с правильными стилями, иконками статусов и градиентами

### Implementation for User Story 3

- [ ] T040 [P] [US3] Create OrderCard component in frontend/src/components/Dashboard/OrderCard.tsx (update existing)
- [ ] T041 [P] [US3] Create OrderCard.module.css with styling in frontend/src/components/Dashboard/OrderCard.module.css
- [ ] T042 [US3] Implement order status icon mapping in OrderCard component (pending, processing, completed, cancelled)
- [ ] T043 [US3] Add status color indicators using orderStatusColors from theme.ts
- [ ] T044 [US3] Apply GradientTitle to order number/title in OrderCard
- [ ] T045 [US3] Implement glass-morphism effect for OrderCard using Card component
- [ ] T046 [US3] Add order information display (date, total, items count) in OrderCard
- [ ] T047 [US3] Implement "Подробнее" button with hover effects in OrderCard
- [ ] T048 [US3] Add hover effect enhancement (shadow, transform) to OrderCard
- [ ] T049 [US3] Update OrdersList component to use new OrderCard in frontend/src/components/Dashboard/OrdersList.tsx
- [ ] T050 [US3] Add fade-in animation for OrderCard appearance in list
- [ ] T051 [US3] Handle empty orders state using EmptyState component
- [ ] T052 [US3] Update order status labels with localization in frontend/src/locales/ru/translation.json

**Checkpoint**: At this point, User Stories 1, 2, AND 3 should all work independently. Orders should be displayed with improved visual design.

---

## Phase 6: User Story 4 - Визуализация статистики на дашборде (Priority: P2)

**Goal**: Отображать общую статистику (количество заказов, общая сумма) в виде информативных карточек с иконками и градиентными числами

**Independent Test**: Открыть главную страницу дашборда и убедиться, что карточки статистики отображаются с правильными стилями, иконками и градиентами

### Implementation for User Story 4

- [ ] T053 [P] [US4] Create StatCard component in frontend/src/components/Dashboard/StatCard.tsx
- [ ] T054 [P] [US4] Create StatCard.module.css with styling in frontend/src/components/Dashboard/StatCard.module.css
- [ ] T055 [US4] Implement icon display in StatCard (optional icon prop)
- [ ] T056 [US4] Add gradient number styling for value display in StatCard
- [ ] T057 [US4] Apply glass-morphism effect to StatCard using Card component
- [ ] T058 [US4] Implement title and description display in StatCard
- [ ] T059 [US4] Add fade-in and slide-up animations for StatCard appearance
- [ ] T060 [US4] Create StatsGrid component to display multiple StatCards in frontend/src/components/Dashboard/StatsGrid.tsx
- [ ] T061 [US4] Integrate StatsGrid into DashboardPage in frontend/src/pages/DashboardPage.tsx
- [ ] T062 [US4] Map dashboard totals data to StatCard components (total_orders_count, total_amount_ordered)
- [ ] T063 [US4] Add appropriate icons for each stat card (orders count, total amount)
- [ ] T064 [US4] Format currency values properly in StatCard (RUB formatting)
- [ ] T065 [US4] Add responsive grid layout for StatCards on mobile devices

**Checkpoint**: At this point, User Stories 1, 2, 3, AND 4 should all work independently. Dashboard should show statistics cards with proper styling.

---

## Phase 7: User Story 5 - Отображение ранее купленных товаров (Priority: P3)

**Goal**: Отображать список ранее купленных товаров в едином стиле с изображениями, количеством и датами покупок

**Independent Test**: Открыть раздел с ранее купленными товарами и убедиться, что товары отображаются в стилизованных карточках с правильными элементами

### Implementation for User Story 5

- [ ] T066 [P] [US5] Update ProductItem component in frontend/src/components/Dashboard/ProductItem.tsx
- [ ] T067 [P] [US5] Create ProductItem.module.css with styling in frontend/src/components/Dashboard/ProductItem.module.css
- [ ] T068 [US5] Apply glass-morphism effect to ProductItem using Card component
- [ ] T069 [US5] Implement product image display with placeholder fallback in ProductItem
- [ ] T070 [US5] Add placeholder icon component for missing product images
- [ ] T071 [US5] Display product name with proper typography in ProductItem
- [ ] T072 [US5] Show quantity and last purchased date in ProductItem
- [ ] T073 [US5] Add hover effect to ProductItem
- [ ] T074 [US5] Create PreviouslyPurchasedList component in frontend/src/components/Dashboard/PreviouslyPurchasedList.tsx
- [ ] T075 [US5] Apply GradientTitle to "Ранее купленные товары" section heading
- [ ] T076 [US5] Implement grid layout for product items list
- [ ] T077 [US5] Integrate PreviouslyPurchasedList into DashboardPage
- [ ] T078 [US5] Map previously_purchased_items API data to ProductItem components
- [ ] T079 [US5] Handle empty state for previously purchased items using EmptyState
- [ ] T080 [US5] Add responsive layout for product items on mobile devices
- [ ] T081 [US5] Format dates properly (Russian locale) in ProductItem

**Checkpoint**: All user stories should now be independently functional. Previously purchased items should display with proper styling.

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T082 [P] Verify all components use CSS variables from theme.css
- [ ] T083 [P] Ensure all animations respect prefers-reduced-motion
- [ ] T084 Check contrast ratios for accessibility (minimum 4.5:1 for text)
- [ ] T085 Verify touch target sizes (minimum 44x44px) for mobile devices
- [ ] T086 [P] Add ARIA labels where needed for accessibility
- [ ] T087 Test responsive design on different screen sizes (320px, 768px, 1024px, 1920px)
- [ ] T088 Verify glass-morphism effects work with backdrop-filter fallback
- [ ] T089 [P] Update all localization strings in frontend/src/locales/ru/translation.json
- [ ] T090 Ensure all error states use EmptyState component with proper styling
- [ ] T091 Verify loading states use updated LoadingSpinner with theme colors
- [ ] T092 Test keyboard navigation (Tab, Enter, Escape) for all interactive elements
- [ ] T093 Run quickstart.md validation scenarios
- [ ] T094 Code cleanup and refactoring (remove unused styles, consolidate CSS)
- [ ] T095 Verify all components follow the design system from Figma
- [ ] T096 Performance check: ensure animations run smoothly (≤ 0.5s, no jank)
- [ ] T097 Document component usage in code comments where needed

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories (can work in parallel with US1)
- **User Story 3 (P2)**: Can start after Foundational (Phase 2) - Uses Card component from Foundational, but should be independently testable
- **User Story 4 (P2)**: Can start after Foundational (Phase 2) - Uses Card component from Foundational, but should be independently testable
- **User Story 5 (P3)**: Can start after Foundational (Phase 2) - Uses Card component from Foundational, but should be independently testable

### Within Each User Story

- Core components before integration
- Styling after component structure
- Integration into pages after component completion
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks (T001-T007) can run in parallel
- All Foundational tasks marked [P] (T008-T017) can run in parallel
- Once Foundational phase completes, User Stories 1 and 2 can start in parallel (both P1)
- User Stories 3, 4, and 5 can start in parallel after Foundational (all use Card component, but independently)
- Within each user story, tasks marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch foundational components together:
Task: "Implement base Card component in frontend/src/components/Card/Card.tsx"
Task: "Implement GradientTitle component in frontend/src/components/GradientTitle/GradientTitle.tsx"
Task: "Implement FloatingBackground component in frontend/src/components/common/FloatingBackground.tsx"
Task: "Implement EmptyState component in frontend/src/components/common/EmptyState.tsx"

# Then apply styling:
Task: "Apply theme CSS variables to global styles in frontend/src/styles/theme.css"
Task: "Update DashboardPage component to use theme colors in frontend/src/pages/DashboardPage.tsx"
```

---

## Parallel Example: User Story 2

```bash
# Launch Sidebar implementation:
Task: "Implement Sidebar component structure in frontend/src/components/Sidebar/Sidebar.tsx"
Task: "Create Sidebar.module.css with glass-morphism and navigation styles"

# Then add features:
Task: "Add animated logo to Sidebar component"
Task: "Implement navigation menu items list in Sidebar"
Task: "Add active route detection and visual highlighting in Sidebar"
```

---

## Parallel Example: User Stories 3, 4, 5

```bash
# These can run in parallel after Foundational phase:
Developer A: User Story 3 (OrderCard)
Developer B: User Story 4 (StatCard)
Developer C: User Story 5 (ProductItem)

# All use Card component from Foundational, but independently implementable
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T007)
2. Complete Phase 2: Foundational (T008-T017) - CRITICAL - blocks all stories
3. Complete Phase 3: User Story 1 (T018-T027)
4. **STOP and VALIDATE**: Test User Story 1 independently - verify visual style is applied
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Add User Story 4 → Test independently → Deploy/Demo
6. Add User Story 5 → Test independently → Deploy/Demo
7. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (Visual Style)
   - Developer B: User Story 2 (Sidebar)
3. Once US1 and US2 complete:
   - Developer A: User Story 3 (OrderCard)
   - Developer B: User Story 4 (StatCard)
   - Developer C: User Story 5 (ProductItem)
4. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
- All file paths are relative to repository root
- Frontend-only changes - no backend API modifications required
- Use existing API endpoints as documented in contracts/api-contracts.md

---

## Summary

**Total Tasks**: 97

**Task Count by Phase**:

- Phase 1 (Setup): 7 tasks
- Phase 2 (Foundational): 10 tasks
- Phase 3 (User Story 1): 10 tasks
- Phase 4 (User Story 2): 12 tasks
- Phase 5 (User Story 3): 13 tasks
- Phase 6 (User Story 4): 13 tasks
- Phase 7 (User Story 5): 16 tasks
- Phase 8 (Polish): 16 tasks

**Task Count by User Story**:

- User Story 1 (P1): 10 tasks
- User Story 2 (P1): 12 tasks
- User Story 3 (P2): 13 tasks
- User Story 4 (P2): 13 tasks
- User Story 5 (P3): 16 tasks

**Parallel Opportunities Identified**:

- 7 parallel tasks in Setup phase
- 10 parallel tasks in Foundational phase
- User Stories 1 and 2 can run in parallel (both P1)
- User Stories 3, 4, and 5 can run in parallel after Foundational
- Multiple [P] tasks within each user story phase

**Independent Test Criteria**:

- **US1**: Visual style check - verify colors, glass-morphism, animations on any screen
- **US2**: Navigation check - verify Sidebar displays, shows sections, highlights active route
- **US3**: Orders display check - verify OrderCards show with styles, icons, gradients
- **US4**: Statistics check - verify StatCards display with icons and gradient numbers
- **US5**: Products check - verify ProductItems display with images, quantities, dates

**Suggested MVP Scope**:

- Phase 1: Setup (7 tasks)
- Phase 2: Foundational (10 tasks)
- Phase 3: User Story 1 only (10 tasks)
- **Total MVP: 27 tasks**

**Format Validation**: ✅ All tasks follow the checklist format:

- Checkbox: `- [ ]`
- Task ID: `T001`, `T002`, etc.
- [P] marker: Included where tasks can run in parallel
- [Story] label: Included for all user story phase tasks (US1, US2, US3, US4, US5)
- Description: Clear action with exact file path
