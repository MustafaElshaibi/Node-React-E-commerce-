import { logOut } from "../features/authSlice";
import { setError } from "../features/errorSlice";

const errorWrapper = (store) => (next)=> (action) => {
  if(action.type.endsWith('/rejected')) {
    const { data } = action.payload || {};
    const code = data?.code || 500;
    const message = data?.message || 'An unexpected error occurred';

    store.dispatch(setError({
      code,
      message,
      type: action.type,
      timestamp: new Date().toISOString()
    }))


    if(code === 401) {
      store.dispatch(logOut());
    }
  }

  return next(action);
}

export default errorWrapper;