import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import '../App.css'
import Snackbar from '@material-ui/core/Snackbar'
import { Alert } from '@material-ui/lab'

const Notification = () => {
  const [open, setOpen] = useState(false)
  const notification = useSelector(state => state.notification.message)
  const isErrorMessage = useSelector(state => state.notification.isError)

  useEffect(() => {
    if (notification !== '') {
      setOpen(true)
    }
  }, [notification])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  if (notification === '') {return null} else return (
    <Snackbar open={open}
              autoHideDuration={6000}
              onClose={handleClose}
    >
      <Alert onClose={handleClose}
             severity={isErrorMessage ? 'error' : 'success'}
      >
        {notification}
      </Alert>
    </Snackbar>
  )
}

export default Notification