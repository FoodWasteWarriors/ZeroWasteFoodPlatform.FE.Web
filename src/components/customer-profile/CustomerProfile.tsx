import { Edit } from '@mui/icons-material'
import {
  Alert,
  Avatar,
  Button,
  List,
  ListItem,
  MenuItem,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { Fragment, useCallback, useEffect, useState } from 'react'
import DefaultErrorMessage from '../../components/default-error-message/DefaultErrorMessage'
import {
  useGetCustomerByIdQuery,
  useUpdateCustomerMutation,
} from '../../store/apis/customerApi'
import { selectAuthUserId } from '../../store/features/auth/authSelectors'
import { useAppSelector } from '../../utils/hooks/reduxHooks'

function CustomerProfile() {
  const userId = useAppSelector(selectAuthUserId)!
  const { data, error, isLoading } = useGetCustomerByIdQuery(userId)
  const [success, setSuccess] = useState(false)
  const [errors, setErrors] = useState([] as string[])
  const [updateCustomer] = useUpdateCustomerMutation()

  const [activeEdits, setActiveEdits] = useState({
    username: false,
    email: false,
    phoneNumber: false,
    useMultiFactorAuthentication: false,
    avatar: false,
  })

  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phoneNumber: '',
    useMultiFactorAuthentication: '',
    emailVerified: false,
    phoneNumberVerified: false,
    lastLoginTime: '',
    avatar: '',
    role: null as UserRole,
  })

  const SetDefaluts = useCallback(() => {
    setUserDetails({
      firstName: data!.data!.firstName,
      lastName: data!.data!.lastName,
      username: data!.data!.username,
      email: data!.data!.email,
      phoneNumber: data!.data!.phoneNumber,
      useMultiFactorAuthentication: data!.data!.useMultiFactorAuthentication,
      emailVerified: data!.data!.emailVerified,
      phoneNumberVerified: data!.data!.phoneNumberVerified,
      lastLoginTime: data!.data!.lastLoginTime,
      avatar: data!.data!.avatar,
      role: data!.data!.role!,
    })
  }, [data])

  const handleUserUpdate = () => {
    updateCustomer({
      id: userId,
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      username: userDetails.username,
      email: userDetails.email,
      phoneNumber: userDetails.phoneNumber,
      useMultiFactorAuthentication: userDetails.useMultiFactorAuthentication,
      avatar: userDetails.avatar,
    })
      .unwrap()
      .then(() => {
        console.log('dailed')
        setSuccess(true)
        setErrors([])
      })
      .catch((error) => {
        let errorMessages

        console.log('failed')

        if (!error.data.messages) {
          errorMessages = Object.values(error.data.errors).flat() as string[]
        } else {
          errorMessages = error.data.messages.map(
            (message: any) => message.description
          )
        }

        setErrors(errorMessages)
        setSuccess(false)
      })

    SetDefaluts()

    setActiveEdits({
      username: false,
      email: false,
      phoneNumber: false,
      useMultiFactorAuthentication: false,
      avatar: false,
    })
  }

  const handleCancleUpdate = () => {
    SetDefaluts()
    setActiveEdits({
      username: false,
      email: false,
      phoneNumber: false,
      useMultiFactorAuthentication: false,
      avatar: false,
    })
  }

  useEffect(() => {
    if (data) SetDefaluts()
  }, [SetDefaluts, data])

  if (isLoading) return <div>Loading...</div>

  if (error)
    return <DefaultErrorMessage message='Error loading shopping list' />

  return (
    <Fragment>
      <Stack alignItems='center' spacing={2} my={2}>
        <Avatar
          src={userDetails.avatar}
          alt={userDetails.username}
          sx={{ width: 100, height: 100 }}
        />
        <Typography variant='h4' style={{ marginTop: 10 }}>
          {`${userDetails.firstName} ${userDetails.lastName}`}
        </Typography>

        <Typography variant='h6'>{userDetails.role}</Typography>
      </Stack>

      <Typography variant='body2' style={{ margin: 10, textAlign: 'right' }}>
        Last Login: {userDetails.lastLoginTime}
      </Typography>

      <Stack spacing={2}>
        <TextField
          label='Username'
          value={userDetails.username}
          disabled={!activeEdits.username}
          onChange={(e) => {
            setUserDetails((prev) => ({
              ...prev,
              username: e.target.value,
            }))
          }}
          fullWidth
          InputProps={{
            endAdornment: (
              <Edit
                sx={{ cursor: 'pointer' }}
                onClick={() => {
                  setActiveEdits((prev) => ({
                    ...prev,
                    username: !prev.username,
                  }))
                }}
              />
            ),
          }}
        />
        <TextField
          label='Email'
          value={userDetails.email}
          disabled={!activeEdits.email}
          fullWidth
          helperText={
            !userDetails.emailVerified
              ? 'Email not verified!'
              : 'Email verified.'
          }
          onChange={(e) => {
            setUserDetails((prev) => ({
              ...prev,
              email: e.target.value,
            }))
          }}
          InputProps={{
            endAdornment: (
              <Edit
                sx={{ cursor: 'pointer' }}
                onClick={() => {
                  setActiveEdits((prev) => ({
                    ...prev,
                    email: !prev.email,
                  }))
                }}
              />
            ),
          }}
        />
        <TextField
          label='Phone Number'
          value={userDetails.phoneNumber}
          disabled={!activeEdits.phoneNumber}
          fullWidth
          helperText={
            !userDetails.phoneNumberVerified
              ? 'Phone number not verified!'
              : 'Phone number verified.'
          }
          onChange={(e) => {
            setUserDetails((prev) => ({
              ...prev,
              phoneNumber: e.target.value,
            }))
          }}
          InputProps={{
            endAdornment: (
              <Edit
                sx={{ cursor: 'pointer' }}
                onClick={() => {
                  setActiveEdits((prev) => ({
                    ...prev,
                    phoneNumber: !prev.phoneNumber,
                  }))
                }}
              />
            ),
          }}
        />
        <TextField
          select
          label='Use Multi Factor Authentication'
          value={userDetails.useMultiFactorAuthentication}
          disabled={!activeEdits.useMultiFactorAuthentication}
          fullWidth
          onChange={(e) => {
            setUserDetails((prev) => ({
              ...prev,
              useMultiFactorAuthentication: e.target.value,
            }))
          }}
          InputProps={{
            endAdornment: (
              <Edit
                sx={{ cursor: 'pointer' }}
                onClick={() => {
                  setActiveEdits((prev) => ({
                    ...prev,
                    useMultiFactorAuthentication:
                      !prev.useMultiFactorAuthentication,
                  }))
                }}
              />
            ),
          }}
        >
          <MenuItem value='True'>Yes</MenuItem>
          <MenuItem value='False'>No</MenuItem>
        </TextField>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          justifyContent='center'
        >
          <Button
            variant='text'
            color='primary'
            onClick={() => handleUserUpdate()}
            fullWidth
          >
            Save
          </Button>

          <Button
            variant='text'
            color='error'
            onClick={() => handleCancleUpdate()}
            fullWidth
          >
            Cancel
          </Button>

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
        </Stack>
        <List>
          {errors.map((error, index) => (
            <ListItem key={index}>
              <Typography color='error'>{error}</Typography>
            </ListItem>
          ))}
        </List>
      </Stack>
    </Fragment>
  )
}

export default CustomerProfile
