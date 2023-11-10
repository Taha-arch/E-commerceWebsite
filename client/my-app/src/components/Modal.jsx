// modal.jsx
import React from "react";
import "../styles/main.css";

function Modal({ closeModal, onDelete, Title}) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button onClick={() => closeModal(false)}>X</button>
        </div>
        <div className="title">
          <h1>Delete {Title}</h1>
        </div>
        <div className="body">
          <p>Are you sure you want to delete this {Title}?</p>
        </div>
        <div className="footer">
          <button onClick={() => closeModal(false)} id="cancelBtn">
            Cancel
          </button>
          <button
            onClick={() => {
              onDelete();
              closeModal(false); // Close the modal
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
