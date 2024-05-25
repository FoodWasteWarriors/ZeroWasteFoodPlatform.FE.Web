import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '..'

const storeProductsApi = createApi({
  reducerPath: 'storeProductsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://localhost:7159/api/v1/storeproduct',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token?.accessToken

      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }

      return headers
    }
  }),
  endpoints: (builder) => ({
    getStoreProducts: builder.query<
      ServiceCollectionResponse<StoreProductGetDto>,
      {
        businessId?: string
        page?: number
        pageSize?: number
        nameQuery?: string
        percentDiscountLow?: number
        percentDiscountHigh?: number
        originalPriceLow?: number
        originalPriceHigh?: number
        sortBy?: 'name' | 'price' | 'discount'
        categoryIds?: string
        storeIds?: string
      }
    >({
      query: ({ page = 1, pageSize = 10, nameQuery, ...rest }) => ({
        url: '/',
        params: { page, pageSize, nameQuery, ...rest }
      })
    }),
    getStoreProductById: builder.query<ServiceObjectResponse<StoreProductGetDto>, string>({
      query: (id) => `/${id}`
    }),
    getStoreProductsByUserId: builder.query<
      ServiceCollectionResponse<StoreProductGetDto>,
      {
        userId: string
        page?: number
        pageSize?: number
        nameQuery?: string
      }
    >({
      query: ({ userId, page = 1, pageSize = 10, nameQuery }) => ({
        url: `/user/${userId}`,
        params: { page, pageSize, nameQuery }
      })
    }),
    deleteStoreProduct: builder.mutation<ServiceObjectResponse<StoreProductGetDto>, string>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE'
      })
    }),
    createStoreProduct: builder.mutation<ServiceObjectResponse<StoreProductGetDto>, StoreProductAddDto>({
      query: (storeProduct) => ({
        url: '/',
        method: 'POST',
        body: storeProduct
      })
    }),
    updateStoreProduct: builder.mutation<ServiceObjectResponse<StoreProductGetDto>, StoreProductUpdateDto>({
      query: (storeProduct) => ({
        url: '/',
        method: 'PUT',
        body: storeProduct
      })
    }),
    addToShoppingList: builder.mutation<
      ServiceObjectResponse<StoreProductGetDto>,
      StoreProductManipulateShoppingListDto
    >({
      query: (body) => ({
        url: '/add-to-shopping-list',
        method: 'POST',
        body
      })
    }),
    removeFromShoppingList: builder.mutation<
      ServiceObjectResponse<StoreProductGetDto>,
      StoreProductManipulateShoppingListDto
    >({
      query: (body) => ({
        url: '/remove-from-shopping-list',
        method: 'POST',
        body
      })
    })
  })
})

export const {
  useGetStoreProductsQuery,
  useGetStoreProductByIdQuery,
  useGetStoreProductsByUserIdQuery,
  useDeleteStoreProductMutation,
  useCreateStoreProductMutation,
  useUpdateStoreProductMutation,
  useAddToShoppingListMutation,
  useRemoveFromShoppingListMutation
} = storeProductsApi

export default storeProductsApi
