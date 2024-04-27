import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Error404() {
  return (
    <Box sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant='h3' color={'#9597A8'}>404 page not found</Typography>
    </Box>
  )
}
