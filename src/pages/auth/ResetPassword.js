import React from 'react'
import AuthLayout from '../../components/auth/AuthLayout'
import AuthCard from '../../components/auth/AuthCard'
import ResetPasswordForm from '../../components/auth/ResetPasswordForm'

export default function ResetPassword() {
  return (
    <AuthLayout>
      <AuthCard title="Reset Password" signText="">
        <ResetPasswordForm/>
      </AuthCard>
    </AuthLayout>
  )
}
