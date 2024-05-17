import { Avatar, Box, styled, Typography } from '@mui/material'
import { selectAuthUser } from '../../store/features/auth/authSelectors'
import { useAppSelector } from '../../utils/hooks/reduxHooks'
import UserRoles from '../../constants/userRoles'
import { useNavigate } from 'react-router-dom'

function ProfileSection() {
  const user = useAppSelector(selectAuthUser)!
  const navigate = useNavigate()
  let photoUrl = ''

  const handleProfileClick = () => {
    navigate(`/profile/${user.id}`)
  }

  const { username, role } = user

  if (role == UserRoles.Customer) {
    photoUrl = (user as CustomerGetDto).avatar
  } else if (role == UserRoles.Business) {
    photoUrl = (user as BusinessGetDto).logo
  }

  return (
    <SectionContainer onClick={handleProfileClick}>
      <Avatar
        alt={username}
        src={photoUrl}
        sx={{ width: 60, height: 60, my: 1 }}
      />

      <Box marginTop={1} fontWeight='bold'>
        {username}
      </Box>

      <Typography variant='body2' color='textSecondary'>
        {role}
      </Typography>
    </SectionContainer>
  )
}

const SectionContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '1rem',
  cursor: 'pointer',
}))

export default ProfileSection
