import React from "react";
import css from "./Weights.module.scss";
import { Button } from "@/components/ui/button";
import { BsClipboard2Data } from "react-icons/bs";
import { useGetStoreWeightsQuery } from "@/services/api/customer/store/storeSizesWeightsApi";
import { useDisclosure } from "@nextui-org/react";
import AddWeightModal from "./AddWeightModal";
import WeightCard from "./WeightCard";
import WeightSkeleton from "./WeightSkeleton";

const Weights = () => {
  const { data, isLoading, error } = useGetStoreWeightsQuery();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  console.log(data);

  return (
    <div className={css.wrapper}>
      <div className={css.top}>
        <span>Weights</span>
        <Button className="py-3 px-5 text-sm" onClick={onOpen}>
          + Add Weight
        </Button>
      </div>

      {/* Add Weight Modal  */}
      <AddWeightModal
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
      />

      <div className={css.cards}>
        {data?.weights?.map((item) => (
          <WeightCard item={item} key={item.id} />
        ))}

        {/* Loading Skeleton  */}
        {isLoading &&
          Array.from({ length: 12 }).map((_, index) => (
            <WeightSkeleton key={index} />
          ))}

        {/* Empty Data  */}
        {!isLoading && data?.weights?.length === 0 && (
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
            <p style={{ fontSize: "1.1rem" }}>No Weights found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weights;
