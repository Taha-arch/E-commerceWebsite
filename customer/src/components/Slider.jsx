import React, { useEffect, useState } from 'react'
import { Carousel } from "@material-tailwind/react";


function Slider() {
  return (
    <div className='w-full'>
        <Carousel className="w-full" autoplay={true} autoplayDelay={5000} loop={true} >
  <div
      className="flex flex-col md:flex-row h-full   "
      style={{
        backgroundImage: 'url("slideimage1.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      data-aos="fade"
    >
      <div
          className="flex flex-col justify-center px-24 w-96    h-full p-10 text-black "
          data-aos="fade-right"
        >
          <div>
            <h1 className="quote text-6xl w-80   text-black font-Dubiel">
              Fashion is not dresses only.
            </h1>
          </div>
          <div className="mt-5  w-80 ">
            <p className="text-lg font-Karla  text-black">
              Shop for Accessories For <span className="font-bold">Men</span> and{" "}
              <span className="font-bold">Women</span> online at best prices in
              Morocco.Choose from a wide range of{" "}
            <span className="underline">Watches</span>,{" "}
            <span className="underline">Jewellery</span>,{" "}
            <span className="underline">Handbags</span>, ...
            </p>
          </div>
        </div>
      <div className="w-2/3 flex flex-col justify-center py-10 ">
        
        </div>
        
    </div>
    
    {/* Repeat the same structure for other images */}
    <div
      className="flex flex-col md:flex-row h-full"
      style={{
        backgroundImage: 'url("slideimage4.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'bottom',
      }}
      data-aos="fade"
    >
      <div className="w-2/3 flex flex-col justify-center py-10 ">
        
        </div>
        <div
            className="flex flex-col px-24 w-96 justify-center    h-full p-10 text-black"
            data-aos="fade-right"
          >
            <div>
              <h1 className="quote text-6xl w-80   text-black font-Dubiel">
                Fashion is not dresses only.
              </h1>
            </div>
            <div className="mt-5  w-80 ">
              <p className="text-lg font-Karla  text-black">
                Shop for Accessories For <span className="font-bold">Men</span> and{" "}
                <span className="font-bold">Women</span> online at best prices in
                Morocco.Choose from a wide range of{" "}
              <span className="underline">Watches</span>,{" "}
              <span className="underline">Jewellery</span>,{" "}
              <span className="underline">Handbags</span>, ...
              </p>
            </div>
          </div>
    </div>
    {/* Image 2 */}
    <div
      className="flex flex-col md:flex-row h-full "
      style={{
        backgroundImage: 'url("slideimage5.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      
      <div className="w-2/3 flex flex-col justify-center py-10 ">
        
      </div>
      <div
          className="flex flex-col px-24 w-96  justify-center   h-full p-10 text-black "
          data-aos="fade-right"
        >
          <div>
            <h1 className="quote text-6xl w-80   text-white font-Dubiel">
              Fashion is not dresses only.
            </h1>
          </div>
          <div className="mt-5  w-80 ">
            <p className="text-lg font-Karla  text-white">
              Shop for Accessories For <span className="font-bold">Men</span> and{" "}
              <span className="font-bold">Women</span> online at best prices in
              Morocco.Choose from a wide range of{" "}
            <span className="underline">Watches</span>,{" "}
            <span className="underline">Jewellery</span>,{" "}
            <span className="underline">Handbags</span>, ...
            </p>
          </div>
        </div>
    </div>
    {/* Image 3 */}
    <div
      className="flex flex-col md:flex-row h-full "
      style={{
        backgroundImage: 'url("slideimage3.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="w-2/3 flex flex-col justify-center py-10 ">
        
        </div>
        <div
            className="flex flex-col px-24 w-96 justify-center h-full p-10 text-black"
            data-aos="fade-right"
          >
            <div>
              <h1 className="quote text-6xl w-80   text-white font-Dubiel">
                Fashion is not dresses only.
              </h1>
            </div>
            <div className="mt-5  w-80 ">
              <p className="text-lg font-Karla  text-white">
                Shop for Accessories For <span className="font-bold">Men</span> and{" "}
                <span className="font-bold">Women</span> online at best prices in
                Morocco.Choose from a wide range of{" "}
              <span className="underline">Watches</span>,{" "}
              <span className="underline">Jewellery</span>,{" "}
              <span className="underline">Handbags</span>, ...
              </p>
            </div>
          </div>
    </div>
    
  </Carousel>
    </div>
  )
}

export default Slider