import React from 'react';
import '../styles/index.css';

function LandingPage() {
    return (
        <div className=' flex flex-row justify-center'>

        <div className="container">

        <div className="section1 flex flex-row mt-10">
         <div className="col firstImage ">
            <div className=" ">
                <img 
src="https://res.cloudinary.com/dfin3vmgz/image/upload/v1700494588/images/pexels-carol-wd-3284698_mn324f.jpg"
                 alt="carol-image" className='rounded-t-full rounded-br-full'/>
            </div>
         </div>
         <div className="col mt-16 ">
            <p className='text-4xl font-bold px-6'>FIND YOUR <span className='text-green'>STYLE</span> </p>
            <p className='text-4xl font-bold px-6 py-3'>REFRESH YOUR LOOK</p>
            <p className='para px-10 text-xl pt-3 '>Discover Your Style, Elevate Your Look with PRESTIGIOUS. Unleash your inner charm with our luxurious accessories and jewelry. Explore our handpicked collection for men and women, featuring timeless classics and contemporary trends.</p>
            <button className='shop-btn bg-green text-white text-xl font-bold'>SHOP NOW</button>
         </div>
         <div className="col secondImage mt-32">
            <div className="">
                <img
                 src="https://res.cloudinary.com/dfin3vmgz/image/upload/v1700494588/images/pexels-zack-jarosz-1687719_cowapn.jpg"
                 alt="zack-image"  className='rounded-t-full rounded-bl-full'/>
            </div>
         </div>
        </div>

        <div className="section2 w-full pt-20">
                <h1 className='text-green text-4xl font-bold '>STYLE AND FASHION CATEGORY</h1>
                <div className="categories-items py-20">
                    <div className='item-a pt-2'>
                        <p className='font-bold text-xl text-center pb-0'>BAGS</p>
                        <img src="https://res.cloudinary.com/dfin3vmgz/image/upload/v1700513182/images/Bags-removebg-preview_ovojra.png" alt="green-bag"
                        className='ml-10' />
                    </div>
                    <div className='item-b pt-2 mt-8'>
                    <p className='font-bold text-xl text-center pb-0 '>HATS</p>
                        <img src="https://res.cloudinary.com/dfin3vmgz/image/upload/v1700513183/images/hat-removebg-preview_ktcb3q.png" alt="hat" 
                        className='ml-10'/>
                    </div>
                    <div className='item-c pt-2 mb-8'>
                    <p className='font-bold text-xl text-center pb-0'>RINGS</p>
                        <img src="https://res.cloudinary.com/dfin3vmgz/image/upload/v1700513182/images/jewerly-removebg-preview_sotfvk.png" alt="ring"
                        className='mt-2 ml-10' />
                    </div>
                    <div className='item-d pt-2'>
                    <p className='font-bold text-xl text-center pb-0 mt-2'>WOMEN</p>
                        <img src="https://res.cloudinary.com/dfin3vmgz/image/upload/v1700513183/images/pexels-myicahel-tamburini-2.0-removebg_ava2zd.png" alt="women"
                        className='h-80 mt-4 ' />
                    </div>
                    <div className='flex flex-row justify-center item-e mt-8 overflow-hidden r'> 
                    <p className='font-bold text-xl  pt-1 absolute '>MEN</p>
                        <div className="">
                        <img src="https://res.cloudinary.com/dfin3vmgz/image/upload/v1700513182/images/mens-removebg-preview_gs7yah.png" alt="men" 
                            className='' />
                        </div>
                    </div>
                    <div className='item-f pt-3 mb-6'>
                    <p className='font-bold text-xl text-center pb-0'>ACCESSOIRES</p>
                        <img src="https://res.cloudinary.com/dfin3vmgz/image/upload/v1700513183/images/sunglasses__1_-removebg-preview_qbradg.png" alt="accessoire"
                        className=' ml-6'  />
                    </div>
                    <div className='item-g pt-2'>
                    <p className='font-bold text-xl text-center pb-0'>SHOES</p>
                        <img src="https://res.cloudinary.com/dfin3vmgz/image/upload/v1700513183/images/Shoes_e9zhkd.png" alt="shoes" 
                        className='mt-4 ml-8' />
                    </div>
                </div>
        </div>

        <div className="section3 w-full py-4">
                <h1 className='text-green text-4xl font-bold text-center'>BEST SELLERS</h1>
                <h1 className='text-black text-4xl font-bold py-16'>FOR YOU LADY</h1>
                <div className="items flex  gap-4">
                    <div className="item flex flex-col">
                        <div className='item-img '>
                        <img src="https://res.cloudinary.com/dfin3vmgz/image/upload/v1700569949/images/pexels-the-glorious-studio-10983783_qgjk09.jpg" alt="" 
                        className='item-img' />
                        </div>
                        <h3 className='text-xl font-bold text-center py-2'>Sparkling Stars</h3>
                        <a href="" className='text-xl text-green font-bold text-center underline underline-offset-1'>SHOP NOW</a>
                    </div>
                    <div className="item flex flex-col pt-20">
                        <div className='item-img'>
                        <img src="https://res.cloudinary.com/dfin3vmgz/image/upload/v1700569949/images/pexels-mariam-antadze-6624862_viqlcx.jpg" alt="" 
                        className='item-img'/>
                        </div>
                        <h3 className='text-xl font-bold text-center py-2'>Moonlit Serenity</h3>
                        <a href="" className='text-xl text-green font-bold text-center underline underline-offset-1'>SHOP NOW</a>
                    </div>
                    <div className="item flex flex-col">
                        <div className='item-img'>
                        <img src="https://res.cloudinary.com/dfin3vmgz/image/upload/v1700569949/images/pexels-pixabay-266621_jze3sv.jpg" alt=""
                        className='item-img' />
                        </div>
                        <h3 className='text-xl font-bold text-center py-2'>Rose Gold Elegance</h3>
                        <a href="" className='text-xl text-green font-bold text-center underline underline-offset-1'>SHOP NOW</a>
                    </div>
                </div>
        </div>

        <div className="section4 w-full pt-16 pb-12">
        
                <h1 className='text-black text-4xl font-bold py-20'>FOR YOU MISTER</h1>
                <div className="items flex  gap-4">
                    <div className="item flex flex-col pt-20">
                        <div className='item-img '>
                        <img src="https://res.cloudinary.com/dfin3vmgz/image/upload/v1700573017/images/Downloader.la-652f1d304a591_d2zfdw.jpg" alt="" 
                        className='item-img' />
                        </div>
                        <h3 className='text-xl font-bold text-center py-2'>Maverick ChronoMaster</h3>
                        <a href="" className='text-xl text-green font-bold text-center underline underline-offset-1'>SHOP NOW</a>
                    </div>
                    <div className="item flex flex-col ">
                        <div className='item-img'>
                        <img src="https://res.cloudinary.com/dfin3vmgz/image/upload/v1700573017/images/pexels-mister-mister-2442893_lykgyh.jpg" alt="" 
                        className='item-img'/>
                        </div>
                        <h3 className='text-xl font-bold text-center py-2'>Sleek Sports Pro</h3>
                        <a href="" className='text-xl text-green font-bold text-center underline underline-offset-1'>SHOP NOW</a>
                    </div>
                    <div className="item flex flex-col pt-20">
                        <div className='item-img'>
                        <img src="https://res.cloudinary.com/dfin3vmgz/image/upload/v1700573017/images/Downloader.la-652f1cf642c6d_hubafa.jpg" alt=""
                        className='item-img' />
                        </div>
                        <h3 className='text-xl font-bold text-center py-2'>Classic Gentry Elite</h3>
                        <a href="" className='text-xl text-green font-bold text-center underline underline-offset-1'>SHOP NOW</a>
                    </div>
                </div>
        </div>

        <div className="section5 w-full">

            <h1 className='text-black text-4xl font-bold pt-19'>SPECIAL OFFER FOR ONLY FOR YOU COUPLES</h1>
                <div className="items flex  justify-center gap-4 pt-14">
                    <div className="item flex flex-col ">
                        <div className='item-img '>
                        <img src="https://res.cloudinary.com/dfin3vmgz/image/upload/v1700574343/images/pexels-cottonbro-studio-9430435_nihc84.jpg" alt="" 
                        className='item-img' />
                        </div>
                        <h3 className='text-xl font-bold text-center py-2'>Aurora Blossom</h3>
                    </div>
                    
                    <div className="item flex flex-col ">
                        <div className='item-img'>
                        <img src="https://res.cloudinary.com/dfin3vmgz/image/upload/v1700574343/images/pexels-gursher-gill-18633029_zpwige.jpg" alt=""
                        className='item-img' />
                        </div>
                        <h3 className='text-xl font-bold text-center py-2'>Sparkling Stars</h3>
                    </div>
                </div>
        </div>
        </div>
        
        </div>
    );
}

export default LandingPage;