import React from 'react'
import css from "./GlobalCategories.module.scss"
import { Button } from '@/components/ui/button'
import { useGetGlobalCategoriesQuery } from '@/services/api/customer/store/storeCategoriesApi'
import CategoryCard from './CategoryCard'
import CardSkeleton from './CardSkeleton'
import { BsClipboard2Data } from "react-icons/bs";
import { useNavigate } from 'react-router-dom'

const GlobalCategories = () => {
  const navigate = useNavigate();
  const {data,isLoading,error} = useGetGlobalCategoriesQuery();

  return (
    <div className={css.wrapper}>
      <div className={css.top}>
        <span>Global Categories</span>
        <Button onClick={() => navigate("/admin/store/addGlobalCategory")} className="py-3 px-3 text-sm">
          + Add Category
        </Button>
      </div>

      <div className={css.categories}>
        {data?.categories?.map((item) => (
          <CategoryCard item={item} key={item.id} />
        ))}

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

export default GlobalCategories