import { IconButton } from '@mui/material'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import { useDispatch, useSelector } from 'react-redux'

import { Book } from '../../types'
import { addFavorite, removeFavorite } from '../../redux/auth/actions'
import { RootState } from '../../redux/rootReducer'
import { openDialog } from '../../redux/dialog/actions'
import LoginDialog from '../LoginDialog/LoginDialog'

type AddButtonProps = {
  book?: Book
}

export default function AddButton({ book }: AddButtonProps) {
  const dispatch = useDispatch()

  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  )

  const added = user?.bookLists.some((elem) => elem._id === book?._id)

  function handleOnClick() {
    if (book && user) {
      if (added) {
        dispatch(removeFavorite(user._id, book._id))
      } else {
        dispatch(addFavorite(user?._id, book._id))
      }
    }
  }

  function handleDialog() {
    dispatch(openDialog(true))
  }

  return (
    <>
      <IconButton
        color={'primary'}
        aria-label="add-book"
        onClick={isAuthenticated ? handleOnClick : handleDialog}
      >
        {added ? <BookmarkIcon /> : <BookmarkBorderIcon />}
      </IconButton>
      <LoginDialog />
    </>
  )
}
