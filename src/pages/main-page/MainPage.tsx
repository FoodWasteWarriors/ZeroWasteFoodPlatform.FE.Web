import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import StoreProductsGrid from '../../components/store-products-grid/StoreProductsGrid'
import { useGetStoreProductsQuery } from '../../store/apis/storeProducsApi'


const productPerPage = 24

function MainPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const { data, error, isLoading } = useGetStoreProductsQuery({
    pageSize: productPerPage,
    page: currentPage
  })

  useEffect(() => {
    if (data) {
      setTotalPages(data.totalPageCount)
    }
  }, [data])

  return (
    <Box>
      
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

export default MainPage
