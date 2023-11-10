// Modal.jsx
import React from "react";
import "../styles/main.css";


function DeleteUser({ setOpenModal, handleDeleteUser}) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button onClick={() => setOpenModal(false)}>X</button>
        </div>
        <div className="title">
          <h1>Delete User</h1>
        </div>
        <div className="body">
          <p>Are you sure you want to delete this User?</p>
        </div>
        <div className="footer">
          <button onClick={() => setOpenModal(false)} id="cancelBtn">
            Cancel
          </button>
          <button
            onClick={() => {
                handleDeleteUser();
              setOpenModal(false)
               // Close the modal
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteUser;