import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import StoreProductsGrid from '../../components/store-products-grid/StoreProductsGrid'
import { useGetStoreProductsQuery } from '../../store/apis/storeProducsApi'

const productPerPage = 24

export type StoreProductsFilterType = {
  nameQuery?: string
  percentDiscountHigh?: number
  percentDiscountLow?: number
  originalPriceHigh?: number
  originalPriceLow?: number
  sortBy?: 'name' | 'price' | 'discount'
  categoryIds?: string[]
  storeIds?: string[]
}

function MainPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [filter, setFilter] = useState<StoreProductsFilterType>({})

  const { data, error, isLoading, refetch } = useGetStoreProductsQuery({
    pageSize: productPerPage,
    page: currentPage,
    percentDiscountLow: filter.percentDiscountLow,
    percentDiscountHigh: filter.percentDiscountHigh,
    originalPriceLow: filter.originalPriceLow,
    originalPriceHigh: filter.originalPriceHigh,
    sortBy: filter.sortBy,
    nameQuery: filter.nameQuery,
    categoryIds: filter.categoryIds ? filter.categoryIds.join(',') : undefined,
    storeIds: filter.storeIds ? filter.storeIds.join(',') : undefined
  })

  useEffect(() => {
    if (data) {
      setTotalPages(data.totalPageCount)
    }
  }, [data])

  useEffect(() => {
    setCurrentPage(1)
    console.log(filter)
    refetch()
  }, [filter, refetch])

  return (
    <Box>
      <StoreProductsGrid
        data={data}
        error={error}
        isLoading={isLoading}
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setFilter={setFilter}
      />
    </Box>
  )
}

export default MainPage
