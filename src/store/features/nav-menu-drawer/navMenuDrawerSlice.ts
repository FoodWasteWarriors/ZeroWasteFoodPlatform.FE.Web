import { createSlice } from '@reduxjs/toolkit'

interface NavMenuDrawerState {
  isOpen: boolean
  width: number
}

const initialState: NavMenuDrawerState = {
  isOpen: false,
  width: 240,
}

const navMenuDrawerSlice = createSlice({
  name: 'nav-menu-drawer',
  initialState,
  reducers: {
    toggleNavMenuDrawer: (state) => {
      state.isOpen = !state.isOpen
    },
  },
})

export const { toggleNavMenuDrawer } = navMenuDrawerSlice.actions

export default navMenuDrawerSlice.reducer
