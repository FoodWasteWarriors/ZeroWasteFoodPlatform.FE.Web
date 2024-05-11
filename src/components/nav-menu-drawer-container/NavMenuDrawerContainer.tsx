import { Box, Drawer } from '@mui/material'
import { useAppSelector, useAppDispatch } from '../../utils/hooks/reduxHooks'
import { toggleNavMenuDrawer } from '../../store/features/nav-menu-drawer/navMenuDrawerSlice'
import NavMenuDrawerContent from '../nav-menu-drawer-content/NavMenuDrawerContent'
import {
  selectNavMenuDrawerIsOpen,
  selectNavMenuDrawerWidth,
} from '../../store/features/nav-menu-drawer/navMenuDrawerSelectors'

function NavMenuDrawerContainer() {
  const width = useAppSelector(selectNavMenuDrawerWidth)
  const isOpen = useAppSelector(selectNavMenuDrawerIsOpen)
  const dispatch = useAppDispatch()

  const handleToggleDrawer = () => {
    dispatch(toggleNavMenuDrawer())
  }

  return (
    <Box
      component='nav'
      sx={{ width: { md: width }, flexShrink: { md: 0 } }}
      aria-label='mailbox folders'
    >
      <Drawer
        variant='temporary'
        open={isOpen}
        onClose={handleToggleDrawer}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'flex' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: width,
          },
        }}
      >
        {<NavMenuDrawerContent />}
      </Drawer>
      <Drawer
        variant='permanent'
        sx={{
          display: { xs: 'none', md: 'flex' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: width,
          },
        }}
        open
      >
        {<NavMenuDrawerContent />}
      </Drawer>
    </Box>
  )
}

export default NavMenuDrawerContainer
