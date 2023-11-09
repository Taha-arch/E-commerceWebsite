import React, {useState, useEffect} from 'react';
import {GrStatusGoodSmall} from 'react-icons/gr';



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
        
  <div className="max-w-4xl  mx-auto  p-4 bg-white shadow-md  h-full">
    
    <div className="headerPopup">
    <div className="flex justify-start gap-2 pb-4 ">
        <button
          className="bg-red-400 text-white py-1 px-2  hover:bg-red-600"
          type="button"
          onClick={() => {
            setOpenDetail(false);
            setSelectedUser(null);
            
            }} >
          X
        </button>
      </div>
    </div>

     <div className="bodyPopup justify-center ">
     
        <h2>User Details</h2>
        

        <div className="flex justify-around">
        <div>
        <div className="item">FIRST NAME : {user && user.first_name}</div>
        <div className="item">LAST NAME: {user && user.last_name}</div>
        <div className="item">USERNAME :  {user && user.user_name}</div>
        </div>
        <div className="">
        <div className="item">EMAIL : {user && user.email}</div>
        <div className="item">ROLE: {user && user.role}</div>
        <div className="item">STATUS : {user && user.active ? (
                    <GrStatusGoodSmall className="text-xs mr-1 inline-flex  text-lightgreen" />
                  ) : (
                    <GrStatusGoodSmall className="text-xs mr-1 inline-flex  text-red-500" />
                  )}</div>
        <div className="item">CREATION DATE : {user && new Date(user.creation_date).toLocaleDateString(undefined,{year:'numeric',month:'numeric',day:'numeric',hour:'numeric',minute:'numeric',second:'numeric'})}</div>
        </div>
        </div>
         
     </div>

      <div className="flex justify-end gap-2 py-4 pr-20">
        <button
          className="bg-emerald-500 text-white py-2 px-4 rounded-lg hover:bg-emerald-600 focus:outline-none focus:ring-green-300"
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