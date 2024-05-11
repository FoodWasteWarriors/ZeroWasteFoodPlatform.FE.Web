import { RootState } from '../..'
import { createSelector } from '@reduxjs/toolkit'

export const selectTheme = (state: RootState) => state.theme

export const selectThemeMode = createSelector(
  selectTheme,
  (theme) => theme.themeMode
)
