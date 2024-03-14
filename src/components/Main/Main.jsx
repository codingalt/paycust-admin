import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import css from "./Main.module.scss"
import flonest from "../../assets/Main/logo.png"
import { Button } from "../ui/button";
import ModuleCards from "./Cards/ModuleCards";

const Main = () => {
  const { user, isAuthenticated } = useSelector((store) => store.auth);

  return <div className={css.wrapper}>
    <div className={css.top}>
      <img src={flonest} alt="" />
      <span>Flonest</span>
    </div>

    <ModuleCards />
  </div>;
};

export default Main;
