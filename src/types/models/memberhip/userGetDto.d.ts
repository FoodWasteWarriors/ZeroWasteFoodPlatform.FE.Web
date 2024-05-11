declare type UserGetDto = {
  id: string
  username: string
  email: string
  phoneNumber: string
  useMultiFactorAuthentication: string
  role: UserRole
  emailVerified: boolean
  phoneNumberVerified: boolean
  lastLoginTime: string
}
