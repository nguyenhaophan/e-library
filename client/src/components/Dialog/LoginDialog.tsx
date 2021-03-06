import { Box, Dialog } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

import { openDialog } from '../../redux/dialog/actions'
import { RootState } from '../../redux/rootReducer'
import LoginTable from '../LoginTable'
import Transition from './Transition'

export default function LoginDialog() {
  const dispatch = useDispatch()
  const open = useSelector((state: RootState) => state.dialog.state)

  function handleClose() {
    dispatch(openDialog(false))
  }

  return (
    <Dialog open={open} onClose={handleClose} TransitionComponent={Transition}>
      <Box onClick={handleClose}>
        <LoginTable />
      </Box>
    </Dialog>
  )
}
