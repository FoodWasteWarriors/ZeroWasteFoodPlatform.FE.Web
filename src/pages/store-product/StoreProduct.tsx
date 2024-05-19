import {
  Container,
  Stack,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Divider,
} from '@mui/material'
import DefaultErrorMessage from '../../components/default-error-message/DefaultErrorMessage'
import dayjs from 'dayjs'
import { useParams } from 'react-router-dom'
import { useGetCategoryListQuery } from '../../store/apis/categoryApi'
import { useGetStoreProductByIdQuery } from '../../store/apis/storeProducsApi'
import { useAppSelector } from '../../utils/hooks/reduxHooks'
import { selectThemeMode } from '../../store/features/theme/themeSelectors'
import BarcodeDisplay from '../../components/barcode-display/BarcodeDisplay'

function StoreProduct() {
  const themeMode = useAppSelector(selectThemeMode)
  const { productId } = useParams()
  const {
    data: productData,
    error: productError,
    isLoading: productIsLoading,
  } = useGetStoreProductByIdQuery(productId!)

  const {
    data: categoryData,
    error: categoryError,
    isLoading: categoryIsLoading,
  } = useGetCategoryListQuery()

  if (productIsLoading || categoryIsLoading) return <div>Loading...</div>

  if (productError || categoryError)
    return <DefaultErrorMessage message='Error loading product' />

  return (
    <Container maxWidth='md'>
      <Card sx={{ my: 8 }}>
        <Typography variant='h3' component='h1' align='center' marginTop={5}>
          {productData!.data!.name}
        </Typography>
        <CardMedia
          component='img'
          image={productData!.data!.photo}
          alt={productData!.data!.name}
          sx={{ objectFit: 'contain', maxHeight: '300px' }} // Add maxHeight to limit the image height
        />
        <Container sx={{ display: 'flex', justifyContent: 'center' }}>
          <BarcodeDisplay barcode={productData!.data!.barcode} />
        </Container>
        <CardContent>
          <Stack spacing={2}>
            <Typography variant='body1' component='div'>
              <strong>Description:</strong> {productData!.data!.description}
            </Typography>

            <Typography variant='body1' component='div'>
              <strong>Original Price:</strong> $
              {productData!.data!.originalPrice.toFixed(2)}
            </Typography>

            <Typography variant='body1' component='div'>
              <strong>Current Percent Discount:</strong>{' '}
              {productData!.data!.percentDiscount}%
            </Typography>

            <Typography variant='body1' component='div'>
              <strong>Categories:</strong>{' '}
              {categoryData!
                .data!.filter((category) =>
                  productData!.data!.categories.some(
                    (c) => c.id === category.id
                  )
                )
                .map((category) => category.name)
                .join(', ')}
            </Typography>

            <Typography variant='body1' component='div'>
              <strong>Expiration Date:</strong>{' '}
              {dayjs(productData!.data!.expirationDate).format('MMMM D, YYYY')}
            </Typography>
          </Stack>
        </CardContent>
        <Divider />
        <CardContent
          sx={{ backgroundColor: themeMode === 'light' ? '#f5f5f5' : '#333' }}
        >
          <Typography
            variant='h4'
            component='h2'
            marginBottom={2}
            align='center'
          >
            Business Info
          </Typography>
          <Stack spacing={2}>
            <Typography variant='body1' component='div'>
              <strong>Name:</strong> {productData!.data!.business.name}
            </Typography>
            <Typography variant='body1' component='div'>
              <strong>Address:</strong> {productData!.data!.business.address}
            </Typography>
            <Typography variant='body1' component='div'>
              <strong>Website:</strong> {productData!.data!.business.website}
            </Typography>
            <Typography variant='body1' component='div'>
              <strong>Description:</strong>{' '}
              {productData!.data!.business.description}
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  )
}

export default StoreProduct
