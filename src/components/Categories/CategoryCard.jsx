import React from "react";
import css from "./Categories.module.scss";
import ImageComponent from "@/components/ui/ImageComponent";

const CategoryCard = ({ item }) => {
  return (
    <div className={css.card}>
      <div className={css.image}>
        {/* <ImageComponent
          src={import.meta.env.VITE_STORE_GLOBAL_CATEGORIES + item.image}
        /> */}
        <ImageComponent
          src={item.image}
        />
      </div>
      <div className={css.name}>{item.name}</div>
    </div>
  );
};

export default CategoryCard;
