import { Avatar, Box, styled, Typography } from '@mui/material'
import { selectAuthUser } from '../../store/features/auth/authSelectors'
import { useAppSelector } from '../../utils/hooks/reduxHooks'
import { useNavigate } from 'react-router-dom'

function ProfileSection() {
  const user = useAppSelector(selectAuthUser)!
  const navigate = useNavigate()

  const handleProfileClick = () => {
    navigate(`/profile/${user.id}`)
  }

  const { username, role } = user

  return (
    <SectionContainer onClick={handleProfileClick}>
      <StyledAvatar alt={username} />

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

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 60,
  height: 60,
  margin: theme.spacing(1),
}))

export default ProfileSection
