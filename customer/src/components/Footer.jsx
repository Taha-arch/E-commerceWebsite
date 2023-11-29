import React from "react";
import { ImLinkedin } from "react-icons/im";
import { BsFacebook } from "react-icons/bs";
import { GrInstagram } from "react-icons/gr";
import { FaPhone } from "react-icons/fa6";
import { IoHome } from "react-icons/io5";
import { MdOutlineMailOutline } from "react-icons/md";
function Footer() {
  return (
    <footer>
      <div className="footer w-full h-64 bg-black flex justify-evenly items-start text-white">


        <div className="flex flex-col justify-around gap-2 ">
          <h2 className="footer-title">PRESTIGOUS</h2>
          <div className="flex gap-3 items-center text-lg font-medium"><FaPhone/><span className="phone">+212 5 20 04 40 00</span></div>
          <div className="flex gap-3 items-center text-lg font-medium"><FaPhone/><span className="phone">+212 6 22 12 82 33</span></div>
          <div className="flex gap-3 items-stretch text-lg font-medium"><IoHome className="text-xl mt-1"/><span>Tertiary road, 1029 ZI Sidi <br /> Maârouf, Casablanca</span></div>
          <div className="flex gap-3 items-center text-lg font-medium"><MdOutlineMailOutline/><span>info.prestigious.co.ma</span></div>
        </div>


        <div className="flex flex-col justify-around gap-2 p-1">
          <h2 className="footer-title">Links</h2>
          <div className="text-xl font-medium cursor-pointer">After-Sale Service</div>
          <div className="text-xl font-medium cursor-pointer">Contact</div>
          <div className="text-xl font-medium cursor-pointer">Recruitement</div>
        </div>


        <div className="flex flex-col gap-3">
          <h2 className="footer-title">Follow Us</h2>
          <div className="flex justify-between text-2xl cursor-pointer">
            <div>
              <ImLinkedin className="rounded-full" />
            </div>
            <div>
              <BsFacebook />
            </div>
            <div>
              <GrInstagram />
            </div>
          </div>
        </div>


      </div>
    </footer>
  );
}

export default Footer;
