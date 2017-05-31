import React from 'react';

// equivalent to:
// props.name, props.isChecked
//onClickProp takes the onClick event from the parent element
const ButtonComponent = ({ name, isActive, onClickProp, classProp, icon }) => {  
	
    return (

       <button 
	       href="#" 
	       className={`btn ${classProp} ${isActive}`}
	       onClick={onClickProp}
	       >{name}
	       <i className={`fa ${icon}`} aria-hidden="true"></i>
       </button>

    );
};

export default ButtonComponent;