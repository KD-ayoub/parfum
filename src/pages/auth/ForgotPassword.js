import React from 'react'
import "../../styles/auth/login.css";
import AuthCard from "../../components/auth/AuthCard";
import AuthLayout from "../../components/auth/AuthLayout";
import ForgotPasswordForm from '../../components/auth/ForgotPasswordForm';

export default function ForgotPassword() {
  return (
    <AuthLayout>
      <AuthCard title="Forgot Password" signText="Back to Login">
        <ForgotPasswordForm/>
      </AuthCard>
    </AuthLayout>
  )
}
