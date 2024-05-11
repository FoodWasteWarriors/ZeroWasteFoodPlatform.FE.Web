declare type Token = {
  accessToken: string
  expirationTime: string // Assuming DateTime is serialized as string in ISO 8601 format
  refreshToken?: string | null
}
