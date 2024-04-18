import React from "react";
import { Card, CardHeader } from "@nextui-org/react";
import { TbCalendarDue } from "react-icons/tb";
import { MdOutlineLocalOffer } from "react-icons/md";
import moment from "moment";

const DealCard = ({ item }) => {
  return (
    <Card className="max-w-[420px] shadow-sm border rounded-s-lg min-w-[360px] relative py-3 px-2">
      <CardHeader className="flex gap-3">
        <div className="flex space-x-2 items-center">
          <div className="w-11 h-11 rounded-full flex justify-center items-center font-bold text-blue-600 bg-slate-200 uppercase">
            {/* {item?.title.split(" ")[0][0]} */}
            <MdOutlineLocalOffer fontSize={22} />
          </div>
          <p className="text-md uppercase font-bold">{item?.title}</p>
        </div>
      </CardHeader>
      <div className="flex w-full justify-between items-center mt-2 px-3 mx-auto mb-2">
        <div className="flex flex-col">
          <div className="flex space-x-1 items-center justify-center text-tiny font-medium text-default-400 mb-1">
            <TbCalendarDue fontSize={15} /> <span>Start Date</span>
          </div>
          <p className="text-tiny text-center font-medium text-default-500">
            {moment(item?.start_date).format("MMMM, D YYYY")}
          </p>
        </div>
        <div className="flex flex-col">
          <div className="flex space-x-1 items-center justify-center text-tiny font-medium text-default-400 mb-1">
            <TbCalendarDue fontSize={15} /> <span>End Date</span>
          </div>
          <p className="text-tiny text-center font-medium text-default-500">
            {moment(item?.expiry_date).format("MMMM, D YYYY")}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default DealCard;
