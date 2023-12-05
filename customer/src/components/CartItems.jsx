import React from 'react';
import { FaCheck } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CartItems = () => {
    const cardProducts = useSelector((state) => state.Card.cards)
    console.log(cardProducts)
    const navigate = useNavigate();
    return (
        <div>
                        {cardProducts && cardProducts.map((product) => (  
        <div className='bg-primary w-fit cursor-pointer' key={product._id} onClick={() => navigate(`/product/${product._id}`)}>
            <table className='flex'>
                <tr>
                    <td className=' w-52 py-7 pr-4'>
                        <div className='w-52'>
                            <img src={product && product.productImage[0]} alt="" />
                        </div>
                    </td>
                    <td>
                        <div className='flex flex-col h-40 w-96 justify-between'>
                            <div className='flex flex-row justify-between'>
                                <div>
                                    <h4 className=' font-Playfair'>{product.productName}</h4>
                                    <div className='flex flex-row justify-between'>
                                        <p className=' text-xs text-gray-400 '>Linen</p> 
                                        <p className='border-l pl-3 text-gray-400 text-xs'>Size:M</p>
                                    </div>                                    
                                </div>
                                <div className='flex flex-row w-28 pt-2 pr-1 justify-between'>
                                    <select className='border border-black w-12 h-6 rounded-md bg-white'>
                                        <option value="1">1</option>
                                    </select>
                                    <p>{product.price}DH</p>
                                </div>
                            </div>
                            <div className='flex flex-row justify-between'>
                                <div className='flex flex-row'>
                                    <FaCheck className='text-green-500'/>
                                    <p className='text-xs text-gray-400 pl-1'>In Stock</p> 
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
            </table>
            <hr />
        </div>
                        ))}
        </div>
    );
};

export default CartItems;