import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '..'

const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://localhost:7159/api/v1/auth',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token?.accessToken

      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }

      return headers
    },
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation<
      ServiceObjectResponse<LoginResponseDto>,
      UserLoginDto
    >({
      query: (userLoginDto) => ({
        url: '/login',
        method: 'POST',
        body: userLoginDto,
      }),
    }),
    logoutUser: builder.mutation<ServiceObjectResponse<boolean>, string>({
      query: (userId) => ({
        url: `/logout-user/${userId}`,
        method: 'POST',
      }),
    }),
    verifyCode: builder.mutation<
      ServiceObjectResponse<LoginResponseDto>,
      VerifyEmailCodeDto
    >({
      query: (verifyCodeDto) => ({
        url: '/verify-code',
        method: 'POST',
        body: verifyCodeDto,
      }),
    }),
    registerBusiness: builder.mutation<
      ServiceObjectResponse<boolean>,
      BusinessRegisterDto
    >({
      query: (businessRegisterDto) => ({
        url: '/register-business',
        method: 'POST',
        body: businessRegisterDto,
      }),
    }),
    registerCustomer: builder.mutation<
      ServiceObjectResponse<boolean>,
      CustomerRegisterDto
    >({
      query: (customerRegisterDto) => ({
        url: '/register-customer',
        method: 'POST',
        body: customerRegisterDto,
      }),
    }),
  }),
})

export const {
  useLoginUserMutation,
  useLogoutUserMutation,
  useVerifyCodeMutation,
  useRegisterBusinessMutation,
  useRegisterCustomerMutation,
} = authApi

export default authApi
