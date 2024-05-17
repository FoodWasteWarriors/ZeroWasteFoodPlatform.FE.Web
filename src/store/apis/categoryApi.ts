import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '..'

const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://localhost:7159/api/v1/category',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token?.accessToken

      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }

      return headers
    },
  }),
  endpoints: (builder) => ({
    getCategoryById: builder.query<
      ServiceObjectResponse<CategoryGetDto>,
      string
    >({
      query: (id) => `/${id}`,
    }),
    getCategoryList: builder.query<
      ServiceCollectionResponse<CategoryGetDto>,
      void
    >({
      query: () => '',
    }),
  }),
})

export const { useGetCategoryByIdQuery, useGetCategoryListQuery } = categoryApi
export default categoryApi
