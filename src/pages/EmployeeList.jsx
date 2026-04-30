import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/employees");
        setEmployees(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this employee?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/employees/${id}`);
      setEmployees(employees.filter((e) => e.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Employees
        </h1>
        <Link
          to="/add"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg shadow transition-colors duration-200"
        >
          + Add Employee
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-indigo-50 dark:bg-gray-700 text-indigo-700 dark:text-indigo-300 uppercase text-xs tracking-wider">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Role</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, index) => (
              <tr
                key={emp.id}
                className={`border-t border-gray-200 dark:border-gray-700 transition-colors duration-150 hover:bg-indigo-50 dark:hover:bg-indigo-900/40 ${index % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-gray-50 dark:bg-gray-900"}`}
              >
                <td className="p-4 font-medium text-gray-800 dark:text-gray-100">
                  {emp.name}
                </td>
                <td className="p-4 text-gray-500 dark:text-gray-400">
                  {emp.email}
                </td>
                <td className="p-4 text-gray-600 dark:text-gray-300">
                  {emp.role}
                </td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold
          ${
            emp.status === "active"
              ? "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400 dark:ring-1 dark:ring-green-500/40"
              : "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400 dark:ring-1 dark:ring-red-500/40"
          }`}
                  >
                    {emp.status}
                  </span>
                </td>
                <td className="p-4 flex gap-3">
                  <Link
                    to={`/edit/${emp.id}`}
                    className="text-indigo-500 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
                  >
                    <Pencil size={16} />
                  </Link>
                  <button
                    onClick={() => handleDelete(emp.id)}
                    className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeeList;
