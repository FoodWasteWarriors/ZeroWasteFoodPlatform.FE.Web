declare type BusinessUpdateDto = UserUpdateDto & {
  address?: string | null
  name?: string | null
  website?: string | null
  description?: string | null
  logo?: string | null
  coverPhoto?: string | null
}
