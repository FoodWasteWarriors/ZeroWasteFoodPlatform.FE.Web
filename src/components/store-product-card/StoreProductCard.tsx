import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
} from '@mui/material'
import { getFinalPrice } from '../../utils/helpers/priceHelpers'
import { getFormattedDate } from '../../utils/helpers/dateTimeHelpers'
import { Favorite } from '@mui/icons-material'
import { useState } from 'react'

type PropType = {
  storeProduct: StoreProductGetDto
}

function StoreProductCard(props: PropType) {
  const { storeProduct } = props

  const finalPrice = getFinalPrice(
    storeProduct.originalPrice,
    storeProduct.percentDiscount
  )

  const [isFavorite, setIsFavorite] = useState(false)

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite)
  }

  return (
    <Card sx={{ position: 'relative', paddingBottom: '24px' }}>
      <CardMedia
        component='img'
        alt={storeProduct.name}
        height='140'
        image={storeProduct.photo}
        title={storeProduct.name}
      />
      <CardContent>
        <Typography variant='h5' component='h2'>
          {storeProduct.name}
        </Typography>
        <Typography variant='body1' color='textSecondary'>
          Price with Discount: $
          {finalPrice.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </Typography>
        {storeProduct.expirationDate && (
          <Typography variant='body1' color='textSecondary'>
            Expiration Date: {getFormattedDate(storeProduct.expirationDate)}
          </Typography>
        )}
        <Typography variant='body1' color='textSecondary'>
          Avaible In: {storeProduct.business.name}
        </Typography>
      </CardContent>
      <IconButton
        style={{
          position: 'absolute',
          bottom: '8px',
          right: '8px',
          color: isFavorite ? 'red' : 'silver',
        }}
        aria-label='favorite'
        onClick={handleFavoriteClick}
      >
        <Favorite />
      </IconButton>
    </Card>
  )
}

export default StoreProductCard
