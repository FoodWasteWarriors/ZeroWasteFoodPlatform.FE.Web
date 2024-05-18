import { createSlice } from '@reduxjs/toolkit'

interface RightDrawerState {
  isOpen: boolean
  width: number
}

const initialState: RightDrawerState = {
  isOpen: false,
  width: 320,
}

const rightDrawerSlice = createSlice({
  name: 'rightDrawer',
  initialState,
  reducers: {
    togglerightDrawer: (state) => {
      state.isOpen = !state.isOpen
    },
  },
})

export const { togglerightDrawer } = rightDrawerSlice.actions

export default rightDrawerSlice.reducer
