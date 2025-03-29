import React, { useState } from "react";
import { useSelector } from "react-redux";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { FaChartBar, FaChartPie, FaTable } from "react-icons/fa";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const ResultDisplay = () => {
  const { results, loading, error } = useSelector((state) => state.query);
  const [viewMode, setViewMode] = useState('bar');

  if (loading) return (
    <div className="bg-white p-6 rounded-lg shadow flex justify-center items-center h-64">
      <div className="text-center">
        <svg className="animate-spin h-10 w-10 text-blue-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="mt-3 text-gray-600">Processing your query with AI...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="text-red-500 bg-red-50 p-4 rounded-lg">
        <p className="font-medium">Error:</p>
        <p>{error}</p>
      </div>
    </div>
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Results Visualization</h2>
        {results && (
          <div className="flex space-x-2">
            <button
              onClick={() => setViewMode('bar')}
              className={`p-2 rounded ${viewMode === 'bar' ? 'bg-blue-100 text-blue-600' : 'text-gray-500'}`}
            >
              <FaChartBar />
            </button>
            <button
              onClick={() => setViewMode('pie')}
              className={`p-2 rounded ${viewMode === 'pie' ? 'bg-blue-100 text-blue-600' : 'text-gray-500'}`}
            >
              <FaChartPie />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded ${viewMode === 'table' ? 'bg-blue-100 text-blue-600' : 'text-gray-500'}`}
            >
              <FaTable />
            </button>
          </div>
        )}
      </div>
      
      {results ? (
        <div className="mt-4">
          {viewMode === 'bar' && (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={results}>
                  <XAxis dataKey="label" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#3b82f6" name="Value" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
          
          {viewMode === 'pie' && (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={results}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="label"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {results.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
          
          {viewMode === 'table' && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Label</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {results.map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.label}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <p>Submit a query to see results</p>
        </div>
      )}
    </div>
  );
};

export default ResultDisplay;