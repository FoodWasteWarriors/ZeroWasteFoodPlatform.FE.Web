import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '..'

const customerApi = createApi({
  reducerPath: 'customerApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://localhost:7159/api/v1/customer',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token?.accessToken

      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }

      return headers
    },
  }),
  endpoints: (builder) => ({
    getCustomerById: builder.query<
      ServiceObjectResponse<CustomerGetDto>,
      string
    >({
      query: (id) => `/${id}`,
    }),
    getCustomerByUsername: builder.query<
      ServiceObjectResponse<CustomerGetDto>,
      string
    >({
      query: (username) => `/username/${username}`,
    }),
    getCustomerByEmail: builder.query<
      ServiceObjectResponse<CustomerGetDto>,
      string
    >({
      query: (email) => `/email/${email}`,
    }),
    getCustomerList: builder.query<
      ServiceCollectionResponse<CustomerGetDto>,
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
    getShoppingList: builder.query<
      ServiceCollectionResponse<StoreProductGetDto>,
      string
    >({
      query: (userId) => `/shopping-list/${userId}`,
    }),
    updateCustomer: builder.mutation<
      ServiceObjectResponse<CustomerGetDto>,
      CustomerUpdateDto
    >({
      query: (customerUpdateDto) => ({
        url: '/',
        method: 'PUT',
        body: customerUpdateDto,
      }),
    }),
    deleteCustomerById: builder.mutation<
      ServiceObjectResponse<CustomerGetDto>,
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
  useGetCustomerByIdQuery,
  useGetCustomerByUsernameQuery,
  useGetCustomerByEmailQuery,
  useGetCustomerListQuery,
  useGetShoppingListQuery,
  useUpdateCustomerMutation,
  useDeleteCustomerByIdMutation,
} = customerApi

export default customerApi
