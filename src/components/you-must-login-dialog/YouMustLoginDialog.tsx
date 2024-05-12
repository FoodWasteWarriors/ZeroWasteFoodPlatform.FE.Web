import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
type PropsType = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

function YouMustLoginDialog(props: PropsType) {
  const { isOpen, setIsOpen } = props
  const [open, setOpen] = useState(isOpen)
  const navigate = useNavigate()

  useEffect(() => {
    setOpen(isOpen)
  }, [isOpen])

  const handleClose = () => {
    setOpen(false)
    setIsOpen(false)
  }

  const handleLogin = () => {
    navigate('/login')
    handleClose()
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>Login Required</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          You must login add this product to your shopping list.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='primary'>
          Cancel
        </Button>
        <Button onClick={handleLogin} color='primary'>
          Login
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default YouMustLoginDialog
