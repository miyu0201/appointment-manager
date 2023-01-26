import React from "react";

const Header = ({handleToggleAdd,toggleAdd}) => {
  return (
    //ternary color and text of button according to toggleAdd value
    <div className="header">
      <h2>Appointments</h2>
     <button className="btn" style={{backgroundColor:toggleAdd===true ? 'grey':'green'}} onClick={handleToggleAdd}>{toggleAdd===true? 'close': 'Add'}</button>
    </div>
  )
}

export default Header
