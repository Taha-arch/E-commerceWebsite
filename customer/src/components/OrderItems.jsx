import React, { useEffect } from "react";
import { FaCheck } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { fetchOrders } from "../Redux/slicers/Order/orderServices";

const OrderItems = () => {
  const customer = useSelector((state) => state.auth.customer);
  const orders = useSelector((state) => state.order.order);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (customer) {
      dispatch(fetchOrders(customer._id));
    }
  }, [customer, dispatch]);

  return (
    <div className="mb-6">
      {Array.isArray(orders) &&
        orders.map((order, index) => (
          <div className="bg-primary w-98 " key={order._id}>
            <div className="flex flex-col h-fit bg-white rounded-md mt-3 p-4">
              <div className=" flex gap-2 font-bold text-lg mb-2 ">
                {" "}
                Order Number :<div className="font-serif"> {index + 1 }</div>
              </div>
              <div className="flex justify-between w-full pr-3">
                <div className=" text-blue-900 text.lg font-bold">
                  {order.status}
                </div>
                <div className="text-gray-500 font-serif">
                  {new Date(order.order_date).toLocaleString(undefined, {
                    month: "short",
                    year: "numeric",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </div>
              </div>
              {order.order_items.map((item, index) => (
                <div
                  key={index}
                  className="w-full gap-2 flex flex-row mt-3 bg-white hover:bg-gray-300 rounded-md cursor-pointer"
                  onClick={() => navigate(`/product/${item.product_id}`)}
                >
                  <div className="w-1/6 rounded-lg p-3">
                    <img src={item.productImage[0]} alt="" />
                  </div>
                  <div className="w-4/6 pt-2">
                    <div className="flex justify-between">
                      <h4 className="font-Playfair w-fit">
                        {item.productName}
                      </h4>
                      <div className="w-14 font-thin">Qty: {item.quantity}</div>
                    </div>
                    <div className="flex flex-row justify-between">
                      <p className="text-xs text-gray-400">Linen</p>
                      <p className="border-l pl-3 text-gray-400 text-xs">
                        Size:M
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center border-l my-2 border-gray-300 items-center w-1/6">
                    <IoIosArrowForward />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-row items-center justify-between mt-3 pb-3 px-5">
              <div className="flex flex-row">
                <FaCheck className="text-green-500" />
                <p className="text-xs text-gray-400 pl-1">In Stock</p>
              </div>
              <div className="font-bold">Total Price : {order.cart_total_price.$numberDecimal}</div>
            </div>
            <hr />
          </div>
        ))}
    </div>
  );
};

export default OrderItems;
