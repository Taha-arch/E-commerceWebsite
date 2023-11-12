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
    <div className="flex justify-start gap-2 ">
        <button
          className=" text-white py-1 px-2  "
          type="button"
          onClick={() => {
            setOpenDetail(false);
            setSelectedUser(null);
            
            }} >
          <AiOutlineCloseCircle style = { {color: "red", fontSize: "1.5em"} } />
        </button>
      </div>
    </div>
    
    <div className="flex justify-center text-xl font-bold  pb-6 ">
    <h2>User Details</h2>
      </div>
    
<div className='flex justify-center'>
<div className=" flex second-col w-20 h-20">
          <img className="flex rounded-full  " src={user && user.user_image} alt="#"></img>
        </div>
<div className='first-row'>
<table className='userDetails'>

<tr>
    <td>FIRST NAME :</td>
    <td>{user && user.first_name}</td>
</tr>
<tr>
    <td>LAST NAME:</td>
    <td>{user && user.last_name}</td>
</tr>
<tr>
    <td>USERNAME :</td>
    <td>{user && user.user_name}</td>
</tr>
<tr>
    <td>EMAIL :</td>
    <td>{user && user.email}</td>
</tr>

<tr>
    <td>ROLE:</td>
    <td>{user && user.role}</td>
</tr>
<tr>
    <td>STATUS :</td>
    <td>{user && user.active ? (
                    <GrStatusGoodSmall className="text-xs mr-1 inline-flex  text-lightgreen" />
                  ) : (
                    <GrStatusGoodSmall className="text-xs mr-1 inline-flex  text-red-500" />
                  )}</td>
</tr>
<tr>
    <td>CREATION DATE :</td>
    <td>{user && new Date(user.creation_date).toLocaleDateString(undefined,{year:'numeric',month:'numeric',day:'numeric',hour:'numeric',minute:'numeric',second:'numeric'})}</td>
</tr>
</table>
</div>

</div>

          
        

    
      <div className="flex justify-end gap-2 py-4 pr-5">
        <button
          className="bg-cyan-400 text-white py-2 px-4 rounded-lg hover:bg-cyan-500 focus:outline-none"
          type="button"
          onClick={() => {
            setOpenDetail(false);
            setSelectedUser(null);
            }}>
          Close
        </button>
      </div>

  </div>
);
}