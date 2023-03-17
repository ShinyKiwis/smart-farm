/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useAtom } from 'jotai';
import React, { useState } from 'react';
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

  const navigate = useNavigate();
  return (
    <div className="lights__item">
      <p onClick={() => navigate(`${light.id}`)}>{light.name}</p>
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
