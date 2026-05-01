import { useEffect, useState } from 'react';
import api from '../utils/axios';
import { Users, UserCheck, UserX } from 'lucide-react';

function Dashboard() {
  const [stats, setStats] = useState({total: 0, active: 0, inactive: 0});

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/employees')
        const employees = res.data;
        setStats({
          total: employees.length,
          active: employees.filter(e => e.status === 'active').length,
          inactive: employees.filter(e => e.status === 'inactive').length
        });
      } catch (error) {
        console.error(error);
      }
    }
    fetchStats();
  }, []);

  const cards = [
    { label: 'Total Employees', value: stats.total, icon: <Users size={28} />, color: 'bg-indigo-500' },
    { label: 'Active', value: stats.active, icon: <UserCheck size={28} />, color: 'bg-green-500'},
    { label: 'Inactive', value: stats.inactive, icon: <UserX size={28} />, color: 'bg-red-500' },
  ]

  return (
    <div>
      <h1 className='text-3xl font-bold text-gray-800 dark:text-white mb-8'>Dashboard</h1>
      <div className='grid grid-cols-1 sm:grid-cols2 lg:grid-cols-3 gap-6'>
        {cards.map(card => (
          <div key={card.label} className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex items-center gap-6 transition-colors duration-300'>
            <div className={`${card.color} text-white p-4 rounded-xl shadow`}>
              {card.icon}
            </div>
            <div>
              <p className='text-sm text-gray-500 dark:text-gray-400'>{card.label}</p>
              <p className='text-4xl font-bold text-gray-800 dark:text-white'>{card.value}</p>
            </div>
          </div>
        ))};
      </div>
    </div>
  )
};

export default Dashboard