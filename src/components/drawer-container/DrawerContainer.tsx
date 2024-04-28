import { Box, Drawer } from '@mui/material'
import { useAppSelector, useAppDispatch } from '../../utils/hooks/reduxHooks'
import { toggleDrawer } from '../../store/features/drawer/drawerSlice'
import DrawerContent from '../drawer-content/DrawerContent'

function DrawerContainer() {
  const { width, isOpen } = useAppSelector((state) => state.drawer)
  const dispatch = useAppDispatch()

  const handleToggleDrawer = () => {
    dispatch(toggleDrawer())
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
        {<DrawerContent />}
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
        {<DrawerContent />}
      </Drawer>
    </Box>
  )
}

export default DrawerContainer
