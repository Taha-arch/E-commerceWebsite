import React, { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';


export default function AddSubcategory(props) {

const {setOpenSubcategory, setSubcategory, category} = props;
;
const token = localStorage.getItem('accessToken');
const [subcategoryInfo, setSubcategoryInfo] = useState({
    SubcategoryName: '',
    category_id: '',
});
const notify = () => swal(
    {
    title: 'Subcategory added successfully',
    icon: 'success',
    button: 'close',
    className: 'alert-supp',
    }
    );

    const SearchCategory = async (categoryName) => {
      try {
        const response = await axios.get(`http://localhost:3001/categories/search?category_name=${categoryName}`);
        return response.data.categories;
      } catch (error) {
        console.log("Error searching category:", error);
      }
    };
    
    const handleAddSubcategory = async () => {
      try {
        const categorySearched = await SearchCategory(category);

        const categoryId = categorySearched[0]._id;     
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };
    
    
        await axios.post(`http://localhost:3001/subcategories/`, {
          subcategory_name: subcategoryInfo.subcategoryName,
          category_id: categoryId,
        }, config);
    
        setSubcategory(subcategoryInfo.subcategoryName);
        setOpenSubcategory(false);
        notify();
      } catch (error) {
        console.error('Error adding new Subcategory:', error);
      }
    };
    
    

return (
    <div className="modalBackground">
      <div className="modalContainer">

        <div className="title">
          <h1>Add Subcategory</h1>
        </div>
        <div className="body">
          <form  method="POST">
            <div className='flex gap-2'>
                <label htmlFor="subcategoryName" className=''>Name: </label>
                <input 
            className="w-2/3 px-1 py-1 border rounded-lg focus:border"
            type="text"
            name="subcategoryName"
            id="subcategoryName"
            placeholder={subcategoryInfo && subcategoryInfo.subcategoryName}
            value={subcategoryInfo.subcategory_id}
            onChange={(e) => setSubcategoryInfo({ ...subcategoryInfo, subcategoryName: e.target.value })}
            required />
            </div>
          </form>
        </div>
        <div className="footer">
          <button className='bg-cyan-500 text-white py-2 px-2 rounded-md hover:bg-cyan-600 'onClick={() => setOpenSubcategory(false)} id="cancelBtn">
            Cancel
          </button>
          <button
          className="bg-red-500 py-2 px-4 text-white rounded-md hover:bg-red-600 ml-2"
            onClick={() => {
                handleAddSubcategory();
                setOpenSubcategory(false); 
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
};

