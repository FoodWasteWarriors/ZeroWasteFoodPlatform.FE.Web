import { RootState } from '../..'
import { createSelector } from '@reduxjs/toolkit'

export const selectAuth = (state: RootState) => state.auth

export const selectAuthIsAuthenticated = createSelector(
  selectAuth,
  (auth) => auth.isAuthenticated
)

export const selectAuthUser = createSelector(selectAuth, (auth) => auth.user)

export const selectAuthUserId = createSelector(
  selectAuth,
  (auth) => auth.user?.id
)

export const selectAuthUserType = createSelector(
  selectAuth,
  (auth) => auth.user?.role
)

export const selectAuthTokenObject = createSelector(
  selectAuth,
  (auth) => auth.token
)

export const selectAuthAccessToken = createSelector(
  selectAuth,
  (auth) => auth.token?.accessToken
)
