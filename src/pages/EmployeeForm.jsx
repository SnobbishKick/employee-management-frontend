import { useEffect, useState } from 'react'
import api from '../utils/axios'
import { useNavigate, useParams } from 'react-router-dom'

function EmployeeForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', role: '', status: 'active' })

  useEffect(() => {
    if (id) {
      const fetchEmployee = async () => {
        try {
          const res = await api.get(`/employees/${id}`)
          const { name, email, role, status } = res.data
          setForm({ name, email, role, status })
        } catch (err) {
          console.error(err)
        }
      }
      fetchEmployee()
    }
  }, [id])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (id) {
        await api.put(`/employees/${id}`, form)
      } else {
        await api.post('/employees', form)
      }
      navigate('/')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
        {id ? 'Edit Employee' : 'Add Employee'}
      </h1>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 transition-colors duration-300">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter name"
              required
              className="w-full border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Email</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter email"
              required
              className="w-full border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Role</label>
            <input
              name="role"
              value={form.role}
              onChange={handleChange}
              placeholder="Enter role"
              required
              className="w-full border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg shadow transition-colors duration-200 mt-2"
          >
            {id ? 'Update Employee' : 'Add Employee'}
          </button>
          <button 
            type='button'
            onClick={() => navigate('/')}
            className='w-full border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 font-semibold py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200'
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  )
}

export default EmployeeForm