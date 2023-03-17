/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useAtom } from 'jotai';
import React, { useState } from 'react';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { confirmModalAtom, deviceModalAtom } from '../../store';
import SwitchControl from '../SwitchControl';
import './styles.css';

const WaterPumpItem = ({ onSwitch, waterPump }) => {
  const [deviceModalAtomValue, setDeviceModalAtomValue] =
    useAtom(deviceModalAtom);
  const handleOpenUpdateModal = () =>
    setDeviceModalAtomValue({ type: 'UPDATE', device: waterPump });

    const [,setConfirmModalAtomValue] = useAtom(confirmModalAtom)

    const handleDeleteDevice = (category, id) => {
  
    }
  
    const handleOpenConfirmModal = (category, id) => {                           
      setConfirmModalAtomValue({onAccept: () =>  (category, id)})
    }

  const navigate = useNavigate();
  return (
    <div className="water-pumps__item">
      <p onClick={() => navigate(`${waterPump.id}`)}>{waterPump.name}</p>
      <div className="water-pumps__item__actions">
        <div className="devices__table__actions">
          <span onClick={handleOpenUpdateModal}>
            <FaPencilAlt />
          </span>
          <span onClick={() => handleOpenConfirmModal("water-pump", waterPump.id)}>
            <FaTrash />
          </span>
        </div>
        <SwitchControl active={waterPump.active} onSwitch={onSwitch} />
      </div>
    </div>
  );
};

const WaterPumps = () => {
  const [waterPumps, setWaterPumps] = useState([
    {
      id: 1,
      name: 'Water Pump 1',
      active: false,
    },
    {
      id: 2,
      name: 'Water Pump 2',
      active: true,
    },
    {
      id: 3,
      name: 'Water Pump 3',
      active: false,
    },
    {
      id: 4,
      name: 'Water Pump 4',
      active: true,
    },
  ]);

  const handleToggleSwitch = (id) => {
    const tempPumps = [...waterPumps].map((waterPump) => {
      if (waterPump.id === id)
        return { ...waterPump, active: !waterPump.active };
      return waterPump;
    });
    setWaterPumps(tempPumps);
  };

  return (
    <div className="water-pumps">
      {waterPumps.map((waterPump) => (
        <WaterPumpItem
          onSwitch={() => handleToggleSwitch(waterPump.id)}
          key={waterPump.id}
          waterPump={waterPump}
        />
      ))}
    </div>
  );
};

export default WaterPumps;
