import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.quatromodule.com",
    //baseUrl: 'http://167.86.81.154:8017',
    credentials: "include",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (user) => ({
        url: '/auth/login',
        method: 'POST',
        body: {
          email: user.email,
          password: user.password,
        },
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "delete",
        body: {
        },
        
      }),
      onQueryFulfilled: (data, { dispatch }) => {
        console.log('Logout response:', data);
        if (data && data.status === 200) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('user');
          console.log('Logout success - localStorage cleared');
        } else {
          console.log('Logout failed');
        }
      },
    }),
    
    
  }),
});

export const { useLoginMutation, useFetchDataQuery,useRefreshMutation, useLogoutMutation } = authApi;
