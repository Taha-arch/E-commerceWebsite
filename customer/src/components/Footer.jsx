import React from "react";
import { BsFacebook } from "react-icons/bs";
import { GrInstagram } from "react-icons/gr";
import { FaPhone } from "react-icons/fa6";
import { IoHome } from "react-icons/io5";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaTiktok } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import "../styles/main.css";


function Footer() {
  return (
    <footer>
      <div className="footer w-full h-96 bg-black hidden md:flex flex-col md:flex-row justify-evenly   text-white ">


        <div className="flex flex-col justify-center  gap-2 ">
          <h2 className="footer-title py-1">PRESTIGOUS</h2>
          <p className="w-80 font-karla ">With proper care and maintenance, your jewelry will reward you with a lifetime of enjoyment and luxury.
            Prestigious Jewelry and Watch Prestigious store are staffed.
          </p>
          <div className="flex justify-between gap-10  text-2xl cursor-pointer pt-6 ">
            <div>
            <FaTiktok />
            </div>
            <div>
              <BsFacebook />
            </div>
            <div>
              <GrInstagram />
            </div>
            <div>
            <FaYoutube />
            </div>
          </div>
        </div>

        <div className="flex flex-col  gap-3 justify-center ">
          <h2 className="footer-title py-2">Contact us</h2>
          
          <div className="flex gap-3 items-center  font-karla"><FaPhone/><span className="phone">+212 5 20 04 40 00</span></div>
          <div className="flex gap-3 items-center  font-karla"><FaPhone/><span className="phone">+212 6 22 12 82 33</span></div>
          <div className="flex gap-3 items-stretch  font-karla"><IoHome className="text-xl mt-1"/><span>Tertiary road, 1029 ZI Sidi <br /> Maârouf, Casablanca</span></div>
          <div className="flex gap-3 items-center  font-karla"><MdOutlineMailOutline/><span>info.prestigious.co.ma</span></div>
        </div>

        <div className="flex flex-col justify-center gap-2 ">
          <h2 className="footer-title ">Links</h2>
          <div className="text-xl font-karla cursor-pointer">Home</div>
          <div className="text-xl font-karla cursor-pointer">Collections</div>
          <div className="text-xl font-karla cursor-pointer">About us</div>
          <div className="text-xl font-karla cursor-pointer invisible">Products</div>
          <div className="text-xl font-karla cursor-pointer invisible">Products</div>
          
        </div>


        

      </div>
    </footer>
  );
}

export default Footer;
