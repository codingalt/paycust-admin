import React, { useEffect, useRef, useState } from "react";
import { Select, SelectItem, Avatar, Input, Button } from "@nextui-org/react";
import { FaCamera, FaPlus } from "react-icons/fa";
import { useGetStoreProductsQuery } from "@/services/api/customer/store/storeDealsApi";
import { MagicMotion } from "react-magic-motion";
import autoAnimate from "@formkit/auto-animate";
import { MdOutlineLocalOffer } from "react-icons/md";
import { toastError } from "@/components/Toast/Toast";
import { NumericFormat } from "react-number-format";

const SelectProducts = ({ setFieldValue }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [discountedPrice, setDiscountedPrice] = useState();
  const [discountValue, setDiscountValue] = useState("");
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  const parent = useRef(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  const reveal = () => setShow(true);

  const { data, isLoading } = useGetStoreProductsQuery();

  const handleCalculateDiscount = (value) => {
    // Convert value to a number
    const discountPercentage = parseFloat(value);
    if (!discountPercentage) {
      setDiscountValue("");
    } else {
      setDiscountValue(discountPercentage);
    }
    if (!isNaN(discountPercentage)) {
      const actualPrice = selectedProduct?.price || 0;

      // Calculate the discount amount
      const discountAmount = (discountPercentage / 100) * actualPrice;

      // Calculate the discounted price
      const discountedPrice = actualPrice - discountAmount;
      const formattedPrice = discountedPrice.toFixed(2);
      setDiscountedPrice(formattedPrice);
    }
  };

  const handleProductSelectionChange = (e) => {
    const selectedValues = e.target.value
      .split(",")
      .map((value) => value.trim())
      .filter((value) => value !== "");
    const productId = parseInt(selectedValues[0]);
    const filteredProduct = data?.products?.filter(
      (product) => product.id === productId
    );
    setSelectedProduct(filteredProduct[0]);
    reveal();
  };

  useEffect(() => {
    if (discountValue && discountValue !== "") {
      handleCalculateDiscount(discountValue);
    }
  }, [selectedProduct]);

  useEffect(()=>{
    setFieldValue("products",products)
  },[products]);

  const handleAddProduct = () => {
    if (selectedProduct && discountedPrice) {
      // only add if it does not already exist
      const existingProduct = products.find(
        (product) => product.id === selectedProduct.id
      );
      if (!existingProduct) {
        setProducts((prevVal) => [
          ...prevVal,
          {
            id: selectedProduct?.id,
            name: selectedProduct?.name,
            actual_price: selectedProduct?.price,
            new_price: discountedPrice,
          },
        ]);

        setDiscountValue("");
        setDiscountedPrice(null);
        setSelectedProduct(null);
      } else {
        toastError("This product is already selected");
        return;
      }
    }
  };

  return (
    <div className="w-full mt-5">
      <div className="flex w-full">
        {!isLoading && (
          <Select
            items={data?.products}
            // defaultSelectedKeys={[String(1)]}
            // selectedKeys={[String(1)]}
            label="Select Product"
            placeholder="Select a product"
            labelPlacement="outside"
            className=""
            size="lg"
            radius="sm"
            variant="bordered"
            classNames={{
              base: "rounded-sm z-0",
              trigger: "min-h-unit-12 py-5",
            }}
            listboxProps={{
              itemClasses: {
                base: [
                  "rounded-sm",
                  "text-default-500",
                  "transition-opacity",
                  "data-[hover=true]:text-foreground",
                  "data-[hover=true]:bg-default-100",
                  "dark:data-[hover=true]:bg-default-50",
                  "data-[selectable=true]:focus:bg-default-50",
                  "data-[pressed=true]:opacity-70",
                  "data-[focus-visible=true]:ring-default-500",
                ],
              },
            }}
            popoverProps={{
              classNames: {
                base: "before:bg-default-200",
                content: "p-0 border-small border-divider bg-background",
              },
            }}
            renderValue={(items) => {
              return items.map((item) => (
                <div key={item.key} className="flex items-center gap-2">
                  <Avatar
                    alt={item.data.name}
                    className="flex-shrink-0"
                    size="sm"
                    radius="sm"
                    src={
                      import.meta.env.VITE_STORE_PRODUCT_IMAGES +
                      item?.data?.image_name
                    }
                    showFallback
                    fallback={<FaCamera size={17} />}
                  />
                  <div className="flex flex-col">
                    <span>{item.data.name}</span>
                    {/* <span className="text-default-500 text-tiny">
                      ({item.data.description})
                    </span> */}
                  </div>
                </div>
              ));
            }}
            onChange={(e) => handleProductSelectionChange(e)}
          >
            {(prod) => (
              <SelectItem key={prod.id} textValue={prod.name}>
                <div className="flex gap-2 items-center">
                  <Avatar
                    alt={prod.name}
                    className="flex-shrink-0"
                    size="sm"
                    radius="sm"
                    src={
                      import.meta.env.VITE_STORE_PRODUCT_IMAGES +
                      prod?.data?.image_name
                    }
                    showFallback
                    fallback={<FaCamera size={17} />}
                  />
                  <div className="flex flex-col">
                    <span className="text-small">{prod.name}</span>
                    {/* <span className="text-tiny text-default-400">
                      {prod.description}
                    </span> */}
                  </div>
                </div>
              </SelectItem>
            )}
          </Select>
        )}
      </div>

      <div ref={parent}>
        {show && (
          <>
            <div className="flex w-full mt-5">
              <Input
                variant="bordered"
                size="lg"
                radius="sm"
                type="number"
                name="discountedPrice"
                id="discountedPrice"
                label="Discount"
                placeholder="0.00"
                max={99}
                labelPlacement="outside"
                className="z-0 shadow-none"
                value={discountValue}
                startContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">%</span>
                  </div>
                }
                onChange={(e) => {
                  let value = e.target.value;
                  // Check if the value entered is greater than or equal to 100
                  if (parseFloat(value) >= 100) {
                    value = 99;
                  }
                  handleCalculateDiscount(value);
                }}
              />
            </div>

            <div className="flex justify-between items-center py-3 px-6 mt-4 rounded-md w-full bg-default-50">
              <div>
                <p className="text-sm text-default-600 text-center">
                  Actual Price
                </p>
                <span className="text-sm font-medium text-center">
                  <NumericFormat
                    displayType="text"
                    value={
                      selectedProduct?.price ? selectedProduct?.price : "0.00"
                    }
                    thousandSeparator=","
                    thousandsGroupStyle="lakh"
                  />
                </span>
              </div>
              <div>
                <p className="text-sm text-default-600">Discounted Price</p>
                <span className="text-sm font-medium text-center">
                  <NumericFormat
                    displayType="text"
                    value={discountedPrice ? discountedPrice : "0.00"}
                    thousandSeparator=","
                    thousandsGroupStyle="lakh"
                  />
                </span>
              </div>
            </div>

            {/* Add Button  */}
            <div className="flex w-full justify-end mt-5 mb-3">
              <Button
                startContent={<FaPlus />}
                radius="sm"
                variant="bordered"
                color="success"
                onClick={() => handleAddProduct()}
              >
                Add Product
              </Button>
            </div>
          </>
        )}
      </div>

      {/* Display Added Products  */}
      {products?.length > 0 && show && (
        <div ref={parent}>
          <div>
            <p className="text-medium font-semibold text-default-700 ml-4">
              Deals Products
            </p>
          </div>
          <div className="grid grid-cols-3 w-full space-x-3 py-3 px-3 max-h-96 overflow-y-auto scrollbar-hide">
            {products?.map((item) => (
              <div
                key={item.id}
                className="flex max-h-44 rounded-md py-5 px-3 mb-4 flex-col border-1 items-center justify-center"
              >
                <div className="flex space-x-3 items-center h-10 w-[100%]">
                  <div className="flex justify-center items-center w-[35px] h-[35px] rounded-full bg-[#3784fb] text-white">
                    <MdOutlineLocalOffer fontSize={20} />
                  </div>
                  <p className="text-sm font-semibold flex-1">
                    {item.name.length > 44
                      ? `${item.name.slice(0, 44)}...`
                      : item.name}
                  </p>
                </div>

                <div className="flex justify-between items-center w-full mt-6">
                  <p className="text-tiny text-default-500 font-medium">
                    Actual Price
                  </p>
                  <p className="text-tiny text-default-500 font-medium">
                    <NumericFormat
                      displayType="text"
                      value={item.actual_price}
                      thousandSeparator=","
                      thousandsGroupStyle="lakh"
                    />
                  </p>
                </div>
                <div className="flex justify-between items-center w-full mt-3 mb-1">
                  <p className="text-tiny text-default-500 font-medium">
                    Discounted Price
                  </p>
                  <p className="text-tiny text-default-500 font-medium">
                    <NumericFormat
                      displayType="text"
                      value={item.new_price}
                      thousandSeparator=","
                      thousandsGroupStyle="lakh"
                    />
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectProducts;
