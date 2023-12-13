import React, { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { addCard, removeCard } from "../Redux/slicers/CardSlice";

const FavoriteItems = () => {
  const favoriteProducts = useSelector((state) => state.Favorite.favorites);
  console.log(favoriteProducts)
  const CardProducts = useSelector((state) => state.Card.cards);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const addToCard = (product) => {
    const productWithId = { ...product, id: product._id ,orderedQuantity: 1,totalPrice : product.price};
    dispatch(addCard(productWithId));
  };

  const removeFromCard = (product) => {
    dispatch(removeCard(product._id));
  };

  const isProductInCard = (product) => {
    return CardProducts.some((CardProduct) => CardProduct._id === product._id);
  };

  const handleButtonClick = (event, product) => {
    event.stopPropagation();
    if (isProductInCard(product)) {
      removeFromCard(product);
    } else {
      addToCard(product);
    }
  };

  return (
    <div>
      {favoriteProducts &&
        favoriteProducts.map((product) => (
          <div className="bg-primary w-full">
            <div className="w-full gap-2 rounded-md bg-white mt-3 hover:bg-gray-300 flex flex-row cursor-pointer"
            key={product._id}
            onClick={() => navigate(`/product/${product && product._id}`)}
            >
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
              <div
                className={`flex flex-row rounded-md  px-2 gap-1 pr-1 justify-center items-center cursor-pointer ${isProductInCard(product) ? 'bg-gray-400' : 'bg-truegreen'}`}
                onClick={(event) => handleButtonClick(event, product)}
              >
                <div>
                  <div
                    className="py-1 text-white"
                  >
                    {isProductInCard(product) ? "In Card" : "Add To Card"}
                  </div>
                </div>
                <div
                  className="h-fit text-white"
                >
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

export default FavoriteItems;
