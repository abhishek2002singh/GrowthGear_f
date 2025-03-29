import React from "react";
import { useSelector } from "react-redux";
import { FaHistory, FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { clearResults } from "../redux/querySlice";

const QueryHistory = () => {
  const { history } = useSelector((state) => state.query);
  const dispatch = useDispatch();

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const handleHistoryClick = (query) => {
    dispatch(clearResults());
    // In a real app, we would re-run the query here
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold flex items-center">
          <FaHistory className="mr-2" />
          Query History
        </h2>
        {history.length > 0 && (
          <button className="text-gray-500 hover:text-red-500">
            <FaTrash />
          </button>
        )}
      </div>
      {history.length > 0 ? (
        <ul className="space-y-2">
          {history.map((item, index) => (
            <li
              key={index}
              className="p-3 bg-gray-50 rounded-lg hover:bg-blue-50 cursor-pointer"
              onClick={() => handleHistoryClick(item.query)}
            >
              <div className="font-medium text-gray-800">{item.query}</div>
              <div className="text-xs text-gray-500">{formatDate(item.timestamp)}</div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-center py-4">No queries yet</p>
      )}
    </div>
  );
};

export default QueryHistory;