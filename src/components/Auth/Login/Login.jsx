import React, { useMemo } from "react";
import { toastError, toastSuccess } from "../../Toast/Toast";
import Loader from "../../Loader/Loader";
import { useDispatch } from "react-redux";
import { setAuth } from "../../../services/slices/auth/authSlice";
import css from "./Login.module.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useLoginUserMutation } from "../../../services/api/authApi/authApi";
import { loginSchema } from "../../../utils/validation/AuthValidation";
import { useNavigate } from "react-router-dom";

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
        toastError(error?.data?.message);
      }
    }, [error]);

    const handleSubmit = async (values) => {
      const { data } = await loginUser({
        email: values.email,
        password: values.password,
      });
      
      console.log("Login res",data);
      if (data?.token && data.is_admin) {
        dispatch(setAuth(data?.user));
        localStorage.setItem("flonestTokenAdmin", data?.token);
        navigate("/");
      }
    };

  return (
    <div className={css.wrapper}>
      <div className={css.shape1}></div>
      <div className={css.shape2}></div>
      <div className={css.shape3}></div>
      <header>
        {/* <h3>Hello,</h3> */}
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

            <button disabled={isLoading} type="submit" className={css.button}>
              {isLoading ? <Loader width={25} color="#fff" /> : "Login"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
