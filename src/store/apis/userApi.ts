import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '..'

const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://localhost:7159/api/v1/user',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token?.accessToken

      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }

      return headers
    },
  }),
  endpoints: (builder) => ({
    changePassword: builder.mutation<
      ServiceObjectResponse<UserGetDto>,
      UserChangePasswordDto
    >({
      query: (userChangePasswordDto) => ({
        url: '/change-password',
        method: 'POST',
        body: userChangePasswordDto,
      }),
    }),
  }),
})

export const { useChangePasswordMutation } = userApi

export default userApi
