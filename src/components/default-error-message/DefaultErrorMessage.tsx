import { Box, Typography } from '@mui/material'
import { ErrorOutline } from '@mui/icons-material'

function DefaultErrorMessage({ message }: { message: string }) {
  return (
    <Box display='flex' alignItems='center'>
      <ErrorOutline color='error' sx={{ fontSize: '1.8  rem' }} />
      <Typography
        color='error'
        variant='h5'
        sx={{ ml: 1, fontSize: '1.3rem', pt: 0.5 }}
      >
        {message}
      </Typography>
    </Box>
  )
}

export default DefaultErrorMessage
