declare type CustomerUpdateDto = UserUpdateDto & {
  firstName?: string | null
  lastName?: string | null
  avatar?: string | null
}
