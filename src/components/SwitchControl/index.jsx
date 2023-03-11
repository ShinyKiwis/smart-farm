import React from 'react';
import './styles.css';

const SwitchControl = ({active,onSwitch}) => {
  return (
    <label className="switch">
      <input type="checkbox" checked={active} onChange={onSwitch}/>
      <span className="slider round"></span>
    </label>
  );
};

export default SwitchControl;
