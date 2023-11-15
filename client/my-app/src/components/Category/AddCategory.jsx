import React, { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';


export default function AddCategory(props) {

const {setOpenCategory, setCategory} = props;
const token = localStorage.getItem('accessToken');
const [categoryInfo, setCategoryInfo] = useState({
    categoryName: '',
});
const notify = () => swal(
    {
    title: 'Category added successfully',
    icon: 'success',
    button: 'close',
    className: 'alert-supp',
    }
    );

const handleAddCategory = async () => {
    
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}`}
          }
          await axios.post(`http://localhost:3001/categories`,
          {category_name : categoryInfo.categoryName},config);

          setCategory(categoryInfo.categoryName);
          
        setOpenCategory(false);
        notify();
      } catch (error) {
        console.error('Error adding new category:', error);
      }
    }

return (
    <div className="modalBackground">
      <div className="modalContainer">

        <div className="title">
          <h1>Add category</h1>
        </div>
        <div className="body">
          <form  method="POST">
            <div className='flex gap-2'>
                <label htmlFor="categoryName" className=''>Name: </label>
                <input 
            className="w-2/3 px-1 py-1 border rounded-lg focus:border"
            type="text"
            name="categoryName"
            id="categoryName"
            placeholder={categoryInfo && categoryInfo.categoryName}
            value={categoryInfo.subcategory_id}
            onChange={(e) => setCategoryInfo({ ...categoryInfo, categoryName: e.target.value })}
            required />
            </div>
          </form>
        </div>
        <div className="footer">
          <button className='bg-cyan-500 text-white py-2 px-2 rounded-md hover:bg-cyan-600 'onClick={() => setOpenCategory(false)} id="cancelBtn">
            Cancel
          </button>
          <button
          className="bg-red-500 py-2 px-4 text-white rounded-md hover:bg-red-600 ml-2"
            onClick={() => {
                handleAddCategory();
                setOpenCategory(false); 
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
};

