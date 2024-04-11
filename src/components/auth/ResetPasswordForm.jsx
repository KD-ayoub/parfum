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
import {
  strengthColor,
  strengthIndicator,
} from "../../utils/auth/passwordStrength";
import { yupResolver } from "@hookform/resolvers/yup";
import authschemas from "../../utils/auth/AuthSchemas";

export default function ResetPasswordForm() {
  const [showPassword, setShowPassword] = useState("");
  const [level, setLevel] = useState({ color: "#f00", label: "Poor" });
  const { register, handleSubmit, formState: { errors }} = useForm({ resolver: yupResolver(authschemas.resetPasswordSchema) });

  function handlePasswordStrength(e) {
    const indicator = strengthIndicator(e.target.value);
    setLevel(strengthColor(indicator));
  }

  return (
    <Box
      component={"form"}
      onSubmit={handleSubmit((data) => console.log(data))}
    >
      <Typography component={"p"} sx={{ marginY: 2, fontSize: 12 }}>
        Please choose your new password
      </Typography>
      <FormControl sx={{ width: "100%", marginBottom: 3 }} variant="outlined">
        <InputLabel htmlFor="outlined-password">Password</InputLabel>
        <OutlinedInput
          {...register("password", { required: true })}
          type={showPassword ? "text" : "password"}
          onChange={handlePasswordStrength}
          label="Password"
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
      </FormControl>
      <FormControl fullWidth>
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
      <FormControl sx={{ width: "100%", mt: 2 }}>
        <InputLabel htmlFor="Confirm Password">Confirm Password</InputLabel>
        <OutlinedInput
          {...register("confirmPassword", { required: true })}
          label="confirm-password"
          type="password"
        />
        {errors.confirmPassword && <Typography sx={{fontSize: 12, color: 'red'}}>{errors.confirmPassword.message}</Typography> }
      </FormControl>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Reset Password
      </Button>
    </Box>
  );
}
