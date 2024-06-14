import React, { useMemo } from "react";
import { toastError, toastSuccess } from "../../Toast/Toast";
import Loader from "../../Loader/Loader";
import { useDispatch } from "react-redux";
import { setAuth } from "../../../services/slices/auth/authSlice";
import css from "./Login.module.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useLoginUserMutation } from "../../../services/api/authApi";
import { loginSchema } from "../../../utils/validation/AuthValidation";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo.svg";
import { Button, Image } from "@nextui-org/react";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginUser, result] = useLoginUserMutation();
  const { isLoading, error, isSuccess } = result;
  const initialValues = {
    email: "",
    password: "",
  };

  useMemo(() => {
    if (error) {
      console.log(error?.data);
      toastError(
        error?.data?.message
          ? error.data.message
          : "Uh ho! Something went wrong"
      );
    }
  }, [error]);

  const handleSubmit = async (values) => {
    const { data } = await loginUser({
      email: values.email,
      password: values.password,
    });

    if (data?.token) {
      dispatch(setAuth(data?.user));
      localStorage.setItem("paycustTokenAdmin", data?.token);
      navigate("/admin/dashboard");
    }
  };

  return (
    <div className={css.wrapper}>
      <div className={css.shape1}></div>
      <div className={css.shape2}></div>
      <div className={css.shape3}></div>
      <header>
        <div className="w-12 mb-7">
          <Image src={logo} width={"100%"} />
        </div>
        <h3>Welcome Back</h3>
        <span>Login to browse Admin Dashboard</span>
      </header>
      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, setFieldValue, touched }) => (
          <Form>
            <div className={css.formGroup}>
              <label htmlFor="email">Email</label>
              <Field
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                className={errors.email && touched.email && "borderBottom"}
              />
              <ErrorMessage
                name="email"
                component="div"
                className={css.inputError}
              />
            </div>

            <div className={css.formGroup}>
              <label htmlFor="password">Password</label>
              <Field
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                className={
                  errors.password && touched.password && "borderBottom"
                }
              />
              <ErrorMessage
                name="password"
                component="div"
                className={css.inputError}
              />
            </div>

            <Button
              isLoading={isLoading}
              type="submit"
              className={`${css.button} shadow`}
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
