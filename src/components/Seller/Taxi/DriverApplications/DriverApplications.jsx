import React from 'react'
import css from "./DriverRequests.module.scss"
import PendingApplicationCard from "./PendingApplicationCard";
import { useGetPendingDriversQuery, useGetVerifiedDriversQuery } from '@/services/api/seller/taxi/taxiApi';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Loader from '@/components/Loader/Loader';
import VerifiedApplicationCard from './VerifiedApplicationCard';

const DriverApplications = () => {
  const {data: pendingDrivers, isLoading: isLoadingPending} = useGetPendingDriversQuery();
  const { data: verifiedDrivers, isLoading: isLoadingVerified } =
    useGetVerifiedDriversQuery();

  return (
    <div className={css.wrapper}>
      <div className={css.top}>Driver Applications</div>
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
            pendingDrivers?.drivers?.map((item) => (
              <PendingApplicationCard key={item.id} data={item} />
            ))}

          {isLoadingPending && (
            <div className="mt-12 ml-16">
              <Loader width={30} color={"#3784fb"} />
            </div>
          )}

          {!isLoadingPending && pendingDrivers?.drivers?.length === 0 && (
            <div className="mt-8 ml-4">
              <span className="text-md font-semibold" value="verified">
                No Pending Driver Application
              </span>
            </div>
          )}
        </TabsContent>
        <TabsContent value="verified">
          <div className={css.applications}>
            {!isLoadingVerified &&
              verifiedDrivers?.drivers?.map((item) => (
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

          {!isLoadingVerified && verifiedDrivers?.drivers?.length === 0 && (
            <div className="mt-8 ml-4">
              <span className="text-md font-semibold" value="verified">
                No Verified Driver Application
              </span>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default DriverApplications