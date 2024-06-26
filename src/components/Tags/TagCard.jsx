import React from "react";
import { Card, CardHeader } from "@nextui-org/react";
import Avvvatars from "avvvatars-react";
import { useMediaQuery } from "@uidotdev/usehooks";
import ActionDropdown from "./ActionDropdown";

const TagCard = ({ item, openModal, setSelectedItem }) => {
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");

  return (
    <Card className="max-w-[400px] shadow-sm border rounded-xl min-w-[280px] relative py-3 px-2">
      <CardHeader className="flex gap-3 relative">
        <div className="absolute right-2 top-2 cursor-pointer">
          <ActionDropdown
            item={item}
            openModal={openModal}
            setSelectedItem={setSelectedItem}
          />
        </div>
        <div className="flex space-x-2 items-center">
          <div className="w-12 h-12 rounded-full flex justify-center items-center font-bold text-blue-600 bg-slate-200 uppercase">
            <Avvvatars value={item?.name} size={isSmallDevice ? 44 : 48} />
          </div>
          <p className="text-md uppercase font-bold">{item?.name}</p>
        </div>
      </CardHeader>
    </Card>
  );
};

export default TagCard;
