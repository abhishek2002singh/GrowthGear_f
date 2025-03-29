import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import QueryInput from "./components/QueryInput";
import QueryHistory from "./components/QueryHistory";
import ResultsDisplay from "./components/ResultsDisplay";

const App = () => {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-100 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Gen AI Analytics Dashboard</h1>
          <div className="space-y-6">
            <QueryInput />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <QueryHistory />
              </div>
              <div className="lg:col-span-2">
                <ResultsDisplay />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Provider>
  );
};

export default App;