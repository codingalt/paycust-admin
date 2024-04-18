export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const fetchKycImage = async (imageName) => {
  const authToken = localStorage.getItem("flonestTokenAdmin");
  try {
    const response = await fetch(
      `${import.meta.env.VITE_URI}admin/users/kycImage/${imageName}`,
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
    return imageUrl;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const extractErrors = (errors) => {
  if (errors) {
    const errorsArray = Object.keys(errors).reduce((acc, key) => {
      return acc.concat(errors[key]);
    }, []);
    return errorsArray;
  }
};