import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import CartItems from '../components/CartItems';

function Checkout() {
  const token = useSelector((state) => state.auth.token);
  console.log(token)
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      const checkoutUrl = '/checkout';
      const signInUrl = `/login?redirect=${encodeURIComponent(checkoutUrl)}`;
      navigate(signInUrl);
    }
  }, [token, navigate]);

  return (
    <div>
      <h1>Checkout</h1>
      <div className='flex justify-around '>
      <div className='flex flex-col justify-start gap-20  ml-14'>
      <div>
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Delivery Address
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Your first time ? enjoy the free shipment , and you don't pay until you receive your product !
        </Typography>
        <form className="mt-8 mb-2 w-1/2 max-w-screen-lg sm:w-96">
            
          <div className="mb-1 flex flex-col gap-4 flex-raw">
            <Input
              size="lg"
              placeholder="Enter your address of residency"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
           <div className="flex gap-4 flex-raw">
            <Input
              size="lg"
              placeholder="City"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Input
              type="password"
              size="lg"
              placeholder="Postal Code"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            </div> 
          </div>
        </form>
      </Card>
      </div>
      <div className='flex flex-col justify-center ml-14'>
          <h2>Your Cart</h2>
          <CartItems/>
        </div>
      </div>
      <div>
      <div className='sticky top-10 self-end  py-6 gap-2 flex flex-col items-center justify-around w-64 h-fit bg-white  rounded-lg'>  
            <div>Total Bill</div>
          <div className='text-3xl font-bold'>624$</div>
          <div>Free Shipment</div>
          <Button className="text-sm mt-6 bg-truegreen w-4/5" >
            Place Order
          </Button>
          </div>
          </div>
          </div>
        
      </div>
  );
}

export default Checkout;

