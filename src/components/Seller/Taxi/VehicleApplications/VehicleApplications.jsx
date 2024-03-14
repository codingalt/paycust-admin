import React from 'react'
import css from "./VehicleApplications.module.scss";
import PendingApplicationCard from "./PendingApplicationCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Loader from "@/components/Loader/Loader";
import VerifiedApplicationCard from "./VerifiedApplicationCard";
import { useGetPendingVehiclesQuery, useGetVerifiedVehiclesQuery } from '@/services/api/seller/taxi/taxiApi';

const VehicleApplications = () => {
    const { data: pendingVehicles, isLoading: isLoadingPending } =
      useGetPendingVehiclesQuery();
    const { data: verifiedVehicles, isLoading: isLoadingVerified } =
      useGetVerifiedVehiclesQuery();

  return (
    <div className={css.wrapper}>
      <div className={css.top}>Vehicles Applications</div>
      <Tabs defaultValue="pending">
        <TabsList className="mb-2.5 py-3 px-1 h-12">
          <TabsTrigger className="h-9" value="pending">
            Pending Applications
          </TabsTrigger>
          <TabsTrigger className="h-9" value="verified">
            Verified Applications
          </TabsTrigger>
        </TabsList>
        <TabsContent value="pending">
          {!isLoadingPending &&
            pendingVehicles?.vehicles?.map((item) => (
              <PendingApplicationCard key={item.id} data={item} />
            ))}

          {isLoadingPending && (
            <div className="mt-12 ml-16">
              <Loader width={30} color={"#3784fb"} />
            </div>
          )}

          {!isLoadingPending && pendingVehicles?.vehicles?.length === 0 && (
            <div className="mt-8 ml-4">
              <span className="text-md font-semibold" value="verified">
                No Pending Vehicle Application
              </span>
            </div>
          )}
        </TabsContent>
        <TabsContent value="verified">
          <div className={css.applications}>
            {!isLoadingVerified &&
              verifiedVehicles?.vehicles?.map((item) => (
                <VerifiedApplicationCard
                  key={item.id}
                  data={item}
                  isLoadingVerified={isLoadingVerified}
                />
              ))}
          </div>

          {isLoadingVerified && (
            <div className="mt-12 ml-16">
              <Loader width={30} color={"#3784fb"} />
            </div>
          )}

          {!isLoadingVerified && verifiedVehicles?.vehicles?.length === 0 && (
            <div className="mt-8 ml-4">
              <span className="text-md font-semibold" value="verified">
                No Verified Vehicle Application
              </span>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default VehicleApplications