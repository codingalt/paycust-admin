import React from "react";
import css from "./Brands.module.scss";
import { Button } from "@/components/ui/button";
import { BsClipboard2Data } from "react-icons/bs";
import { useDisclosure } from "@nextui-org/react";
import AddBrandModal from "./AddBrandModal";
import { useGetStoreBrandsQuery } from "@/services/api/customer/store/storeBrandsApi";
import BrandSkeleton from "./BrandSkeleton";
import BrandCard from "./BrandCard";

const Brands = () => {
  const { data, isLoading, error } = useGetStoreBrandsQuery();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  console.log(data);

  return (
    <div className={css.wrapper}>
      <div className={css.top}>
        <span>Brands</span>
        <Button className="py-3 px-5 text-sm" onClick={onOpen}>
          + Add Brand
        </Button>
      </div>

      {/* Add Size Modal  */}
      <AddBrandModal
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
      />

      <div className={css.cards}>
        {data?.brands?.map((item) => (
          <BrandCard item={item} key={item.id} />
        ))}

        {/* Loading Skeleton  */}
        {isLoading &&
          Array.from({ length: 12 }).map((_, index) => (
            <BrandSkeleton key={index} />
          ))}

        {/* Empty Data  */}
        {!isLoading && data?.brands?.length === 0 && (
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
            <p style={{ fontSize: "1.1rem" }}>No brands found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Brands;
