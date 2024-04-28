import { Link, Typography } from '@mui/material'
import { Box, styled } from '@mui/material'

function CopyRight() {
  return (
    <CopyrightContainer>
      <Typography variant='body2' align='center'>
        {`Copyright © ${new Date().getFullYear()} `}
        <Link href='https://github.com/FoodWasteWarriors'>
          Food Waste Warriors
        </Link>{' '}
      </Typography>
    </CopyrightContainer>
  )
}

const CopyrightContainer = styled(Box)(({ theme }) => ({
  height: '70px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  color: theme.palette.text.secondary,
}))

export default CopyRight
