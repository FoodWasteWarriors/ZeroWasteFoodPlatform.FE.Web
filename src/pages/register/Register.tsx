import { Grid, Container, Stack, Button, TextField, Select, MenuItem, Alert, Typography } from '@mui/material';
import { useRegisterBusinessMutation, useRegisterCustomerMutation } from '../../store/apis/authApi';
import { useAppSelector } from '../../utils/hooks/reduxHooks';
import { useState } from 'react';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { selectAuthIsAuthenticated } from '../../store/features/auth/authSelectors';
import UserRoles from '../../constants/userRoles';
import { SelectChangeEvent } from '@mui/material/Select';

function Register() {
  const navigate = useNavigate();
  const [registerBusiness] = useRegisterBusinessMutation();
  const [registerCustomer] = useRegisterCustomerMutation();
  const [role, setRole] = useState<UserRoles>(UserRoles.Customer);
  const [success, setSuccess] = useState(true);
  const [errors, setErrors] = useState([] as string[])

  const [values, setValues] = useState({
    username: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    firstName: role === UserRoles.Customer ? '' : undefined,
    lastName: role === UserRoles.Customer ? '' : undefined,
    avatar: role === UserRoles.Customer ? '' : undefined,
    address: role === UserRoles.Business ? '' : undefined,
    name: role === UserRoles.Business ? '' : undefined,
    website: role === UserRoles.Business ? '' : undefined,
    description: role === UserRoles.Business ? '' : undefined,
    logo: role === UserRoles.Business ? '' : undefined,
    coverPhoto: role === UserRoles.Business ? '' : undefined,
  });

  const handleRoleChange = (event: SelectChangeEvent<UserRoles>) => {
    setRole(event.target.value as UserRoles);
  };


  //Submit if the form is valid and the user is a customer
  const onSubmitCustomer = (values: CustomerRegisterDto) => {
    registerCustomer(values)
      .unwrap()
      .then((response) => {
        setErrors([])
        setSuccess(true)
        if (response.data) {
          navigate('/login');
        }
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
  };

  //Submit if the form is valid and the user is a business
  const onSubmitBusiness = (values: BusinessRegisterDto) => {
    registerBusiness(values)
      .unwrap()
      .then((response) => {
        setErrors([])
        setSuccess(true)

        if (response.data) {
          navigate('/login');
        }
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
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    if (role === UserRoles.Customer) {
      onSubmitCustomer(values as CustomerRegisterDto);
    } else {
      onSubmitBusiness(values as BusinessRegisterDto);
    }
  };

  const handleChange = (event: any) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const isLoggedIn = useAppSelector(selectAuthIsAuthenticated);
  

  if (isLoggedIn) {
    return <Navigate to='/' />;
  }

  return (
    <Container
      component="main"
      sx={{
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'auto',
      }}
    >
      <Typography variant="h4" align="center" mt={3} mb={3}>
        Register
      </Typography>

      <Stack spacing={2} sx={{ width: '100%', maxWidth: '600px' }} component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Select
              value={role}
              onChange={handleRoleChange}
              fullWidth
              variant="filled"
            >
              <MenuItem value={UserRoles.Customer}>{UserRoles.Customer}</MenuItem>
              <MenuItem value={UserRoles.Business}>{UserRoles.Business}</MenuItem>
            </Select>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              id="username"
              name="username"
              label="Username"
              value={values.username}
              onChange={handleChange}
              variant="filled"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              id="email"
              name="email"
              label="Email"
              value={values.email}
              onChange={handleChange}
              variant="filled"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              id="phoneNumber"
              name="phoneNumber"
              label="Phone Number"
              value={values.phoneNumber}
              onChange={handleChange}
              variant="filled"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              id="password"
              name="password"
              label="Password"
              type="password"
              value={values.password}
              onChange={handleChange}
              variant="filled"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              value={values.confirmPassword}
              onChange={handleChange}
              variant="filled"
              fullWidth
            />
          </Grid>

          {role === UserRoles.Customer && (
            <>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  value={values.firstName}
                  onChange={handleChange}
                  variant="filled"
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  value={values.lastName}
                  onChange={handleChange}
                  variant="filled"
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  id="avatar"
                  name="avatar"
                  label="Avatar"
                  value={values.avatar}
                  onChange={handleChange}
                  variant="filled"
                  fullWidth
                />
              </Grid>
            </>
          )}

          {role === UserRoles.Business && (
            <>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="address"
                  name="address"
                  label="Address"
                  value={values.address}
                  onChange={handleChange}
                  variant="filled"
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  id="name"
                  name="name"
                  label="Name"
                  value={values.name}
                  onChange={handleChange}
                  variant="filled"
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  id="website"
                  name="website"
                  label="Website"
                  value={values.website}
                  onChange={handleChange}
                  variant="filled"
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  id="description"
                  name="description"
                  label="Description"
                  value={values.description}
                  onChange={handleChange}
                  variant="filled"
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  id="logo"
                  name="logo"
                  label="Logo"
                  value={values.logo}
                  onChange={handleChange}
                  variant="filled"
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  id="coverPhoto"
                  name="coverPhoto"
                  label="Cover Photo"
                  value={values.coverPhoto}
                  onChange={handleChange}
                  variant="filled"
                  fullWidth
                />
              </Grid>
            </>
          )}

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Register
            </Button>
          </Grid>

          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Typography><Link to='/login'>Already have an account?</Link></Typography>
            </Grid>
          </Grid>

          {errors.map((error, index) => (
            <Alert severity='error' key={index}>
              {error}
            </Alert>
          ))}

        </Grid>
      </Stack>
    </Container>
  );
}
/* {open && <Alert severity="error" onClose={() => setOpen(false)}>Please fill all the fields!</Alert>}*/
export default Register;
