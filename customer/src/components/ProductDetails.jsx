import {React,useState} from "react";
import { MdOutlineLocalShipping } from "react-icons/md";

export default function ProductDetails() {

    const [quantity, setQuantity] = useState(0);

  const increment = () => {
    setQuantity(quantity + 1);
  };

  const decrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="flex flex-row justify-center">
      <div className="box flex flex-row gap-4   ">
        <div className="flex flex-row gap-10">
            <div className="images flex flex-col justify-start gap-3  p-1 pt-5 ">
                <div className="">
                    <img src="/prada1.jpg" alt="" />
                </div>
                <div className="w-full  ">
                    <img src="/prada3.jpg" alt="" />
                </div>
                <div className="w-full  ">
                    <img src="/prada2.jpg" alt="" />
                </div>
            </div>
            <div className="main-image  ">
                <img src="/prada1.jpg" alt="" />
            </div>
        </div>
        <div className="product-info flex flex-col gap-10">
            <h1 className="font-Lora">Stellar Dainty Diamond Hoop E Stellar Dainty Diamond</h1>
            <div className="flex flex-row gap-5">   
            <div>
            <h4 className=" font-oswald">Quantity</h4>
            <div className="flex items-center border-2">
                <button onClick={decrement} className="bg-white  text-gray-300 hover:bg-gray-300  hover:text-white border-gray-300 text-2xl pb-1 px-4    ">
                    -
                </button>
                <input
                    className=" w-14 h-9 placeholder-gray-300   focus:border-blue-300 text-xl py-1 pl-4"
                    type="text"
                    name="quantity"
                    id="number"
                    value={quantity?quantity:'1'}
                    />
                <button onClick={increment} className="bg-white  text-gray-300 hover:bg-gray-300  hover:text-white border-gray-300  text-2xl pb-1 px-3 ">
                    +
                </button>
            </div>
            </div>
                <div>
                    <h4 className=" font-oswald">Total Price</h4>
                    <span className=" font-oswald text-xl">900DH</span>
                </div>
            </div>
            <div className="flex flex-row gap-5">   
            <div>
            <div>
                <button  className="bg-truegreen text-gray-300 font-oswald hover:bg-truegreentint text-xl pb-1 px-3 h-10 w-40 mr-5">
                    Add To Cart
                </button>
                
                <button onClick={increment} className="bg-white border-2 text-gray-300 font-oswald hover:bg-gray-300  hover:text-white border-gray-300  text-xl pb-1 px-3 h-10 w-40 mr-5 ">
                    Add To Favorite
                </button>
            </div>
            </div>
            </div>
            <div className="px-5 border w-fit p-4">
                <div className="border-b pb-3">
                    <h5 className=" font-oswald flex flex-row items-center gap-1"> <MdOutlineLocalShipping /> Free Shipping</h5>
                    <p className=" ml-5 underline font-Poppins text-gray-400">Enter your Postal code for Delivery Availability</p>
                </div>
                <div className="pt-3">
                    <h5 className=" font-oswald flex flex-row items-center gap-1"> <MdOutlineLocalShipping /> Free Shipping</h5>
                    <p className="ml-5 font-Poppins flex flex-row text-gray-400">Free 30 days Delivery Return. <p className="underline font-Poppins">Details</p></p>
                </div>
            </div>
            
        </div>
      </div>
    </div>
  );
}
