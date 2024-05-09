import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const storeProductsApi = createApi({
  reducerPath: 'storeProductsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://localhost:7159/api/v1/' }),
  endpoints: (builder) => ({
    getStoreProducts: builder.query<
      ServiceCollectionResponse<StoreProduct>,
      void
    >({
      query: () => 'storeproduct',
    }),
    getStoreProductById: builder.query<
      ServiceObjectResponse<StoreProduct>,
      string
    >({
      query: (id) => `storeproduct/${id}`,
    }),
    getStoreProductsByUserId: builder.query<
      ServiceCollectionResponse<StoreProduct>,
      string
    >({
      query: (userId) => `storeproduct/user/${userId}`,
    }),
    deleteStoreProduct: builder.mutation<
      ServiceObjectResponse<StoreProduct>,
      string
    >({
      query: (id) => ({
        url: `storeproduct/${id}`,
        method: 'DELETE',
      }),
    }),
    createStoreProduct: builder.mutation<
      ServiceObjectResponse<StoreProduct>,
      Partial<StoreProduct>
    >({
      query: (storeProduct) => ({
        url: 'storeproduct',
        method: 'POST',
        body: storeProduct,
      }),
    }),
    updateStoreProduct: builder.mutation<
      ServiceObjectResponse<StoreProduct>,
      Partial<StoreProduct>
    >({
      query: ({ id, ...storeProduct }) => ({
        url: `storeproduct/${id}`,
        method: 'PUT',
        body: storeProduct,
      }),
    }),
    addToShoppingList: builder.mutation<
      ServiceObjectResponse<StoreProduct>,
      AddRemoveToShoppingListBody
    >({
      query: (body) => ({
        url: 'storeproduct/add-to-shopping-list',
        method: 'POST',
        body,
      }),
    }),
    removeFromShoppingList: builder.mutation<
      ServiceObjectResponse<StoreProduct>,
      AddRemoveToShoppingListBody
    >({
      query: (body) => ({
        url: 'storeproduct/remove-from-shopping-list',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const {
  useGetStoreProductsQuery,
  useGetStoreProductByIdQuery,
  useGetStoreProductsByUserIdQuery,
  useDeleteStoreProductMutation,
  useCreateStoreProductMutation,
  useUpdateStoreProductMutation,
  useAddToShoppingListMutation,
  useRemoveFromShoppingListMutation,
} = storeProductsApi

export default storeProductsApi
