import { useFormik } from 'formik'
import { Button, TextField, Grid, Box, Typography } from '@mui/material'
import loginSchema from '../../utils/validation/loginSchema'
import { useLoginUserMutation } from '../../store/apis/authApi'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/reduxHooks'
import { login } from '../../store/features/auth/authSlice'
import { useState } from 'react'
import { Navigate, useNavigate, Link } from 'react-router-dom'
import { selectAuthIsAuthenticated } from '../../store/features/auth/authSelectors'


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
    <form onSubmit={handleSubmit}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: '100vh' }}
      >
        <Box component="form" onSubmit={handleSubmit} width="100%" maxWidth={500}>
          <TextField
            id='email'
            name='email'
            label='Email'
            value={values.email}
            onChange={handleChange}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
            fullWidth
            sx={{ mb: 2 }}
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
            sx={{ mb: 2 }}
          />
          <Button type='submit' variant='contained' color='primary'>
            Login
          </Button>

          {errMessages.map((message, index) => (
            <div key={index}>{message.description}</div>
          ))}

          <Typography variant="body1">
            Don't have an account? <Link to="/register">Register</Link>
          </Typography>
        </Box>
      </Grid>
    </form>
  )
}

export default Login
