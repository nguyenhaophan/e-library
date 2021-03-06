import { Stack, TextField, Typography } from '@mui/material'
import { Control, Controller, FieldError } from 'react-hook-form'

import { FormData } from './UpdateBookForm'

type SingleFieldType = {
  control: Control<FormData>
  errors?: FieldError
  title: string
  name: any
}

export default function SingleField({
  control,
  errors,
  title,
  name,
}: SingleFieldType) {
  return (
    <Stack
      alignItems={{ sm: 'center', xs: 'flex-start' }}
      spacing={2}
      direction={{ sm: 'row', xs: 'column' }}
    >
      <Typography
        fontWeight="700"
        textAlign={{ sm: 'right', xs: 'left' }}
        width="40%"
      >
        {title}
      </Typography>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            error={Boolean(errors)}
            helperText={errors?.message}
            multiline
            maxRows={5}
            fullWidth
            size="small"
          />
        )}
      />
    </Stack>
  )
}
