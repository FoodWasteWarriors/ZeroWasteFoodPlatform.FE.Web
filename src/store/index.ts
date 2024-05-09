import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import storeProductsApi from './apis/storeProducsApi'

import themeReducer from './features/theme/themeSlice'
import drawerSlice from './features/drawer/drawerSlice'

const store = configureStore({
  reducer: {
    theme: themeReducer,
    drawer: drawerSlice,

    // api reducers
    [storeProductsApi.reducerPath]: storeProductsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(storeProductsApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
