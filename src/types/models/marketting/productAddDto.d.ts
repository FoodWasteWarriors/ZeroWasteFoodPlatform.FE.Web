declare type ProductAddDto = {
  name: string
  description: string
  photo?: string | null
  expirationDate: string // Assuming DateTime is serialized as string in ISO 8601 format
  categoriesIds: string[]
}
