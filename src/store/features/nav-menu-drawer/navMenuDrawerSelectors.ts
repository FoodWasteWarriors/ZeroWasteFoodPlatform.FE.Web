import { RootState } from '../..'
import { createSelector } from '@reduxjs/toolkit'

export const selectNavMenuDrawer = (state: RootState) => state.navMenuDrawer

export const selectNavMenuDrawerIsOpen = createSelector(
  selectNavMenuDrawer,
  (navMenuDrawer) => navMenuDrawer.isOpen
)

export const selectNavMenuDrawerWidth = createSelector(
  selectNavMenuDrawer,
  (navMenuDrawer) => navMenuDrawer.width
)
