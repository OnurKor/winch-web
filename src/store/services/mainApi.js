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
  tagTypes: ["Institution", "User", "Zones", "ZoneLocations", "Visitors", "Device"],
  endpoints: (builder) => ({
    getCampus: builder.mutation({
      query: (instution_id) => ({
        url: "/list_plant",
        method: "post",
        body: {
          institution_id: instution_id,
        },
      }),
    }),
    getUsers: builder.mutation({
      query: (body) => ({
        url: "/list_user",
        method: "post",
        body,
      }),
    }),
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
        url: `/devices?all_device=163`,
        method: "get",
      }),
      providesTags: ["Device"],
    }),
    getUser: builder.query({
      query: (id) => ({
        url: `/users/${id}`,
        method: "get",
      }),
      providesTags: ["User"],
    }),
    getZones: builder.query({
      query: (institutionId) => ({
        url: `/institutions/${institutionId}/zones`,
        method: "get",
      }),
      providesTags: ["Zones"],
    }),
    getZoneDevices: builder.query({
      query: ({ zone_id, start_date, end_date }) => ({
        url: `/zones/${zone_id}/devices?start_date=${start_date}&end_date=${end_date}`,
        method: "get",
      }),
      providesTags: ["Zones"],
    }),
    addZone: builder.mutation({
      query: (body) => ({
        url: `/zones`,
        method: "post",
        body,
      }),
      invalidatesTags: ["Zones"],
    }),
    deleteZone: builder.mutation({
      query: ({ id }) => ({
        url: `/zones/${id}`,
        method: "delete",
      }),
      invalidatesTags: ["Zones"],
    }),
    updateZone: builder.mutation({
      query: ({ id, body }) => ({
        url: `/zones/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Zones"],
    }),
    getZoneLocations: builder.query({
      query: (zone_id) => ({
        url: `/zone_locations/${zone_id}/locations`,
        method: "get",
      }),
      providesTags: ["ZoneLocations"],
    }),
    updateZoneLocations: builder.mutation({
      query: (body) => ({
        url: `zone_locations`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["ZoneLocations"],
    }),
    deleteZonelocations: builder.mutation({
      query: ({ zone_id, zonelocation_id }) => ({
        url: `/zone_locations/${zone_id}/locations/${zonelocation_id}`,
        method: "delete",
      }),
      invalidatesTags: ["ZoneLocations"],
    }),

    getAssets: builder.mutation({
      query: (instution_id, asset_id) => ({
        url: "/list_asset",
        method: "post",
        body: {
          institution_id: instution_id,
          asset_id: asset_id,
        },
      }),
    }),
    getInstutions: builder.mutation({
      query: (status) => ({
        url: "/list_institution",
        method: "post",
        body: {
          status: status,
        },
      }),
    }),
    addInstutions: builder.mutation({
      query: (body) => ({
        url: "/add_institution",
        method: "post",
        body,
      }),
    }),
    editInstutions: builder.mutation({
      query: (body) => ({
        url: "/update_institution",
        method: "post",
        body,
      }),
    }),
    deleteInstutions: builder.mutation({
      query: (body) => ({
        url: "/soft_delete_institution",
        method: "post",
        body,
      }),
    }),
    deleteLocation: builder.mutation({
      query: (body) => ({
        url: "/soft_delete_location",
        method: "post",
        body,
      }),
    }),
    deleteDevices: builder.mutation({
      query: (body) => ({
        url: "/soft_delete_device",
        method: "post",
        body,
      }),
    }),
    listPlants: builder.mutation({
      query: (body) => ({
        url: "/list_plant",
        method: "post",
        body,
      }),
    }),
    addPlant: builder.mutation({
      query: (body) => ({
        url: "/add_plant",
        method: "post",
        body,
      }),
    }),
    editPlant: builder.mutation({
      query: (body) => ({
        url: "/update_plant",
        method: "post",
        body,
      }),
    }),
    deletePlant: builder.mutation({
      query: (body) => ({
        url: "/delete_plant",
        method: "post",
        body,
      }),
    }),
    listPlaces: builder.mutation({
      query: (body) => ({
        url: "/list_place",
        method: "post",
        body,
      }),
    }),
    listLocation: builder.mutation({
      query: (body) => ({
        url: "/list_location",
        method: "post",
        body,
      }),
    }),
    addPlaces: builder.mutation({
      query: (body) => ({
        url: "/add_place",
        method: "post",
        body,
      }),
    }),
    addLocalServer: builder.mutation({
      query: (body) => ({
        url: "/add_local_server",
        method: "post",
        body,
      }),
    }),
    addLocation: builder.mutation({
      query: (body) => ({
        url: "/add_location",
        method: "post",
        body,
      }),
    }),
    editLocation: builder.mutation({
      query: (body) => ({
        url: "/update_location",
        method: "post",
        body,
      }),
    }),
    editPlaces: builder.mutation({
      query: (body) => ({
        url: "/update_place",
        method: "post",
        body,
      }),
    }),
    deletePlaces: builder.mutation({
      query: (body) => ({
        url: "/delete_place",
        method: "post",
        body,
      }),
    }),
    addRoom: builder.mutation({
      query: (body) => ({
        url: "/add_room",
        method: "post",
        body,
      }),
    }),
    editRoom: builder.mutation({
      query: (body) => ({
        url: "/update_room",
        method: "post",
        body,
      }),
    }),
    deleteRoom: builder.mutation({
      query: (body) => ({
        url: "/delete_room",
        method: "post",
        body,
      }),
    }),
    listRoom: builder.mutation({
      query: (body) => ({
        url: "/list_room",
        method: "post",
        body,
      }),
    }),
    //DEVICES
    getDevice: builder.mutation({
      query: (body) => ({
        url: "/list_device",
        method: "post",
        body,
      }),
    }),
    addDevice: builder.mutation({
      query: (body) => ({
        url: "/add_device",
        method: "post",
        body,
      }),
    }),
    updateDevice: builder.mutation({
      query: (body) => ({
        url: "/update_device",
        method: "post",
        body,
      }),
    }),
    updateDeviceLocation: builder.mutation({
      query: (body) => ({
        url: "/update_device_location",
        method: "post",
        body,
      }),
    }),
    uploadSketch: builder.mutation({
      query: (body) => ({
        url: "/upload/add_sketch",
        method: "post",
        body,
      }),
    }),
    deviceHistory: builder.mutation({
      query: (body) => ({
        url: "action_history_by_device_id",
        method: "post",
        body,
      }),
    }),
    allBeaconLastLocation: builder.mutation({
      query: (body) => ({
        url: "list_current_beacon_location",
        method: "post",
        body,
      }),
    }),
    roomHistory: builder.mutation({
      query: (body) => ({
        url: "room_action_history_by_location_id",
        method: "post",
        body,
      }),
    }),
    locationsHistory: builder.mutation({
      query: (body) => ({
        url: "action_history_by_location_id",
        method: "post",
        body,
      }),
    }),
    //visitors
    getVisitors: builder.query({
      query: (id) => ({
        url: `/institutions/${id}/visitors`,
        method: "get",
      }),
      providesTags: ["Visitors"],
    }),
    getLastVisitors: builder.query({
      query: (id) => ({
        url: `/institutions/${id}/last_visitors?show_entry_exit=1`,
        method: "get",
      }),
      providesTags: ["Visitors"],
    }),
    getSearchVisitors: builder.query({
      query: ({ id, search }) => ({
        url: `/institutions/${id}/search_visitors?search=${search}&show_entry_exit=1`,
        method: "get",
      }),
      providesTags: ["Visitors"],
    }),
    deleteVisitors: builder.mutation({
      query: ({ id }) => ({
        url: `/visitors/${id}`,
        method: "delete",
      }),
      invalidatesTags: ["Visitors"],
    }),
    addVisitor: builder.mutation({
      query: (body) => ({
        url: `/visitors`,
        method: "Post",
        body,
      }),
      invalidatesTags: ["Visitors", "VisitorsCard"],
    }),
    updateVisitor: builder.mutation({
      query: ({ id, body }) => ({
        url: `/visitors/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Visitors"],
    }),
    //visitors
    getVisitorsCard: builder.query({
      query: ({ id, status }) => {
        // Sorgu parametrelerini dinamik olarak oluşturuyoruz
        const queryParams = new URLSearchParams({
          is_delete: 0,
          device: "on",
          last_location: "on",
          visitor: "on",
          ...(status && { status }),
        }).toString();

        return {
          url: `/institutions/${id}/visitor_cards?${queryParams}`,
          method: "get",
        };
      },
      providesTags: ["VisitorsCard"],
    }),
    getVisitorsCardAvailable: builder.query({
      query: (id) => ({
        url: `/institutions/${id}/visitor_cards?status=available&is_delete=${0}`,
        method: "get",
      }),
      providesTags: ["VisitorsCard"],
    }),
    getVisitorsCardStatistic: builder.query({
      query: () => ({
        url: `/visitor_cards/statistics`,
        method: "get",
      }),
      providesTags: ["VisitorsCard"],
    }),
    deleteVisitorsCard: builder.mutation({
      query: ({ id }) => ({
        url: `/visitor_cards/${id}`,
        method: "delete",
      }),
      invalidatesTags: ["VisitorsCard"],
    }),
    deleteVisitorsCardDevice: builder.mutation({
      query: ({ id }) => ({
        url: `/visitor_cards/device/${id}`,
        method: "delete",
      }),
      invalidatesTags: ["VisitorsCard"],
    }),
    addVisitorCard: builder.mutation({
      query: (body) => ({
        url: `/visitor_cards`,
        method: "Post",
        body,
      }),
      invalidatesTags: ["VisitorsCard"],
    }),
    updateVisitorCard: builder.mutation({
      query: ({ id, body }) => ({
        url: `/visitor_cards/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["VisitorsCard"],
    }),
  }),
});

export const {
  useGetCampusMutation,
  useGetAllDeviceQuery,
  useGetUsersMutation,
  useDeleteUserMutation,
  useGetUserQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useGetAssetsMutation,
  useGetInstutionsMutation,
  useAddInstutionsMutation,
  useEditInstutionsMutation,
  useDeleteInstutionsMutation,
  useListPlantsMutation,
  useAddPlantMutation,
  useEditPlantMutation,
  useDeletePlantMutation,
  useListPlacesMutation,
  useAddPlacesMutation,
  useEditPlacesMutation,
  useDeletePlacesMutation,
  useListLocationMutation,
  useAddRoomMutation,
  useEditRoomMutation,
  useDeleteRoomMutation,
  useGetDeviceMutation,
  useAddDeviceMutation,
  useUpdateDeviceMutation,
  useUploadSketchMutation,
  useUpdateDeviceLocationMutation,
  useListRoomMutation,
  useDeviceHistoryMutation,
  useRoomHistoryMutation,
  useAllBeaconLastLocationMutation,
  useAddLocalServerMutation,
  useDeleteDevicesMutation,
  useAddLocationMutation,
  useDeleteLocationMutation,
  useEditLocationMutation,
  useLocationsHistoryMutation,
  useGetZonesQuery,
  useGetZoneDevicesQuery,
  useAddZoneMutation,
  useDeleteZoneMutation,
  useUpdateZoneMutation,
  useGetZoneLocationsQuery,
  useDeleteZonelocationsMutation,
  useUpdateZoneLocationsMutation,
  //visitors
  useGetVisitorsQuery,
  useGetLastVisitorsQuery,
  useGetSearchVisitorsQuery,
  useDeleteVisitorsMutation,
  useAddVisitorMutation,
  useUpdateVisitorMutation,
  //visitors card
  useGetVisitorsCardQuery,
  useDeleteVisitorsCardMutation,
  useAddVisitorCardMutation,
  useUpdateVisitorCardMutation,
  useGetVisitorsCardAvailableQuery,
  useDeleteVisitorsCardDeviceMutation,
  useGetVisitorsCardStatisticQuery
} = mainApi;
