import * as yup from "yup";

export const registerSchema = yup.object().shape({
  firstName: yup
    .string()
    .required()
    .matches(/^[a-zA-ZÀ-ÖÙ-öù-ÿĀ-žḀ-ỿ\s\-\/.]+$/, "Please enter a valid name")
    .max(30),
  lastName: yup
    .string()
    .required()
    .matches(/^[a-zA-ZÀ-ÖÙ-öù-ÿĀ-žḀ-ỿ\s\-\/.]+$/, "Please enter a valid name")
    .max(30),
  email: yup.string().email().required(),
  password: yup.string().required().min(8).max(32),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match"),
});

export const loginSchema = yup.object().shape({
  username: yup.string().required().max(50).min(5),
  password: yup.string().required().min(5).max(32),
});

export const resetPasswordSchema = yup.object().shape({
  password: yup.string().required().min(8).max(32),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match"),
});

export const forgotPasswordSchema = yup.object().shape({
  email: yup.string().email().required(),
});

const authschemas = {
  loginSchema,
  registerSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
};

export default authschemas;
