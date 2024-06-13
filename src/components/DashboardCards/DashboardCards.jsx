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
    <div
      className={`${css.cards} grid gap-x-6 gap-y-7 pb-20 md:gap-y-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-screen-lg`}
    >
      <Card className="w-full shadow-sm border-solid border-1 border-[#C1C1C1]">
        <CardHeader>
          <CardTitle className="text-sm">Total Users</CardTitle>
          <CardTitle className="text-3xl font-bold text-gray-800">
            120
          </CardTitle>
          <CardDescription>10% increase since last 10 days</CardDescription>
        </CardHeader>
      </Card>
      <Card className="w-full shadow-sm border-solid border-1 border-[#C1C1C1]">
        <CardHeader>
          <CardTitle className="text-sm">Earnings</CardTitle>
          <CardTitle className="text-3xl font-bold text-gray-800">
            $1250
          </CardTitle>
          <CardDescription>+20.1% from last month</CardDescription>
        </CardHeader>
      </Card>
      <Card className="w-full shadow-sm border-solid border-1 border-[#C1C1C1]">
        <CardHeader>
          <CardTitle className="text-sm">Total Businesses</CardTitle>
          <CardTitle className="text-3xl font-bold text-gray-800">
            143
          </CardTitle>
          <CardDescription>10% increase since last week</CardDescription>
        </CardHeader>
      </Card>
      <Card className="w-full shadow-sm border-solid border-1 border-[#C1C1C1]">
        <CardHeader>
          <CardTitle className="text-sm">Total Tags</CardTitle>
          <CardTitle className="text-3xl font-bold text-gray-800">
            150
          </CardTitle>
          <CardDescription>+10 since last month</CardDescription>
        </CardHeader>
      </Card>
      <Card className="w-full shadow-sm border-solid border-1 border-[#C1C1C1]">
        <CardHeader>
          <CardTitle className="text-sm">Total Categories</CardTitle>
          <CardTitle className="text-3xl font-bold text-gray-800">42</CardTitle>
          <CardDescription>+10 since last month</CardDescription>
        </CardHeader>
      </Card>
      <Card className="w-full shadow-sm border-solid border-1 border-[#C1C1C1]">
        <CardHeader>
          <CardTitle className="text-sm">Total Sub Categories</CardTitle>
          <CardTitle className="text-3xl font-bold text-gray-800">25</CardTitle>
          <CardDescription>+10 since last month</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}

export default DashboardCards