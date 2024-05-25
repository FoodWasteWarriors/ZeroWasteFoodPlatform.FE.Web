export function getFinalPrice(price: number, discountRate: number): number {
  const discount = price * (discountRate / 100)
  const finalPrice = price - discount
  const finalPriceString = finalPrice.toFixed(2)
  const finalPriceArray = finalPriceString.split('.')
  const decimal = Number(finalPriceArray[1])
  if (decimal === 0 || decimal === 50) {
    return finalPrice
  } else {
    if (decimal < 20) {
      finalPriceArray[1] = '00'
    } else if (decimal < 40) {
      finalPriceArray[1] = '25'
    } else if (decimal < 60) {
      finalPriceArray[1] = '50'
    } else if (decimal < 80) {
      finalPriceArray[1] = '75'
    } else {
      finalPriceArray[1] = '00'
      finalPriceArray[0] = String(Number(finalPriceArray[0]) + 1)
    }
  }

  return Number(finalPriceArray.join('.'))
}
