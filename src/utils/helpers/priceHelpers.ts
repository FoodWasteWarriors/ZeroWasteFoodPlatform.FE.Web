export function getFinalPrice(price: number, discountRate: number): number {
  const discount = price * (discountRate / 100)
  const finalPrice = price - discount
  const finalPriceString = finalPrice.toFixed(2)
  const finalPriceArray = finalPriceString.split('.')
  const decimal = Number(finalPriceArray[1])
  if (decimal === 0 || decimal === 50) {
    return finalPrice
  } else {
    return decimal < 50
      ? Number(finalPriceArray[0] + '.00')
      : Number(finalPriceArray[0] + '.50')
  }
}
