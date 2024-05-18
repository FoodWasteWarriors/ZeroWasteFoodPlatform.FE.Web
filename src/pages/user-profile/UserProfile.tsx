import { Container } from '@mui/material'
import ChangeUserPassword from '../../components/change-user-password/ChangeUserPassword'
import CustomerProfile from '../../components/customer-profile/CustomerProfile'
import { useAppSelector } from '../../utils/hooks/reduxHooks'
import { selectAuthUserType } from '../../store/features/auth/authSelectors'
import UserRoles from '../../constants/userRoles'
import StoreProfile from '../../components/store-profile/StoreProfile'

function UserProfile() {
  const userRole = useAppSelector(selectAuthUserType)

  let profile = null

  if (userRole === UserRoles.Customer) {
    profile = <CustomerProfile />
  } else if (userRole === UserRoles.Business) {
    profile = <StoreProfile />
  }

  return (
    <Container>
      {profile}

      <ChangeUserPassword />
    </Container>
  )
}

export default UserProfile
