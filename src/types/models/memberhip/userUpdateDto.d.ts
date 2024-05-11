declare type UserUpdateDto = {
  id: string
  username?: string | null
  email?: string | null
  phoneNumber?: string | null
  useMultiFactorAuthentication?: string | null
}
