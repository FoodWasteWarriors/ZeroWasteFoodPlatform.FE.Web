import { Edit, Save } from '@mui/icons-material'
import {
  Alert,
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  List,
  ListItem,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { Fragment, useCallback, useEffect, useState } from 'react'
import DefaultErrorMessage from '../default-error-message/DefaultErrorMessage'
import { selectAuthUserId } from '../../store/features/auth/authSelectors'
import { useAppSelector } from '../../utils/hooks/reduxHooks'
import {
  useGetBusinessByIdQuery,
  useUpdateBusinessMutation,
} from '../../store/apis/businessApi'

const defaultActiveEdits = {
  name: false,
  description: false,
  username: false,
  email: false,
  phoneNumber: false,
  useMultiFactorAuthentication: false,
  logo: false,
  coverPhoto: false,
  website: false,
  address: false,
}

// TODO: Enable to change cover photo and logo
function StoreProfile() {
  const userId = useAppSelector(selectAuthUserId)!
  const { data, error, isLoading } = useGetBusinessByIdQuery(userId)
  const [success, setSuccess] = useState(false)
  const [errors, setErrors] = useState([] as string[])
  const [updateBusiness] = useUpdateBusinessMutation()

  const [activeEdits, setActiveEdits] = useState(defaultActiveEdits)

  const [userDetails, setUserDetails] = useState({
    name: '',
    description: '' as string | null | undefined,
    username: '',
    email: '',
    phoneNumber: '',
    useMultiFactorAuthentication: false,
    emailVerified: false,
    phoneNumberVerified: false,
    lastLoginTime: '',
    logo: '',
    address: '',
    coverPhoto: '' as string | null | undefined,
    website: '' as string | null | undefined,
    role: null as UserRole,
  })

  const SetDefaluts = useCallback(() => {
    setUserDetails({
      name: data!.data!.name,
      description: data!.data!.description,
      username: data!.data!.username,
      email: data!.data!.email,
      phoneNumber: data!.data!.phoneNumber,
      useMultiFactorAuthentication: data!.data!.useMultiFactorAuthentication,
      emailVerified: data!.data!.emailVerified,
      phoneNumberVerified: data!.data!.phoneNumberVerified,
      lastLoginTime: data!.data!.lastLoginTime,
      logo: data!.data!.logo,
      coverPhoto: data!.data!.coverPhoto,
      website: data!.data!.website,
      role: data!.data!.role!,
      address: data!.data!.address,
    })
  }, [data])

  const handleUserUpdate = () => {
    updateBusiness({
      id: userId,
      name: userDetails.name,
      description: userDetails.description,
      username: userDetails.username,
      email: userDetails.email,
      phoneNumber: userDetails.phoneNumber,
      useMultiFactorAuthentication: userDetails.useMultiFactorAuthentication,
      coverPhoto: userDetails.coverPhoto,
      website: userDetails.website,
      address: userDetails.address,
    })
      .unwrap()
      .then(() => {
        setSuccess(true)
        setErrors([])
        SetDefaluts()
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

    setActiveEdits(defaultActiveEdits)
  }

  const handleCancleUpdate = () => {
    setErrors([])
    SetDefaluts()
    setActiveEdits(defaultActiveEdits)
  }

  const EditOrSaveButton = (activeEditKey: keyof typeof defaultActiveEdits) => {
    const activeEdit = activeEdits[activeEditKey]

    return activeEdit ? (
      <Save
        sx={{ cursor: 'pointer', marginLeft: 1 }}
        onClick={() => {
          setActiveEdits((prev) => ({
            ...prev,
            [activeEditKey]: false,
          }))
        }}
      />
    ) : (
      <Edit
        sx={{ cursor: 'pointer', marginLeft: 1 }}
        onClick={() => {
          setActiveEdits((prev) => ({
            ...prev,
            [activeEditKey]: true,
          }))
        }}
      />
    )
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
          src={userDetails.logo}
          alt={userDetails.username}
          sx={{ width: 100, height: 100 }}
        />
        <Typography variant='h4' style={{ marginTop: 10 }}>
          {`${userDetails.name}`}
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
          label='Address'
          value={userDetails.address}
          disabled={!activeEdits.address}
          fullWidth
          multiline
          onChange={(e) => {
            setUserDetails((prev) => ({
              ...prev,
              address: e.target.value,
            }))
          }}
          InputProps={{
            endAdornment: EditOrSaveButton('address'),
          }}
        />

        <TextField
          label='Description'
          value={userDetails.description}
          disabled={!activeEdits.description}
          fullWidth
          multiline
          onChange={(e) => {
            setUserDetails((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }}
          InputProps={{
            endAdornment: EditOrSaveButton('description'),
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
            endAdornment: EditOrSaveButton('email'),
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
            endAdornment: EditOrSaveButton('phoneNumber'),
          }}
        />

        <TextField
          label='Website'
          value={userDetails.website}
          disabled={!activeEdits.website}
          fullWidth
          onChange={(e) => {
            setUserDetails((prev) => ({
              ...prev,
              website: e.target.value,
            }))
          }}
          InputProps={{
            endAdornment: EditOrSaveButton('website'),
          }}
        />

        <Box display='flex' alignItems='center'>
          <FormControlLabel
            label='Use Multi-Factor Authentication'
            checked={userDetails.useMultiFactorAuthentication}
            control={
              <Checkbox
                checked={userDetails.useMultiFactorAuthentication}
                inputProps={{ 'aria-label': 'controlled' }}
                onChange={(e) => {
                  setUserDetails((prev) => ({
                    ...prev,
                    useMultiFactorAuthentication: e.target.checked,
                  }))
                }}
                disabled={!activeEdits.useMultiFactorAuthentication}
              />
            }
          />

          {EditOrSaveButton('useMultiFactorAuthentication')}
        </Box>
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

export default StoreProfile
