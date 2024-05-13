import { ErrorOutline } from '@mui/icons-material'
import { Typography, Box, Container } from '@mui/material'
import { styled } from '@mui/system'

function NotFound() {
  return (
    <MainContainer>
      <IconWrapper>
        <ErrorOutline />
      </IconWrapper>
      <Typography variant='h5' align='center'>
        Page Not Found
      </Typography>
    </MainContainer>
  )
}

const IconWrapper = styled(Box)`
  font-size: 2rem;
  text-align: center;
`

const MainContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 180px);
`

export default NotFound
