import * as yup from 'yup'

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/

const registerSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup
    .string()
    .matches(
      passwordRegex,
      'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character'
    )
    .required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), undefined], 'Passwords must match')
    .required(),
})

export default registerSchema
