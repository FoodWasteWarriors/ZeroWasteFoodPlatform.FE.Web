import { useFormik } from 'formik'
import { Button, TextField, Box, Container, Alert, Typography } from '@mui/material'
import loginSchema from '../../utils/validation/loginSchema'
import { useLoginUserMutation } from '../../store/apis/authApi'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/reduxHooks'
import { login } from '../../store/features/auth/authSlice'
import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { selectAuthIsAuthenticated } from '../../store/features/auth/authSelectors'
import { Link as RouterLink } from 'react-router-dom';

function Login() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [loginUser] = useLoginUserMutation()
  const onSubmit = (values: UserLoginDto) => {
    loginUser(values)
      .unwrap()
      .then((response) => {
        dispatch(login(response!.data!))
        setErrMessages([])
        navigate('/')
      })
      .catch((error) => {
        setErrMessages(error.data.messages)
      })
  }
  const { handleSubmit, handleChange, values, touched, errors } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit,
  })

  const isLoggedIn = useAppSelector(selectAuthIsAuthenticated)

  const [errMessages, setErrMessages] = useState<ResponseMessage[]>([])

  if (isLoggedIn) {
    return <Navigate to='/' />
  }

  return (
    <Container maxWidth="sm">
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2, // space between items
      }}
    >
      <TextField
        id='email'
        name='email'
        label='Email'
        value={values.email}
        onChange={handleChange}
        error={touched.email && Boolean(errors.email)}
        helperText={touched.email && errors.email}
        fullWidth
      />
      <TextField
        id='password'
        name='password'
        label='Password'
        type='password'
        value={values.password}
        onChange={handleChange}
        error={touched.password && Boolean(errors.password)}
        helperText={touched.password && errors.password}
        fullWidth
      />
      <Button type='submit' variant='contained' fullWidth>
        Login
      </Button>

      <Typography variant="body2">
        Don't have an account? <RouterLink to="/register">Register</RouterLink>
      </Typography>

      {errMessages.map((message, index) => (
        <Alert severity="error" key={index}>
          {message.description}
        </Alert>
      ))}
    </Box>
  </Container>
  )
}

export default Login