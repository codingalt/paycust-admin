import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useValidateTokenQuery } from "../../services/api/authApi";
import CircleWithBars from "../Loader/CircleWithBars";
import { setAuth } from "../../services/slices/auth/authSlice";
import { useDispatch } from "react-redux";

const Protected = ({ Component }) => {
  let pathname = window.location.pathname;

  useEffect(() => {
    pathname = window.location.pathname;
  }, [window.location.pathname]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(null);
  const {
    data: token,
    isLoading,
    isSuccess,
    error,
  } = useValidateTokenQuery(null, { refetchOnMountOrArgChange: true });

  useEffect(() => {
    const authToken = localStorage.getItem("paycustTokenAdmin");
    if (!authToken) {
      navigate("/");
    } else {
      // Check for token validity
      if (!isLoading) {
        dispatch(setAuth(token?.user));
        if (!isLoading && isSuccess) {
          setShow(true);
        } else if (!isLoading && error) {
          setShow(false);
          navigate("/");
        }
      }
    }
  }, [token, isSuccess, error, isLoading, pathname]);

  if (isLoading) {
    return (
      <div
        style={{
          width: "100%",
          height: "95vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: "999",
        }}
      >
        <CircleWithBars width={60} color={"#3784FB"} />
      </div>
    );
  }

  return show && <Component />;
};

export default Protected;
