import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { placeOrder } from "../Redux/slicers/Order/orderServices";
import { Card, Input, Button, Typography, Checkbox } from "@material-tailwind/react";
import CartItems from "../components/CartItems";
import * as Yup from "yup";
import swal from 'sweetalert'
import { clearCards } from "../Redux/slicers/CardSlice";
import { addCheckout } from "../Redux/slicers/Checkout/checkoutServices";


const addressSchema = Yup.object().shape({
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  postal_code: Yup.string().required("Postal code is required"),
  payment_method: Yup.string().required("Payment method is required"),
});

function Checkout() {
  const [addressErrors, setAddressErrors] = useState({});
  const [addressInfo, setAddressInfo] = useState({
    address: "",
    city: "",
    postal_code: "",
    payment_method: "",
  });
  const token = useSelector((state) => state.auth.token);
  const { totalCartPrice, cards } = useSelector((state) => state.Card);
  const customer = useSelector((state) => state.auth.customer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  let cart_total_price = totalCartPrice;
  const [paymentMethod, setPaymentMethod] = useState({
    cashOnDelivery: false,
    creditDebitCards: false,
  });

  useEffect(() => {
    if (!token) {
      const checkoutUrl = "/checkout";
      const signInUrl = `/login?redirect=${encodeURIComponent(checkoutUrl)}`;
      navigate(signInUrl);
    }
  }, [token, navigate]);

  const handlePaymentMethodChange = (method, checked) => {
    setPaymentMethod({
      ...paymentMethod,
      [method]: checked,
    });
    
  };



  const handlePlaceOrder = async () => {

    try {
      await addressSchema.validate(addressInfo, { abortEarly: false });

      const orderItems = cards.map((product) => ({
        product_id: product._id,
        quantity: product.orderedQuantity.toString(),
        product_name: product.productName,
      }));

      const orderData = {
        customer_id: customer._id,
        cart_total_price: cart_total_price,
        order_items: orderItems,
        email: customer.email,
        PaymentMethod: getSelectedPaymentMethod(),
        ...addressInfo,
      };
      
        dispatch(placeOrder(orderData));
        dispatch(clearCards());
      
        if(paymentMethod.creditDebitCards){
          
          dispatch(
            addCheckout({
              cartItems: cards,
              customerId: customer.Id,
              navigate,
              search: location.search,
            })
          );

        }else{
          swal({
            title: 'Order placed successfully',
            icon: 'success',
            buttons: {
              confirm: {
                text: 'Go to Orders',
                value: 'confirm',
              },
            },
          }).then((value) => {
            if (value === 'confirm') {
              navigate('/orders');
            }
          });
        }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const newErrors = {};
        error.inner.forEach((e) => {
          newErrors[e.path] = e.message;
        });
        setAddressErrors(newErrors);
      }
    }
  };
  const handleAddressChange = (e, field) => {
    setAddressInfo({
      ...addressInfo,
      [field]: e.target.value,
    });
  };

  const getSelectedPaymentMethod = () => {
    if (paymentMethod.cashOnDelivery) {
      return 'Cash on Delivery';
    } else if (paymentMethod.creditDebitCards) {
      return 'Credit/Debit Cards';
    }
    return 'Cash on Delivery'; 
  };

  return (
    <div className="box">
      <h1 className="m-10">Checkout</h1>
      <div className="flex justify-around ">
        <div className="flex flex-col justify-start gap-4 ml-14">
          <div>
            <Card color="transparent" shadow={false}>
              <Typography variant="h4" color="blue-gray">
                Delivery Address
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                Is it your first time? Enjoy free shipping and pay only after
                you've received your product!
              </Typography>
              <form className="mt-8 mb-2 w-1/2 max-w-screen-lg sm:w-96">
                <div className="mb-1 flex flex-col gap-4">
                  <div className="self-stretch w-full">
                    <Input
                      placeholder="Enter your address of residency"
                      value={addressInfo.address}
                      onChange={(e) => handleAddressChange(e, "address")}
                      className="w-full !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                    {addressErrors.address && (
                      <span className="text-red-500">
                        {addressErrors.address}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2 w-full">
                    <div>
                      <Input
                        variant="small"
                        placeholder="City"
                        value={addressInfo.city}
                        onChange={(e) => handleAddressChange(e, "city")}
                        className="flex-1 !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                      />
                      {addressErrors.city && (
                        <span className="text-red-500">
                          {addressErrors.city}
                        </span>
                      )}
                    </div>
                    <div>
                      <Input
                        type="number"
                        variant="small"
                        placeholder="Postal Code"
                        value={addressInfo.postalCode}
                        onChange={(e) => handleAddressChange(e, "postal_code")}
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                      />
                      {addressErrors.postal_code && (
                        <span className="text-red-500">
                          {addressErrors.postal_code}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </form>
            </Card>
          </div>

        <div className="flex flex-col gap-2 pb-4">
          <Typography  variant="h4" color="blue-gray">
          Payment Method 
        </Typography>
        {addressErrors.payment_method && (
                      <span className="text-red-500">
                        {addressErrors.payment_method}
                      </span>
          )}
        <div className="flex flex-row">
          <Checkbox
            checked={paymentMethod.cashOnDelivery}
            onChange={(e) => {handlePaymentMethodChange("cashOnDelivery", e.target.checked);
            handleAddressChange(e, "payment_method")}}
            label={
              <Typography color="blue-gray" className="flex font-medium">
                Cash on Delivery.
              </Typography>
            }
          />
          <Checkbox
            checked={paymentMethod.creditDebitCards}
            onChange={(e) => {handlePaymentMethodChange("creditDebitCards", e.target.checked);
            handleAddressChange(e, "payment_method")}}
            label={
              <Typography color="blue-gray" className="flex font-medium">
                Credit/Debit Cards.
              </Typography>
            }
          />
        </div>

      </div>
            {/* <div className="flex flex-col justify-start gap-20  ml-14">

                <PayButton cards={cards} customerId={customer._id}/>
            </div> */}
          <div className="flex flex-col justify-center  ml-14">
            <h2>Your Cart</h2>
            <CartItems />
          </div>
        </div>
        <div>
          <div className="sticky top-36 self-end  py-6 gap-2 flex flex-col items-center justify-around w-64 h-fit bg-white  rounded-lg">
            <div>Total Bill</div>
            <div className="text-3xl font-bold">{totalCartPrice}$</div>
            <div>Free Shipment</div>
            <Button
              className="text-sm mt-6 bg-truegreen w-4/5"
              onClick={() => handlePlaceOrder()}
            >
              Place Order
            </Button>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default Checkout;
