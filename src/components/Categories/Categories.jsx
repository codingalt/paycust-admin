import React from 'react'
import css from "./Categories.module.scss"
import { Button } from '@/components/ui/button'
import CategoryCard from './CategoryCard'
import CardSkeleton from './CardSkeleton'
import { BsClipboard2Data } from "react-icons/bs";
import { useNavigate } from 'react-router-dom'
import c1 from "@/assets/c1.png"
import c2 from "@/assets/c2.png"
import c3 from "@/assets/c3.png"
import c4 from "@/assets/c4.png"

const Categories = () => {
  const navigate = useNavigate();
  // const {data,isLoading,error} = useGetGlobalCategoriesQuery();
  const data = [
    {
      name: "Electronics",
      image: c1,
    },
    {
      name: "Clothing",
      image: c2,
    },
    {
      name: "Fitness",
      image: c3,
    },
  ];

  const isLoading = false;
  const error = false;

  return (
    <div className={css.wrapper}>
      <div className={css.top}>
        <span>Categories</span>
        <Button
          onClick={() => navigate("/admin/addCategory")}
          className="py-3 px-3 text-sm"
        >
          + Add Category
        </Button>
      </div>

      <div className={`${css.categories} gap-x-4 gap-y-5 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7`}>
        {data?.map((item) => (
          <CategoryCard item={item} key={item.id} />
        ))}
        {/* {data?.categories?.map((item) => (
          <CategoryCard item={item} key={item.id} />
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

export default Categories