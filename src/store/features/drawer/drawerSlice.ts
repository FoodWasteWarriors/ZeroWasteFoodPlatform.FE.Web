import { createSlice } from '@reduxjs/toolkit'

interface DrawerState {
  isOpen: boolean
  width: number
}

const initialState: DrawerState = {
  isOpen: false,
  width: 240,
}

const drawerSlice = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    toggleDrawer: (state) => {
      state.isOpen = !state.isOpen
    },
  },
})

export const { toggleDrawer } = drawerSlice.actions

export default drawerSlice.reducer
