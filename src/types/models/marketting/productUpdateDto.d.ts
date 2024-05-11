declare type ProductUpdateDto = {
  id: string
  name?: string | null
  description?: string | null
  photo?: string | null
  expirationDate?: string | null // Assuming DateTime? is serialized as string or null
  categoryIds?: string[] | null
}
