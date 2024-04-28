import { useFormik } from 'formik'
import { Button, TextField } from '@mui/material'
import loginSchema from '../../utils/validation/loginSchema'

type FormValues = {
  email: string
  password: string
}

function Login() {
  const onSubmit = (values: FormValues) => {
    console.log(values)
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
    </form>
  )
}

export default Login
