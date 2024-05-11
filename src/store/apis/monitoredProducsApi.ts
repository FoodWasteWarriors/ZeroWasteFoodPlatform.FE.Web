import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '..'

const monitoredProductsApi = createApi({
  reducerPath: 'monitoredProductsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://localhost:7159/api/v1/monitoredproduct',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token?.accessToken

      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }

      return headers
    },
  }),
  endpoints: (builder) => ({
    getMonitoredProductById: builder.query<
      ServiceObjectResponse<MonitoredProductGetDto>,
      string
    >({
      query: (id) => `/${id}`,
    }),
    getMonitoredProductsByUserId: builder.query<
      ServiceCollectionResponse<MonitoredProductGetDto>,
      { userId: string; page?: number; pageSize?: number }
    >({
      query: ({ userId, page = 1, pageSize = 10 }) => ({
        url: `/user/${userId}`,
        params: { page, pageSize },
      }),
    }),
    getMonitoredProducts: builder.query<
      ServiceCollectionResponse<MonitoredProductGetDto>,
      {
        page?: number
        pageSize?: number
        nameQuery?: string
      }
    >({
      query: ({ page = 1, pageSize = 10, nameQuery }) => ({
        url: '/',
        params: { page, pageSize, nameQuery },
      }),
    }),
    createMonitoredProduct: builder.mutation<
      ServiceObjectResponse<MonitoredProductGetDto>,
      MonitoredProductAddDto
    >({
      query: (monitoredProductAddDto) => ({
        url: '/',
        method: 'POST',
        body: monitoredProductAddDto,
      }),
    }),
    updateMonitoredProduct: builder.mutation<
      ServiceObjectResponse<MonitoredProductGetDto>,
      MonitoredProductUpdateDto
    >({
      query: ({ id, ...monitoredProductUpdateDto }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: monitoredProductUpdateDto,
      }),
    }),
    deleteMonitoredProduct: builder.mutation<
      ServiceObjectResponse<MonitoredProductGetDto>,
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
  useGetMonitoredProductByIdQuery,
  useGetMonitoredProductsByUserIdQuery,
  useGetMonitoredProductsQuery,
  useCreateMonitoredProductMutation,
  useUpdateMonitoredProductMutation,
  useDeleteMonitoredProductMutation,
} = monitoredProductsApi

export default monitoredProductsApi
