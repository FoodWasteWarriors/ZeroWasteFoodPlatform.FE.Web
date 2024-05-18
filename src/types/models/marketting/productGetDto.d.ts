declare type ProductGetDto = {
  id: string
  name: string
  description: string
  photo: string
  expirationDate?: Date | null
  categories: CategoryGetDto[]
}
