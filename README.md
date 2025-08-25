# 📝 Task Management Dashboard

A responsive **Task Management Dashboard** built with **React, Vite, TailwindCSS, Ant Design, Zustand, and React Query**, integrating with the [DummyJSON Todos API](https://dummyjson.com/docs/todos).  
This project is developed as part of the **Front-End Developer Test Assignment**.  

---

## 📖 Project Overview

This dashboard allows users to **view, create, update, delete, and filter todos** using the live DummyJSON API.  
It demonstrates practical skills in:

- API integration with **Axios + React Query**
- **CRUD operations** with server + local store sync
- State management with **Zustand**
- UI with **Ant Design + TailwindCSS**
- Pagination, search, and filtering
- Data export (PDF / Excel) with `jsPDF`, `html2canvas`, and `xlsx`

---

## 🚀 Features

### 🔹 API Integration
- Fetch todos from [DummyJSON](https://dummyjson.com)
- Handle loading and error states
- Refresh cache with React Query after mutations
- Environment-based API URL via `.env`

### 🔹 Todo Display
- Responsive layout with Ant Design components
- Todo card/table showing:
  - Text
  - Completion status
  - User ID
- Visual distinction: ✅ Completed vs ⏳ Pending
- Summary: total todos + completed count

### 🔹 Todo Management
- Mark todos complete/incomplete
- Create todos (form with validation)
- Edit todos (inline / modal)
- Delete todos with confirmation
- Local store sync (Zustand) for optimistic UI

### 🔹 Filtering & Search
- Filter todos by **status** (All, Completed, Pending)
- Filter todos by **User ID**
- Search todos by text
- Clear filters easily

### 🔹 Extra Tools
- **PDF export** (`jsPDF` + `html2canvas`)
- **Excel export** (`xlsx`)
- **Leaflet + React-Leaflet** integration for interactive map module
- **Day.js** for date handling

---

## 🛠️ Tech Stack

- **Core**: [React 18](https://react.dev/), [Vite](https://vitejs.dev/), [React Router v7](https://reactrouter.com/)
- **UI**: [Ant Design](https://ant.design/), [TailwindCSS](https://tailwindcss.com/), [FontAwesome](https://fontawesome.com/), [React Icons](https://react-icons.github.io/react-icons/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Data Fetching**: [Axios](https://axios-http.com/), [React Query (TanStack)](https://tanstack.com/query/latest)
- **Data Export**: [jsPDF](https://github.com/parallax/jsPDF), [html2canvas](https://html2canvas.hertzen.com/), [xlsx](https://sheetjs.com/)
- **Mapping**: [Leaflet](https://leafletjs.com/), [React Leaflet](https://react-leaflet.js.org/)
- **Dates**: [Day.js](https://day.js.org/)

---

## 📡 API Endpoints

Base URL: `${VITE_BASE_URL_API}` → defined in `.env`

| Method | Endpoint                  | Description                  |
|--------|---------------------------|------------------------------|
| GET    | `/todos`                  | Get all todos (supports pagination) |
| GET    | `/todos/{id}`             | Get single todo              |
| POST   | `/todos/add`              | Add new todo                 |
| PUT    | `/todos/{id}`             | Update todo                  |
| DELETE | `/todos/{id}`             | Delete todo                  |
| GET    | `/todos/user/{userId}`    | Get todos by user            |

📌 Example `.env` file:
```env
VITE_BASE_URL_API=https://dummyjson.com
