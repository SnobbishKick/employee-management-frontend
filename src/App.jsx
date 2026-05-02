import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import EmployeeList from "./pages/EmployeeList";
import EmployeeForm from "./pages/EmployeeForm";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";



function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  }, [darkMode]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <div className="flex h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
                <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />
                <main className="flex-1 overflow-y-auto p-6 pt-16 lg:pt-6">
                  <Routes>
                    <Route path="/" element={<EmployeeList />} />
                    <Route path="/add" element={<EmployeeForm />} />
                    <Route path="/edit/:id" element={<EmployeeForm />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                  </Routes>
                </main>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App