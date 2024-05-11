import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '..'

const recommendationApi = createApi({
  reducerPath: 'recommendationApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://localhost:7159/api/v1/recommendation',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token?.accessToken

      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }

      return headers
    },
  }),
  endpoints: (builder) => ({
    getRecommendedProducts: builder.query<
      ServiceCollectionResponse<StoreProductGetDto>,
      void
    >({
      query: () => '/store-products',
    }),
  }),
})

export const { useGetRecommendedProductsQuery } = recommendationApi

export default recommendationApi
