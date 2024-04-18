import React from "react";
import css from "./Deals.module.scss";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { BsClipboard2Data } from "react-icons/bs";
import { useDisclosure } from "@nextui-org/react";
import DealCard from "./DealCard";
import DealSkeleton from "./DealSkeleton";
import { useGetStoreDealsQuery } from "@/services/api/customer/store/storeDealsApi";

const Deals = () => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetStoreDealsQuery();

  return (
    <div className={css.wrapper}>
      <div className={css.top}>
        <span>Deals</span>
        <Button className="py-3 px-5 text-sm" onClick={() => navigate("/admin/store/addDeal")}>
          + Add Deal
        </Button>
      </div>

      <div className={css.cards}>
        {data?.deals?.map((item) => (
          <DealCard item={item} key={item.id} />
        ))}

        {/* Loading Skeleton  */}
        {isLoading &&
          Array.from({ length: 12 }).map((_, index) => (
            <DealSkeleton key={index} />
          ))}

        {/* Empty Data  */}
        {!isLoading && data?.sizes?.length === 0 && (
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
            <p style={{ fontSize: "1.1rem" }}>No deals found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Deals;
