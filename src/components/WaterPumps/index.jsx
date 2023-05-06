/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { confirmModalAtom, deviceModalAtom, waterPumpsAtom } from '../../store';
import SwitchControl from '../SwitchControl';
import './styles.css';
import axios from 'axios';

const WaterPumpItem = ({ onSwitch, waterpump }) => {
  const navigate = useNavigate()
  const [, setDeviceModalAtomValue] = useAtom(deviceModalAtom);
  const handleOpenUpdateModal = () =>
    setDeviceModalAtomValue({ type: 'UPDATE', device: waterpump });

  const [, setConfirmModalAtomValue] = useAtom(confirmModalAtom);

  const handleDeleteDevice = (category, id) => {};

  const handleOpenConfirmModal = (category, id) => {
    setConfirmModalAtomValue({ onAccept: () => (category, id) });
  };

  const navigateToDetailPage = () =>
  navigate(`/devices/water-pumps/${waterpump.id}`);

  return (
    <div className="water-pumps__item">
      <p onClick={navigateToDetailPage}>{waterpump.name}</p>
      <div className="water-pumps__item__actions">
        <div className="devices__table__actions">
          <span onClick={handleOpenUpdateModal}>
            <FaPencilAlt />
          </span>
          <span
            onClick={() => handleOpenConfirmModal('waterpump', waterpump.id)}
          >
            <FaTrash />
          </span>
        </div>
        <SwitchControl active={waterpump.active} onSwitch={onSwitch} />
      </div>
    </div>
  );
};

const WaterPumps = () => {
  const [waterpumps, setWaterPumps] = useAtom(waterPumpsAtom)

  const handleToggleSwitch = async (id) => {
    const device = waterpumps.find(item => item.id === id)

    try {
      const res = await axios.post(
        `http://localhost:5000/api/adafruit/feed/${id}/${!device.active}`
      );
      const tempWaterPumps = [...waterpumps].map((waterpump) => {
        if (waterpump.id === id)
          return { ...waterpump, active: !waterpump.active };
        return waterpump;
      });
      setWaterPumps(tempWaterPumps);
    } catch (error) {
      console.log({ error });
    }
  };

  // const navigate = useNavigate();
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
