declare type StoreProductGetDto = ProductGetDto & {
  originalPrice: number
  percentDiscount: number
  business: BusinessGetDto
}
