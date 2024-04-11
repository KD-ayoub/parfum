import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { useForm } from "react-hook-form";
import { strengthColor, strengthIndicator } from "../../utils/auth/passwordStrength";
import { yupResolver } from "@hookform/resolvers/yup";
import authschemas from "../../utils/auth/AuthSchemas";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState("");
  const [level, setLevel] = useState({ color: "#f00", label: "Poor" });
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(authschemas.registerSchema) });

  function handlePasswordStrength(e) {
    const indicator = strengthIndicator(e.target.value);
    setLevel(strengthColor(indicator));
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit((data) => console.log(data))}
      sx={{ mt: 4 }}
    >
      <Grid
        container
        columns={13}
        columnGap={4.5}
        sx={{ flexDirection: { xs: "column", md: "row" } }}
      >
        <Grid item xs={13} md={6}>
          <FormControl sx={{ mb: 4, width: "100%" }}>
            <InputLabel htmlFor='First Name'>First Name</InputLabel>
            <OutlinedInput
              {...register("firstName", { required: true })}
              label="First Name"
            />
          { errors.firstName && <Typography sx={{fontSize: 12, color: 'red'}}>{errors.firstName.message}</Typography> }
          </FormControl>
        </Grid>
        <Grid item xs={13} md={6}>
          <FormControl sx={{ mb: 4, width: "100%" }}>
            <InputLabel htmlFor='Last Name'>Last Name</InputLabel>
            <OutlinedInput
              {...register("lastName", { required: true })}
              label="last-name"
            />
            { errors.lastName && <Typography sx={{fontSize: 12, color: 'red'}}>{errors.lastName.message}</Typography> }
          </FormControl>
        </Grid>
      </Grid>
      <FormControl sx={{ mb: 4, width: "100%" }}>
        <InputLabel htmlFor='Email'>Email</InputLabel>
        <OutlinedInput {...register("email", { required: true })} label="Email" />
        { errors.email && <Typography sx={{fontSize: 12, color: 'red'}}>{errors.email.message}</Typography> }
      </FormControl>
      <FormControl sx={{ mb: 2, width: "100%" }}>
        <InputLabel htmlFor="Password">Password</InputLabel>
        <OutlinedInput
          {...register("password", { required: true })}
          type={showPassword ? "text" : "password"}
          label="Password"
          onChange={handlePasswordStrength}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                //   onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            </InputAdornment>
          }
        />
        { errors.password && <Typography sx={{fontSize: 12, color: 'red'}}>{errors.password.message}</Typography> }
        <FormControl fullWidth sx={{mt: 2}}>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Box
              sx={{
                bgcolor: level?.color,
                width: 85,
                height: 8,
                borderRadius: "7px",
              }}
            />
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" fontSize="0.75rem">
              {level?.label}
            </Typography>
          </Grid>
        </Grid>
      </FormControl>
      </FormControl>
      <FormControl sx={{ width: "100%" }}>
        <InputLabel htmlFor='Confirm Password'>Confirm Password</InputLabel>
        <OutlinedInput
          {...register("confirmPassword", { required: true })}
          label="confirm-password"
          type="password"
        />
        { errors.confirmPassword && <Typography sx={{fontSize: 12, color: 'red'}}>{errors.confirmPassword.message}</Typography> }
      </FormControl>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Create account
      </Button>
    </Box>
  );
}
