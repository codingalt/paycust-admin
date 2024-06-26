import React from "react";
import css from "./Categories.module.scss";
import ImageComponent from "@/components/ui/ImageComponent";
import ActionDropdown from "./ActionDropdown";

const CategoryCard = ({ item, openModal, setSelectedItem }) => {
  return (
    <div className={css.card}>
      <ActionDropdown
        item={item}
        openModal={openModal}
        setSelectedItem={setSelectedItem}
      />
      <div className={css.image}>
        <ImageComponent
          src={import.meta.env.VITE_STORE_GLOBAL_CATEGORIES + item.image}
          className="w-full h-full"
          radius={"6px"}
        />
      </div>
      <div className={css.name}>{item.name}</div>
    </div>
  );
};

export default CategoryCard;
