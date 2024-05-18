import { useState } from 'react'
import { useAppSelector } from '../../utils/hooks/reduxHooks'
import { Navigate } from 'react-router-dom'
import { selectAuthIsAuthenticated } from '../../store/features/auth/authSelectors'
import {
  Container,
  FormControl,
  FormLabel,
  MenuItem,
  OutlinedInput,
  Select,
  styled,
} from '@mui/material'

function Register() {
  const isLoggedIn = useAppSelector(selectAuthIsAuthenticated)
  const [registerType, setRegisterType] = useState<'store' | 'customer'>(
    'customer'
  )

  const handleRegisterTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRegisterType(event.target.value as 'store' | 'customer')
  }

  if (isLoggedIn) {
    return <Navigate to='/' />
  }

  return (
    <CenteredContainer>
      <FormControl
        component='fieldset'
        sx={{ width: '100%', maxWidth: '400px' }}
      >
        <FormLabel component='legend'>Register as:</FormLabel>
        <Select
          value={registerType}
          onChange={(event) =>
            handleRegisterTypeChange(
              event as React.ChangeEvent<HTMLInputElement>
            )
          }
          input={<OutlinedInput label='Register as' />}
        >
          <MenuItem value='store'>Register as Store</MenuItem>
          <MenuItem value='customer'>Register as Customer</MenuItem>
        </Select>
      </FormControl>

      {registerType === 'store' ? (
        <div>Store Registration Form</div>
      ) : registerType === 'customer' ? (
        <div>Customer Registration Form</div>
      ) : null}
    </CenteredContainer>
  )
}

const CenteredContainer = styled(Container)({
  marginTop: '2rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
})

export default Register
