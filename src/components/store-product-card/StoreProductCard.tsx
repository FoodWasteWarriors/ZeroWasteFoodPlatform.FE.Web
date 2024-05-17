import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Box,
  styled,
} from '@mui/material'
import { getFinalPrice } from '../../utils/helpers/priceHelpers'
import { getFormattedDate } from '../../utils/helpers/dateTimeHelpers'
import { Favorite } from '@mui/icons-material'
import SellIcon from '@mui/icons-material/Sell'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { selectAuthIsAuthenticated } from '../../store/features/auth/authSelectors'
import YouMustLoginDialog from '../you-must-login-dialog/YouMustLoginDialog'
import { useAppSelector } from '../../utils/hooks/reduxHooks'
import {
  useAddToShoppingListMutation,
  useRemoveFromShoppingListMutation,
} from '../../store/apis/storeProducsApi'

type PropType = {
  storeProduct: StoreProductGetDto
  inTheShoppingList: boolean | undefined
}

function StoreProductCard(props: PropType) {
  const { storeProduct, inTheShoppingList } = props
  const [isFavorite, setIsFavorite] = useState(inTheShoppingList)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const isAuthenticated = useAppSelector(selectAuthIsAuthenticated)

  const finalPrice = getFinalPrice(
    storeProduct.originalPrice,
    storeProduct.percentDiscount
  )

  const [addToShoppingList] = useAddToShoppingListMutation()
  const [removeFromShoppingList] = useRemoveFromShoppingListMutation()

  useEffect(() => {
    setIsFavorite(inTheShoppingList)
  }, [inTheShoppingList])

  const handleFavoriteClick = () => {
    if (!isAuthenticated) {
      setIsDialogOpen(true)
      return
    }

    if (isFavorite) {
      removeFromShoppingList({ productId: storeProduct.id })
      setIsFavorite(false)
    } else {
      addToShoppingList({ productId: storeProduct.id })
      setIsFavorite(true)
    }
  }

  const discountRate = storeProduct.percentDiscount
    ? `${storeProduct.percentDiscount}% OFF`
    : null

  return (
    <ProductCard>
      <Link to={`/store/${storeProduct.business.id}`}>
        <Typography
          variant='body1'
          color='textSecondary'
          fontWeight={900}
          p={1}
          sx={{ '&:hover': { textDecoration: 'underline' } }}
        >
          {storeProduct.business.name}
        </Typography>
      </Link>
      <CardMedia
        component='img'
        alt={storeProduct.name}
        height='140'
        image={storeProduct.photo}
        title={storeProduct.name}
      />
      {discountRate && (
        <DiscountRateContainer>
          <SellIcon fontSize='inherit' />
          {discountRate}
        </DiscountRateContainer>
      )}
      <CardContent>
        <Typography variant='h5' component='h2' fontSize={20}>
          {storeProduct.name}
        </Typography>
        {storeProduct.expirationDate && (
          <Typography variant='body2' color='textSecondary' marginBottom={1}>
            Expires In: {getFormattedDate(storeProduct.expirationDate)}
          </Typography>
        )}
        <LowerCardBody>
          <Typography
            variant='h6'
            color='textSecondary'
            sx={{
              textDecoration: 'line-through',
              fontSize: '14px',
            }}
          >
            ${storeProduct.originalPrice.toFixed(2)}
          </Typography>
          <Typography
            variant='h6'
            component='h3'
            color={'primary'}
            sx={{ marginLeft: '4px', fontSize: '22px' }}
          >
            ${finalPrice.toFixed(2)}
          </Typography>
        </LowerCardBody>
      </CardContent>
      <FavIconButton isFavorite={isFavorite} onClick={handleFavoriteClick}>
        <Favorite />
      </FavIconButton>

      <YouMustLoginDialog isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} />
    </ProductCard>
  )
}

const ProductCard = styled(Card)(() => ({
  paddingBottom: '24px',
  position: 'relative',
  '&:hover': {
    boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.2)',
  },
}))

const FavIconButton = (props: {
  isFavorite: boolean | undefined
  children: React.ReactNode
  onClick: () => void
}) => {
  const StyledIconButton = styled(IconButton)(() => ({
    position: 'absolute',
    bottom: '2px',
    right: '8px',
    color: props.isFavorite ? 'red' : 'silver',
  }))

  return (
    <StyledIconButton aria-label='favorite' onClick={props.onClick}>
      {props.children}
    </StyledIconButton>
  )
}

const LowerCardBody = styled(Box)(() => ({
  position: 'absolute',
  bottom: '8px',
  left: '15px',
  display: 'flex',
  fontSize: '18px',
}))

const DiscountRateContainer = styled(Box)(() => ({
  position: 'absolute',
  top: '8px',
  right: '8px',
  backgroundColor: 'rgba(255, 00, 160, 0.7)',
  color: 'white',
  padding: '4px',
  fontWeight: 'bold',
  borderRadius: '4px',
}))

export default StoreProductCard
