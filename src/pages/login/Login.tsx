import { useFormik } from 'formik'
import { Button, TextField } from '@mui/material'
import loginSchema from '../../utils/validation/loginSchema'
import { useLoginUserMutation } from '../../store/apis/authApi'
import { useAppDispatch } from '../../utils/hooks/reduxHooks'
import { login } from '../../store/features/auth/authSlice'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [loginUser] = useLoginUserMutation()
  const [errMessages, setErrMessages] = useState<ResponseMessage[]>([])

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

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        id='email'
        name='email'
        label='Email'
        value={values.email}
        onChange={handleChange}
        error={touched.email && Boolean(errors.email)}
        helperText={touched.email && errors.email}
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
      />
      <Button type='submit' variant='contained' color='primary'>
        Login
      </Button>

      {errMessages.map((message, index) => (
        <div key={index}>{message.description}</div>
      ))}
    </form>
  )
}

export default Login
