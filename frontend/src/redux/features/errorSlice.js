import { createSlice } from "@reduxjs/toolkit"


const initialState = {
  errors: [],
  lastError: null,
}

const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setError (state, action) {
      const { code, message, type, timestamp} = action.payload || {};
      state.errors.push({
        code: code || 500,
        message: message || "An unexpected error occurred",
        type: type || "Unknown",
        timestamp: timestamp || new Date().toISOString()
      });
      state.lastError = {
        code: code || 500,
        message: message || "An unexpected error occurred",
        type: type || "Unknown",
        timestamp: timestamp || new Date().toISOString()
      }
    },
    clearErrors (state) {
      state.errors = [];
    }
  }
})

export const { setError, clearErrors } = errorSlice.actions;
export default errorSlice.reducer;

export const selectLastError = (state)=> {
  const errors = state.error.errors;
  return errors.length > 0 ? errors[errors.length - 1] : null;
}
