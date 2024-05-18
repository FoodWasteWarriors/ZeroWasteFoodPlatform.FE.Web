import { Link } from '@mui/material'
import { Box, styled } from '@mui/material'

function CopyRight() {
  return (
    <CopyrightContainer>
      <Box component='span'>{`Copyright © ${new Date().getFullYear()} `}</Box>
      <Box component='span' fontWeight='bold'>
        <Link href='https://github.com/FoodWasteWarriors'>
          Food Waste Warriors
        </Link>{' '}
      </Box>
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
  fontSize: '0.8rem',
}))

export default CopyRight
