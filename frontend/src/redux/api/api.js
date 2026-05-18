import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AUTH_URL, BASE_URL, REFRESHTOKEN } from "../constants";
import { logOut, setAccessToken } from "../features/authSlice";
import { setError } from "../features/errorSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, {getState}) => {
    const token = getState().auth.accessToken
    if (token) headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});

export const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  console.log(result)
  if (result.error?.status === 401) {

    const refreshResult = await baseQuery(
      {
        url: `${REFRESHTOKEN}`,
        method: "POST",
      },
      api,
      extraOptions
    );
console.log(refreshResult)
    if (refreshResult.data) {
      api.dispatch(
        setAccessToken(refreshResult.data.data.accessToken)
      );

      result = await baseQuery(args, api, extraOptions);

    } else  {
      await baseQuery({url: `${AUTH_URL}/logout`, method: 'POST'}, api, extraOptions)
      api.dispatch(logOut())
       if (refreshResult?.error) {
        api.dispatch(
          setError({
            code: refreshResult.error.status,
            message: 'Session expired. Please login again.',
            type: 'auth_error',
            timestamp: new Date().toISOString()
          })
        );
      }
    }


  }



  return result;
};

export const api = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User", "Product", "Cart", "Order", "Profile", "Category"],
  endpoints: () => ({}),
});
