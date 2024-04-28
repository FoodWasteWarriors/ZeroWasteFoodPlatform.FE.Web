import { createSlice } from '@reduxjs/toolkit'

interface ThemeState {
  themeMode: ThemeMode
}

const initialState: ThemeState = {
  themeMode: 'light',
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleThemeMode(state) {
      state.themeMode = state.themeMode === 'light' ? 'dark' : 'light'
    },
  },
})

export const { toggleThemeMode } = themeSlice.actions

export default themeSlice.reducer
