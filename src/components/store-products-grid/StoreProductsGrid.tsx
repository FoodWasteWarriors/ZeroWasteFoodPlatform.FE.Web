import { Box, Grid, Pagination, styled } from '@mui/material'
import { useGetShoppingListQuery } from '../../store/apis/customerApi'
import { selectAuthUserId } from '../../store/features/auth/authSelectors'
import { selectFilterProductsDrawerWidth } from '../../store/features/filter-products-drawer/filterProductsDrawerSelectors'
import { useAppSelector } from '../../utils/hooks/reduxHooks'
import DefaultErrorMessage from '../default-error-message/DefaultErrorMessage'
import FilterProductsDrawerContainer from '../filter-products-drawer-container/FilterProductsDrawerContainer'
import StoreProductCard from '../store-product-card/StoreProductCard'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { SerializedError } from '@reduxjs/toolkit'

type PropsType = {
  data: ServiceCollectionResponse<StoreProductGetDto> | undefined
  error: FetchBaseQueryError | SerializedError | undefined
  isLoading: boolean
  currentPage: number
  totalPages: number
  setCurrentPage: (page: number) => void
}

function StoreProductsGrid({
  data,
  error,
  isLoading,
  currentPage,
  totalPages,
  setCurrentPage,
}: PropsType) {
  const fullUrl = window.location.href
  const loggedInUserId = useAppSelector(selectAuthUserId)
  const filterDrawerLength = useAppSelector(selectFilterProductsDrawerWidth)
  const navMenuDrawerWidth = useAppSelector(selectFilterProductsDrawerWidth)
  const isMyStore = fullUrl.includes('my-products')

  let shoppingList = [] as StoreProductGetDto[] | null

  const shoppingListData = useGetShoppingListQuery(loggedInUserId!)

  if (shoppingListData.data) {
    shoppingList = shoppingListData.data.data
  }

  if (isLoading) return <div>Loading...</div>

  if (error) {
    return <DefaultErrorMessage message='Error loading store products' />
  }

  return (
    <Box>
      <ProductsGrid
        navmenudrawerwidth={navMenuDrawerWidth}
        filterdrawerlength={filterDrawerLength}
      >
        {data?.data?.map((storeProduct) => (
          <Grid item xs={12} sm={8} md={6} lg={4} xl={2} key={storeProduct.id}>
            <StoreProductCard
              isMyStore={isMyStore}
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

      {!isMyStore && <FilterProductsDrawerContainer />}
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
  navmenudrawerwidth: number
  filterdrawerlength: number
  children: React.ReactNode
}) => {
  const StyledGrid = styled(Grid)(({ theme }) => ({
    flexGrow: 1,
    [theme.breakpoints.up('xs')]: {
      width: '100%',
    },
    [theme.breakpoints.up('sm')]: {
      width: `calc(130% - ${props.navmenudrawerwidth}px)`,
    },
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${props.filterdrawerlength}px)`,
    },
  }))

  return <StyledGrid spacing={2} container {...props} />
}

export default StoreProductsGrid
