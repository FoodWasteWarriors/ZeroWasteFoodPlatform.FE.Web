import { Grid, Stack, Typography } from '@mui/material'
import { Carousel } from 'react-responsive-carousel'
import { Link } from 'react-router-dom'
import { useGetRecommendedProductsQuery } from '../../store/apis/recommendationApi'

const RecommendedCarousel = () => {
  const { data } = useGetRecommendedProductsQuery()

  return (
    <Grid
      item
      xs={12}
      sm={12}
      md={12}
      lg={12}
      xl={12}
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}
    >
      <Stack spacing={2}>
        <Typography variant="h4" align="center" gutterBottom>
          Recommended Products
        </Typography>
        <Carousel showThumbs={false} showArrows width={350} swipeable={true} infiniteLoop autoPlay>
          {data?.data?.map((storeProduct) => (
            <Link to={`/product/${storeProduct?.id ?? 'default'}`} key={storeProduct?.id ?? 'default'}>
              <div key={storeProduct?.id ?? 'default'}>
                <img
                  style={{
                    aspectRatio: '1/1',
                    maxWidth: '300px',
                    maxHeight: '300px'
                  }}
                  src={storeProduct?.photo ?? 'https://www.4me.com/wp-content/uploads/2018/01/4me-icon-product.png'}
                  alt={storeProduct?.name ?? 'product'}
                />
                <p className="legend">{storeProduct?.name ?? 'product'}</p>
              </div>
            </Link>
          ))}
        </Carousel>
      </Stack>
    </Grid>
  )
}

export default RecommendedCarousel
