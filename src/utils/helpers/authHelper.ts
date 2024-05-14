import loggedInUserActions from '../../constants/loggedInUserActions'
import { selectAuthUserType } from '../../store/features/auth/authSelectors'
import { useAppSelector } from '../hooks/reduxHooks'

export function IsAuthorized(path: string) {
  const userRole = useAppSelector(selectAuthUserType)

  if (!userRole) return false

  const accessibleMenus = loggedInUserActions[userRole] as SideMenuItem[]

  return accessibleMenus.some((menu) => menu.to === path)
}
