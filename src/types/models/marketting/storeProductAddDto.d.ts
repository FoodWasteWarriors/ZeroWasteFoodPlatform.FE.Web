declare type StoreProductAddDto = ProductAddDto & {
  originalPrice: number
  percentDiscount: number
}
