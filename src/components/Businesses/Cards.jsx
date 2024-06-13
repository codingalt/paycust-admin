import { Image } from '@nextui-org/react';
import React from 'react'
import b1 from "@/assets/b1.png"
import b2 from "@/assets/b2.png";

const Cards = () => {
  return (
    <>
      <div className="w-full mb-6 max-w-screen-lg space-y-4 flex-col md:flex-row flex items-center border-1 border-[#E0E0E0] rounded-lg">
        <div className="flex flex-col flex-1 px-2 md:px-10 py-2 md:py-4 ">
          <p className="text-[24px] font-semibold text-center my-3 mb-4 md:mb-4">
            Tonzor Hair Saloon
          </p>
          <div className="flex flex-col mb-3 w-full px-3 md:px-0">
            <span className="text-[12px] text-[#B8B8B8] font-normal">
              Business Address
            </span>
            <p className="text-[#494949] text-[12px] font-medium">
              Northern Bypass Road, Multan, Punjab, Pakistan
            </p>
          </div>

          <div className="flex flex-col mb-6 px-3 md:px-0">
            <span className="text-[12px] text-[#B8B8B8] font-normal">
              Business Description
            </span>
            <p className="text-[#494949] text-[12px] font-medium">
              This is desc Lorem Ipsum is simply dummy text of the printing and
              typesetting industry
            </p>
          </div>

          <div className="border-1 w-[92%] mx-auto md:w-full border-[#DDDDDD] mt-2 block"></div>

          <div className="flex items-center justify-evenly mt-5 md:mt-5 space-x-3 md:space-x-6 px-2 md:px-0">
            <div className="w-full bg-[#F9EFE7] text-[#312C2C] text-[14px] md:text-[16px] font-semibold flex flex-col md:flex-row items-center justify-center py-3 px-2 md:px-5 rounded-lg">
              <span>10</span>
              <span>Employees</span>
            </div>
            <div className="w-full bg-[#ECF2F9] text-[#312C2C] text-[14px] md:text-[16px] font-semibold flex flex-col md:flex-row items-center justify-center py-3 px-2 md:px-5 rounded-lg">
              <span>4</span>
              <span>Services</span>
            </div>
            <div className="w-full bg-[#FFF6DD] text-[#312C2C] text-[14px] md:text-[16px] font-semibold flex flex-col md:flex-row items-center justify-center py-3 px-2 md:px-5 rounded-lg">
              <span>97</span>
              <span>Bookings</span>
            </div>
          </div>
        </div>

        <div className="flex-1 h-full w-full">
          <div className="w-full h-full bg-red-300">
            <Image radius="lg" src={b1} width={"100%"} height={"100%"} />
          </div>
        </div>
      </div>

      <div className="w-full mb-6 max-w-screen-lg space-y-4 flex-col md:flex-row flex items-center border-1 border-[#E0E0E0] rounded-lg">
        <div className="flex flex-col flex-1 px-2 md:px-10 py-2 md:py-4 ">
          <p className="text-[24px] font-semibold text-center my-3 mb-4 md:mb-4">
            Mard Hazraat Gym
          </p>
          <div className="flex flex-col mb-3 w-full px-3 md:px-0">
            <span className="text-[12px] text-[#B8B8B8] font-normal">
              Business Address
            </span>
            <p className="text-[#494949] text-[12px] font-medium">
              Northern Bypass Road, Multan, Punjab, Pakistan
            </p>
          </div>

          <div className="flex flex-col mb-6 px-3 md:px-0">
            <span className="text-[12px] text-[#B8B8B8] font-normal">
              Business Description
            </span>
            <p className="text-[#494949] text-[12px] font-medium">
              This is desc Lorem Ipsum is simply dummy text of the printing and
              typesetting industry
            </p>
          </div>

          <div className="border-1 w-[92%] mx-auto md:w-full border-[#DDDDDD] mt-2 block"></div>

          <div className="flex items-center justify-evenly mt-5 md:mt-5 space-x-3 md:space-x-6 px-2 md:px-0">
            <div className="w-full bg-[#F9EFE7] text-[#312C2C] text-[14px] md:text-[16px] font-semibold flex flex-col md:flex-row items-center justify-center py-3 px-2 md:px-5 rounded-lg">
              <span>10</span>
              <span>Employees</span>
            </div>
            <div className="w-full bg-[#ECF2F9] text-[#312C2C] text-[14px] md:text-[16px] font-semibold flex flex-col md:flex-row items-center justify-center py-3 px-2 md:px-5 rounded-lg">
              <span>4</span>
              <span>Services</span>
            </div>
            <div className="w-full bg-[#FFF6DD] text-[#312C2C] text-[14px] md:text-[16px] font-semibold flex flex-col md:flex-row items-center justify-center py-3 px-2 md:px-5 rounded-lg">
              <span>97</span>
              <span>Bookings</span>
            </div>
          </div>
        </div>

        <div className="flex-1 h-full w-full">
          <div className="w-full h-full bg-red-300">
            <Image radius="lg" src={b2} width={"100%"} height={"100%"} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Cards