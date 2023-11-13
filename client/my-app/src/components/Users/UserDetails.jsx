import React, {useState, useEffect} from 'react';
import {GrStatusGoodSmall} from 'react-icons/gr';
import {AiOutlineCloseCircle} from 'react-icons/ai';



export default function UserDetails(props) {
  const {setOpenDetail, selectedUser, setSelectedUser} = props;
  const token = localStorage.getItem('accessToken');
  const [user, setUser] = useState(null);
  console.log(selectedUser);
  useEffect(() => {
    if (selectedUser) {
      const fetchUserDetails = async () => {
        try {
            const user_id = selectedUser._id;
            const config = {
                headers: { Authorization: `Bearer ${token}`}
              }
            fetch(`http://localhost:3001/users/${user_id}`, config)
            .then(response => response.json())
            .then( res => setUser(res.data));
        } catch (error) {
          console.log(error);
        }
      };

      fetchUserDetails();
    }
  }, [selectedUser])
    return (
        
  <div className="flex flex-col rounded-xl max-w-xl h-[500px] mx-auto px-4 py-2 bg-white shadow-md  mt-10">
    
    <div className="py-4">
    <div className="flex justify-end  gap-2 text-xl font-bold ">
        <h2 className='mr-40'>User Details</h2>
        <button
          className=" text-white px-2   "
          type="button"
          onClick={() => {
            setOpenDetail(false);
            setSelectedUser(null);
            
            }} >
          <AiOutlineCloseCircle style = { {color: "red", fontSize: "1.5em"} } />
        </button>
      </div>
    </div>
    
    
    
<div className='flex justify-center mt-5'>
<div className=" flex second-col w-20 h-20 mr-10">
          <img className="flex rounded-full  " src={user && user.user_image} alt="#"></img>
        </div>
<div className='first-row'>
<table className='userDetails'>
<tbody>
<tr>
    <td className='font-bold'>FIRST NAME :</td>
    <td>{user && user.first_name}</td>
</tr>
<tr>
    <td className='font-bold'>LAST NAME:</td>
    <td>{user && user.last_name}</td>
</tr>
<tr>
    <td className='font-bold'>USERNAME :</td>
    <td>{user && user.user_name}</td>
</tr>
<tr>
    <td className='font-bold'>STATUS :</td>
    <td>{user && user.active ? (
                    <GrStatusGoodSmall className="text-xs mr-1 inline-flex  text-lightgreen" />
                  ) : (
                    <GrStatusGoodSmall className="text-xs mr-1 inline-flex  text-red-500" />
                  )}</td>
</tr>
<tr>
    <td className='font-bold'>ROLE:</td>
    <td>{user && user.role}</td>
</tr>
<tr>
    <td className='font-bold'>EMAIL :</td>
    <td>{user && user.email}</td>
</tr>
<tr>
    <td className='font-bold'>CREATION DATE :</td>
    <td>{user && new Date(user.creation_date).toLocaleDateString(undefined,{year:'numeric',month:'numeric',day:'numeric',hour:'numeric',minute:'numeric',second:'numeric'})}</td>
</tr>
</tbody>
</table>
</div>

</div>

  </div>
);
}