import React from 'react'
import css from "./Features.module.scss"
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { useGetFeaturesQuery } from '@/services/api/customer/store/storeCategoriesApi'
import FeatureCard from './FeatureCard'
import FeatureSkeleton from './FeatureSkeleton'
import { BsClipboard2Data } from 'react-icons/bs'

const Features = () => {
  const navigate = useNavigate();
  const {data,isLoading,error} = useGetFeaturesQuery();
    console.log(data);

  return (
    <div className={css.wrapper}>
      <div className={css.top}>
        <span>Features</span>
        <Button
          onClick={() => navigate("/admin/store/addFeatures")}
          className="py-3 px-3 text-sm"
        >
          + Add Features
        </Button>
      </div>

      <div className={css.cards}>
        {data?.features?.map((item) => (
          <FeatureCard item={item} key={item.id} />
        ))}

        {/* Loading Skeleton  */}
        {isLoading &&
          Array.from({ length: 12 }).map((_, index) => (
            <FeatureSkeleton key={index} />
          ))}

        {/* Empty Data  */}
        {!isLoading && data?.features?.length === 0 && (
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
            <p style={{ fontSize: "1.1rem" }}>No features found</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Features