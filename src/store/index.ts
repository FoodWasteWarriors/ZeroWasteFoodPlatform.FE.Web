import { configureStore } from '@reduxjs/toolkit'

import themeReducer from './features/theme/themeSlice'
import drawerSlice from './features/drawer/drawerSlice'

const store = configureStore({
  reducer: {
    theme: themeReducer,
    drawer: drawerSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
