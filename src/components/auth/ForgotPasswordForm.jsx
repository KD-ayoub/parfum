import { yupResolver } from '@hookform/resolvers/yup';
import { Box, FormControl, InputLabel, OutlinedInput, Button, Typography } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import authschemas from '../../utils/auth/AuthSchemas';

export default function ForgotPasswordForm() {
  const { register, handleSubmit, formState: { errors }} = useForm({ resolver: yupResolver(authschemas.forgotPasswordSchema) });
  return (
    <Box component={'form'} onSubmit={handleSubmit((data) => console.log(data))}>
      <FormControl sx={{ width: "100%", marginTop: 3 }} variant='outlined'>
        <InputLabel htmlFor='email'>Email adress</InputLabel>
        <OutlinedInput {...register('email', { required: true })} label='Email adress'/>
        { errors.email && <Typography sx={{fontSize: 12, color: 'red'}}>{errors.email.message}</Typography> }
      </FormControl>
      <Typography component={'p'} sx={{mt: 3, pl: 1, fontSize: 11}}>Do not forget to check SPAM box</Typography>
      <Button type="submit" fullWidth variant="contained" sx={{mt: 1, mb: 2 }}>
        Send Password Reset Email
      </Button>
    </Box>
  )
}
