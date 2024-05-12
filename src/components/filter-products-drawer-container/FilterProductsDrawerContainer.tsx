import { Box, Drawer, Toolbar } from '@mui/material'
import { useAppSelector } from '../../utils/hooks/reduxHooks'
import {
  selectFilterProductsDrawerIsOpen,
  selectFilterProductsDrawerWidth,
} from '../../store/features/filter-products-drawer/filterProductsDrawerSelectors'
import FilterProductsDrawerContent from '../filter-products-drawer-content/FilterProductsDrawerContent'

function FilterProductsDrawerContainer() {
  const width = useAppSelector(selectFilterProductsDrawerWidth)
  const isOpen = useAppSelector(selectFilterProductsDrawerIsOpen)

  return (
    <Box
      component='nav'
      sx={{ width: { md: width }, flexShrink: { md: 0 } }}
      aria-label='mailbox folders'
    >
      <Drawer
        variant='temporary'
        anchor='right'
        open={isOpen}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { sm: 'block', md: 'flex' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: width,
          },
        }}
      >
        {<Toolbar />}
        {<FilterProductsDrawerContent />}
      </Drawer>
      <Drawer
        variant='permanent'
        anchor='right'
        sx={{
          display: { xs: 'none', sm: 'flex' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: width,
          },
        }}
        open
      >
        {<Toolbar />}
        {<FilterProductsDrawerContent />}
      </Drawer>
    </Box>
  )
}

export default FilterProductsDrawerContainer
