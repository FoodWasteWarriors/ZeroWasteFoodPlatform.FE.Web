declare type StoreProductUpdateDto = ProductUpdateDto & {
  originalPrice?: number | null
  percentDiscount?: number | null
}
