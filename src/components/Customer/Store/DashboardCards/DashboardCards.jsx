import React from 'react'
import css from "./DashboardCards.module.scss"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

const DashboardCards = () => {
  return (
    <div className={css.cards}>
      <Card className="w-[300px] shadow-sm border-solid border-1">
        <CardHeader>
          <CardTitle className="text-sm">Total Users</CardTitle>
          <CardTitle className="text-3xl font-bold text-gray-800">
            120
          </CardTitle>
          <CardDescription>+180.1% from last month</CardDescription>
        </CardHeader>
      </Card>
      <Card className="w-[300px] shadow-sm border-1 border-solid border-1">
        <CardHeader>
          <CardTitle className="text-sm">Earnings</CardTitle>
          <CardTitle className="text-3xl font-bold text-gray-800">
            $45,231.89
          </CardTitle>
          <CardDescription>+20.1% from last month</CardDescription>
        </CardHeader>
      </Card>
      <Card className="w-[300px] shadow-sm border-1 border-solid border-1">
        <CardHeader>
          <CardTitle className="text-sm">Categories</CardTitle>
          <CardTitle className="text-3xl font-bold text-gray-800">10</CardTitle>
          <CardDescription>+4 since last hour</CardDescription>
        </CardHeader>
      </Card>
      <Card className="w-[300px] shadow-sm border-1 border-solid border-1">
        <CardHeader>
          <CardTitle className="text-sm">Products</CardTitle>
          <CardTitle className="text-3xl font-bold text-gray-800">
            +573
          </CardTitle>
          <CardDescription>+201 since last month</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}

export default DashboardCards