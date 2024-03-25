import React from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
} from "@nextui-org/react";
import ActionDropdown from './ActionDropdown';

const FeatureCard = ({ item }) => {
    
  return (
    <Card className="max-w-[400px] shadow-md rounded-s-lg min-w-[280px] relative">
      <CardHeader className="flex gap-3">
      <ActionDropdown item={item} />
        <div className="flex flex-col">
          <p className="text-md uppercase font-bold">{item?.name}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <ul>
          {item?.values?.map((value, index) => (
            <li key={value.id} className="text-sm text-default-500">
              {value.value}
            </li>
          ))}

          {item?.values?.length === 0 && (
            <p className="text-default-500 text-sm">
              No Values added for this feature
            </p>
          )}
        </ul>
      </CardBody>
      <Divider />
      <CardFooter>
        <div className="flex flex-col">
          <p className="text-sm text-default-700 mb-1">Assigned to :</p>
          <p className="text-tiny text-default-500">
            {item?.categories?.map((cat, index) => (
              <span key={index}>
                {cat.name}
                {index !== item.categories.length - 1 ? ", " : ""}
              </span>
            ))}
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default FeatureCard