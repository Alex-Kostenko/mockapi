import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

import { ApiTagsEnum } from '../utils/enums';
import { IUser } from '../utils/types';

export const api = createApi({
  reducerPath: 'mainApi',
  tagTypes: Object.values(ApiTagsEnum),
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_BASE_URL,
  }),
  endpoints: (builder) => ({
    getAllUsers: builder.query<IUser[], void>({
      query: () => 'user',
      providesTags: [ApiTagsEnum.User],
    }),
    addNewUser: builder.mutation<void, IUser>({
      query: (data) => ({
        url: 'user',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [ApiTagsEnum.User],
    }),
    updateUserData: builder.mutation<void, IUser>({
      query: (data) => ({
        url: `user/${data.id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: [ApiTagsEnum.User],
    }),
    deleteUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `user/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [ApiTagsEnum.User],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useAddNewUserMutation,
  useUpdateUserDataMutation,
  useDeleteUserMutation,
} = api;
