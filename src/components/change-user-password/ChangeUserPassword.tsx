import {
  Alert,
  Button,
  List,
  ListItem,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { useChangePasswordMutation } from '../../store/apis/userApi'
import { selectAuthUserId } from '../../store/features/auth/authSelectors'
import { useAppSelector } from '../../utils/hooks/reduxHooks'

function ChangeUserPassword() {
  const userId = useAppSelector(selectAuthUserId)!
  const [changePassword] = useChangePasswordMutation()
  const [success, setSuccess] = useState(false)
  const [errors, setErrors] = useState([] as string[])

  const [password, setPassword] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const handlePasswordChange = () => {
    changePassword({
      id: userId,
      currentPassword: password.oldPassword,
      newPassword: password.newPassword,
      confirmPassword: password.confirmPassword,
    })
      .unwrap()
      .then(() => {
        setSuccess(true)

        setErrors([])
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

    setPassword({
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    })
  }
  return (
    <Stack spacing={2} mt={2}>
      <Typography variant='h6'>Change Password</Typography>
      <TextField
        label='Old Password'
        type='password'
        value={password.oldPassword}
        onChange={(e) => {
          setPassword((prev) => ({
            ...prev,
            oldPassword: e.target.value,
          }))
        }}
        fullWidth
      />
      <TextField
        label='New Password'
        type='password'
        value={password.newPassword}
        onChange={(e) => {
          setPassword((prev) => ({
            ...prev,
            newPassword: e.target.value,
          }))
        }}
        fullWidth
      />
      <TextField
        label='Confirm Password'
        type='password'
        value={password.confirmPassword}
        onChange={(e) => {
          setPassword((prev) => ({
            ...prev,
            confirmPassword: e.target.value,
          }))
        }}
        fullWidth
      />
      <Button
        variant='contained'
        color='primary'
        onClick={() => handlePasswordChange()}
        fullWidth
      >
        Change Password
      </Button>

      <List>
        {errors.map((error, index) => (
          <ListItem key={index}>
            <Typography color='error'>{error}</Typography>
          </ListItem>
        ))}
      </List>

      <Snackbar open={success} autoHideDuration={6000}>
        <Alert
          severity='success'
          variant='filled'
          sx={{ width: '100%' }}
          onClose={() => setSuccess(false)}
        >
          Password changed successfully!
        </Alert>
      </Snackbar>
    </Stack>
  )
}

export default ChangeUserPassword
