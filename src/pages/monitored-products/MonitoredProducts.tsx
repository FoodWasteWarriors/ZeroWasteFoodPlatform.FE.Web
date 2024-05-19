import { Box, Button, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material'
import DefaultErrorMessage from '../../components/default-error-message/DefaultErrorMessage'
import { getFormattedDate } from '../../utils/helpers/dateTimeHelpers'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useGetMonitoredProductsQuery, useDeleteMonitoredProductMutation } from '../../store/apis/monitoredProducsApi'
import { useAppSelector } from '../../utils/hooks/reduxHooks'
import { ProductsGrid } from '../../components/store-products-grid/StoreProductsGrid'
import { selectNavMenuDrawerWidth } from '../../store/features/nav-menu-drawer/navMenuDrawerSelectors'

function MonitoredProducts() {
  const { data, error, isLoading } = useGetMonitoredProductsQuery({
    page: 1,
    pageSize: 100
  })
  const [deleteMonitoredProduct] = useDeleteMonitoredProductMutation()
  const [orderBy] = useState<string>('name')
  const [order] = useState<'asc' | 'desc'>('asc')
  const navMenuDrawerWidth = useAppSelector(selectNavMenuDrawerWidth)
  const [deletedIds, setDeletedIds] = useState<string[]>([])

  const sortedData = useMemo(() => {
    if (data) {
      return [...data.data!].sort((a: any, b: any) => {
        let comparison = 0
        if (a[orderBy] > b[orderBy]) {
          comparison = 1
        } else if (a[orderBy] < b[orderBy]) {
          comparison = -1
        }
        return order === 'desc' ? comparison * -1 : comparison
      })
    }
    return []
  }, [data, orderBy, order])

  if (isLoading) return <div>Loading...</div>

  if (error) return <DefaultErrorMessage message="Error loading shopping list" />

  return (
    <Container>
      <Typography variant="h4" gutterBottom align="center" margin={2}>
        Monitored Products
      </Typography>

      <ProductsGrid navmenudrawerwidth={navMenuDrawerWidth} filterdrawerlength={0}>
        {sortedData
          .filter((monitoredProduct) => !deletedIds.includes(monitoredProduct.id))
          .map((monitoredProduct) => (
            <Grid item xs={12} sm={8} md={6} lg={4} xl={3} key={monitoredProduct.id}>
              <Box
                display="flex"
                alignContent="space-between"
                justifyContent="space-between"
                flexDirection="column"
                height={400}
              >
                <Link to={`/store/${monitoredProduct.barcode}`}>
                  <CardMedia component="img" height="140" image={monitoredProduct.photo} alt={monitoredProduct.name} />
                </Link>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    {monitoredProduct.name}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {monitoredProduct.description}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {getFormattedDate(monitoredProduct.expirationDate!)}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      deleteMonitoredProduct(monitoredProduct.id)

                      setDeletedIds([...deletedIds, monitoredProduct.id])
                    }}
                  >
                    Remove
                  </Button>
                </CardContent>
              </Box>
            </Grid>
          ))}
      </ProductsGrid>
    </Container>
  )
}

export default MonitoredProducts
