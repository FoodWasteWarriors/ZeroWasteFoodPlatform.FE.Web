import { Box, Grid, Pagination, Stack, styled } from '@mui/material'
import { useGetShoppingListQuery } from '../../store/apis/customerApi'
import { selectAuthUserId, selectAuthUserType } from '../../store/features/auth/authSelectors'
import { useAppSelector } from '../../utils/hooks/reduxHooks'
import DefaultErrorMessage from '../default-error-message/DefaultErrorMessage'
import RightDrawerContainer from '../right-drawer-container/RightDrawerContainer'
import StoreProductCard from '../store-product-card/StoreProductCard'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { SerializedError } from '@reduxjs/toolkit'
import { selectNavMenuDrawerWidth } from '../../store/features/nav-menu-drawer/navMenuDrawerSelectors'
import { selectRightDrawerWidth } from '../../store/features/right-drawer/rightDrawerSelectors'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import UserRoles from '../../constants/userRoles'
import RecommendedCarousel from '../recommended-carousel/RecommendedCarousel'
import { StoreProductsFilterType } from '../../pages/main-page/MainPage'

type PropsType = {
  data: ServiceCollectionResponse<StoreProductGetDto> | undefined
  error: FetchBaseQueryError | SerializedError | undefined
  isLoading: boolean
  currentPage: number
  totalPages: number
  setCurrentPage: (page: number) => void
  setFilter?: (filter: StoreProductsFilterType) => void
}

function StoreProductsGrid({ data, error, isLoading, currentPage, totalPages, setCurrentPage, setFilter }: PropsType) {
  const fullUrl = window.location.href
  const loggedInUserId = useAppSelector(selectAuthUserId)
  const rightDrawerLength = useAppSelector(selectRightDrawerWidth)
  const navMenuDrawerWidth = useAppSelector(selectNavMenuDrawerWidth)
  const isMyStore = fullUrl.includes('my-products')
  const userType = useAppSelector(selectAuthUserType)

  let shoppingList = [] as StoreProductGetDto[] | null

  const shoppingListData = useGetShoppingListQuery(loggedInUserId!)

  if (shoppingListData.data) {
    shoppingList = shoppingListData.data.data
  }

  if (isLoading) return <div>Loading...</div>

  if (error) {
    return <DefaultErrorMessage message="Error loading store products" />
  }

  return (
    <Stack spacing={2}>
      <ProductsGrid navmenudrawerwidth={navMenuDrawerWidth} filterdrawerlength={rightDrawerLength}>
        {userType === UserRoles.Customer && <RecommendedCarousel />}

        {data?.data?.map((storeProduct) => (
          <Grid item xs={12} md={6} lg={4} xl={2} key={storeProduct.id}>
            <StoreProductCard
              isMyStore={isMyStore}
              storeProduct={storeProduct}
              inTheShoppingList={shoppingList?.some((p) => p.id === storeProduct.id)}
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

      <RightDrawerContainer isMyStore={isMyStore} setFilter={setFilter} />
    </Stack>
  )
}

const PaginationContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginTop: theme.spacing(3),
  padding: theme.spacing(2),
  width: '100%'
}))

export const ProductsGrid = (props: {
  navmenudrawerwidth: number
  filterdrawerlength: number
  children: React.ReactNode
}) => {
  const StyledGrid = styled(Grid)(({ theme }) => ({
    flexGrow: 1,
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: theme.spacing(2),

    [theme.breakpoints.up('xs')]: {
      width: '100%'
    },
    [theme.breakpoints.up('sm')]: {
      width: `calc(100%  - ${props.filterdrawerlength}px)`
    },
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${props.filterdrawerlength}px)`
    }
  }))

  return <StyledGrid container {...props} />
}

export default StoreProductsGrid
