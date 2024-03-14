import React from 'react'
import ImageComponent from '@/components/ui/ImageComponent';
import { Card } from '@/components/ui/card'
import avatar from "../../../../assets/Seller/RentPark/av3.jpg";
import { Button } from '@/components/ui/button';

const VerifiedApplicationCard = ({data}) => {

  return (
    <>
      <Card className="flex-1 w-1/2 max-w-xl mb-1 shadow-sm border-solid border-1 px-2.5 pr-3 py-2 rounded-xl">
        <div className="flex space-x-4">
          <div className="w-52 h-40 bg-slate-50 object-cover rounded-xl">
            <ImageComponent
              className="w-full h-full rounded-xl"
              src={
                data?.images[0]?.image_name
                  ? import.meta.env.VITE_TAXI_VEHICLES +
                    data?.images[0]?.image_name
                  : avatar
              }
              radius="9px"
            />
          </div>
          <div className="w-full flex flex-col">
            <span className="text-md text-2xl font-bold capitalize">
              {data?.car_model}
            </span>
            <div className="mt-1 text-gray-500 text-sm">
              <span>Registration No: {data?.reg_no}, </span>
              <span>Year: {data?.year}</span>
            </div>
            <div className="mt-2.5 flex space-x-2">
              <div className="w-10 h-10 object-cover rounded-lg border p-0.5 flex justify-center items-center">
                <ImageComponent
                  className="w-full h-full rounded-lg"
                  src={
                    data?.vehicleable?.image
                      ? import.meta.env.VITE_TAXI_DRIVER_PROFILE +
                        data?.vehicleable?.image
                      : avatar
                  }
                  radius="9px"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">
                  {data?.vehicleable?.driver_name}
                </span>
                <span className="text-gray-500 text-xs">
                  {data?.email}taxidriver3@demo.com
                </span>
              </div>
            </div>

            <div className="mt-3 flex justify-between items-center w-full">
              <span className="text-lg font-bold">${data?.rent_per_day}</span>
              <div className="flex space-x-2 items-center">
                <span className='w-20 mt-1.5 mr-1 bg-green-500 mb-0 text-sm text-center text-white rounded-full'>Verified</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}

export default VerifiedApplicationCard