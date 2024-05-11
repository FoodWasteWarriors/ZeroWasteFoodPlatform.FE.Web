import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '..'

const reportApi = createApi({
  reducerPath: 'reportApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://localhost:7159/api/v1/report',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token?.accessToken

      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }

      return headers
    },
  }),
  endpoints: (builder) => ({
    getReportById: builder.query<ServiceObjectResponse<ReportGetDto>, string>({
      query: (id) => `/${id}`,
    }),
    getReportList: builder.query<
      ServiceCollectionResponse<ReportGetDto>,
      {
        page?: number
        pageSize?: number
        productNameQuery?: string
        storeNameQuery?: string
        manufacturerQuery?: string
        locationQuery?: string
        statusQuery?: string
      }
    >({
      query: ({
        page = 1,
        pageSize = 10,
        productNameQuery,
        storeNameQuery,
        manufacturerQuery,
        locationQuery,
        statusQuery,
      }) => ({
        url: '/',
        params: {
          page,
          pageSize,
          productNameQuery,
          storeNameQuery,
          manufacturerQuery,
          locationQuery,
          statusQuery,
        },
      }),
    }),
    deleteReport: builder.mutation<ServiceObjectResponse<ReportGetDto>, string>(
      {
        query: (id) => ({
          url: `/${id}`,
          method: 'DELETE',
        }),
      }
    ),
  }),
})

export const {
  useGetReportByIdQuery,
  useGetReportListQuery,
  useDeleteReportMutation,
} = reportApi

export default reportApi
