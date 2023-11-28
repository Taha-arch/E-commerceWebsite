import React from 'react';
import { FaCheck } from "react-icons/fa6";

const CartItems = () => {
    return (
        <div className='bg-primary w-fit'>
            <table className='flex'>
                <tr>
                    <td className=' w-52 py-7 pr-4'>
                        <div className='w-52'>
                            <img src="/lunette.jpg" alt="" />
                        </div>
                    </td>
                    <td>
                        <div className='flex flex-col h-40 w-96 justify-between'>
                            <div className='flex flex-row justify-between'>
                                <div>
                                    <h4 className=' font-Playfair'>Premium Hat</h4>
                                    <div className='flex flex-row justify-between'>
                                        <p className=' text-xs text-gray-400 '>Linen</p> 
                                        <p className='border-l pl-3 text-gray-400 text-xs'>Size:M</p>
                                    </div>                                    
                                </div>
                                <div className='flex flex-row w-28 pt-2 pr-1 justify-between'>
                                    <select className='border border-black w-12 h-6 rounded-md bg-white'>
                                        <option value="1">1</option>
                                    </select>
                                    <p>790$</p>
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
    );
};

export default CartItems;