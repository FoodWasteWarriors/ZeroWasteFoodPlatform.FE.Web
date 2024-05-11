declare type BusinessGetDto = UserGetDto & {
  address: string
  name: string
  website?: string | null
  description?: string | null
  logo: string
  coverPhoto?: string | null
}
