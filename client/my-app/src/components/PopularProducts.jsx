import React from 'react'
import { Link } from 'react-router-dom'


const popularProductsData = [
	{
		_id: '3432',
		product_name: 'Double Floating Stones Ring, Gold"',
		product_thumbnail: 'https://res.cloudinary.com/dfin3vmgz/image/upload/v1701531189/product_images/1701531189387/cpuu8g2cnokxqnkwqm6a.jpg',
		product_price: '1499.00MAD',
		product_stock: 341
	},
	{
		_id: '7633',
		product_name: 'Double Floating Stones Ring, Silver',
		product_thumbnail: 'https://res.cloudinary.com/dfin3vmgz/image/upload/v1701530967/product_images/1701530965842/dxehhbzx1zfx8kolrbu5.jpg',
		product_price: '399.00MAD',
		product_stock: 24
	},
	{
		_id: '6534',
		product_name: 'Nura Stacking Ring, Gold',
		product_thumbnail: 'https://res.cloudinary.com/dfin3vmgz/image/upload/v1701460479/product_images/1701460478762/xbtejrguvyjfj2mocvqi.jpg',
		product_price: '899.00MAD',
		product_stock: 56
	},
	{
		_id: '9234',
		product_name: '	Star Ring, Silver, Silver',
		product_thumbnail: 'https://res.cloudinary.com/dfin3vmgz/image/upload/v1701445813/product_images/1701445811593/uf24plpjjtkprxpcafkj.png',
		product_price: '499.00MAD',
		product_stock: 98
	},
	{
		_id: '4314',
		product_name: 'Coloured Stone Adjustable Ring, Pack of 3',
		product_thumbnail: 'https://res.cloudinary.com/dfin3vmgz/image/upload/v1701534373/product_images/1701534374135/pout2zm3ks6vbvevbllr.jpg',
		product_price: '699.00MAD',
		product_stock: 0
	},
	{
		_id: '4342',
		product_name: 'Crystal Leopard Ring, Gold',
		product_thumbnail: 'https://res.cloudinary.com/dfin3vmgz/image/upload/v1701531190/product_images/1701531190796/yc5g9xixbhmvjmvrqhl4.jpg',
		product_price: '399.00MAD',
		product_stock: 453
	}
]

function PopularProducts() {
  return (
    <div className='bg-white w-full px-4 pt-3 pb-4 rounded-sm border border-gray-200  lg:w-[20rem] min-w-[20rem]'>
        <strong className='text-gray-700 font-medium'>Popular products</strong>
        <div className='mt-4 flex flex-col gap-3'>
             {popularProductsData.map(product => (
                <Link key={product._id} to={`/product/${product._id}`} className='flex hover:no-underline'>
                    <div className='w-10 h-10 min-w-10 bg-gray-200 rounded-sm overflow-hidden'>
                        <img className='w-full h-full object-cover' src={product.product_thumbnail} alt={product.product_name}/>
                    </div>
                    <div className='ml-4 flex-1'>
                        <p className='text-sm text-gray-800'>{product.product_name}</p>
                        <span className={`text-sm font-medium`}>
                            {product.product_stock === 0 ? 'Out of stock': product.product_stock + 'in stock'}</span>
                    </div>
                    <div className='text-xs text-gray-400 pl-2'>{product.product_price}</div>
                </Link>
             ))}
        </div>
      </div>
  )
}

export default PopularProducts

