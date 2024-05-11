declare type StoreProduct = {
  id: string
  name: string
  description: string
  photo: string
  expirationDate: Date
  originalPrice: number
  percentDiscount: number
  business: Business | null
  category: Category | null
}

declare type Category = {
  id: string
  name: string
  description: string | null
  photo: string
}

declare type Business = {
  id: string
  name: string
  address: string
  website: string | null
  description: string | null
  logo: string
  coverPhoto: string | null
  userName: string
  email: string
  phoneNumber: string
  useMultiFactorAuthentication: boolean
  role: UserRole
  emailVerified: boolean
  phoneNumberVerified: boolean
  lastLoginTime: Date
}
