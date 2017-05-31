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

       <div class="switch">
         <input class="switch-input" id="exampleRadioSwitch1" type="radio" checked name="testGroup">
         <label class="switch-paddle" for="exampleRadioSwitch1">
           <span class="show-for-sr">Bulbasaur</span>
         </label>
       </div>

    );
};

export default ButtonComponent;