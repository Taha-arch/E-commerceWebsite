import React, { useState } from "react";
import { MdEmail } from "react-icons/md";
import { MdOutlineSmartphone } from "react-icons/md";

export default function Profile(props) {
  const { titre, customerId } = props;
  const [selectedImage, setSelectedImage] = useState("/image1.jpg");

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div className=" h-full flex flex-col pt-40">
        <div className="h-fit w-fit mb-10">
          <h1 className="text-truegreen">
            User Profile <hr />{" "}
          </h1>
        </div>

        <div className="flex flex-row justify-around gap-20">
            <div className="flex flex-row">
            {selectedImage && (
          <div className="image  flex flex-row">
            <img
              src={selectedImage}
              alt=""
              className="w-32 h-auto rounded-full border-4 border-white"
            />    
          </div>
          )}
            <div className=" ml-5 flex flex-col justify-center">
              <h2 className="font-bold">Alaa Mohamed</h2>
              <p>Product Design</p>
              <p>Eastern European Time (EET), Cairo UTC +3</p>
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
                className="bg-truegreen hover:bg-truegreentint text-white  font-Poppins  py-5 px-4 rounded cursor-pointer"
              >
                Upload New Image
              </label>
              <button className="border-2 border-truegreen text-truegreen ml-5 hover:bg-truegreen font-Poppins   hover:text-white h-16 w-44 rounded-lg">
                Delete
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-row w-full mt-10 gap-10">
        <div className="w-1/2">
            <label htmlFor="" className="text-lg font-Poppins font-bold">First Name</label>
            <input type="text" className="w-full h-12 border-2 border-gray-500 rounded-md px-2" placeholder="eg.Alaa"/>
        </div>
        <div className="w-1/2">
            <label htmlFor="" className="text-lg font-Poppins font-bold">Last Name</label>
            <input type="text" className="w-full h-12 border-2 border-gray-500 rounded-md px-2" placeholder="eg.Mohammed"/>
        </div>
        </div>
        <div className="mt-5">
            <label htmlFor="" className="text-lg font-Poppins font-bold">User Name</label>
            <input type="text" className="w-full h-12 border-2 border-gray-500 rounded-md px-2" placeholder="eg.Mohammed"/>
        </div>
        <div className="flex flex-row w-full mt-10 gap-10">
        <div className="w-1/2 flex flex-col  ">
                <label htmlFor="" className="text-lg font-Poppins font-bold">Email</label>
                <div className="flex flex-row h-full border-2 border-gray-500 rounded-md">
                <div className="h-full flex flex-col justify-center bg-white px-2 rounded-l-md">
                    <MdEmail className="w-6 h-full text-gray-500 "/>
                </div>
                <div className="w-full h-full  rounded-md ">
                    <input type="text " className="w-full h-full focus:outline-none rounded-md" placeholder="Enter Your Email" />
                </div>
                </div>
        </div>
        <div className="w-1/2 flex flex-col  ">
                <label htmlFor="" className="text-lg font-Poppins font-bold">Phone Number</label>
                <div className="flex flex-row h-full border-2 border-gray-500 rounded-md">
                <div className="h-full flex flex-col justify-center bg-white px-2 rounded-l-md">
                    <MdOutlineSmartphone className="w-6 h-full text-gray-500"/>
                </div>
                <div className="w-full h-12  rounded-md ">
                    <input type="text " className="w-full h-full focus:outline-none rounded-md" placeholder="Enter Your Phone Number"/>
                </div>
                </div>
        </div>
        </div>
        <div className="py-10">
            <hr />
        </div>
      </div>
    </div>
  );
}
