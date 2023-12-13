import React, { useEffect, useState } from "react";

import { IoBagHandle } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { GiTwoCoins } from "react-icons/gi";
import { LuBoxes } from "react-icons/lu";
import { fetchOrderData } from "./Orders/Orders";
import { fetchUserData } from "./Customers";
import { fetchProductData } from "./Product/Products";
export default function DashboardStatsGrid() {
  const [orderData, setOrderData] = useState(null);
  const [customerData, setCustomerData] = useState(null);
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    // Fetch order data
    fetchOrderData().then((data) => setOrderData(data));

    // Fetch user data
    fetchUserData().then((data) => setCustomerData(data));

    // Fetch product data
    fetchProductData().then((data) => setProductData(data));
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-4 w-full">
      <div className="flex flex-col lg:flex-row w-full gap-4">
        <BoxWrapper>
          <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-300">
            <GiTwoCoins className="text-2xl text-white" />
          </div>
          <div className="pl-4">
            <span className="text-sm text-gray-500 font-light">
              Total sales
            </span>
            <div className="flex items-center">
              <strong className="text-xl text-gray-700 font-semibold">
                {orderData
                  ? orderData
                      .reduce((acc, order) => {
                        let total = parseFloat(
                          order.cart_total_price.$numberDecimal
                        );
                        return acc + total;
                      }, 0)
                      .toFixed(2)
                  : "..."} MAD
              </strong>

              <span className="text-sm text-green-500 pl-2">+297</span>
            </div>
          </div>
        </BoxWrapper>
        <BoxWrapper>
          <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-400">
            <IoBagHandle className="text-2xl text-white" />
          </div>
          <div className="pl-4">
            <span className="text-sm text-gray-500 font-light">
              Total Orders
            </span>
            <div className="flex items-center">
              <strong className="text-xl text-gray-700 font-semibold">
                {/* $2698.95 */}
                {orderData && orderData.length}
              </strong>
              <span className="text-sm text-green-500 pl-2">+179</span>
            </div>
          </div>
        </BoxWrapper>
      </div>
      <div className="flex flex-col lg:flex-row w-full gap-4">
        <BoxWrapper>
          <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
            <FaUsers className="text-2xl text-white" />
          </div>
          <div className="pl-4">
            <span className="text-sm text-gray-500 font-light">
              Total Customers
            </span>
            <div className="flex items-center">
              <strong className="text-xl text-gray-700 font-semibold">
                { customerData && customerData.length}
              </strong>
              <span className="text-sm text-green-500 pl-2">+356</span>
            </div>
          </div>
        </BoxWrapper>
        <BoxWrapper>
          <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-600">
            <LuBoxes className=" text-2xl text-white" />
          </div>
          <div className="pl-4">
            <span className="text-sm text-gray-500 font-light">
              Total Products
            </span>
            <div className="flex items-center">
              <strong className="text-xl text-gray-700 font-semibold">
                { productData && productData.length}
              </strong>
              <span className="text-sm text-green-500 pl-2">+647</span>
            </div>
          </div>
        </BoxWrapper>
      </div>
    </div>
  );
}

function BoxWrapper({ children }) {
  return (
    <div className="bg-white rounded-lg p-4 flex-1 border border-gray-200 shadow-xl cursor-pointer flex items-center">
      {children}
    </div>
  );
}
