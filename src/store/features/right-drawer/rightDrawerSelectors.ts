import { RootState } from '../..'
import { createSelector } from '@reduxjs/toolkit'

export const selectRightDrawer = (state: RootState) => state.rightDrawer

export const selectRightDrawerIsOpen = createSelector(
  selectRightDrawer,
  (rightDrawer) => rightDrawer.isOpen
)

export const selectRightDrawerWidth = createSelector(
  selectRightDrawer,
  (rightDrawer) => rightDrawer.width
)
