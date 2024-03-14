import React from 'react'
import css from "./ModuleCards.module.scss"
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { BsTaxiFront } from "react-icons/bs";
import { MdCarRental } from "react-icons/md";
import { PiBuildingsLight } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';

const links = [
  { label: "Taxi", route: "/admin/taxi/dashboard", icon: <BsTaxiFront /> },
  { label: "Rent Park", route: "#", icon: <MdCarRental /> },
  { label: "Company", route: "#", icon: <PiBuildingsLight /> },
  { label: "Store", route: "/admin/store/dashboard", icon: <PiBuildingsLight /> },
  // { label: "Shelter", route: "/admin/shelter" },
  // { label: "Food", route: "/admin/food" },
];

const ModuleCards = () => {
    const navigate = useNavigate();
  return (
    <div className={css.wrapper}>
      {links?.map((link, index) => (
        <Card
          onClick={() => navigate(link.route)}
          key={index}
          className="w-[300px] cursor-pointer bg-gray-50 shadow-md border-blue-500 border-solid border-1 hover:bg-gray-50 transition-all"
        >
          <CardHeader>
            <div className={css.icon}>{link.icon}</div>
            <CardTitle className="text-center text-xl">{link.label}</CardTitle>
            <CardDescription className="text-center">
              Click on this to view {link.label} module.
            </CardDescription>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
      ))}
    </div>
  );
}

export default ModuleCards