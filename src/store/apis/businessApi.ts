import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '..'

const businessApi = createApi({
  reducerPath: 'businessApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://localhost:7159/api/v1/business',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token?.accessToken

      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }

      return headers
    },
  }),
  endpoints: (builder) => ({
    getBusinessById: builder.query<
      ServiceObjectResponse<BusinessGetDto>,
      string
    >({
      query: (id) => `${id}`,
    }),
    getBusinessByUsername: builder.query<
      ServiceObjectResponse<BusinessGetDto>,
      string
    >({
      query: (username) => `/username/${username}`,
    }),
    getBusinessByEmail: builder.query<
      ServiceObjectResponse<BusinessGetDto>,
      string
    >({
      query: (email) => `/email/${email}`,
    }),
    getBusinessList: builder.query<
      ServiceCollectionResponse<BusinessGetDto>,
      {
        page?: number
        pageSize?: number
        nameQuery?: string
        emailVerified?: boolean
        phoneNumberVerified?: boolean
      }
    >({
      query: ({
        page = 1,
        pageSize = 10,
        nameQuery,
        emailVerified,
        phoneNumberVerified,
      }) => ({
        url: '/',
        params: {
          page,
          pageSize,
          nameQuery,
          emailVerified,
          phoneNumberVerified,
        },
      }),
    }),
    updateBusiness: builder.mutation<
      ServiceObjectResponse<BusinessGetDto>,
      BusinessUpdateDto
    >({
      query: (businessUpdateDto) => ({
        url: '/',
        method: 'PUT',
        body: businessUpdateDto,
      }),
    }),
    deleteBusinessById: builder.mutation<
      ServiceObjectResponse<BusinessGetDto>,
      string
    >({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const {
  useGetBusinessByIdQuery,
  useGetBusinessByUsernameQuery,
  useGetBusinessByEmailQuery,
  useGetBusinessListQuery,
  useUpdateBusinessMutation,
  useDeleteBusinessByIdMutation,
} = businessApi

export default businessApi
