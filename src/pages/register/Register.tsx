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

    const [errors, setErrors] = useState({
        username: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        avatar: '',
        address: '',
        name: '',
        website: '',
        description: '',
        logo: '',
        coverPhoto: '',
    });

    const [touched, setTouched] = useState({
        username: false,
        email: false,
        phoneNumber: false,
        password: false,
        confirmPassword: false,
        firstName: false,
        lastName: false,
        avatar: false,
        address: false,
        name: false,
        website: false,
        description: false,
        logo: false,
        coverPhoto: false,
    });
    const handleRoleChange = (event: SelectChangeEvent<UserRoles>) => {
        setRole(event.target.value as UserRoles);
    };


    //Submit if the form is valid and the user is a customer
    const onSubmitCustomer = (values: CustomerRegisterDto) => {
        registerCustomer(values)
            .unwrap()
            .then((response) => {
                if (response.data) {
                    navigate('/login');
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    //Submit if the form is valid and the user is a business
    const onSubmitBusiness = (values: BusinessRegisterDto) => {
        registerBusiness(values)
            .unwrap()
            .then((response) => {
                if (response.data) {
                    navigate('/login');
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("On submit called");
        if (role === UserRoles.Customer) {
            onSubmitCustomer(values as CustomerRegisterDto);
        } else {
            onSubmitBusiness(values as BusinessRegisterDto);
        }
    };

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };

    const isLoggedIn = useAppSelector(selectAuthIsAuthenticated);
    const [errMessages, setErrMessages] = useState<ResponseMessage[]>([]);

    if (isLoggedIn) {
        return <Navigate to='/' />;
    }

    return (
        <Container
            component="main"
            sx={{
                height: 'calc(100vh - 200px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '64px',
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
                            error={touched.username && Boolean(errors.username)}
                            helperText={touched.username && errors.username}
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
                            error={touched.email && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
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
                            error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                            helperText={touched.phoneNumber && errors.phoneNumber}
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
                            error={touched.password && Boolean(errors.password)}
                            helperText={touched.password && errors.password}
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
                            error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                            helperText={touched.confirmPassword && errors.confirmPassword}
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
                                    error={touched.firstName && Boolean(errors.firstName)}
                                    helperText={touched.firstName && errors.firstName}
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
                                    error={touched.lastName && Boolean(errors.lastName)}
                                    helperText={touched.lastName && errors.lastName}
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
                                    error={touched.avatar && Boolean(errors.avatar)}
                                    helperText={touched.avatar && errors.avatar}
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
                                    error={touched.address && Boolean(errors.address)}
                                    helperText={touched.address && errors.address}
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
                                    error={touched.name && Boolean(errors.name)}
                                    helperText={touched.name && errors.name}
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
                                    error={touched.website && Boolean(errors.website)}
                                    helperText={touched.website && errors.website}
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
                                    error={touched.description && Boolean(errors.description)}
                                    helperText={touched.description && errors.description}
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
                                    error={touched.logo && Boolean(errors.logo)}
                                    helperText={touched.logo && errors.logo}
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
                                    error={touched.coverPhoto && Boolean(errors.coverPhoto)}
                                    helperText={touched.coverPhoto && errors.coverPhoto}
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

                    {errMessages.map((message, index) => (
                        <Grid item xs={12} key={index}>
                            <Alert severity="error">{message.description}</Alert>
                        </Grid>
                    ))}
                </Grid>
            </Stack>
        </Container>
    );
}

export default Register;
