import React from 'react'
import { Card, CardHeader } from "@nextui-org/react";
import { Skeleton } from "@mui/material";

const BrandSkeleton = () => {
  return (
    <Card className="max-w-[400px] shadow-sm border rounded-s-lg min-w-[280px] relative py-3 px-2">
      <CardHeader className="flex gap-3">
        <div className="flex space-x-2 items-center">
          <div className="w-11 h-11 rounded-full flex justify-center items-center font-bold uppercase">
            <Skeleton width={"100%"} height={"100%"} variant="circular" />
          </div>
          <p className="text-md uppercase font-bold">
            <Skeleton width={120} height={16} variant="rounded" />
          </p>
        </div>
      </CardHeader>
    </Card>
  );
}

export default BrandSkeleton