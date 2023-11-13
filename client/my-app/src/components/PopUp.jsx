import React from 'react'; 

export default function PopUp(props){

const {children} = props;

    return (
        <div className="popupBackground w-full bg-opacity-40 absolute inset-0 h-90 z-10  bg-gray-800">
        <div className="popupContainer ">

          <div className="popupBody">
            {children}
            
          </div>
          
        </div>
        
      </div>
);
}