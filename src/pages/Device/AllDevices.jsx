  /* eslint-disable jsx-a11y/no-static-element-interactions */
  /* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
  /* eslint-disable jsx-a11y/click-events-have-key-events */
  import { useAtom } from 'jotai';
  import React, { useEffect, useMemo, useState } from 'react';
  import {
    FaSearch,
    FaFilter,
    FaPlus,
    FaPencilAlt,
    FaTrash,
  } from 'react-icons/fa';
  import { useNavigate } from 'react-router-dom';
  import ConfirmModal from '../../components/Modals/ConfirmModal';
  import DeviceModal from '../../components/Modals/DeviceModal';
  import SwitchControl from '../../components/SwitchControl';
  import { confirmModalAtom, deviceModalAtom, lightsAtom, waterPumpsAtom } from '../../store';
  import './styles.css';
import axios from 'axios';

  const AllDevices = () => {
    const [lights, setLights] = useAtom(lightsAtom)
    const [waterPumps, setWaterPumps] = useAtom(waterPumpsAtom)

    const devices = useMemo(() => {
      return [...lights, ...waterPumps]
    }, [lights,waterPumps])
   
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const navigateToDetailPage = (category, id) =>
      navigate(`/devices/${category}/${id}`);

    const [deviceModalAtomValue, setDeviceModalAtomValue] = useAtom(
      deviceModalAtom
    );
    const handleOpenAddModal = () => {
      setDeviceModalAtomValue({ type: 'ADD' });
    };
    const handleOpenEditModal = (device) => {
      setDeviceModalAtomValue({ type: 'UPDATE', device });
    };

    const handleDeleteDevice = (category, id) => {
      alert('Delete device ', id);
      if (category === 'light') {
        //call api
        return;
      }
      //call api
    };

    const [confirmModalAtomValue, setConfirmModalAtomValue] = useAtom(
      confirmModalAtom
    );
    const handleOpenConfirmModal = (category, id) => {
      setConfirmModalAtomValue({ onAccept: () => handleDeleteDevice(category, id) });
    };

    const handleToggleSwitch = async (id) => {
      try {
        const device = devices.find(item => item.id === id)
        if(device.type === "light"){
          const tempLights = [...lights].map((light) => {
            if (light.id === id) return { ...light, active: !light.active };
            return light;
          });
      
          setLights(tempLights);
        }
        else{
          const tempWaterPumps = [...waterPumps].map((waterpump) => {
            if (waterpump.id === id)
              return { ...waterpump, active: !waterpump.active };
            return waterpump;
          });
          setWaterPumps(tempWaterPumps);
        }
        const res = await axios.post(`http://localhost:5000/api/adafruit/feed/${id}/${!device.active}`)
      } catch (error) {
        console.log({error})
      }
    };
console.log(devices)
    return (
      <>
        <div className="devices__finder">

          <div className="devices__finder__filter">
            <button className="devices__add" onClick={handleOpenAddModal}>
              <FaPlus fontSize="1rem" />
              Add Device
            </button>
          </div>
        </div>
        <div className="devices__table-container">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table cellSpacing="0" className="devices__table">
            <thead>
              <tr>
                <th>Name</th>
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
                        device.type.toLowerCase().includes('light')
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
                    <SwitchControl
                      active={device.active}
                      onSwitch={() => handleToggleSwitch(device.id)}
                    />
                  </td>
                  <td className="devices__table__actions">
                    <span onClick={() => handleOpenEditModal(device)}>
                      <FaPencilAlt />
                    </span>
                    <span
                      onClick={() =>
                        handleOpenConfirmModal(
                          device.category.toLowerCase(),
                          device.id
                        )
                      }
                    >
                      <FaTrash />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        </div>
        {deviceModalAtomValue !== null && <DeviceModal />}
        {confirmModalAtomValue !== null && (
          <ConfirmModal message="Do you want to delete this device?" />
        )}
      </>
    );
  };

  export default AllDevices;
