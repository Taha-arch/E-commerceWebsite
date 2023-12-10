import React, { useEffect, useState } from "react";
import { MdEmail } from "react-icons/md";
import { MdOutlineSmartphone } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { updateCustomer } from "../../src/Redux/slicers/Customer/customerServices";
import { getCustomerById } from "../../src/Redux/slicers/Customer/customerServices";

export default function Profile(props) {
  const { titre, customerId } = props;
  const [selectedImage, setSelectedImage] = useState("");
  const customer = useSelector((state) => state.auth.customer);
  const customerById = useSelector((state) => state.customerId.customerById);
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        setCustomerInfo({ ...customerInfo, customer_image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const [customerInfo, setCustomerInfo] = useState({
    customer_image: "",
    first_name: "",
    last_name: "",
    email: "",
    Phone: "",
  });
  const [updatedProfile, setUpdatedProfile] = useState(false);

  const notify = () => {
    toast.success("Profile Updated Successfully!", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  useEffect(() => {
    const id = customer._id;

    dispatch(getCustomerById({ id }));
    setUpdatedProfile(false);
  }, [customer, dispatch, updatedProfile]);

  const handleSubmitEditCustomer = (id) => {
    const updatedCustomerInfo = {
      ...customerInfo,
      customer_image: selectedImage || (customer && customer.customer_image),
      first_name: customerInfo.first_name || (customer && customer.first_name),
      last_name: customerInfo.last_name || (customer && customer.last_name),
      email: customerInfo.email || (customer && customer.email),
      Phone: customerInfo.Phone || (customer && customer.Phone),
    };

    dispatch(updateCustomer({ id, updatedInfo: updatedCustomerInfo }));
    setUpdatedProfile(true);
    notify();
  };

  return (
    <div className="px-40">
      <div className=" h-full flex flex-col pt-16">
        <div className="h-fit w-fit mb-10">
          <h1 className="text-truegreen">
            Your Profile <hr />{" "}
          </h1>
        </div>

        <div className="flex flex-row justify-around gap-20">
          <div className="flex flex-row">
            <div className="image  flex flex-row">
              <img
                src={
                  selectedImage || (customerById && customerById.customer_image)
                }
                alt=""
                className="w-32 h-auto rounded-full border-4 border-white"
              />
            </div>

            <div className=" ml-5 flex flex-col justify-center">
              <h2 className="font-bold">{customerById && customerById.first_name} {customerById && customerById.last_name}</h2>
              
              
            </div>
          </div>

          <div className="flex flex-row justify-center items-center">
            <div>
              <input
                type="file"
                id="image-input"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
              <label
                htmlFor="image-input"
                className="bg-truegreen hover:bg-truegreentint text-white  font-Poppins  py-5 px-5 rounded cursor-pointer"
              >
                Upload New Image
              </label>
            
          
            </div>
          </div>
        </div>
        <div className="flex flex-row w-full mt-10 gap-10">
          <div className="w-1/2">
            <label htmlFor="" className="text-lg font-Poppins font-bold">
              First Name
            </label>
            <input
              type="text"
              name="first_name"
              className="w-full h-12 border-2 border-gray-500 rounded-md px-2"
              placeholder={customerById && customerById.first_name}
              value={customerInfo && customerInfo.first_name}
              onChange={(e) =>
                setCustomerInfo({ ...customerInfo, first_name: e.target.value })
              }
            />
          </div>
          <div className="w-1/2">
            <label htmlFor="" className="text-lg font-Poppins font-bold">
              Last Name
            </label>
            <input
              type="text"
              name="first_name"
              className="w-full h-12 border-2 border-gray-500 rounded-md px-2"
              placeholder={customerById && customerById.last_name}
              value={customerInfo.last_name}
              onChange={(e) =>
                setCustomerInfo({ ...customerInfo, last_name: e.target.value })
              }
            />
          </div>
        </div>

        <div className="flex flex-row w-full mt-10 gap-10">
          <div className="w-1/2 flex flex-col  ">
            <label htmlFor="" className="text-lg font-Poppins font-bold">
              Email
            </label>
            <div className="flex flex-row h-full border-2 border-gray-500 rounded-md">
              <div className="h-full flex flex-col justify-center bg-white px-2 rounded-l-md">
                <MdEmail className="w-6 h-full text-gray-500 " />
              </div>
              <div className="w-full h-full  rounded-md ">
                <input
                  type="text"
                  name="first_name"
                  className="w-full h-12 border-2 rounded-md px-2"
                  placeholder={customerById && customerById.email}
                  value={customerInfo.email}
                  onChange={(e) =>
                    setCustomerInfo({ ...customerInfo, email: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
          <div className="w-1/2 flex flex-col  ">
            <label htmlFor="" className="text-lg font-Poppins font-bold">
              Phone Number
            </label>
            <div className="flex flex-row h-full border-2 border-gray-500 rounded-md">
              <div className="h-full flex flex-col justify-center bg-white px-2 rounded-l-md">
                <MdOutlineSmartphone className="w-6 h-full text-gray-500" />
              </div>
              <div className="w-full h-12  rounded-md ">
                <input
                  type="text"
                  name="Phone"
                  className="w-full h-12 border-2  rounded-md px-2"
                  placeholder={customerById && customerById.Phone}
                  value={customerInfo.Phone}
                  onChange={(e) =>
                    setCustomerInfo({ ...customerInfo, Phone: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <div className="py-10">
          <hr />
        </div>
        <div className="flex flex-row justify-end pr-40">
        <button
          className="border-2 border-truegreen text-truegreen ml-5
               hover:bg-truegreen font-Poppins   hover:text-white  py-5 px-20 rounded-lg mb-10"
          onClick={() => handleSubmitEditCustomer(customer._id)}
        >
          Save
        </button>
        </div>
        
        <ToastContainer />
      </div>
    </div>
  );
}
