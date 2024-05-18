declare type ProductAddDto = {
  name: string
  description: string
  photo?: string | null
  expirationDate: Date
  categoriesIds: string[]
}
