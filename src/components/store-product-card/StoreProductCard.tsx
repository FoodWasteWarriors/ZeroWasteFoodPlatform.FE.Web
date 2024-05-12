import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Box,
} from '@mui/material'
import { getFinalPrice } from '../../utils/helpers/priceHelpers'
import { getFormattedDate } from '../../utils/helpers/dateTimeHelpers'
import { Favorite } from '@mui/icons-material'
import SellIcon from '@mui/icons-material/Sell'
import { useState } from 'react'
import { Link } from 'react-router-dom'

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

  const discountRate = storeProduct.percentDiscount
    ? `${storeProduct.percentDiscount}% OFF`
    : null

  return (
    <Card sx={{ position: 'relative', paddingBottom: '24px' }}>
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
        <Box
          sx={{
            position: 'absolute',
            fontSize: '15x',
            top: '8px',
            right: '8px',
            backgroundColor: 'rgba(255, 00, 160, 0.7)',
            color: 'white',
            padding: '4px',
            fontWeight: 'bold',
            borderRadius: '4px',
          }}
        >
          <SellIcon fontSize='inherit' />
          {discountRate}
        </Box>
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
        <Box
          fontSize={18}
          sx={{
            position: 'absolute',
            bottom: '8px',
            left: '15px',
            display: 'flex',
          }}
        >
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
        </Box>
      </CardContent>
      <IconButton
        style={{
          position: 'absolute',
          bottom: '2px',
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
