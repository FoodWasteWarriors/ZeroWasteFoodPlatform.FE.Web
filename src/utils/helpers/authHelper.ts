import roleAccesses from '../../constants/roleAccesses'
import { selectAuthUserType } from '../../store/features/auth/authSelectors'
import { useAppSelector } from '../hooks/reduxHooks'

export function IsAuthorized(path: string) {
  const userRole = useAppSelector(selectAuthUserType)

  if (!userRole) return false

  const accessibleMenus = roleAccesses[userRole] as string[]

  return accessibleMenus.includes(path)
}
