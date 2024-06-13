import React from 'react'
import css from "./SubCategories.module.scss";
import { useNavigate } from 'react-router-dom';
import SubCategoryCard from './SubCategoryCard';
import { Button } from '@/components/ui/button';
import CardSkeleton from './CardSkeleton';
import { BsClipboard2Data } from 'react-icons/bs';
import c1 from "@/assets/c4.png";
import c2 from "@/assets/c5.png";
import c3 from "@/assets/c1.png";
import c4 from "@/assets/c2.png";

const SubCategories = () => {
  const navigate = useNavigate();
  // const { data,isLoading, error } = useGetSubGlobalCategoriesQuery();
   const data = [
     {
       name: "Shirts",
       image: c1,
     },
     {
       name: "Pants",
       image: c2,
     },
     {
       name: "Tablets",
       image: c3,
     },
   ];
   const isLoading = false;
   const error = false;

  return (
    <div className={css.wrapper}>
      <div className={css.top}>
        <span>Sub Categories</span>
        <Button
          onClick={() => navigate("/admin/addSubCategory")}
          className="py-3 px-3 text-sm"
        >
          + Add Sub Category
        </Button>
      </div>

      <div
        className={`${css.categories} gap-x-4 gap-y-5 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7`}
      >
        {data?.map((item) => (
          <SubCategoryCard item={item} key={item.id} />
        ))}
        {/* {data?.categories?.map((item) => (
          <SubCategoryCard item={item} key={item.id} />
        ))} */}

        {/* Loading Skeleton  */}
        {isLoading &&
          Array.from({ length: 13 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))}

        {/* Empty Data  */}
        {!isLoading && data?.categories?.length === 0 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              alignItems: "center",
              width: "100%",
              height: "450px",
              justifyContent: "center",
            }}
          >
            <BsClipboard2Data fontSize={40} />
            <p style={{ fontSize: "1.1rem" }}>No Categories found</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SubCategories