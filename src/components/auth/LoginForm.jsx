import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import authschemas from "../../utils/auth/AuthSchemas";
import { method } from "lodash";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { useNavigate } from "react-router-dom";
import postLogin from "../../api/postLogin";
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const isAuthenticated = useIsAuthenticated()
  const navigate = useNavigate();
  const signIn = useSignIn();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(authschemas.loginSchema) });
  useEffect(() => {
    if (isAuthenticated) {
      console.log('is Authenticated');
      navigate('/');
    } else {
      console.log('not Authenticated');
  
    }
  },[]);
  return (
    <Box
      component="form"
      onSubmit={handleSubmit(async (data) => {
        console.log("here", data);
        const res = await postLogin(data);
        console.log('res from login', res);
        //// signIn
        if (signIn({
          auth: {
            token: res.access,
            type: "Bearer",
          },
          // refresh: res.refresh,
          //   userState: {
          //     name: 'React User',
          //     uid: 123456
          // }
          })) {
            navigate('/');
          } else {
            // ////////////////////
            /// toast error 
          }
        console.log("passed...");
        reset();
      })} /// data recieved from inputs
      sx={{ mt: 1 }}
    >
      <FormControl sx={{ width: "100%", marginY: 2 }} variant="outlined">
        <InputLabel htmlFor="username">username</InputLabel>
        <OutlinedInput {...register("username")} label="username" />
      </FormControl>
      {errors.email && (
        <Typography sx={{ fontSize: 12, color: "red" }}>
          {errors.email.message}
        </Typography>
      )}
      <FormControl sx={{ width: "100%", marginY: 3 }} variant="outlined">
        <InputLabel htmlFor="password">Password</InputLabel>
        <OutlinedInput
          {...register("password")}
          type={showPassword ? "text" : "password"}
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
      </FormControl>
      {errors.password && (
        <Typography sx={{ fontSize: 12, color: "red" }}>
          {errors.password.message}
        </Typography>
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Typography
          component={Link}
          variant="body2"
          color={"#121211"}
          sx={{ textDecoration: "none" }}
        >
          Forgot password?
        </Typography>
      </Box>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Login
      </Button>
    </Box>
  );
}
