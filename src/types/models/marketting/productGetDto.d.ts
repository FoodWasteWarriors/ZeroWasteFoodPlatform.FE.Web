declare type ProductGetDto = {
  id: string
  name: string
  description: string
  photo: string
  expirationDate?: string | null // Assuming DateTime? is serialized as string or null
  categories: CategoryGetDto[]
}
