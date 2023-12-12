import React, { useEffect, useState } from 'react'
import { Carousel } from "@material-tailwind/react";
import { Link, NavLink } from 'react-router-dom';
import AOS from "aos";
import "aos/dist/aos.css";

function Slider() {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);
  return (
    <div className='w-full'>
        <Carousel className="w-full"  navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
          {new Array(length).fill("").map((_, i) => (
            <span
              key={i}
              className={`block h-2 cursor-pointer rounded-2xl transition-all content-[''] ${
                activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
              }`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      )} >
  <div
      className="flex flex-col md:flex-row h-full   " 
      style={{
        backgroundImage: 'url("slideimage1.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      data-aos="fade-down"
    >
      <div
          className="flex flex-col justify-start  md:justify-center md:px-24 w-fit     h-full p-5 md:p-10 text-black "
          data-aos="fade-right"
        >
          <div>
            <h1 className="quote w-2/3 md:w-full text-md md:text-6xl text-black font-Dubiel">
              Fashion is not dresses only.
            </h1>
          </div>
          <div className="mt-5  w-80 ">
            <p className="w-1/2 md:w-full text-lg font-Karla  text-black">
              Shop for Accessories For <span className="font-bold">Men</span> and{" "}
              <span className="font-bold">Women</span> online at best prices in
              Morocco.Choose from a wide range of{" "}
            <span className="underline">Watches</span>,{" "}
            <span className="underline">Jewellery</span>,{" "}
            <span className="underline">Handbags</span>, ...
            </p>
          </div>
          <div >
            <Link to="/collections">
              <button className='mt-5 border-2 border-black px-5 py-2 font-Karla transition ease-in-out delay-100  hover:-translate-x-0 hover:scale-90 hover:bg-black hover:text-white duration-300  '>
                SHOP NOW
              </button>
              </Link>
              
            </div>
        </div>
      <div className="hidden  w-2/3 md:flex flex-col justify-center py-10 ">
        
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
      
    >
      <div className="hidden w-2/3 md:flex flex-col justify-center py-10 ">
        
        </div>
        <div
            className="flex flex-col pl-10 md:pl-0 md:px-24 w-fit justify-center  h-full p-10"
            data-aos="fade-right"
          >
            <div>
              <h1 className="quote text-6xl w-96   text-black font-Dubiel">
                  A Minimalistic Design Masculine
              </h1>
            </div>
            <div className="mt-5  w-80 ">
              <p className="text-lg font-Karla  text-black">
                Awesome products for <span className="font-bold">Men</span> and{" "}
                <span className="font-bold">Women</span> for dynamic urbain lifestyle
              </p>
            </div>
            <div >
            <Link to="/collections">
              <button className='mt-5 border-2 border-black px-5 py-2 font-Karla transition ease-in-out delay-100  hover:-translate-x-0 hover:scale-90 hover:bg-black hover:text-white duration-300  '>
                SHOP NOW
              </button>
              </Link>
              
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
          <div >
            <Link to="/collections">
              <button className='mt-5 border-2 border-black text-black px-5 py-2 font-Karla transition ease-in-out delay-100  hover:-translate-x-0 hover:scale-90 hover:bg-black hover:text-white duration-300  '>
                SHOP NOW
              </button>
              </Link>
              
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
            className="flex flex-col pr-32 w-96 justify-center h-full p-10 text-black"
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
            <div >
            <Link to="/collections">
            <button className='mt-5 border-2 border-black  px-5 py-2 font-Karla transition ease-in-out delay-100  hover:-translate-x-0 hover:scale-90 hover:bg-black hover:text-white duration-300  '>
                SHOP NOW
              </button>
              </Link>
              
            </div>
          </div>
    </div>
    
  </Carousel>
    </div>
  )
}

export default Slider