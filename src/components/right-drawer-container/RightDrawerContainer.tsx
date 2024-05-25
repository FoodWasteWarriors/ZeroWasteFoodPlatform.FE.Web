import { Box, Drawer, Toolbar } from '@mui/material'
import { useAppSelector } from '../../utils/hooks/reduxHooks'
import { selectRightDrawerIsOpen, selectRightDrawerWidth } from '../../store/features/right-drawer/rightDrawerSelectors'
import FilterProductsDrawerContent from '../filter-products-drawer-content/FilterProductsDrawerContent'
import AddProductDrawerContent from '../add-product-drawer-content/AddProductDrawerContent'
import { StoreProductsFilterType } from '../../pages/main-page/MainPage'

type PropType = {
  isMyStore?: boolean | undefined
  setFilter?: (filter: StoreProductsFilterType) => void
}

function RightDrawerContainer(props: PropType) {
  const { isMyStore } = props
  const width = useAppSelector(selectRightDrawerWidth)
  const isOpen = useAppSelector(selectRightDrawerIsOpen)

  return (
    <Box component="nav" sx={{ width: { md: width }, flexShrink: { md: 0 } }} aria-label="mailbox folders">
      <Drawer
        variant="temporary"
        anchor="right"
        open={isOpen}
        ModalProps={{
          keepMounted: true
        }}
        sx={{
          display: { sm: 'block', md: 'flex' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: width
          }
        }}
      >
        {<Toolbar />}
        {isMyStore ? (
          <AddProductDrawerContent />
        ) : (
          <FilterProductsDrawerContent setFilter={props.setFilter as (filter: StoreProductsFilterType) => void} />
        )}
      </Drawer>
      <Drawer
        variant="permanent"
        anchor="right"
        sx={{
          display: { xs: 'none', sm: 'flex' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: width
          }
        }}
        open
      >
        {<Toolbar />}
        {isMyStore ? (
          <AddProductDrawerContent />
        ) : (
          <FilterProductsDrawerContent setFilter={props.setFilter as (filter: StoreProductsFilterType) => void} />
        )}
      </Drawer>
    </Box>
  )
}

export default RightDrawerContainer
