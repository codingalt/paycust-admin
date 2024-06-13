import React from 'react'
import css from "./SubCategories.module.scss";
import ImageComponent from "@/components/ui/ImageComponent";
import { HiDotsVertical } from "react-icons/hi";
import ActionDropdown from './ActionDropdown';

const SubCategoryCard = ({item}) => {
  
  return (
    <div className={css.card}>
      <ActionDropdown item={item} />
      <div className={css.image}>
        {/* <ImageComponent
          src={import.meta.env.VITE_STORE_SUB_GLOBAL_CATEGORIES + item?.image}
        /> */}
        <ImageComponent
          src={item?.image}
        />
      </div>
      <div className={css.name}>{item?.name}</div>
      <span className="text-tiny text-default-400 -mt-2">
        {item?.global_category?.name}
      </span>
    </div>
  );
}

export default SubCategoryCard