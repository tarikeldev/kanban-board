# Kanban Board - Documentation

## Overview

This project is a modern Kanban board application built with **React**, **TypeScript**, and **Vite**. It features task and board management, authentication, drag-and-drop, and a responsive, enterprise-grade UI using [shadcn/ui](https://ui.shadcn.com/) and [Tailwind CSS](https://tailwindcss.com/).

---

## Features

### 1. **Authentication**
- **Login**: Secure login with JWT token storage in localStorage.
- **Logout**: Clears token and user state.
- **Protected Routes**: Uses a `RequireAuth` component to restrict access to authenticated users.

### 2. **Board Management**
- **View Boards**: Boards are fetched from the backend and displayed as horizontally scrollable cards.
- **Board Task Count**: Each board displays the number of tasks it contains.
- **Drag-and-Drop**: Tasks can be dragged between boards to update their status.

### 3. **Task Management**
- **Add Task**: Modal dialog with form validation (title, description, board selection).
- **Update Task**: Edit task details in a modal dialog.
- **Task Details**: Each task displays title, description, assignee, due date, and priority.
- **Task List**: Tasks are grouped by board and displayed in a modern card layout.

### 4. **UI/UX**
- **Responsive Design**: Works on desktop and mobile.
- **Modern UI**: Uses shadcn/ui components and Tailwind CSS for a clean, enterprise look.
- **Feedback**: Form validation errors, loading states, and empty states are handled gracefully.

---

## Libraries & Technologies

### **Core**
- **React**: UI library for building components.
- **TypeScript**: Type safety and better developer experience.
- **Vite**: Fast build tool and dev server.

### **State Management**
- **Zustand**: Lightweight state management for global app state (e.g., dragged task, modal open state).

### **API & Data Fetching**
- **Axios**: HTTP client for API requests.
- **@tanstack/react-query**: Data fetching, caching, and mutation management.

### **Forms & Validation**
- **react-hook-form**: Form state management and validation.
- **zod**: Schema validation for form data.
- **@hookform/resolvers/zod**: Integrates zod with react-hook-form.

### **UI Components**
- **shadcn/ui**: Headless, accessible UI components (Dialog, Button, Card, Select, etc.).
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **lucide-react**: Icon library for modern SVG icons.

### **Other**
- **Radix UI**: Underlying primitives for shadcn/ui components.
- **classnames/clsx/tailwind-merge**: Utility libraries for conditional class names.

---

## Project Structure

```
src/
  apis/           # API service modules (axios)
  components/     # UI and feature components
    board/        # Board and task components
    ui/           # shadcn/ui components
  domain/         # Entity definitions (TypeScript classes)
  lib/
    schemas/      # Zod schemas for validation
    utils.ts      # Utility functions
  pages/          # Page-level components (e.g., KanbanBoard, Auth)
  stores/         # Zustand stores for global state
```

---

## Key Functionalities

### **Authentication**
- `src/pages/Auth/login/login.tsx`: Handles login form, mutation, and redirects.
- `src/stores/authStore.tsx`: Zustand store for auth state.

### **Boards**
- `src/components/board/board-container/board-container.tsx`: Fetches and displays boards and their tasks.
- Boards are scrollable horizontally and show a badge with the number of tasks.

### **Tasks**
- `src/components/board/tasks/add-task/add-task.tsx`: Modal form to add a new task, with validation.
- `src/components/board/tasks/update-task/update-task.tsx`: Modal form to update an existing task.
- `src/components/board/board-task/board-task.tsx`: Displays a single task card with assignee, description, priority, and due date.

### **Drag-and-Drop**
- Tasks can be dragged between boards. The state is managed with Zustand and updates are sent to the backend.

### **Form Validation**
- All forms use Zod schemas (see `src/lib/schemas/schemas.tsx`) for validation.
- Errors are displayed inline using shadcn/ui form components.

---

## How to Add a New Feature

1. **Add a Zod schema** in `src/lib/schemas/schemas.tsx` for validation.
2. **Create a form** using `react-hook-form` and shadcn/ui components.
3. **Use Zustand** for any global state (e.g., modal open/close, dragged task).
4. **Use React Query** for data fetching and mutations.
5. **Style** using Tailwind CSS utility classes.

---

## How to Run

```bash
npm install
npm run dev
```

---

## Customization

- **UI**: Customize Tailwind classes or shadcn/ui components for your brand.
- **API**: Update endpoints in `src/apis/` as needed.
- **Entities**: Extend `TaskEntity` and `BoardEntity` in `src/domain/board-entities.tsx` for more fields.

---

## Credits

- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React](https://react.dev/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [React Query](https://tanstack.com/query/latest)
- [Zod](https://zod.dev/)
- [lucide-react](https://lucide.dev/)

---

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
