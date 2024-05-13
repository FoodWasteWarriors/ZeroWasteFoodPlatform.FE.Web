import { Box } from '@mui/material'
import { useParams } from 'react-router-dom'

import StoreProducts from '../store-products/StoreProducts'
import StoreInfo from '../../components/store-info/StoreInfo'

function Store() {
  const { storeId } = useParams()

  return (
    <Box>
      <StoreInfo storeId={storeId!} />
      <StoreProducts storeId={storeId!} />
    </Box>
  )
}

export default Store
