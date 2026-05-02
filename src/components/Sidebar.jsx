import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Sun, Moon, Users, LayoutDashboard, UserPlus, LogOut, Menu, X } from 'lucide-react'

function Sidebar({ darkMode, setDarkMode }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    localStorage.removeItem('role')
    navigate('/login')
  }

  const links = [
    { to: '/', label: 'Employees', icon: <Users size={18} /> },
    { to: '/add', label: 'Add Employee', icon: <UserPlus size={18} /> },
    { to: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
  ]

  const SidebarContent = () => (
    <aside className="w-64 bg-indigo-600 dark:bg-gray-800 text-white flex flex-col justify-between py-6 px-4 shadow-xl transition-colors duration-300 h-full">
      <div>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold tracking-wide">Employee Manager</h1>
          <button onClick={() => setIsOpen(false)} className="lg:hidden text-white">
            <X size={22} />
          </button>
        </div>
        <nav className="flex flex-col gap-2">
          {links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200
                ${location.pathname === link.to
                  ? 'bg-white text-indigo-600 font-semibold'
                  : 'text-indigo-100 hover:bg-indigo-500 dark:hover:bg-gray-700'}`}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex flex-col gap-2">
        <div className="px-4 py-3 rounded-lg bg-indigo-800 dark:bg-gray-700">
          <p className="text-xs text-indigo-300 dark:text-gray-400">Logged in as</p>
          <p className="text-sm font-semibold text-white truncate">{localStorage.getItem('username')}</p>
          <p className="text-xs text-indigo-300 dark:text-gray-400 capitalize">{localStorage.getItem('role')}</p>
        </div>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="flex items-center gap-2 px-4 py-3 rounded-lg text-indigo-100 hover:bg-indigo-500 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          {darkMode ? <Moon size={18} /> : <Sun size={18} />}
          {darkMode ? 'Dark Mode' : 'Light Mode'}
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-3 rounded-lg text-red-50 hover:bg-red-950/90 transition-colors duration-200"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  )

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-indigo-600 dark:bg-gray-800 text-white p-2 rounded-lg shadow-lg"
      >
        <Menu size={22} />
      </button>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex">
        <SidebarContent />
      </div>

      {/* Mobile overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div className="flex-1">
            <SidebarContent />
          </div>
          <div
            className="flex-1 bg-black/50"
            onClick={() => setIsOpen(false)}
          />
        </div>
      )}
    </>
  )
}

export default Sidebar