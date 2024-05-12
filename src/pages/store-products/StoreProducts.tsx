import { useGetStoreProductsQuery } from '../../store/apis/storeProducsApi'
import DefaultErrorMessage from '../../components/default-error-message/DefaultErrorMessage'
import FilterProductsDrawer from '../../components/filter-products-drawer-container/FilterProductsDrawerContainer'
import { Box, Grid } from '@mui/material'
import StoreProductCard from '../../components/store-product-card/StoreProductCard'
import { useAppSelector } from '../../utils/hooks/reduxHooks'
import { selectFilterProductsDrawerWidth } from '../../store/features/filter-products-drawer/filterProductsDrawerSelectors'

function StoreProducts() {
  const { data, error, isLoading } = useGetStoreProductsQuery({})
  const filterDrawerLength = useAppSelector(selectFilterProductsDrawerWidth)
  const navMenuDrawerWidth = useAppSelector(selectFilterProductsDrawerWidth)

  if (isLoading) return <div>Loading...</div>

  if (error) {
    console.error(error)
    return <DefaultErrorMessage message='Error loading store products' />
  }

  return (
    <Box>
      <Grid
        container
        spacing={2}
        sx={{
          flexGrow: 1,
          width: {
            xs: '100%',
            sm: `calc(130% - ${navMenuDrawerWidth}px)`,
            md: `calc(100% - ${filterDrawerLength}px)`,
          },
        }}
      >
        {data?.data?.map((storeProduct) => (
          <Grid item xs={12} sm={8} md={6} lg={4} xl={2} key={storeProduct.id}>
            <StoreProductCard storeProduct={storeProduct} />
          </Grid>
        ))}
      </Grid>

      <FilterProductsDrawer />
    </Box>
  )
}

export default StoreProducts
