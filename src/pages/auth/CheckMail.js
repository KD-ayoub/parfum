import React from "react";
import AuthLayout from "../../components/auth/AuthLayout";
import AuthCard from "../../components/auth/AuthCard";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function CheckMail() {
  const navigate = useNavigate();
  return (
    <AuthLayout>
      <AuthCard title="Hi, Check Your Mail" signText="">
        <Typography sx={{mt: 2, fontSize: 15}}>
          We have sent a password recover instructions to your email.
        </Typography>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={() => navigate('/auth/login')}
        >
          Sign in
        </Button>
      </AuthCard>
    </AuthLayout>
  );
}
