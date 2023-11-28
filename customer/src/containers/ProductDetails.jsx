import { React, useState,useRef } from "react";
import { MdOutlineLocalShipping } from "react-icons/md";
import { SlHandbag } from "react-icons/sl";
import ProductCard from "../components/ProductCard";
import "../styles/index.css";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Inline from "yet-another-react-lightbox/plugins/inline";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";






export default function ProductDetails() {
  const [quantity, setQuantity] = useState(1);

  const [mainImage, setMainImage] = useState("/prada1.jpg");
  const [selectedImage, setSelectedImage] = useState("/prada1.jpg");
  const UnitPrice = 100;
  const [TotalPrice, setTotalPrice] = useState(UnitPrice);
  const thumbnailsRef = useRef(null);

  const changeMainImage = (newImage) => {
    setMainImage(newImage);
    setSelectedImage(newImage);
  };
  const increment = () => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + 1;
      setTotalPrice(newQuantity * UnitPrice);
      return newQuantity;
    });
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => {
        const newQuantity = prevQuantity - 1;
        setTotalPrice(newQuantity * UnitPrice);
        return newQuantity;
      });
    }
  };
  const inline = {
    style: {
      width: "100%",
      maxWidth: "900px",
      aspectRatio: "3 / 2",
      margin: "0 auto",
    },
  };


  return (
    
      <div className=" box flex flex-col  gap-4">
        <div className="container w-full justify-start  gap-5">
        <div className="imagescontainer">
          <div className="images flex  flex-col justify-start gap-3 p-1 pt-0">
          
            <div
              className={`image-thumbnail ${
                selectedImage === "/prada1.jpg" && "selected"
              }`}
              onClick={() => changeMainImage("/prada1.jpg")}
            >
              <img src="/prada1.jpg" alt="" />
            </div>
            <div
              className={`image-thumbnail ${
                selectedImage === "/prada3.jpg" && "selected"
              }`}
              onClick={() => changeMainImage("/prada3.jpg")}
            >
              <img src="/prada3.jpg" alt="" />
            </div>
            <div
              className={`image-thumbnail ${
                selectedImage === "/prada2.jpg" && "selected"
              }`}
              onClick={() => changeMainImage("/prada2.jpg")}
            >
              <img src="/prada2.jpg" alt="" />
            </div>
          </div>
          </div>



        <div className="mainimagecontainer">
          <div
            className="main-image"
            style={{
              backgroundImage: `url(${mainImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          </div>

          <div className="slide visible md:hidden">
      <Lightbox styles={{root:{height:"350px","--yarl__color_backdrop": "rgba(255, 255, 255, .8)"},thumbnailsContainer:{height:"70px","--yarl__color_backdrop": "rgba(255, 255, 255, .8)"},thumbnailsTrack:{height:"60px","--yarl__color_backdrop": "rgba(255, 255, 255, .8)"},thumbnail:{width:"120px",height:"60px","--yarl__thumbnails_thumbnail_background": "rgba(255, 255, 255)","--yarl__thumbnails_thumbnail_active_border_color": "rgba(0, 0, 0)"},button:{height:"5px","--yarl__slide_description_color": "rgba(0, 0, 0)"},slide:{height:"270px",width:"100px"}}} slides={[
          {
            src: "/prada1.jpg",
            alt: "image 1",
            width: 3840,
            height: 2560,
            srcSet: [
              { src: "/prada1.jpg", width: 640, height: 427 },
              { src: "/prada1.jpg", width: 1200, height: 800 },
              { src: "/prada1.jpg", width: 2048, height: 1365 },
              { src: "/prada1.jpg", width: 3840, height: 2560 },
            ]
          },
          {
            src: "/prada2.jpg",
            alt: "image 1",
            width: 3840,
            height: 2560,
            srcSet: [
              { src: "/prada2.jpg", width: 640, height: 427 },
              { src: "/prada2.jpg", width: 1200, height: 800 },
              { src: "/prada2.jpg", width: 2048, height: 1365 },
              { src: "/prada2.jpg", width: 3840, height: 2560 },
            ]
          },
          {
            src: "/prada3.jpg",
            alt: "image 1",
            width: 3840,
            height: 2560,
            srcSet: [
              { src: "/prada3.jpg", width: 640, height: 427 },
              { src: "/prada3.jpg", width: 1200, height: 800 },
              { src: "/prada3.jpg", width: 2048, height: 1365 },
              { src: "/prada3.jpg", width: 3840, height: 2560 },
            ]
          },
          // ...
        ]} inline={inline} plugins={[Inline,Thumbnails]}  thumbnails={{ref: thumbnailsRef }} />
      </div>

          <div className="smallscreenimagecontainer">

          </div>
          
          
          <div className="product-info flex flex-col gap-10">
            <div class="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                class="h-5 w-5 fill-current text-yellow-500"
              >
                <path d="M12 2l2.4 6.6h6.6l-5.4 4.8 2.4 6.6-6-4.8-6 4.8 2.4-6.6-5.4-4.8h6.6z" />
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                class="h-5 w-5 fill-current text-yellow-500"
              >
                <path d="M12 2l2.4 6.6h6.6l-5.4 4.8 2.4 6.6-6-4.8-6 4.8 2.4-6.6-5.4-4.8h6.6z" />
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                class="h-5 w-5 fill-current text-yellow-500"
              >
                <path d="M12 2l2.4 6.6h6.6l-5.4 4.8 2.4 6.6-6-4.8-6 4.8 2.4-6.6-5.4-4.8h6.6z" />
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                class="h-5 w-5 fill-current text-yellow-500"
              >
                <path d="M12 2l2.4 6.6h6.6l-5.4 4.8 2.4 6.6-6-4.8-6 4.8 2.4-6.6-5.4-4.8h6.6z" />
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                class="h-5 w-5 fill-current text-gray-300"
              >
                <path d="M12 2l2.4 6.6h6.6l-5.4 4.8 2.4 6.6-6-4.8-6 4.8 2.4-6.6-5.4-4.8h6.6z" />
              </svg>
              <p className=" ml-5 underline font-Poppins text-gray-400 text-sm">
                See All Reviews (22)
              </p>
            </div>

            <h1 className="font-Lora">
              Stellar Dainty Diamond Hoop E Stellar Dainty Diamond
            </h1>
            <div className="flex flex-row gap-5">
              <div>
                <h4 className=" font-oswald">Quantity</h4>
                <div className="flex items-center border-2">
                  <button
                    onClick={decrement}
                    className="bg-white  text-gray-300 hover:bg-gray-300  hover:text-white border-gray-300 text-2xl pb-1 px-4    "
                  >
                    -
                  </button>
                  <input
                    className=" w-14 h-9 placeholder-gray-300   focus:border-blue-300 text-xl py-1 pl-5"
                    type="text"
                    name="quantity"
                    id="number"
                    value={quantity ? quantity : "1"}
                  />
                  <button
                    onClick={increment}
                    className="bg-white  text-gray-300 hover:bg-gray-300  hover:text-white border-gray-300  text-2xl pb-1 px-3 "
                  >
                    +
                  </button>
                </div>
              </div>
              <div>
                <h4 className=" font-oswald">Total Price</h4>
                <span className=" font-oswald text-xl">{TotalPrice}DH</span>
              </div>
            </div>
            <div className="flex flex-row gap-5">
              <div>
                <div>
                  <button className="bg-truegreen text-gray-300 font-oswald hover:bg-truegreentint text-xl pb-1 px-3 h-10 w-40 mr-5">
                    Add To Cart
                  </button>
                  <button className="bg-white border-2 text-gray-300 font-oswald hover:bg-gray-300  hover:text-white border-gray-300  text-xl pb-1 px-3 h-10 w-40 mr-5 ">
                    Add To Favorite
                  </button>
                </div>
              </div>
            </div>
            <div className="px-5 border w-fit p-4">
              <div className="border-b pb-3">
                <h5 className=" font-oswald flex flex-row items-center gap-1">
                  {" "}
                  <MdOutlineLocalShipping /> Free Shipping
                </h5>
                <p className=" ml-5 underline font-Poppins text-gray-400">
                  Enter your Postal code for Delivery Availability
                </p>
              </div>
              <div className="pt-3">
                <h5 className=" font-oswald flex flex-row items-center gap-1">
                  
                  <SlHandbag /> Return Delivery
                </h5>
                <p className="ml-5 font-Poppins flex flex-row text-gray-400">
                  Free 30 days Delivery Return.
                  <p className="underline font-Poppins">Details</p>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className=" flex flex-col w-full">
          <div className="sectiontitle w-full   border-b-2 border-gray-400 font-oswald">
            <span className="pb-3.5 px-2  border-b-2 border-black">
              DESCRIPTION
            </span>
          </div>
          <div className="flex flex-col  md:flex-row mt-7">
            <div className="descriptioncontainer1 ml-5 w-2/4">
              <h2 className="font-oswald mb-5 underline">ABOUT PRODUCT</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
                dolor praesentium velit officia nemo numquam fugit nostrum
                similique deleniti obcaecati fugiat asperiores dolorem quas cum
                consectetur, error facilis itaque amet. Lorem ipsum, dolor sit
                amet consectetur adipisicing elit. Voluptatibus quam vitae,
                voluptatem sequi fugiat, dolores quia expedita error in ullam
                tempore magni assumenda autem necessitatibus consequuntur sunt
                adipisci vero! Dolorum. Lorem ipsum dolor sit amet consectetur.
                
              </p>
              
              <h2 className="font-oswald mb-3 mt-5 underline">ADVANTAGES</h2>
              <ul className="ml-6 leading-9 list-disc">
                <li> Smocked body</li>
                <li>Adjustable straps</li>
                <li>Scoop neckline</li>
                <li>Ruffled hems</li>
                <li>Cropped length</li>
                <li>Model is wearing a smal</li>
                <li>100% rayon</li>
                <li>Machine washable</li>
              </ul>
            </div>
            <div className="descriptioncontainer2 ml-5 w-2/4">
              <h2 className="font-oswald mb-5 underline">SHIPPING</h2>
              <p className="leading-9">
                SHIPPING We offer Free Standard Shipping for all orders over $75
                to the 50 states and the District of Columbia. The minimum order
                value must be $75 before taxes, shipping and handling. Shipping
                fees are non-refundable. <br /> <br />
                Please allow up to 2 business days (excluding weekends,
                holidays, and sale days) to process your order. Processing Time
                + Shipping Time = Delivery Time <br />
              </p>
            </div>
          </div>
          <div className="sectiontitle w-full h-10  border-b-2 border-gray-400 font-oswald">
            <span className="pb-3.5 px-2  border-b-2 border-black">
              More +
            </span>
          </div>
          <div className="morecontainer w-100 flex flex-row over">
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
          
        </div>
      </div>
    
  );
}
