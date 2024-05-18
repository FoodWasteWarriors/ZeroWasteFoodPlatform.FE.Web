import { Box } from '@mui/material'
import { useParams } from 'react-router-dom'

import StoreInfo from '../../components/store-info/StoreInfo'
import StoreProductsGrid from '../../components/store-products-grid/StoreProductsGrid'
import { useEffect, useState } from 'react'
import { useGetStoreProductsByUserIdQuery } from '../../store/apis/storeProducsApi'
import { useAppSelector } from '../../utils/hooks/reduxHooks'
import { selectAuthUserId } from '../../store/features/auth/authSelectors'

const productPerPage = 12

function Store() {
  const loggedInUserId = useAppSelector(selectAuthUserId)
  const { storeId } = useParams()
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const activeId = storeId || loggedInUserId

  const { data, error, isLoading } = useGetStoreProductsByUserIdQuery({
    pageSize: storeId ? productPerPage : 0,
    userId: activeId!,
    page: currentPage,
  })

  useEffect(() => {
    if (data) {
      setTotalPages(data.totalPageCount)
    }
  }, [data])

  return (
    <Box>
      <StoreInfo storeId={activeId!} />
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
