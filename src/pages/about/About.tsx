import { useGetStoreProductsQuery } from '../../store/apis/storeProducsApi'

function About() {
  const { data, error, isLoading } = useGetStoreProductsQuery()

  if (isLoading) return <div>Loading...</div>

  if (error) return <div>Error: {JSON.stringify(error)}</div>

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

export default About
