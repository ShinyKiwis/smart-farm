/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { confirmModalAtom, deviceModalAtom } from '../../store';
import SwitchControl from '../SwitchControl';
import './styles.css';

const LightItem = ({ onSwitch, light }) => {
  const [, setDeviceModalAtomValue] =
    useAtom(deviceModalAtom);
  const handleOpenUpdateModal = () =>
    setDeviceModalAtomValue({ type: 'UPDATE', device: light });

  const [,setConfirmModalAtomValue] = useAtom(confirmModalAtom)

  const handleDeleteDevice = (category, id) => {

  }

  const handleOpenConfirmModal = (category, id) => {                           
    setConfirmModalAtomValue({onAccept: () =>  (category, id)})
  }

  return (
    <div className="lights__item">
      <p>{light.name}</p>
      <div className='lights__item__actions'>
        <div className="devices__table__actions">
          <span onClick={handleOpenUpdateModal}>
            <FaPencilAlt />
          </span>
          <span onClick={() => handleOpenConfirmModal("light", light.id)}>
            <FaTrash/>
          </span>
        </div>
        <SwitchControl active={light.active} onSwitch={onSwitch} />
      </div>
    </div>
  );
};

const Lights = () => {
  const [lights, setLights] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:5000/api/adafruit/light-toggle');
      const data = await response.json();
      setLights(data.map(light => ({
        id: light.created_at,
        name: light.id,
        active: light.value,
      })));
    };

    fetchData();
  }, []);

  const handleToggleSwitch = (id) => {
    const tempLights = [...lights].map((light) => {
      if (light.id === id) return { ...light, active: !light.active };
      return light;
    });
    setLights(tempLights);
  };

  const navigate = useNavigate();
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
