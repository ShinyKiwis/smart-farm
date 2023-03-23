  /* eslint-disable jsx-a11y/no-static-element-interactions */
  /* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
  /* eslint-disable jsx-a11y/click-events-have-key-events */
  import { useAtom } from 'jotai';
  import React, { useEffect, useState } from 'react';
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
  import { confirmModalAtom, deviceModalAtom } from '../../store';
  import './styles.css';

  const AllDevices = () => {
    const [devices, setDevices] = useState([]);
    const [loading, setLoading] = useState(true);

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

    useEffect(() => {
      const fetchDevices = async () => {
        const feedkeys = ['light-toggle', 'water-pump-toggle'];
        const result = await Promise.all(
          feedkeys.map(async (feedkey) => {
            const response = await fetch(
              `http://localhost:5000/api/adafruit/${feedkey}`
            );
            const data = await response.json();
            return data;
          })
        );
        const devicesData = result
          .flat()
          .map((device) => ({
            id: device.id,
            name: device.id,
            category: device.feed_key === 'light-toggle' ? 'Light' : 'Water Pump',
            active: device.value,
          }));
        setDevices(devicesData);
        setLoading(false);
      };
      fetchDevices();
    }, []);

    const handleToggleSwitch = (id) => {
      const tempDevices = [...devices].map((device) => {
        if (device.id === id) return { ...device, active: !device.active };
        return device;
      });
      setDevices(tempDevices);
    };

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
        <div className="devices__table-container">
        {loading ? (
          <p>Loading...</p>
        ) : (
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
                        device.category.toLowerCase().includes('light')
                          ? 'lights'
                          : 'water-pumps',
                        device.id
                      )
                    }
                    style={{ cursor: 'pointer' }}
                  >
                    {device.name}
                  </td>
                  <td>{device.category}</td>
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
