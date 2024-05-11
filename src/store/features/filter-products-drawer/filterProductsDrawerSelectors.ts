import { RootState } from '../..'
import { createSelector } from '@reduxjs/toolkit'

export const selectFilterProductsDrawer = (state: RootState) =>
  state.filterProductsDrawer

export const selectFilterProductsDrawerIsOpen = createSelector(
  selectFilterProductsDrawer,
  (filterProductsDrawer) => filterProductsDrawer.isOpen
)

export const selectFilterProductsDrawerWidth = createSelector(
  selectFilterProductsDrawer,
  (filterProductsDrawer) => filterProductsDrawer.width
)
