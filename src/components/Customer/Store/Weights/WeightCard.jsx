import React from "react";
import { Card, CardHeader } from "@nextui-org/react";

const WeightCard = ({ item }) => {
  return (
    <Card className="max-w-[400px] shadow-sm border rounded-s-lg min-w-[280px] relative py-3 px-2">
      <CardHeader className="flex gap-3">
        <div className="flex space-x-2 items-center">
          <div className="w-11 h-11 rounded-full flex justify-center items-center font-bold text-blue-600 bg-slate-200 uppercase">
            {item?.name.slice(0, 1)}
          </div>
          <p className="text-md uppercase font-bold">{item?.name}</p>
        </div>
      </CardHeader>
    </Card>
  );
};

export default WeightCard;
