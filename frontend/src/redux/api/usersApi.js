import {api} from './api';
import {USERS_URL} from '../constants';

export const userApi = api.injectEndpoints({
  endpoints: (builder)=> ({
    getAllUsers: builder.query({
      query: () => ({
        url: USERS_URL,
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    getUser: builder.query({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    addUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: 'POST',
        body: data,
      }), 
      invalidatesTags: ['User'],
    }),
    updateUser: builder.mutation({
      query: ({id, data}) => ({
        url: `${USERS_URL}/${id}`,
        method: 'PUT',
        body: data,
      }), 
      invalidatesTags: ['User'],
    }),
    deleteUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/$`,
        method: 'POST',
        body: data,
      }), 
      invalidatesTags: ['User'],
    })
  })
})

export const { useAddUserMutation, useGetAllUsersQuery, useGetUserQuery} = userApi;