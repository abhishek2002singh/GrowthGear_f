import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setQuery, submitQuery, querySuccess, queryFailure, clearResults } from "../redux/querySlice";
import { FaSearch, FaLightbulb } from "react-icons/fa";

const QueryInput = () => {
  const dispatch = useDispatch();
  const { query, loading, suggestions } = useSelector((state) => state.query);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleQuerySubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    dispatch(clearResults());
    dispatch(submitQuery());

    // Simulate AI processing delay
    setTimeout(() => {
      try {
        // Mock response based on query content
        let mockResults = [];
        
        if (query.toLowerCase().includes("sales")) {
          mockResults = [
            { label: "Q1", value: 120 },
            { label: "Q2", value: 150 },
            { label: "Q3", value: 180 },
            { label: "Q4", value: 210 },
          ];
        } else if (query.toLowerCase().includes("revenue")) {
          mockResults = [
            { label: "Product A", value: 500 },
            { label: "Product B", value: 300 },
            { label: "Product C", value: 200 },
          ];
        } else if (query.toLowerCase().includes("customer") || query.toLowerCase().includes("user")) {
          mockResults = [
            { label: "New", value: 150 },
            { label: "Returning", value: 80 },
            { label: "Churned", value: 20 },
          ];
        } else {
          mockResults = [
            { label: "Metric 1", value: Math.floor(Math.random() * 100) },
            { label: "Metric 2", value: Math.floor(Math.random() * 100) },
            { label: "Metric 3", value: Math.floor(Math.random() * 100) },
          ];
        }
        
        dispatch(querySuccess(mockResults));
      } catch (err) {
        dispatch(queryFailure("Failed to process your query. Please try again."));
      }
    }, 1500);
  };

  const handleSuggestionClick = (suggestion) => {
    dispatch(setQuery(suggestion));
    setShowSuggestions(false);
  };

  return (
    <div className="relative">
      <form onSubmit={handleQuerySubmit} className="flex items-center space-x-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={query}
            onChange={(e) => dispatch(setQuery(e.target.value))}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="Ask a business question (e.g., 'Show me sales data')"
            disabled={loading}
          />
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200">
              <div className="p-2 text-sm text-gray-500 flex items-center">
                <FaLightbulb className="mr-2" />
                <span>Try these examples:</span>
              </div>
              <ul>
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onMouseDown={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <button
          type="submit"
          className={`p-3 rounded-lg flex items-center justify-center ${loading ? 'bg-blue-300' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
          disabled={loading}
        >
          {loading ? (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <FaSearch />
          )}
        </button>
      </form>
    </div>
  );
};

export default QueryInput;