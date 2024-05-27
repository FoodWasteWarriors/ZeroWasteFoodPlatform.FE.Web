import {
  Button,
  TextField,
  Grid,
  Typography,
  Container,
  Stack,
  Alert,
  Snackbar,
  styled,
} from '@mui/material'
import { useLoginUserMutation } from '../../store/apis/authApi'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/reduxHooks'
import { useState } from 'react'
import { Navigate, useNavigate, Link } from 'react-router-dom'
import { selectAuthIsAuthenticated } from '../../store/features/auth/authSelectors'
import { login } from '../../store/features/auth/authSlice'

function Login() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [loginUserMutation] = useLoginUserMutation()
  const [success, setSuccess] = useState(false)
  const [errors, setErrors] = useState([] as string[])
  const [loginData, setLoginData] = useState({
    usernameOrEmail: '',
    password: '',
  })

  const onSubmit = (values: { usernameOrEmail: string; password: string }) => {
    // Modify this line to use either username or email based on the switch
    let loginValues

    if (values.usernameOrEmail.includes('@')) {
      loginValues = { email: values.usernameOrEmail, password: values.password }
    } else {
      loginValues = {
        username: values.usernameOrEmail,
        password: values.password,
      }
    }

    loginUserMutation(loginValues)
      .unwrap()
      .then((res) => {
        setSuccess(true)
        setErrors([])
        dispatch(login(res!.data!))
        navigate('/')
      })
      .catch((error) => {
        let errorMessages

        if (error.data) {
          if (!error.data.messages) {
            errorMessages = Object.values(error.data.errors).flat() as string[]
          } else {
            errorMessages = error.data.messages.map(
              (message: ResponseMessage) => message.description
            )
          }
        } else {
          errorMessages = ['Unexpected error occurred.']
        }

        setErrors(errorMessages)
      })
  }

  const isLoggedIn = useAppSelector(selectAuthIsAuthenticated)

  if (isLoggedIn) {
    return <Navigate to='/' />
  }

  // Add this to your form
  return (
    <CenteredContainer
      sx={{
        height: 'calc(100vh - 200px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant='h4' align='center' mt={3} mb={3}>
        Login
      </Typography>

      <Stack spacing={2} sx={{ width: '100%', maxWidth: '400px' }}>
        <Grid item xs={12}>
          <TextField
            variant='filled'
            required
            fullWidth
            label='Email or Username'
            name='usernameOrEmail'
            onChange={(e) =>
              setLoginData({ ...loginData, usernameOrEmail: e.target.value })
            }
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            variant='filled'
            required
            fullWidth
            label='Password'
            name='password'
            type='password'
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
          />
        </Grid>

        <Button
          variant='contained'
          color='primary'
          onClick={() => onSubmit(loginData)}
        >
          Login
        </Button>

        <Grid container justifyContent='flex-end'>
          <Grid item>
            <Link to='/register'>Don't have an account? Register</Link>
          </Grid>
        </Grid>

        <Snackbar open={success} autoHideDuration={6000}>
          <Alert
            severity='success'
            variant='filled'
            sx={{ width: '100%' }}
            onClose={() => setSuccess(false)}
          >
            User details updated successfully!
          </Alert>
        </Snackbar>
        {errors.map((error, index) => (
          <Alert severity='error' key={index}>
            {error}
          </Alert>
        ))}
      </Stack>
    </CenteredContainer>
  )
}

const CenteredContainer = styled(Container)({
  height: 'calc(100vh - 200px)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
})

export default Login
