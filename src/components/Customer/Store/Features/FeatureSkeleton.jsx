import React from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
} from "@nextui-org/react";
import { Skeleton } from '@mui/material';

const FeatureSkeleton = () => {
  return (
    <Card className="max-w-[400px] shadow-md rounded-s-lg">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <Skeleton variant="text" width={123} sx={{ fontSize: ".94rem" }} />
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <ul>
          <Skeleton variant="text" width={60} sx={{ fontSize: ".8rem" }} />
          <Skeleton variant="text" width={60} sx={{ fontSize: ".8rem" }} />
          <Skeleton variant="text" width={60} sx={{ fontSize: ".8rem" }} />
        </ul>
      </CardBody>
      <Divider />
      <CardFooter>
        <div className="flex flex-col">
          <Skeleton variant="text" width={60} sx={{ fontSize: ".9rem" }} />
          <Skeleton variant="text" width={130} sx={{ fontSize: ".9rem" }} />
        </div>
      </CardFooter>
    </Card>
  );
}

export default FeatureSkeleton