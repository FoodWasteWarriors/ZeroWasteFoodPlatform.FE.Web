import { useFormik } from 'formik'
import { Grid, Box, Button, TextField, Select, MenuItem } from '@mui/material'
import registerSchema from '../../utils/validation/registerSchema'
import {
  useRegisterBusinessMutation,
  useRegisterCustomerMutation,
} from '../../store/apis/authApi'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/reduxHooks'
import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { selectAuthIsAuthenticated } from '../../store/features/auth/authSelectors'

function Register() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [registerBusiness] = useRegisterBusinessMutation()
  const [registerCustomer] = useRegisterCustomerMutation()
  const [userType, setUserType] = useState<'customer' | 'business'>('customer')

  const handleUserTypeChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setUserType(event.target.value as 'customer' | 'business')
  }

  const onSubmitCustomer = (values: CustomerRegisterDto) => {
    registerCustomer(values)
      .unwrap()
      .then((response) => {
        if (response.data) {
          navigate('/login')
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const onSubmitBusiness = (values: BusinessRegisterDto) => {
    registerBusiness(values)
      .unwrap()
      .then((response) => {
        if (response.data) {
          navigate('/login')
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const { handleSubmit, handleChange, values, touched, errors } = useFormik({
    initialValues:
      userType === 'customer'
        ? {
            username: '',
            email: '',
            phoneNumber: '',
            password: '',
            firstName: '',
            lastName: '',
            avatar: null,
          }
        : {
            email: '',
            username: '',
            phoneNumber: '',
            password: '',
            address: '',
            name: '',
            website: null,
            description: null,
            logo: null,
            coverPhoto: null,
          },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      if (userType === 'customer') {
        onSubmitCustomer(values as CustomerRegisterDto)
      } else {
        onSubmitBusiness(values as BusinessRegisterDto)
      }
    },
  })

  const isLoggedIn = useAppSelector(selectAuthIsAuthenticated)

  const [errMessages, setErrMessages] = useState<ResponseMessage[]>([])

  if (isLoggedIn) {
    return <Navigate to='/' />
  }

  return (
    <>
      <Box
        component='form'
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2, // space between items
          maxWidth: 400,
          margin: 'auto',
          padding: 2,
        }}
      >
        <Select value={userType} onChange={handleUserTypeChange}>
          <MenuItem value={'customer'}>Customer</MenuItem>
          <MenuItem value={'business'}>Business</MenuItem>
        </Select>
        <form onSubmit={handleSubmit}>
          <TextField
            id='username'
            name='username'
            label='Username'
            value={values.username}
            onChange={handleChange}
            error={touched.username && Boolean(errors.username)}
            helperText={touched.username && errors.username}
          />
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
            id='phoneNumber'
            name='phoneNumber'
            label='Phone Number'
            value={values.phoneNumber}
            onChange={handleChange}
            error={touched.phoneNumber && Boolean(errors.phoneNumber)}
            helperText={touched.phoneNumber && errors.phoneNumber}
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
          {userType === 'customer' && (
            <>
              <TextField
                id='firstName'
                name='firstName'
                label='First Name'
                value={values.firstName}
                onChange={handleChange}
                error={touched.firstName && Boolean(errors.firstName)}
                helperText={touched.firstName && errors.firstName}
              />
              <TextField
                id='lastName'
                name='lastName'
                label='Last Name'
                value={values.lastName}
                onChange={handleChange}
                error={touched.lastName && Boolean(errors.lastName)}
                helperText={touched.lastName && errors.lastName}
              />
              <TextField
                id='avatar'
                name='avatar'
                label='Avatar'
                value={values.lastName}
                onChange={handleChange}
                error={touched.avatar && Boolean(errors.avatar)}
                helperText={touched.avatar && errors.avatar}
              />
            </>
          )}

          {userType === 'business' && (
            <>
              <TextField
                id='address'
                name='address'
                label='Address'
                value={values.address}
                onChange={handleChange}
                error={touched.address && Boolean(errors.address)}
                helperText={touched.address && errors.address}
              />
              <TextField
                id='name'
                name='name'
                label='Name'
                value={values.name}
                onChange={handleChange}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
              />
              <TextField
                id='website'
                name='website'
                label='Website'
                value={values.website}
                onChange={handleChange}
                error={touched.website && Boolean(errors.website)}
                helperText={touched.website && errors.website}
              />
              <TextField
                id='description'
                name='description'
                label='Description'
                value={values.description}
                onChange={handleChange}
                error={touched.description && Boolean(errors.description)}
                helperText={touched.description && errors.description}
              />
              <TextField
                id='logo'
                name='logo'
                label='Logo'
                value={values.logo}
                onChange={handleChange}
                error={touched.logo && Boolean(errors.logo)}
                helperText={touched.logo && errors.logo}
              />
              <TextField
                id='coverPhoto'
                name='coverPhoto'
                label='Cover Photo'
                value={values.coverPhoto}
                onChange={handleChange}
                error={touched.coverPhoto && Boolean(errors.coverPhoto)}
                helperText={touched.coverPhoto && errors.coverPhoto}
              />
            </>
          )}
          <Button type='submit' variant='contained' color='primary'>
            Register
          </Button>

          {errMessages.map((message, index) => (
            <div key={index}>{message.description}</div>
          ))}
        </form>
      </Box>
    </>
  )
}

export default Register
