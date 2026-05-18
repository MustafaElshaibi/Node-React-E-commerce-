import { api } from "./api";
import { AUTH_URL } from "../constants";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/login`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/register`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${AUTH_URL}/logout`,
        method: "POST",
      }),
    }),
    refreshToken: builder.mutation({
      query: () => ({
        url: `${AUTH_URL}/refresh`,
        method: "POST",
      }),
    }),
    getProfile: builder.query({
      query: () => ({
        url: `${AUTH_URL}/profile`,
        method: "GET",
      }),
      providesTags: ['Profile'],
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/profile`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ['Profile']
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useRefreshTokenMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
} = authApi;
