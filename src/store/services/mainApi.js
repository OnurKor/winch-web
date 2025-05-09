import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logOut, setCredentials } from "./authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://api.quatromodule.com",
  prepareHeaders: (headers, { getState }) => {
    // Redux store'dan token'ı al
    const token = getState().auth.accessToken;

    // headers.set("Content-Type", "application/json");
    if (token) {
      headers.set("Authorization", `Bearer ${token.access}`);
    }

    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 401) {
    try {
      // Refresh token isteğini gönder
      const refreshResult = await baseQuery(
        {
          url: "/refresh",
          method: "POST",
          credentials: "include",
        },
        api,
        extraOptions
      );

      if (refreshResult?.data) {
        const newToken = { access: refreshResult.data.ret.access_token };
        const userData = refreshResult.data.ret.user;

        api.dispatch(setCredentials({ bearer: newToken, user: userData }));
        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logOut());
      }
    } catch (error) {
      console.error("Error during refresh token request:", error);
      api.dispatch(logOut());
    }
  }

  return result;
};

export const mainApi = createApi({
  reducerPath: "mainApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User", "Device", "Device_Detail"],
  endpoints: (builder) => ({
    updateUser: builder.mutation({
      query: ({ id, body }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    addUser: builder.mutation({
      query: ({ id, body }) => ({
        url: `/users`,
        method: "Post",
        body,
      }),
      invalidatesTags: ["User"],
    }),

    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: `/users/${id}`,
        method: "delete",
      }),
      invalidatesTags: ["User"],
    }),

    getAllDevice: builder.query({
      query: () => ({
        url: `/devices`,
        method: "get",
      }),
      providesTags: ["Device"],
    }),

    getSingleDevice: builder.query({
      query: (id) => ({
        url: `/devices/${id}?owner_detail=1&users_detail=1`,
        method: "get",
      }),
      providesTags: ["Device_Detail"],
    }),

    getAllUsers: builder.query({
      query: () => ({
        url: `/users`,
        method: "get",
      }),
      providesTags: ["User"],
    }),
    getSingleUser: builder.query({
      query: (id) => ({
        url: `/users/${id}`,
        method: "get",
      }),
    }),
    addDevice: builder.mutation({
      query: ({ body }) => ({
        url: `/devices`,
        method: "Post",
        body,
      }),
      invalidatesTags: ["Device"],
    }),
    updateDevice: builder.mutation({
      query: ({ body, id }) => ({
        url: `/devices/${id}`,
        method: "Put",
        body,
      }),
      invalidatesTags: ["Device"],
    }),

    removeUser: builder.mutation({
      query: ({ deviceId, userId }) => ({
        url: `/devices/${deviceId}/device_user/${userId}`,
        method: "delete",
      }),
      invalidatesTags: ["Device_Detail"], // Silme işlemi sonrası tabloyu güncelle
    }),

    removeOwner: builder.mutation({
      query: ({ deviceId }) => ({
        url: `/devices/${deviceId}/device_owner`,
        method: "delete",
      }),
      invalidatesTags: ["Device_Detail"], // Silme sonrası cihaz bilgilerini güncelle
    }),
  }),
});

export const {
  useGetAllDeviceQuery,
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useAddUserMutation,
  useUpdateUserMutation,
  useGetSingleUserQuery,
  useAddDeviceMutation,
  useGetSingleDeviceQuery,
  useUpdateDeviceMutation,
  useRemoveUserMutation,
  useRemoveOwnerMutation,
} = mainApi;
