declare type ProductUpdateDto = {
  id: string
  name?: string | null
  description?: string | null
  photo?: string | null
  expirationDate?: Date | null
  categoryIds?: string[] | null
}
