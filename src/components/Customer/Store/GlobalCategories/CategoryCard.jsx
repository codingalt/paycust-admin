import React from "react";
import css from "./GlobalCategories.module.scss";
import ImageComponent from "@/components/ui/ImageComponent";
import pic from "../../../../assets/Customer/Store/car.png";

const CategoryCard = ({ item }) => {
  return (
    <div className={css.card}>
      <div className={css.image}>
        <ImageComponent src={import.meta.env.VITE_STORE_GLOBAL_CATEGORIES+item.image} />
      </div>
      <div className={css.name}>{item.name}</div>
    </div>
  );
};

export default CategoryCard;
