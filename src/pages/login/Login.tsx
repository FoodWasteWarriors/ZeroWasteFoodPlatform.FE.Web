import {
  Button,
  TextField,
  Grid,
  Typography,
  Container,
  Switch,
  FormControlLabel,
  Stack,
  Alert,
  Snackbar,
  List,
  ListItem,
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
  const [useEmail, setUseEmail] = useState(false) // Add this line
  const [loginData, setLoginData] = useState<UserLoginDto>({
    username: null,
    email: null,
    password: '',
  })

  const onSubmit = (values: UserLoginDto) => {
    // Modify this line to use either username or email based on the switch
    const loginValues = useEmail
      ? ({ email: values.email, password: values.password } as UserLoginDto)
      : ({
          username: values.username,
          password: values.password,
        } as UserLoginDto)

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

        if (!error.data.messages) {
          errorMessages = Object.values(error.data.errors).flat() as string[]
        } else {
          errorMessages = error.data.messages.map(
            (message: ResponseMessage) => message.description
          )
        }

        setErrors(errorMessages)
        setSuccess(false)
      })
  }

  const isLoggedIn = useAppSelector(selectAuthIsAuthenticated)

  if (isLoggedIn) {
    return <Navigate to='/' />
  }

  // Add this to your form
  return (
    <Container
      component='main'
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

      <Stack spacing={2} direction={'column'} component='form'>
        <Stack spacing={2} direction={'row'}>
          {useEmail ? (
            <TextField
              required
              variant='filled'
              fullWidth
              label='Email'
              name='email'
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
            />
          ) : (
            <TextField
              variant='filled'
              required
              fullWidth
              label='Username'
              name='username'
              onChange={(e) =>
                setLoginData({ ...loginData, username: e.target.value })
              }
            />
          )}

          <FormControlLabel
            control={
              <Switch
                checked={useEmail}
                onChange={() => setUseEmail(!useEmail)}
              />
            }
            label='Use Email'
          />
        </Stack>

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
        <List>
          {errors.map((error, index) => (
            <ListItem key={index}>
              <Typography color='error'>{error}</Typography>
            </ListItem>
          ))}
        </List>
      </Stack>
    </Container>
  )
}

export default Login
