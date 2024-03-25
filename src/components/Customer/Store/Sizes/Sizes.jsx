import React from 'react'
import css from "./Sizes.module.scss"
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom';
import SizeCard from './SizeCard';
import SizeSkeleton from './SizeSkeleton';
import { BsClipboard2Data } from 'react-icons/bs';
import { useGetStoreSizesQuery } from '@/services/api/customer/store/storeSizesWeightsApi';
import { useDisclosure } from '@nextui-org/react';
import AddSizeModal from './AddSizeModal';

const Sizes = () => {
    const navigate = useNavigate();
    const { data, isLoading, error } = useGetStoreSizesQuery();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    console.log(data);

  return (
    <div className={css.wrapper}>
      <div className={css.top}>
        <span>Sizes</span>
        <Button
          className="py-3 px-5 text-sm"
          onClick={onOpen}
        >
          + Add Size
        </Button>
      </div>

      {/* Add Size Modal  */}
      <AddSizeModal
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
      />

      <div className={css.cards}>
        {data?.sizes?.map((item) => (
          <SizeCard item={item} key={item.id} />
        ))}

        {/* Loading Skeleton  */}
        {isLoading &&
          Array.from({ length: 12 }).map((_, index) => (
            <SizeSkeleton key={index} />
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
            <p style={{ fontSize: "1.1rem" }}>No sizes found</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sizes