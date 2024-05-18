import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { combineReducers } from 'redux'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import authApi from './apis/authApi'
import businessApi from './apis/businessApi'
import categoryApi from './apis/categoryApi'
import customerApi from './apis/customerApi'
import monitoredProductsApi from './apis/monitoredProducsApi'
import recommendationApi from './apis/recommendationApi'
import reportApi from './apis/reportApi'
import storeProductsApi from './apis/storeProducsApi'
import userApi from './apis/userApi'

import authReducer from './features/auth/authSlice'
import rightDrawerReducer from './features/right-drawer/rightDrawerSlice'
import navMenuDrawerReducer from './features/nav-menu-drawer/navMenuDrawerSlice'
import themeReducer from './features/theme/themeSlice'

const rootReducer = combineReducers({
  theme: themeReducer,
  navMenuDrawer: navMenuDrawerReducer,
  rightDrawer: rightDrawerReducer,
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
  [categoryApi.reducerPath]: categoryApi.reducer,
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
    categoryApi.reducerPath,
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
      .concat(reportApi.middleware)
      .concat(categoryApi.middleware),
})

const persistor = persistStore(store)

export { persistor, store }

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
