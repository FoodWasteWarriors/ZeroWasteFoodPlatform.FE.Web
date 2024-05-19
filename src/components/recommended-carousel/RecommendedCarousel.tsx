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
        <Typography variant="h3" align="center" gutterBottom>
          Recommended Products
        </Typography>
        <Carousel showThumbs={false} showArrows width={350} swipeable={true} infiniteLoop autoPlay>
          {data?.data?.map((storeProduct) => (
            <Link to={`/product/${storeProduct.id}`} key={storeProduct.id}>
              <div key={storeProduct.id}>
                <img
                  style={{
                    aspectRatio: '1/1',
                    maxWidth: '300px',
                    maxHeight: '300px'
                  }}
                  src={storeProduct.photo}
                  alt={storeProduct.name}
                />
                <p className="legend">{storeProduct.name}</p>
              </div>
            </Link>
          ))}
        </Carousel>
      </Stack>
    </Grid>
  )
}

export default RecommendedCarousel
function useAppSelector(selectAuthUserType: any) {
  throw new Error('Function not implemented.')
}

