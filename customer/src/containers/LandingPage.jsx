import React, { useEffect, useState } from "react";
import "../styles/landing.css";
import AOS from "aos";
import "aos/dist/aos.css";
import Slider from "../components/Slider";
import { useLocation } from 'react-router-dom'
import PreLoader from "../components/PreLoader/PreLoader";
import ScrollToTop from "react-scroll-to-top";

export default function LandingPage() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  useEffect(() => {
    setLoading(true)
   const timer = setTimeout(() => {
     setLoading(false);
     
   }, 3000);

   return () => clearTimeout(timer);
 }, [location.pathname]);

  return (
    <>
    {loading && <PreLoader/>}
    {!loading && 
    <div className="bg-primary h-fit flex flex-col items-center">
      <div
        className="slide flex flex-row justify-between w-full  "
        data-aos="fade"
      >
        <Slider />
      </div>

      <div className="hidden lg:flex flex-row  justify-between w-4/5 h-fit py-20">
        <div className="w-1/4 h-fit mb-10 " data-aos="fade-right">
          <img
            className="landingimage1 w-full "
            src="/landingimage1.jpg"
            alt=""
          />
        </div>
        <div className="w-2/5 mt-20" data-aos="fade-down">
          <div>
            <h1 className="font-bold text-justify text-4xl">
              FIND YOUR{" "}
              <span className="text-truegreen line-through ">STYLE</span> <br />
              REFRESH YOUR LOOK
            </h1>
            <p className="text-justify hidden md:flex mt-5">
              Discover Your Style, Elevate Your Look with PRESTIGIOUS. Unleash
              your inner charm with our luxurious accessories and jewelry.
              Explore our handpicked collection for men and women, featuring
              timeless classics and contemporary trends. At PRESTIGIOUS, we
              offer more than accessories; we offer a lifestyle. Redefine
              elegance and make an unforgettable impression.{" "}
            </p>
          </div>

          <div className="flex flex-row justify-center mt-10">
            <button className="bg-truegreen hover:bg-truegreentint text-white w-3/5 h-10">
              Shop Now
            </button>
          </div>
        </div>
        <div className="w-1/4 mt-20" data-aos="fade-left">
          <img
            className=" landingimage2 w-full"
            src="/landingimage2.jpg"
            alt=""
          />
        </div>
      </div>

      <div className="flex flex-col lg:hidden  justify-between w-4/5 h-fit py-20">
        <div
          className="flex flex-row w-full  items-center h-fit "
          data-aos="fade-up"
        >
          <div className="w-1/2">
            <img
              className="mobilelandingimage1 w-full "
              src="/landingimage1.jpg"
              alt=""
            />
          </div>

          <div className="w-1/2">
            <h1 className="font-bold text-start text-4xl ml-5">
              FIND YOUR{" "}
              <span className="text-truegreen line-through ">STYLE</span> <br />
              REFRESH YOUR LOOK
            </h1>
          </div>
        </div>

        <div
          className="flex flex-row items-center w-full h-1/2"
          data-aos="fade-down"
        >
          <div className="w-1/2">
            <p className="font-bold text-justify text-4xl  mr-5">
              Discover Your Style, Elevate Your Look with{" "}
              <p className="inline">PREST</p>
              <p className="secondary-bg inline">IGIOUS</p>.
            </p>
          </div>
          <div className="w-1/2 ">
            <img
              className=" mobilelandingimage2 w-full"
              src="/landingimage2.jpg"
              alt=""
            />
          </div>
        </div>
        <div className="flex flex-row justify-center mt-10">
          <button className="bg-truegreen hover:bg-truegreentint text-white w-2/5 h-20">
            Shop Now
          </button>
        </div>
      </div>

      <div className="flex flex-row justify-center  h-fit">
        <h1 className="font-bold text-4xl text-truegreen">
          STYLE AND FASHION CATEGORY
        </h1>
      </div>

      <div className="section2 flex flex-row  gap-5 w-4/5 h-fit py-20">
        <div className="w-1/3 md:w-2/5 gap-5 flex flex-col md:flex-row">
          <div
            className="h-1/2 md:h-auto w-full md:w-1/2 flex flex-col justify-center"
            data-aos="fade-right"
          >
            <div className="h-full pb-4 md:h-2/4 w-full flex flex-col items-center bg-coffe">
              <span className="font-bold text-lg md:text-3xl mt-2">BAGS</span>
              <img className="w-full h-full" src="/sac.png" alt="" />
            </div>
          </div>
          <div className="w-full md:w-1/2  gap-5 flex flex-col justify-center">
            <div
              className="h-full md:h-2/5 w-full flex flex-col items-center bg-coffe"
              data-aos="fade-down"
            >
              <span className="font-bold text-lg md:text-2xl">HATS</span>
              <img className="w-full h-full" src="/hat.png" alt="" />
            </div>
            <div
              className="h-full gap-2 md:h-2/5 w-full flex flex-col items-center bg-coffe"
              data-aos="fade-up"
            >
              <span className="font-bold text-lg md:text-2xl mt-1">
                JEWELRY
              </span>
              <img className="w-full" src="/ring.png" alt="" />
            </div>
          </div>
        </div>
        <div className="women flex flex-col justify-center" data-aos="fade">
          <div className="h-full w-full flex flex-col items-center bg-coffe">
            <span className="font-bold text-lg md:text-2xl mt-2">WOMEN</span>
            <img className="w-full h-full bottom-0" src="/women.png" alt="" />
          </div>
        </div>
        <div className="w-1/3 md:w-2/5 gap-5 flex flex-col md:flex-row">
          <div className="w-full md:w-1/2  gap-5 flex flex-col justify-center">
            <div
              className="h-fit md:h-2/5 w-full flex flex-col items-center md:overflow-hidden bg-coffe"
              data-aos="fade-down"
            >
              <span className="font-bold text-lg md:text-2xl mt-2">MEN</span>
              <img className="w-full " src="/men.png" alt="" />
            </div>
            <div
              className="h-full gap-2 md:h-2/5 w-full flex flex-col items-center bg-coffe"
              data-aos="fade-up"
            >
              <span className="font-bold text-lg md:text-2xl mt-1">
                ACCESSORIES
              </span>
              <img className="w-full" src="/sunglasses.png" alt="" />
            </div>
          </div>
          <div
            className="w-full md:w-1/2 flex flex-col justify-center"
            data-aos="fade-left"
          >
            <div className="h-full gap-2 md:h-2/5 w-full flex flex-col items-center bg-coffe">
              <span className="font-bold text-lg md:text-2xl mt-1">SHOES</span>
              <img className="w-full px-3 mt-2" src="/shoes.png" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full" data-aos="fade">
        <div>
          <div className="font-Dubiel w-full text-center h-1/5 ">
            <h1 className="text-4xl">Popular Products</h1>
          </div>
        </div>
        <div className="flex flex-col items-center md:flex-row gap-5 md:gap-10 justify-center px-16 md:px-24 w-full md:h-56 my-10 ">
          <div className="flex flex-row justify-center w-full px-32 md:px-0 md:h-full gap-10">
            <div className="flex flex-col  w-1/2 md:w-full  gap-3">
              <div className="popularimage1 flex flex-col justify-evenly pt-24 items-center w-full h-full">
                <div className=" flex flex-row justify-center text-center text-2xl  font-Lora text-black"></div>
              </div>
              <div className="text-center text-xl font-Jost">
                <h2>NECKLACES</h2>
              </div>
            </div>
            <div className="flex flex-col  w-1/2  md:w-full gap-3">
              <div className="popularimage2 flex flex-col justify-evenly pt-24 items-center w-full h-full">
                <div className=" flex flex-row justify-center text-center text-2xl  font-Lora text-black"></div>
              </div>
              <div className="text-center text-xl font-Jost">
                <h2>RINGS</h2>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-center w-full px-32 md:px-0 md:h-full gap-10">
            <div className="flex flex-col  w-1/2 md:w-full  gap-3">
              <div className="popularimage3 flex flex-col justify-evenly pt-24 items-center w-full h-full">
                <div className=" flex flex-row justify-center text-center text-2xl  font-Lora text-black"></div>
              </div>
              <div className="text-center text-xl font-Jost">
                <h2>BRACELETS</h2>
              </div>
            </div>
            <div className="flex flex-col  w-1/2  md:w-full gap-3">
              <div className="popularimage4 flex flex-col justify-evenly pt-24 items-center w-full h-full">
                <div className=" flex flex-row justify-center text-center text-2xl  font-Lora text-black"></div>
              </div>
              <div className="text-center text-xl font-Jost">
                <h2>EARNINGS</h2>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-center w-full px-32 md:px-0 md:h-full gap-10">
            <div className="flex flex-col  w-1/2 md:w-full  gap-3">
              <div className="popularimage5 flex flex-col justify-evenly pt-24 items-center w-full h-full">
                <div className=" flex flex-row justify-center text-center text-2xl  font-Lora text-black"></div>
              </div>
              <div className="text-center text-xl font-Jost">
                <h2>DANGLES</h2>
              </div>
            </div>
            <div className="flex flex-col  w-1/2  md:w-full gap-3">
              <div className="popularimage6 flex flex-col justify-evenly pt-24 items-center w-full h-full">
                <div className=" flex flex-row justify-center text-center text-2xl  font-Lora text-black"></div>
              </div>
              <div className="text-center text-xl font-Jost">
                <h2>GIFT IDEAS</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-center mb-20 h-fit">
        <h1 className="font-bold text-4xl text-truegreen">BEST SELLERS</h1>
      </div>

      <div className="flex flex-row w-full px-20 text-start h-fit">
        <h1 className="font-bold text-4xl text-black">FOR YOU LADY</h1>
      </div>

      <div className="section3 px-32 ">
        <div className="flex flex-col items-center md:flex-row gap-5 justify-between w-full  mb-10">
          <div
            className=" h-full w-1/3 flex flex-col items-center gap-5"
            data-aos="fade-up"
          >
            <div className="image1 w-full h-96 "></div>
            <div className="flex flex-col items-center gap-5">
              <h1 className="font-bold text-2xl text-black">Sparkling stars</h1>
              <button className="font-bold text-xl underline text-truegreen">
                SHOP NOW
              </button>
            </div>
          </div>
          <div
            className="w-1/3 h-full flex flex-col items-center gap-5 mt-40"
            data-aos="fade-down"
          >
            <div className="image2 w-full h-96 "></div>
            <div className="flex flex-col items-center gap-5">
              <h1 className="font-bold text-2xl w-full text-black">
                Moonlight Serenity
              </h1>
              <button className="font-bold text-xl underline text-truegreen">
                SHOP NOW
              </button>
            </div>
          </div>

          <div
            className="w-1/3 h-full flex flex-col items-center gap-5"
            data-aos="fade-up"
          >
            <div className="image3 w-full h-96 "></div>
            <div className="flex flex-col items-center gap-5">
              <h1 className="font-bold text-2xl text-black">
                Rose Gold Elegance
              </h1>
              <button className="font-bold text-xl underline text-truegreen">
                SHOP NOW
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-row h-fit">
        <h1 className="font-bold text-4xl text-black">FOR YOU MISTER</h1>
      </div>

      <div className="section4 px-32 ">
        <div className="flex flex-col items-center md:flex-row gap-5 justify-between w-full  mb-10">
          <div
            className="md:w-1/3 h-full flex flex-col items-center gap-5"
            data-aos="fade-down"
          >
            <div className="image4 w-96 h-96 "></div>
            <div className="flex flex-col items-center gap-5">
              <h1 className="font-bold text-2xl text-black">Sparkling stars</h1>
              <button className="font-bold text-xl underline text-truegreen">
                SHOP NOW
              </button>
            </div>
          </div>

          <div
            className="md:w-1/3 h-full flex flex-col items-center gap-5 mb-40"
            data-aos="fade-up"
          >
            <div className="image5 w-96 h-96 "></div>
            <div className="flex flex-col items-center gap-5">
              <h1 className="font-bold text-2xl w-full text-black">
                Moonlight Serenity
              </h1>
              <button className="font-bold text-xl underline text-truegreen">
                SHOP NOW
              </button>
            </div>
          </div>

          <div
            className="w-1/3 h-full flex flex-col items-center gap-5"
            data-aos="fade-down"
          >
            <div className="image6 w-96 h-96 "></div>
            <div className="flex flex-col items-center gap-5">
              <h1 className="font-bold text-2xl text-black">
                Rose Gold Elegance
              </h1>
              <button className="font-bold text-xl underline text-truegreen">
                SHOP NOW
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-row justify-center h-fit">
        <h1 className="font-bold text-4xl text-black">
          SPECIAL OFFER ONLY FOR YOU COUPLES
        </h1>
      </div>
      <div className="section5 flex flex-col w-4/5">
        <div className="flex flex-row justify-center md:flex-row gap-14 w-full h-full  py-10">
          <div className="image7 w-1/2 h-full"></div>
          <div className="image8 w-1/2 h-full" ></div>
        </div>
        <div className="flex flex-row justify-around px-20">
          <h1 className="text-truegreen font-bold">Aurora Blossom</h1>
          <span className="text-4xl font-bold">-50%</span>
          <h1 className="text-truegreen font-bold">Sparkling stars</h1>
        </div>
      </div>

      <div className="flex flex-row justify-center h-fit">
        <button className="font-bold text-2xl text-truegreen underline py-10">
          DISCOVER THE OFFER
        </button>
      </div>
      <div className="font-Dubiel ">
        <h1>OUR SERVICES</h1>
      </div>
      <div
        className="flex flex-col md:flex-row items-center justify-center px-20  w-full md:h-44 "
        data-aos="fade"
      >
        <div className="serviceimage1 flex flex-col justify-evenly pt-24 items-center  w-1/5 h-full ">
          <div className="w-1/3 flex flex-row justify-center text-center text-2xl  font-Lora text-black ">
            <h3>ON-DATE DELIVERY</h3>
          </div>
        </div>
        <div className="serviceimage2 flex flex-col justify-evenly pt-24 items-center  w-1/5 h-full ">
          <div className="w-1/3 flex flex-row justify-center text-center text-2xl  font-Lora text-black ">
            <h3>CERTIFIED PRODUCTS</h3>
          </div>
        </div>
        <div className="serviceimage3 flex flex-col justify-evenly pt-24 items-center  w-1/5 h-full ">
          <div className="w-1/3 flex flex-row justify-center text-center text-2xl  font-Lora text-black ">
            <h3>ELEGANT STYLE</h3>
          </div>
        </div>
        <div className="serviceimage4 flex flex-col justify-evenly pt-24 items-center  w-1/5 h-full ">
          <div className="w-1/3 flex flex-row justify-center text-center text-2xl  font-Lora text-black ">
            <h3>EASY RETURN</h3>
          </div>
        </div>
        <div className="serviceimage5 flex flex-col justify-evenly pt-24 items-center  w-1/5 h-full ">
          <div className="w-2/3 flex flex-row justify-center text-center text-2xl  font-Lora text-black ">
            <h3>100% SECURE PAYMENTS</h3>
          </div>
        </div>
      </div>

      <div className="flex flex-row">
        <div className="flex flex-col items-center justify-center gap-5 w-1/2  py-10 ">
          <div className="font-Dubiel text-2xl">
            <h1>ABOUT US</h1>
          </div>

          <div className="w-2/3 text-center flex flex-col justify-between gap-5 font-Karla ">
            <p>
              Elevate your style with Prestigious, your ultimate destination for
              fashion-forward accessories that seamlessly blend timeless
              elegance with contemporary flair. Explore our curated collection,
              where every piece becomes a statement, reflecting your unique
              identity.
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-5 py-14  w-1/2  ">
          <div className="font-Dubiel ">
            <h1>FIND US</h1>
          </div>
          <div className="w-full px-10   ">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d740.4028379302448!2d-7.647602442472446!3d33.571654777452444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sma!4v1701793052643!5m2!1sen!2sma"
              className="w-full h-96 rounded-3xl"
              title="location"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
      <ScrollToTop smooth style={{
                      position: 'fixed',
                      bottom: '20px',
                      right: '40px',
                      cursor: 'pointer',
                      background: '#F8F8F8',
                      borderRadius: '10%',
                      padding: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      fontSize: '50px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                          }}/>
    </div>
      }
    </>
  );
}
