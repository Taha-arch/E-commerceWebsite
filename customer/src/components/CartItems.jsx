import React from 'react';
import { FaCheck } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CartItems = () => {
    const cardProducts = useSelector((state) => state.Card.cards)
    const navigate = useNavigate();
    return (
        <div>
                        {cardProducts && cardProducts.map((product) => (  
        <div className='bg-primary w-fit cursor-pointer' key={product._id} onClick={() => navigate(`/product/${product._id}`)}>
            <table className='flex'>
                <tr>
                    <td className=' w-24 py-7 pr-4 rounded-md'>
                        <div className='w-24 rounded-md'>
                            <img src={product && product.productImage[0]} alt="" />
                        </div>
                    </td>
                    <td>
                        <div className='flex flex-col h-40 w-96 justify-around gap-6'>
                            <div className='flex  justify-around items-start gap-3'>
                                <div>
                                    <h4 className=' font-Playfair'>{product.productName}</h4>
                                    <div className='flex flex-row justify-between'>
                                        <p className=' text-xs text-gray-400 '>Linen</p> 
                                        <p className='border-l pl-3 text-gray-400 text-xs'>Size:M</p>
                                    </div>                                    
                                </div>
                                <div className='flex justify-center w-28 pt-1 pr-1 justify-between'>
                                    <div className='text-center border border-black w-8 h-7 rounded-md bg-white'>
                                        <option value="1">{product.orderedQuantity ? product.orderedQuantity : 1}</option>
                                    </div>
                                  <div>  <p>{product.totalPrice ? product.totalPrice : product.price}DH</p></div>
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