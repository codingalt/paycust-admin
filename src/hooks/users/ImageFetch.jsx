import { useImage } from "./UseImage";
import { Image } from "@nextui-org/react";
import ImageComponent from "@/components/ui/ImageComponent";
import { Skeleton } from "@mui/material";

export const ImageFetch = ({ imageName, route, radius, width, onClick }) => {
  const { imageUrl, isLoading } = useImage(imageName, route);

  return (
    <>
      {isLoading ? (
        <Skeleton
          style={{ borderRadius: radius }}
          width={width}
          height={width}
        />
      ) : (
        <ImageComponent
          radius={radius}
          src={imageUrl}
          className="w-full h-full align-middle"
          alt="Image"
          onClick={onClick}
        />
      )}
    </>
  );
};
