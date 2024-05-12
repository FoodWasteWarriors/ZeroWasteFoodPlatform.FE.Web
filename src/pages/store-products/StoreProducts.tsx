import {
  useGetStoreProductsQuery,
  useGetStoreProductsByUserIdQuery,
} from '../../store/apis/storeProducsApi'
import DefaultErrorMessage from '../../components/default-error-message/DefaultErrorMessage'
import FilterProductsDrawer from '../../components/filter-products-drawer-container/FilterProductsDrawerContainer'
import { Box, Grid, Pagination } from '@mui/material'
import StoreProductCard from '../../components/store-product-card/StoreProductCard'
import { useAppSelector } from '../../utils/hooks/reduxHooks'
import { selectFilterProductsDrawerWidth } from '../../store/features/filter-products-drawer/filterProductsDrawerSelectors'
import { useState, useEffect } from 'react'
import { useGetShoppingListQuery } from '../../store/apis/customerApi'
import { selectAuthUserId } from '../../store/features/auth/authSelectors'

type PropsType = {
  storeId: string | undefined
}

const productPerPage = 24

function StoreProducts(props: PropsType) {
  const { storeId } = props
  const userId = useAppSelector(selectAuthUserId)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  let shoppingList = [] as StoreProductGetDto[] | null

  const shoppingListData = useGetShoppingListQuery(userId!)

  if (shoppingListData.data) {
    shoppingList = shoppingListData.data.data
  }

  const allProducts = useGetStoreProductsQuery({
    pageSize: storeId ? 0 : productPerPage,
    page: currentPage,
  })

  const userProducts = useGetStoreProductsByUserIdQuery({
    pageSize: storeId ? productPerPage : 0,
    userId: storeId!,
    page: currentPage,
  })

  let error, isLoading, data

  if (storeId) {
    error = userProducts.error
    isLoading = userProducts.isLoading
    data = userProducts.data
  } else {
    error = allProducts.error
    isLoading = allProducts.isLoading
    data = allProducts.data
  }

  useEffect(() => {
    if (data) {
      setTotalPages(data.totalPageCount)
      setCurrentPage(data.currentPage)
    }
  }, [data])

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
            <StoreProductCard
              storeProduct={storeProduct}
              inTheShoppingList={shoppingList?.some(
                (p) => p.id === storeProduct.id
              )}
            />
          </Grid>
        ))}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: 3,
            padding: 2,
            width: '100%',
          }}
        >
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(_, page) => setCurrentPage(page)}
            showFirstButton
            showLastButton
          />
        </Box>
      </Grid>

      <FilterProductsDrawer />
    </Box>
  )
}

export default StoreProducts
