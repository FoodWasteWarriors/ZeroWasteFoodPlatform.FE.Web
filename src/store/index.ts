import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { setupListeners } from '@reduxjs/toolkit/query'
import storeProductsApi from './apis/storeProducsApi'
import monitoredProductsApi from './apis/monitoredProducsApi'
import authApi from './apis/authApi'
import recommendationApi from './apis/recommendationApi'
import businessApi from './apis/businessApi'
import userApi from './apis/userApi'
import customerApi from './apis/customerApi'
import reportApi from './apis/reportApi'

import themeReducer from './features/theme/themeSlice'
import navMenuDrawerReducer from './features/nav-menu-drawer/navMenuDrawerSlice'
import filterProductsDrawerSlice from './features/filter-products-drawer/filterProductsDrawerSlice'
import authReducer from './features/auth/authSlice'

const rootReducer = combineReducers({
  theme: themeReducer,
  navMenuDrawer: navMenuDrawerReducer,
  filterProductsDrawer: filterProductsDrawerSlice,
  auth: authReducer,

  // Api reducers
  [storeProductsApi.reducerPath]: storeProductsApi.reducer,
  [monitoredProductsApi.reducerPath]: monitoredProductsApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [recommendationApi.reducerPath]: recommendationApi.reducer,
  [businessApi.reducerPath]: businessApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [customerApi.reducerPath]: customerApi.reducer,
  [reportApi.reducerPath]: reportApi.reducer,
})

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [
    storeProductsApi.reducerPath,
    monitoredProductsApi.reducerPath,
    authApi.reducerPath,
    recommendationApi.reducerPath,
    businessApi.reducerPath,
    userApi.reducerPath,
    customerApi.reducerPath,
    reportApi.reducerPath,
  ],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(storeProductsApi.middleware)
      .concat(monitoredProductsApi.middleware)
      .concat(authApi.middleware)
      .concat(recommendationApi.middleware)
      .concat(businessApi.middleware)
      .concat(userApi.middleware)
      .concat(customerApi.middleware)
      .concat(reportApi.middleware),
})

const persistor = persistStore(store)

export { persistor, store }

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
