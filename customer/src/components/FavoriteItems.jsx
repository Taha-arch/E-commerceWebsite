import React from "react";
import { FaCheck } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";

const FavouriteItems = () => {
  const cardProducts = useSelector((state) => state.Card.cards);
  console.log(cardProducts);
  const navigate = useNavigate();
  return (
    <div>
      {cardProducts &&
        cardProducts.map((product) => (
          <div
            className="bg-primary w-full cursor-pointer  "
            key={product._id}
            onClick={() => navigate(`/product/${product._id}`)}
          >
            <div className="w-full gap-2 rounded-md bg-white mt-3 hover:bg-gray-300 flex flex-row">
              <div className="w-1/6 rounded-md p-3">
                <img src={product && product.productImage[0]} alt="" />
              </div>

              <div className="w-4/6 pt-2">
                <h4 className=" font-Playfair w-fit ">{product.productName}</h4>
                <div className="flex flex-row justify-between">
                  <p className=" text-xs text-gray-400 ">Linen</p>
                  <p className="border-l pl-3 text-gray-400 text-xs">Size:M</p>
                </div>
              </div>
              <div className="flex flex-col justify-center border-l my-2 border-gray-300 items-center w-1/6">
                <IoIosArrowForward />
              </div>
            </div>
            <div className="flex flex-row justify-between mt-3 pb-3">
              <div className="flex flex-row justify-between">
                <div className="flex flex-row">
                  <FaCheck className="text-green-500" />
                  <p className="text-xs text-gray-400 pl-1">In Stock</p>
                </div>
              </div>
               <div className="flex flex-row rounded-md bg-truegreen px-2 gap-1 pr-1 justify-center items-center">
                <div>
                  <button className="  py-1    text-white">Add To Cart</button>
                </div>

                <div className=" h-fit text-white">
                  <IoCartOutline />
                </div>
              </div> 
            </div>

            <hr />
          </div>
        ))}
    </div>
  );
};

export default FavouriteItems;
