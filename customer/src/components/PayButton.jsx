import React, { useEffect, useState } from "react";
import {useSelector , useDispatch} from "react-redux";
import { addCheckout } from "../Redux/slicers/Checkout/checkoutServices";
import { useLocation, useNavigate } from "react-router-dom";

const PayButton = ({ cards, customerId }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const handleCheckout = () => {
        dispatch(
            addCheckout({
              cartItems: cards,
              customerId: customerId,
              navigate,
              search: location.search,
            })
          );
    };

    useEffect(() => {
      }, [dispatch, cards, customerId]);

    return (
        <>
        <button onClick = {()=> handleCheckout() }>Piyment</button>
        </>
    )
}
export default PayButton;