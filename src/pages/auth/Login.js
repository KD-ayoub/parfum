import React from "react";
import "../../styles/auth/login.css";
import AuthCard from "../../components/auth/AuthCard";
import AuthLayout from "../../components/auth/AuthLayout";
import LoginForm from "../../components/auth/LoginForm";

export default function Login() {
  return (
    <AuthLayout>
      <AuthCard title="Login" signText="Don't have an account?">
        <LoginForm/>
      </AuthCard>
    </AuthLayout>
  );
}
