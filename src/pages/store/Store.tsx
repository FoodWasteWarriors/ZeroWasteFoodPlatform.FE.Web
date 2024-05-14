import { Box } from '@mui/material'
import { useParams } from 'react-router-dom'

import StoreInfo from '../../components/store-info/StoreInfo'
import StoreProductsGrid from '../../components/store-products-grid/StoreProductsGrid'
import { useEffect, useState } from 'react'
import { useGetStoreProductsByUserIdQuery } from '../../store/apis/storeProducsApi'

const productPerPage = 12

function Store() {
  const { storeId } = useParams()
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const { data, error, isLoading } = useGetStoreProductsByUserIdQuery({
    pageSize: storeId ? productPerPage : 0,
    userId: storeId!,
    page: currentPage,
  })

  useEffect(() => {
    if (data) {
      setTotalPages(data.totalPageCount)
    }
  }, [data])

  return (
    <Box>
      <StoreInfo storeId={storeId!} />
      <StoreProductsGrid
        data={data}
        error={error}
        isLoading={isLoading}
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </Box>
  )
}

export default Store
