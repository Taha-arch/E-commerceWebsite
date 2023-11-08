import React from 'react'; 
export default function PopUp(props){

const {Title, children } = props;

    return (
        <div className="popupBackground w-full bg-opacity-40 absolute inset-0 h-90 z-10  bg-gray-800">
        <div className="popupContainer ">
          
          <div className="titlePopup max-w-4xl  mx-auto mt-16 p-4 bg-white shadow-md  h-full">
            <h1 className=' px-4 pt-1 text-2xl font-semibold'>{Title}</h1>
          </div>
          <div className="popupBody">
            {children}
          </div>
        </div>
      </div>
);
}

