import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string()
    .max(255, "Maximun characters are 255")
    .email("Please Enter a valid email address")
    .required("Email is Required"),
  password: Yup.string().min(6).max(255, "Maximun characters are 255").required("Password is Required"),
});
