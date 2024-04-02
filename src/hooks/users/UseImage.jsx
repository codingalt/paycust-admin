import { useState, useEffect } from "react";

// A custom hook for fetching and caching images
export const useImage = (imageName,route) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const authToken = localStorage.getItem("flonestTokenAdmin");
        const response = await fetch(
          `${import.meta.env.VITE_URI}admin${route}/${imageName}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch image");
        }

        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        setImageUrl(imageUrl);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchImage();

    // Cleanup function to revoke object URL when component unmounts
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageName]);

  return { imageUrl, isLoading };
};
