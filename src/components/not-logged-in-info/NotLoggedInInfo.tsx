import { Box, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { styled } from '@mui/system'

function NotLoggedInInfo() {
  return (
    <StyledMessageBox>
      <Typography variant='body1'>
        Please <Link to='/login'>login</Link> to access private menus!
      </Typography>
    </StyledMessageBox>
  )
}

const StyledMessageBox = styled(Box)(() => ({
  height: '100%',
  flex: 1,
  padding: '0 1.2rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
}))

export default NotLoggedInInfo
