import { Box, Grid, Pagination, styled } from '@mui/material'
import { useEffect, useState } from 'react'
import DefaultErrorMessage from '../../components/default-error-message/DefaultErrorMessage'
import FilterProductsDrawer from '../../components/filter-products-drawer-container/FilterProductsDrawerContainer'
import StoreProductCard from '../../components/store-product-card/StoreProductCard'
import { useGetShoppingListQuery } from '../../store/apis/customerApi'
import {
  useGetStoreProductsByUserIdQuery,
  useGetStoreProductsQuery,
} from '../../store/apis/storeProducsApi'
import { selectAuthUserId } from '../../store/features/auth/authSelectors'
import { selectFilterProductsDrawerWidth } from '../../store/features/filter-products-drawer/filterProductsDrawerSelectors'
import { useAppSelector } from '../../utils/hooks/reduxHooks'

type PropsType = {
  storeId: string
}

const productPerPage = 24

function StoreProducts({ storeId }: PropsType) {
  const loggedInUserId = useAppSelector(selectAuthUserId)
  const filterDrawerLength = useAppSelector(selectFilterProductsDrawerWidth)
  const navMenuDrawerWidth = useAppSelector(selectFilterProductsDrawerWidth)

  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  let shoppingList = [] as StoreProductGetDto[] | null

  const shoppingListData = useGetShoppingListQuery(loggedInUserId!)

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

  if (isLoading) return <div>Loading...</div>

  if (error) {
    console.error(error)
    return <DefaultErrorMessage message='Error loading store products' />
  }

  return (
    <Box>
      <ProductsGrid
        navMenuDrawerWidth={navMenuDrawerWidth}
        filterDrawerLength={filterDrawerLength}
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
        <PaginationContainer>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(_, page) => setCurrentPage(page)}
            showFirstButton
            showLastButton
          />
        </PaginationContainer>
      </ProductsGrid>

      <FilterProductsDrawer />
    </Box>
  )
}

const PaginationContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginTop: theme.spacing(3),
  padding: theme.spacing(2),
  width: '100%',
}))

const ProductsGrid = (props: {
  navMenuDrawerWidth: number
  filterDrawerLength: number
  children: React.ReactNode
}) => {
  const StyledGrid = styled(Grid)(({ theme }) => ({
    flexGrow: 1,
    [theme.breakpoints.up('xs')]: {
      width: '100%',
    },
    [theme.breakpoints.up('sm')]: {
      width: `calc(130% - ${props.navMenuDrawerWidth}px)`,
    },
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${props.filterDrawerLength}px)`,
    },
  }))

  return <StyledGrid spacing={2} container {...props} />
}

export default StoreProducts
