import React, { useEffect } from "react";
import "../styles/landing.css";
import AOS from "aos";
import "aos/dist/aos.css";
import Slider from "../components/Slider";


export default function LandingPage() {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  return (
    <div className="bg-primary h-fit flex flex-col items-center">
      <div
  className="slide flex flex-row justify-between w-full  "
  data-aos="fade"
>
<Slider/>
</div>
<div className="flex flex-row justify-center px-20  w-full h-44 " data-aos="fade">
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

      <div className="flex flex-row  justify-between w-4/5 h-fit py-20">
        <div className="w-1/4 h-fit mb-10 " data-aos="fade-right">
          <img
            className="landingimage1 w-full "
            src="/landingimage1.jpg"
            alt=""
          />
        </div>
        <div className="w-2/5 mt-10" data-aos="fade-down">
          <div>
            <h1 className="font-bold text-justify text-4xl">
              FIND YOUR{" "}
              <span className="text-truegreen line-through ">STYLE</span> <br />
              REFRESH YOUR LOOK
            </h1>
            <p className="text-justify hidden md:flex">
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

      <div className="flex flex-row justify-center  h-fit">
        <h1 className="font-bold text-4xl text-truegreen">
          STYLE AND FASHION CATEGORY
        </h1>
      </div>

      <div className="section2 flex flex-row gap-5 justify-between w-4/5 h-fit py-20">
        <div className="w-1/3 md:w-2/5 gap-5 flex flex-col md:flex-row">
          <div
            className="h-1/2 md:h-auto w-full md:w-1/2 flex flex-col justify-center"
            data-aos="fade-right"
          >
            <div className="h-fullp pb-4 md:h-2/4 w-full flex flex-col items-center bg-coffe">
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

      <div className="flex flex-row justify-center mb-20 h-fit">
        <h1 className="font-bold text-4xl text-truegreen">BEST SELLERS</h1>
      </div>

      <div className="flex flex-row h-fit">
        <h1 className="font-bold text-4xl text-black">FOR YOU LADY</h1>
      </div>

      <div className="section3 ">
        <div className="flex flex-col items-center md:flex-row gap-5 justify-between w-full h- my-20">
          <div
            className="md:w h-full flex flex-col items-center gap-5"
            data-aos="fade-up"
          >
            <div className="image1 w-96 h-96 "></div>
            <div className="flex flex-col items-center gap-5">
              <h1 className="font-bold text-2xl text-black">Sparkling stars</h1>
              <button className="font-bold text-xl underline text-truegreen">
                SHOP NOW
              </button>
            </div>
          </div>
          <div
            className="md:w-1/3 h-full flex flex-col items-center gap-5 mt-40"
            data-aos="fade-down"
          >
            <div className="image2 w-96 h-96 "></div>
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
            <div className="image3 w-96 h-96 "></div>
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

      <div className="section4">
        <div className="flex flex-col items-center md:flex-row gap-5 justify-between w-full h- py-20">
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
          SPECIAL OFFER FOR ONLY FOR YOU COUPLES
        </h1>
      </div>
      <div className="section5 flex flex-col w-4/5">
        <div className="flex flex-row justify-center md:flex-row gap-14 w-full h-full  py-10">
          <div className="image7 w-1/2 h-full" data-aos="fade-right"></div>
          <div className="image8 w-1/2 h-full" data-aos="fade-left"></div>
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
      
    </div>
  );
}
