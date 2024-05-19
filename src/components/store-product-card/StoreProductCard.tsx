import { Edit, Favorite } from '@mui/icons-material'
import SellIcon from '@mui/icons-material/Sell'
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  styled,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import UserRoles from '../../constants/userRoles'
import {
  useAddToShoppingListMutation,
  useRemoveFromShoppingListMutation,
} from '../../store/apis/storeProducsApi'
import { selectAuthUserType } from '../../store/features/auth/authSelectors'
import { getFormattedDate } from '../../utils/helpers/dateTimeHelpers'
import { getFinalPrice } from '../../utils/helpers/priceHelpers'
import { useAppSelector } from '../../utils/hooks/reduxHooks'
import YouMustLoginDialog from '../you-must-login-dialog/YouMustLoginDialog'

type PropType = {
  storeProduct: StoreProductGetDto
  inTheShoppingList: boolean | undefined
  isMyStore?: boolean
}

function StoreProductCard(props: PropType) {
  const { storeProduct, inTheShoppingList, isMyStore } = props
  const [isFavorite, setIsFavorite] = useState(inTheShoppingList)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const role = useAppSelector(selectAuthUserType)
  const navigate = useNavigate()

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
    if (!role) {
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

  const handleEditClick = () => {
    navigate(`/edit-product/${storeProduct.id}`)
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
      
      {role === UserRoles.Customer && (
        <IconButtonContainer
          isFavorite={isFavorite}
          onClick={handleFavoriteClick}
        >
          <Favorite />
        </IconButtonContainer>
      )}

      {isMyStore && (
        <IconButtonContainer onClick={handleEditClick}>
          <Edit />
        </IconButtonContainer>
      )}

      <YouMustLoginDialog isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} />
    </ProductCard>
  )
}

export const ProductCard = styled(Card)(() => ({
  paddingBottom: '24px',
  position: 'relative',
  '&:hover': {
    boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.2)',
  },
}))

const IconButtonContainer = (props: {
  isFavorite?: boolean | undefined
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
