import { createSlice } from '@reduxjs/toolkit'

interface filterProductsDrawerState {
  isOpen: boolean
  width: number
}

const initialState: filterProductsDrawerState = {
  isOpen: false,
  width: 320,
}

const filterProductsDrawerSlice = createSlice({
  name: 'filter-products-drawer',
  initialState,
  reducers: {
    togglefilterProductsDrawer: (state) => {
      state.isOpen = !state.isOpen
    },
  },
})

export const { togglefilterProductsDrawer } = filterProductsDrawerSlice.actions

export default filterProductsDrawerSlice.reducer
