/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SwitchControl from '../SwitchControl';
import './styles.css';

const LightItem = ({ onSwitch, light }) => {
  const navigate = useNavigate();
  return (
    <div className="lights__item">
      <p onClick={() => navigate(`${light.id}`)}>{light.name}</p>
      <SwitchControl active={light.active} onSwitch={onSwitch} />
    </div>
  );
};

const Lights = () => {
  const [lights, setLights] = useState([
    {
      id: 1,
      name: 'Light 1',
      active: false,
    },
    {
      id: 2,
      name: 'Light 2',
      active: true,
    },
    {
      id: 3,
      name: 'Light 3',
      active: false,
    },
    {
      id: 4,
      name: 'Light 4',
      active: true,
    },
  ]);

  const handleToggleSwitch = (id) => {
    const tempLights = [...lights].map((light) => {
      if (light.id === id) return { ...light, active: !light.active };
      return light;
    });
    setLights(tempLights);
  };

  return (
    <div className="lights">
      {lights.map((light) => (
        <LightItem
          onSwitch={() => handleToggleSwitch(light.id)}
          key={light.id}
          light={light}
        />
      ))}
    </div>
  );
};

export default Lights;
