import { useGetStoreProductsQuery } from '../../store/apis/storeProducsApi'
import DefaultErrorMessage from '../../components/default-error-message/DefaultErrorMessage'

function StoreProducts() {
  const { data, error, isLoading } = useGetStoreProductsQuery({})

  if (isLoading) return <div>Loading...</div>

  if (error) {
    console.error(error)
    return <DefaultErrorMessage message='Error loading store products' />
  }

  return (
    <div>
      <h1>Store Products</h1>
      {data?.data?.map((storeProduct) => (
        <div key={storeProduct.id}>
          {storeProduct.name} - ${storeProduct.originalPrice}
        </div>
      ))}
    </div>
  )
}

export default StoreProducts
