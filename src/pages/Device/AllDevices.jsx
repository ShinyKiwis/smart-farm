/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useAtom } from 'jotai';
import React, { useState } from 'react';
import { FaSearch, FaFilter, FaPlus, FaPencilAlt, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import ConfirmModal from '../../components/Modals/ConfirmModal';
import DeviceModal from '../../components/Modals/DeviceModal';
import SwitchControl from '../../components/SwitchControl';
import {confirmModalAtom, deviceModalAtom} from "../../store"
import './styles.css';

const AllDevices = () => {
  const [devices, setDevices] = useState([
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
      id: 6,
      name: 'Light 2',
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
    {
      id: 1,
      name: 'Light 1',
      active: true,
    },
  ]);

  const handleToggleSwitch = (id) => {
    const tempDevices = [...devices].map((device) => {
      if (device.id === id) return { ...device, active: !device.active };
      return device;
    });
    setDevices(tempDevices);
  };

  const navigate = useNavigate();
  const navigateToDetailPage = (category, id) =>
    navigate(`/devices/${category}/${id}`);

  const [deviceModalAtomValue,setDeviceModalAtomValue] = useAtom(deviceModalAtom)
  const handleOpenAddModal = () => {
    setDeviceModalAtomValue({type: "ADD"})
  }
  const handleOpenEditModal = (device) => {
    setDeviceModalAtomValue({type: "UPDATE", device})
  }

  

  const handleDeleteDevice = (category, id) => {
    alert("Delete device ", id)
    if(category === "light"){
      //call api
      return;
    }
    //call api
  } 

  const [confirmModalAtomValue,setConfirmModalAtomValue] = useAtom(confirmModalAtom)
  const handleOpenConfirmModal = (category, id) => {                           
    setConfirmModalAtomValue({onAccept: () => handleDeleteDevice(category, id)})
  }
 
  return (
    <>
      <div className="devices__finder">
        <div className="devices__finder__search">
          <input placeholder="Search" />
          <span>
            <FaSearch />
          </span>
        </div>
        <div className="devices__finder__filter">
          <button className="devices__add" onClick={handleOpenAddModal}>
            <FaPlus fontSize="1rem" />
            Add Device
          </button>
          <span>
            <FaFilter />
          </span>
          <p>Add Filter</p>
        </div>
      </div>
      <table cellSpacing="0" className="devices__table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Categoty</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {devices.map((device) => (
            <tr key={device.id}>
              <td
                onClick={() =>
                  navigateToDetailPage(
                    device.name.toLowerCase().includes('light')
                      ? 'lights'
                      : 'water-pumps',
                    device.id
                  )
                }
                style={{ cursor: 'pointer' }}
              >
                {device.name}
              </td>
              <td>
                {device.name.toLowerCase().includes('light')
                  ? 'Light'
                  : 'Water Pump'}
              </td>
              <td>
                <SwitchControl
                  active={device.active}
                  onSwitch={() => handleToggleSwitch(device.id)}
                />
              </td>
              <td className='devices__table__actions'>
                <span onClick={() => handleOpenEditModal(device)}><FaPencilAlt/></span>
                <span onClick={() => handleOpenConfirmModal("light", device.id)}><FaTrash/></span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {deviceModalAtomValue !== null  && <DeviceModal/>}
      {confirmModalAtomValue !== null  && <ConfirmModal  message="Do you want to delete this device?"/>}
    </>
  );
};

export default AllDevices;
