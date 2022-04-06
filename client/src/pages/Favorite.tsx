import { Container, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useSelector } from 'react-redux'

import BackBtn from '../components/Button/BackBtn'
import MainLayout from '../components/MainLayout.tsx/MainLayout'
import { RootState } from '../redux/rootReducer'

export default function Favorite() {
  const favBooks = useSelector((state: RootState) => state.auth.user?.bookLists)

  return (
    <Container maxWidth="md">
      <BackBtn text={'My Favorites'} />
      {favBooks?.length ? (
        <MainLayout books={favBooks} />
      ) : (
        <Box mt="20px">
          <Typography variant="h6" fontSize="1.3rem">
            Your favorite list is empty
          </Typography>
        </Box>
      )}
    </Container>
  )
}
