// Modal.jsx
import React from "react";
import "../../styles/main.css";



function DeleteUser({ setOpenModal, handleDeleteUser}) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="title">
          <h1>Delete User</h1>
        </div>
        <div className="body">
          <p>Are you sure you want to delete this User?</p>
        </div>
        <div className="footer">
          <button onClick={() => setOpenModal(false)} className='bg-cyan-500 text-white py-2 px-2 rounded-md hover:bg-cyan-600 ' >
            Cancel
          </button>
          <button
            onClick={() => {
                handleDeleteUser();
              setOpenModal(false)
               // Close the modal
            }}
            className="bg-red-500 py-2 px-2 text-white rounded-md hover:bg-red-600 ml-2"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteUser;