import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  query: "",
  history: [],
  results: null,
  loading: false,
  error: null,
  suggestions: [
    "Show me sales data for last quarter",
    "What was our revenue growth last month?",
    "Compare customer acquisition costs by channel",
    "Display user engagement metrics",
  ],
};

const querySlice = createSlice({
  name: "query",
  initialState,
  reducers: {
    setQuery(state, action) {
      state.query = action.payload;
    },
    submitQuery(state) {
      state.loading = true;
      state.error = null;
    },
    querySuccess(state, action) {
      state.loading = false;
      state.results = action.payload;
      state.history.unshift({
        query: state.query,
        timestamp: new Date().toISOString(),
      });
      state.query = "";
    },
    queryFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    clearResults(state) {
      state.results = null;
    },
  },
});

export const { setQuery, submitQuery, querySuccess, queryFailure, clearResults } = querySlice.actions;
export default querySlice.reducer;