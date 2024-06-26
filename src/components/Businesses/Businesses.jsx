import React, { useEffect, useState } from 'react'
import css from "./Businesses.module.scss"
import Cards from './Cards';
import { useGetBusinessesQuery } from '@/services/api/businessesApi';
import { Skeleton } from '@nextui-org/react';
import { useMainContext } from '@/context/MainContext';
import { BsClipboard2Data } from 'react-icons/bs';

const Businesses = () => {
  const {data,isLoading} = useGetBusinessesQuery();
  const { searchQuery } = useMainContext();
  const [businesses, setBusinesses] = useState(null);

  useEffect(() => {
    if (searchQuery !== "") {
      const filteredData = data?.businesses?.filter((item) => {
        const { name } = item;
        const searchTerm = searchQuery.toLowerCase();
        return name && name.toLowerCase().includes(searchTerm);
      });

      setBusinesses(filteredData);
    } else {
      setBusinesses(data?.businesses);
    }
  }, [searchQuery, data]);

  return (
    <div className={css.wrapper}>
      <div className={css.top}>Registered Businesses on Paycust</div>

      {isLoading ? (
        <div className="w-full mb-6 max-w-screen-lg gap-y-4 flex-col flex items-center">
          <Skeleton
            disableAnimation
            className="w-full h-[470px] md:h-[290px] rounded-lg"
          />
          <Skeleton
            disableAnimation
            className="w-full h-[470px] md:h-[290px] rounded-lg"
          />
        </div>
      ) : (
        businesses?.map((item) => <Cards key={item.id} item={item} />)
      )}

      {/* Empty Data  */}
      {!isLoading && businesses?.length === 0 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            alignItems: "center",
            width: "100%",
            height: "400px",
            justifyContent: "center",
          }}
        >
          <BsClipboard2Data fontSize={40} />
          <p style={{ fontSize: "1.1rem" }}>No data found</p>
        </div>
      )}
    </div>
  );
}

export default Businesses