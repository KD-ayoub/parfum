import React from 'react'
import AuthLayout from '../../components/auth/AuthLayout';
import AuthCard from '../../components/auth/AuthCard';
import RegisterForm from '../../components/auth/RegisterForm';

export default function Register() {
  return (
    <AuthLayout>
      <AuthCard title="Sign up" signText="Already have an account?">
        <RegisterForm/>
      </AuthCard>
    </AuthLayout>
  );
}
