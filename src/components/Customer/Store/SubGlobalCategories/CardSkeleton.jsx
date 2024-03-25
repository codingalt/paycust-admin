import React from "react";
import css from "./SubGlobalCategories.module.scss";
import { Skeleton } from "@mui/material";

const CardSkeleton = () => {
  return (
    <div className={css.card}>
      <div className={css.image}>
        <Skeleton variant="rectangular" width={"100%"} height={"100%"} />
      </div>
      <div className={css.name}>
        <Skeleton variant="text" width={123} sx={{ fontSize: ".94rem" }} />
      </div>
    </div>
  );
};

export default CardSkeleton;
