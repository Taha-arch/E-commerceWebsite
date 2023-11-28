import React from 'react';
import '../styles/index.css';
import { motion } from "framer-motion";
import { GiConfirmed } from "react-icons/gi";
import { FaRegHeart } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { LuPackageOpen } from "react-icons/lu";

 
const slideImage = [
    'https://res.cloudinary.com/dfin3vmgz/image/upload/v1700768333/images/pexels-photo-10786901_hzvvfp.webp',
    'https://res.cloudinary.com/dfin3vmgz/image/upload/v1700768333/images/stylish-young-male-texting-his-mobile-phone_23-2148466051_eri7ab.jpg',
    'https://res.cloudinary.com/dfin3vmgz/image/upload/v1700768333/images/pexels-photo-175680_s3thx4.jpg',
    'https://res.cloudinary.com/dfin3vmgz/image/upload/v1700768333/images/pexels-photo-374090_bqn7cc.jpg',
    'https://res.cloudinary.com/dfin3vmgz/image/upload/v1700768333/images/pexels-photo-3250603_yxddwr.webp',
    'https://res.cloudinary.com/dfin3vmgz/image/upload/v1700768334/images/mohamadreza-khashay-ziubUDopHmc-unsplash_bzq1r1.jpg',
    'https://res.cloudinary.com/dfin3vmgz/image/upload/v1700768335/images/kevin-laminto-8SRK6CxLljE-unsplash_tuvbsp.jpg'
];
function LandingPage() {
    
    return (
        <div className=' flex flex-col items-center justify-center'>

        <div className="container border bg-slate-400">

        <div className="section1 flex flex-row w-full pt-12">
         <div className="col firstImage w-1/5 ">
            <div className=" ">
                <img 
                 src="https://res.cloudinary.com/dfin3vmgz/image/upload/v1700494588/images/pexels-carol-wd-3284698_mn324f.jpg"
                 alt="carol_image" className='rounded-t-full rounded-br-full'/>
            </div>
         </div>
         <div className="flex flex-col items-center pl-12 middle-div col mt-16 w-3/5">
            <div>
            <p className='parag1 text-4xl font-bold '>FIND YOUR <span className='text-green'>STYLE</span> </p>
            <p className='parag2 text-4xl font-bold  py-3'>REFRESH YOUR LOOK</p>
            <p className='parag3 pr-10 text-xl pt-3 '>Discover Your Style, Elevate Your Look with PRESTIGIOUS. Unleash your inner charm with our luxurious accessories and jewelry. Explore our handpicked collection for men and women, featuring timeless classics and contemporary trends.</p>
                
            </div>
            <button className='shop-btn bg-green text-white text-xl font-bold'>SHOP NOW</button>
         </div>
         <div className="col secondImage mt-32 w-1/5">
            <div className="">
                <img
                 src="https://res.cloudinary.com/dfin3vmgz/image/upload/v1700494588/images/pexels-zack-jarosz-1687719_cowapn.jpg"
                 alt="zack-image"  className='rounded-t-full rounded-bl-full'/>
            </div>
         </div>
        </div>

        <div className="section2 w-full pt-18">
                <h1 className='text-green text-4xl font-bold '>STYLE AND FASHION CATEGORY</h1>
                <div className="categories-items py-20 w-full">
                    <div className='item-a pt-2'>
                        <p className='font-bold text-xl text-center pb-0'>BAGS</p>
                        <div className='div-img '>

                        <img src="https://res.cloudinary.com/dfin3vmgz/image/upload/v1700513182/images/Bags-removebg-preview_ovojra.png" alt="green-bag"
                        className=' bag pt-8 pb-0' />
                        </div>
                    </div>

                    <div className='item-b pt-2 mt-8'>
                    <p className='font-bold text-xl text-center pb-0 '>HATS</p>
                    <div className='div-img'>
                        <img src="https://res.cloudinary.com/dfin3vmgz/image/upload/v1700513183/images/hat-removebg-preview_ktcb3q.png" alt="hat" 
                        className='bag '/>
                        
                    </div>
                    </div>

                    <div className='item-c pt-2 mb-8'>
                    <p className='font-bold text-xl text-center pb-0'>RINGS</p>
                    <div className='div-img'>
                        <img src="https://res.cloudinary.com/dfin3vmgz/image/upload/v1700513182/images/jewerly-removebg-preview_sotfvk.png" alt="ring"
                        className='bag ' />

                    </div>
                    </div>
                    <div className='item-d pt-2'>
                    <p className='font-bold text-xl text-center pb-0 mt-2'>WOMEN</p>
                    <div className='div-img'>
                        <img src="https://res.cloudinary.com/dfin3vmgz/image/upload/v1700513183/images/pexels-myicahel-tamburini-2.0-removebg_ava2zd.png" alt="women"
                        className=' bag' />
                        </div>
                    </div>
                    <div className='pt-2 item-e mt-8 '> 
                    <p className='font-bold text-xl  pt-1 text-center'>MEN</p>
                        <div className="div-img overflow-hidden relative">
                        <img src="https://res.cloudinary.com/dfin3vmgz/image/upload/v1701084297/images/mens-removebg_is435t.png" alt="men" 
                            className='men-img '/>
                        </div>
                    </div>
                    <div className='item-f pt-3 mb-6'>
                    <p className='font-bold text-xl text-center pb-0'>ACCESSOIRES</p>
                    <div className='div-img'>
                        <img src="https://res.cloudinary.com/dfin3vmgz/image/upload/v1700513183/images/sunglasses__1_-removebg-preview_qbradg.png" alt="accessoire"
                        className=' bag'  />

                    </div>
                    </div>
                    <div className='item-g pt-2'>
                    <p className='font-bold text-xl text-center pb-0'>SHOES</p>
                    <div className='div-img'>
                        <img src="https://res.cloudinary.com/dfin3vmgz/image/upload/v1700513183/images/Shoes_e9zhkd.png" alt="shoes" 

                        className=' bag pt-2' />
                    </div>
                    </div>
                </div>
        </div>

        <div className="section3  w-full ">
                <div className="container2 flex gap-4 ">
                <div className="div1 bg-green  w-3/4 text-center pt-20 h-[380px]">
                        <h1 className='font-bold text-6xl text-white '>Holiday Gift Guide</h1>
                        <p className='px-6 py-3 text-white text-xl'>Start your holiday shopping now and find the perfect treasures to make your loved ones' hearts sparkle.</p>
                        <button className='btn-gift border px-6 py-4 bg-green mt-4 font-bold text-white hover:text-green hover:bg-white'>EXPLORE THE GIFT GUIDE</button>
                    
                </div>

                <div className="section_img bg-green h-[310px] w-1/4">
                <button className='btn-jwl border px-6 py-2 bg-green relative left-24 top-80 font-bold text-white hover:text-green hover:bg-white'>Jewelry Sets</button>
                </div>
                </div>
        </div>

        <div className="section4 w-full pt-12">
                <h1 className='titre text-green text-4xl font-bold text-center'>BEST SELLERS</h1>
                <h1 className='titre text-black text-4xl font-bold py-10'>FOR YOU LADY</h1>
                <div className="items flex  gap-4">
                    <div className="item flex flex-col">
                        <div className='item-img image1'>
                        
                        </div>
                        <h3 className='text-xl font-bold text-center py-2'>Sparkling Stars</h3>
                        <a href="" className='lien  text-xl text-green font-bold text-center underline underline-offset-1'>SHOP NOW</a>
                    </div>
                    <div className="item flex flex-col pt-20">
                        <div className='item-img image2'>
                        
                        </div>
                        <h3 className='text-xl font-bold text-center py-2'>Moonlit Serenity</h3>
                        <a href="" className='lien  text-xl text-green font-bold text-center underline underline-offset-1'>SHOP NOW</a>
                    </div>
                    <div className="item flex flex-col">
                        <div className='item-img image3'>
                        
                        </div>
                        <h3 className='text-xl font-bold text-center py-2'>Rose Gold Elegance</h3>
                        <a href="" className=' lien text-xl text-green font-bold text-center underline underline-offset-1'>SHOP NOW</a>
                    </div>
                </div>
        </div>

        
        <div className="section5 w-full ">
        
                <h1 className='text-black text-4xl font-bold py-20'>FOR YOU MISTER</h1>
                <div className="items flex  gap-4">
                    <div className="item flex flex-col pt-20">
                        <div className='item-img image4'>
                        
                        </div>
                        <h3 className='text-xl font-bold text-center py-2'>Maverick ChronoMaster</h3>
                        <a href="" className='lien text-xl text-green font-bold text-center underline underline-offset-1'>SHOP NOW</a>
                    </div>
                    <div className="item flex flex-col ">
                        <div className='item-img image5'>
                
                        </div>
                        <h3 className='text-xl font-bold text-center py-2'>Sleek Sports Pro</h3>
                        <a href="" className='lien text-xl text-green font-bold text-center underline underline-offset-1'>SHOP NOW</a>
                    </div>
                    <div className="item flex flex-col pt-20">
                        <div className='item-img image6'>
                        
                        </div>
                        <h3 className='text-xl font-bold text-center py-2'>Classic Gentry Elite</h3>
                        <a href="" className='lien  text-xl text-green font-bold text-center underline underline-offset-1'>SHOP NOW</a>
                    </div>
                </div>
        </div>

        <div className="section6  w-full  py-10 ">
                <div className="bg-green  text-center pt-12 h-[400px]">
                        <h6 className='font-bold text-3xl text-white '>BLACK FRIDAY SPECIALS</h6>
                        <p className='px-6 py-3 text-white text-8xl'>Up to 50% OFF</p>
                        <button className='border px-12 py-3 bg-green mt-6 text-2xl text-white hover:text-green hover:bg-white'>SHOP NOW</button>
                        <p className='mt-16 text-white text-xl'>Prices marked reflect additional savings.</p>
                    
                </div>

        </div>

        <div className="section7 w-full py-5">

            <h1 className='text-black text-4xl font-bold pt-19'>SPECIAL OFFER FOR ONLY FOR YOU COUPLES</h1>
                <div className="itemss flex  justify-center gap-4 pt-14">
                    <div className="item flex flex-col ">
                        <div className='div-img img1'>
                        </div>
                        <h3 className='text-xl font-bold text-center py-2'>Aurora Blossom</h3>
                    </div>
                    
                    <div className="item flex flex-col ">
                        <div className='div-img img2'>
                        </div>
                        <h3 className='text-xl font-bold text-center py-2'>Sparkling Stars</h3>
                    </div>
                </div>
        </div>
       

        <div className="section8 w-full ">
            <h1 className='text-4xl py-8 pb-12 font-bold'>Our advantages</h1>
            <div className="advantage flex flex-row gap-3 ">
                <div className=""><span className='py-2'><GiConfirmed className='icon' style={{color:'#84cc16'}}/></span><h5 className='text-center'>Certified items</h5><p className='parag'>All our jewels are delivered with the receipt (18 carat gold certificate).</p></div>
                <div className=""><span className='py-2'><FaRegHeart className='icon' style={{color:'red'}}/></span><h5 className='text-center'>Unique designs</h5><p className='parag'>We design and create our jewelry models based on trends and always listening to the tastes of our customers.</p></div>
                <div className=""><span className='py-2'><TbTruckDelivery className='icon' /></span><h5 className=''>Delivery anywhere in Morocco</h5><p className='parag'>We deliver anywhere in Morocco within 24 to 48 hours (provided the item is available)</p></div>
                <div className=""><span className='py-2'><LuPackageOpen className='icon' /></span><h5 className='text-center'>Free returns</h5><p className='parag'>Possibility of return within 3 days is offered to our customers (30 DH is deducted from the price to be refunded if the return is not motivated by the non-conformity of the jewel)</p></div>
            </div>
        </div>

        {/* <div className="section9 w-full bg-rose  mt-5">
                <div className="container flex flex-col text-center  pt-10">
                <h1 className='font-bold text-5xl py-2'>SHOW OFF YOUR STYLE</h1>
                <h4 className='text-3xl py-6'>#LovePRESTIGIOUS on Instagram</h4>
                    <motion.div className="carousel  pt-8 px-2">
                    <motion.div  drag="x" dragConstraints={{right:0}} className="inner-carousel  flex gap-2 ">
                        {slideImage.map((image, index) => (
                            <motion.div className="item-slide mb-4">
                        <img src={image} key={index} alt="carousel-img "/>
                            </motion.div>
                        ))}
                    </motion.div>
                    </motion.div>
                    <button className='border px-6 py-4 bg-green mb-4 ml-8 relative left-96 w-1/5 text-white hover:text-green hover:bg-white text-xl'>VIEW GALLERY</button>
                </div>
        </div> */}


        </div>
        
        </div>
    );
}

export default LandingPage;