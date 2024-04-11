import React, { useState } from "react";
import AuthLayout from "../../components/auth/AuthLayout";
import AuthCard from "../../components/auth/AuthCard";
import { Button, Typography } from "@mui/material";
import OTPInput from "react-otp-input";

export default function CodeVerification() {
  const [otp, setOtp] = useState("");
  return (
    <AuthLayout>
      <AuthCard title="Enter Verification Code" signText="">
        <Typography sx={{marginY: 2}}>We`ve send you code on your mail</Typography>
        <OTPInput
          value={otp}
          onChange={setOtp}
          containerStyle={{ justifyContent: "space-between" }}
          inputStyle={{
            width: "100%",
            margin: "8px",
            padding: "10px",
            border: `1px solid #808080`,
            borderRadius: 4,
            ":hover": {
              borderColor: "#ADD8E6",
            },
          }}
          numInputs={4}
          renderInput={(props) => <input {...props} />}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Continue
        </Button>
      </AuthCard>
    </AuthLayout>
  );
}
