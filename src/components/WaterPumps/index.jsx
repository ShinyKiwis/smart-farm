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

const WaterPumpItem = ({ onSwitch, waterpump }) => {
  const [, setDeviceModalAtomValue] =
    useAtom(deviceModalAtom);
  const handleOpenUpdateModal = () =>
    setDeviceModalAtomValue({ type: 'UPDATE', device: waterpump });

  const [,setConfirmModalAtomValue] = useAtom(confirmModalAtom)

  const handleDeleteDevice = (category, id) => {

  }

  const handleOpenConfirmModal = (category, id) => {                           
    setConfirmModalAtomValue({onAccept: () =>  (category, id)})
  }

  return (
    <div className="water-pumps__item">
      <p>{waterpump.name}</p>
      <div className='water-pumps__item__actions'>
        <div className="devices__table__actions">
          <span onClick={handleOpenUpdateModal}>
            <FaPencilAlt />
          </span>
          <span onClick={() => handleOpenConfirmModal("waterpump", waterpump.id)}>
            <FaTrash/>
          </span>
        </div>
        <SwitchControl active={waterpump.active} onSwitch={onSwitch} />
      </div>
    </div>
  );
};

const WaterPumps = () => {
  const [waterpumps, setWaterPumps] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:5000/api/adafruit/water-pump-toggle');
      const data = await response.json();
      setWaterPumps(data.map(waterpump => ({
        id: waterpump.created_at,
        name: waterpump.id,
        active: waterpump.value,
      })));
    };

    fetchData();
  }, []);

  const handleToggleSwitch = (id) => {
    const tempWaterPumps = [...waterpumps].map((waterpump) => {
      if (waterpump.id === id) return { ...waterpump, active: !waterpump.active };
      return waterpump;
    });
    setWaterPumps(tempWaterPumps);
  };

  const navigate = useNavigate();
  return (
    <div className="water-pumps">
      {waterpumps.map((waterpump) => (
        <WaterPumpItem
          onSwitch={() => handleToggleSwitch(waterpump.id)}
          key={waterpump.id}
          waterpump={waterpump}
        />
      ))}
    </div>
  );
};

export default WaterPumps;
