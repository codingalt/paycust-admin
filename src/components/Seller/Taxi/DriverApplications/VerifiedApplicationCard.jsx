import React, { useMemo, useState } from "react";
import avatar from "../../../../assets/Seller/RentPark/av3.jpg";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  useApproveDriverMutation,
  useRejectDriverMutation,
} from "@/services/api/seller/taxi/taxiApi";
import Loader from "@/components/Loader/Loader";
import { toastError, toastSuccess } from "@/components/Toast/Toast";
import ImageComponent from "../../../ui/ImageComponent";

const VerifiedApplicationCard = ({ data, isLoadingVerified }) => {
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <Card className="flex-1 w-1/2 max-w-2xl mb-1 shadow-sm border-solid border-1 p-4">
      {/* Driver Details  */}
      <div className="flex space-x-2">
        <div className="w-10 h-10 rounded-full">
          <ImageComponent
            className="w-full h-full rounded-full"
            src={
              data?.taxi_driver.image
                ? import.meta.env.VITE_TAXI_DRIVER_PROFILE +
                  data?.taxi_driver.image
                : avatar
            }
            radius="9999px"
          />
        </div>

        <div className="flex flex-col">
          <span className="text-sm font-medium">
            {data?.taxi_driver?.driver_name}
          </span>
          <span className="text-gray-500 text-xs">{data?.email}</span>
        </div>
      </div>

      {/* Taxi Details  */}
      <div className="flex w-full mt-7 justify-between px-1">
        <div className="flex flex-col space-y-1">
          <span className="text-gray-500 text-center text-xs">
            Taxi License No
          </span>
          <span className="text-md text-center font-medium">
            {data?.taxi_driver?.taxi_license_no}
          </span>
        </div>
        <div className="flex flex-col space-y-1">
          <span className="text-gray-500 text-center text-xs">
            Driving License No
          </span>
          <span className="text-md text-center font-medium">
            {data?.taxi_driver?.driving_license_no}
          </span>
        </div>
        <div className="flex flex-col space-y-1">
          <span className="text-gray-500 text-center text-xs">
            Account Name
          </span>
          <span className="text-md text-center font-medium">
            {data?.taxi_driver?.account_name}
          </span>
        </div>
        <div className="flex flex-col space-y-1">
          <span className="text-gray-500 text-center text-xs">Account No</span>
          <span className="text-md text-center font-medium">
            {data?.taxi_driver?.account_no}
          </span>
        </div>
      </div>

      {/* CNIC Details  */}
      <div className="flex w-full px-2 mx-auto justify-between mt-6">
        <div className="flex flex-col">
          <span className="text-sm font-semibold">CNIC Information:</span>
          <div className="flex space-x-5 mt-2">
            <div className="w-20 h-20 rounded-md cursor-pointer">
              <ImageComponent
                className="w-full h-full rounded-md"
                src={
                  import.meta.env.VITE_TAXI_IDCARD_FRONT + data.id_card_front
                }
                radius="6px"
              />
            </div>
            <div className="w-20 h-20 rounded-md cursor-pointer">
              <ImageComponent
                className="w-full h-full rounded-md"
                src={import.meta.env.VITE_TAXI_IDCARD_BACK + data.id_card_back}
                radius="6px"
              />
            </div>
          </div>
        </div>

        {/* Taxi Liscense images  */}
        <div className="flex flex-col">
          <span className="text-sm font-semibold">Liscense Information:</span>
          <div className="flex space-x-5 mt-2">
            <div className="w-20 h-20 rounded-md cursor-pointer">
              <ImageComponent
                className="w-full h-full rounded-md"
                src={
                  import.meta.env.VITE_TAXI_DRIVER_LISCENSE +
                  data.taxi_driver.driving_license_img
                }
                radius="6px"
              />
            </div>

            <div className="w-20 h-20 rounded-md cursor-pointer">
              <ImageComponent
                className="w-full h-full rounded-md"
                src={
                  import.meta.env.VITE_TAXI_TAXI_LISCENSE +
                  data.taxi_driver.taxi_license_img
                }
                radius="6px"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Buttons  */}
      {/* <div className="flex space-x-5 w-full justify-end mt-10 pr-1">
        <Button
          disabled={isLoadingReject}
          onClick={() => handleReject(data?.taxi_driver.id)}
          className="w-28 space-x-2 flex"
          variant="outline"
        >
          {isLoadingReject ? (
            <>
              <Loader width={15} color={"gray"} /> <span>Decline</span>{" "}
            </>
          ) : (
            "Decline"
          )}
        </Button>
        <Button
          disabled={isLoading}
          onClick={() => handleApprove(data?.taxi_driver.id)}
          className="w-32 space-x-2 flex"
        >
          {isLoading ? (
            <>
              <Loader width={15} /> <span>Accept</span>{" "}
            </>
          ) : (
            "Accept"
          )}
        </Button>
      </div> */}
    </Card>
  );
};

export default VerifiedApplicationCard;
