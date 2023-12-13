import React from "react";
import OrderSummary from "../components/OrderSummary";
import CartItems from "../components/CartItems";
import CustomerSiderbar from "../components/CustomerSiderbar";
import ScrollToTop from "react-scroll-to-top";
import { Button } from "@material-tailwind/react";
import { useDispatch } from 'react-redux'
import { clearCards } from "../Redux/slicers/CardSlice";
import { ToastContainer , toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GrClearOption } from "react-icons/gr";

export default function Cart() {
    const dispatch = useDispatch();
   const  handleClearCart = () => {
    dispatch(clearCards());
    toast.success('Cart cleared successfully')
   }
  return (
    <div className="bg-primary flex flex-col items-center  box">
      <table className="w-4/6 h-full">
        <tr>
          <div className="flex flex-col">
            <td className="">
              <CustomerSiderbar />
            </td>
            <td>
              <OrderSummary />
            </td>
            <td className="py-4 pl-48">
            <Button variant="outlined" className="flex justify-center items-center gap-2 text-truegreen text-sm" onClick={() => handleClearCart()}> <p>Clear Cart</p> <GrClearOption className="text-lg"/></Button>
            </td>
          </div>
          <td rowSpan={2} className="pl-40">
            <div className="flex h-full w-52 flex-col justify-start mt-12 items-center">
              <div>
                <h1>Shopping Cart</h1>
                <p>You are eligible for Free Shipping.</p>
              </div>
              <div className=" h-fit w-full mt-10">
                <CartItems />
              </div>
            </div>
          </td>
        </tr>
      </table>

      <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
      <div></div>
      <ScrollToTop
        smooth
        style={{
          position: "fixed",
          bottom: "20px",
          right: "40px",
          cursor: "pointer",
          background: "#F8F8F8",
          borderRadius: "10%",
          padding: "10px",
          display: "flex",
          alignItems: "center",
          fontSize: "50px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      />
    </div>
  );
}
