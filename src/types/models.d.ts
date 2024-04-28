declare type User = {
  id: string
  firstname: string
  lastname: string
  username: string
  email: string
  lastLoginTime: Date | null
  defaultLanguageId: string
  isLDAPUser: boolean
  isGlobalAdmin: boolean
  useMFA: boolean
}
