import { Container } from '@mui/material'
import ChangeUserPassword from '../../components/change-user-password/ChangeUserPassword'
import CustomerProfile from '../../components/customer-profile/CustomerProfile'

function UserProfile() {
  return (
    <Container>
      <CustomerProfile />

      <ChangeUserPassword />
    </Container>
  )
}

export default UserProfile
