# Employee Management System — Frontend

A modern, responsive Employee Management System built with React, Vite, and Tailwind CSS.

## Features

- View, add, edit, and delete employees
- Admin dashboard with live stats (total, active, inactive)
- Dark / Light mode toggle
- Responsive sidebar navigation
- Status badges and zebra-striped table
- Connects to a REST API backend

## Tech Stack

- React 18
- Vite
- Tailwind CSS v3
- Axios
- React Router DOM
- Lucide React (icons)

## Getting Started

### Prerequisites
- Node.js v18+

### Installation

```bash
git clone https://github.com/SnobbishKick/employee-management-frontend.git
cd employee-management-frontend
npm install
npm run dev
```

Make sure the backend server is running on `http://localhost:5000` before starting the frontend.

## Pages

| Page | Route | Description |
|------|-------|-------------|
| Employee List | `/` | View all employees with edit and delete |
| Add Employee | `/add` | Form to create a new employee |
| Edit Employee | `/edit/:id` | Pre-populated form to update employee |
| Dashboard | `/dashboard` | Stats overview cards |

## Backend

This project requires the backend API to be running:
[employee-management-backend](https://github.com/SnobbishKick/employee-management-backend)
