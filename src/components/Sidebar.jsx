import { Link, useLocation } from "react-router-dom";
import { Sun, Moon, Users, LayoutDashboard, UserPlus } from "lucide-react";

function Sidebar({ darkMode, setDarkMode }) {
  const location = useLocation();

  const links = [
    { to: "/", label: "Employees", icon: <Users size={18} /> },
    { to: "/add", label: "Add Employee", icon: <UserPlus size={18} /> },
    {
      to: "/dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard size={18} />,
    },
  ];

  return (
    <aside className="w-64 bg-indigo-600 dark:bg-gray-800 text-white flex flex-col justify-between py-6 px-4 shadow-xl transition-colors duration-300">
      <div>
        <h1 className="text-2xl font-bold mb-8 tracking-wide">
          Employee Manager
        </h1>
        <nav className="flex flex-col gap-2">
          {links.map((link) => (
            <Link key={link.to} to={link.to} className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200
                ${
                  location.pathname === link.to
                    ? "bg-white text-indigo-600 font-semibold"
                    : "text-indigo-100 hover:bg-indigo-500 dark:hover:bg-gray-700"
                }`}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <button
        onClick={() => setDarkMode(!darkMode)} className="flex items-center gap-2 px-4 py-3 rounded-lg text-indigo-100 hover:bg-indigo-500 dark:hover:bg-gray-700 transition-colors duration-200"
      >
        {darkMode ? <Moon size={18} /> : <Sun size={18} />}
        {darkMode ? "Dark Mode" : "Light Mode"}
      </button>
    </aside>
  );
}

export default Sidebar;
