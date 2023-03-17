/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useAtom } from 'jotai';
import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import ConfirmModal from '../../components/Modals/ConfirmModal';
import DeviceModal from '../../components/Modals/DeviceModal';
import { confirmModalAtom, deviceModalAtom } from '../../store';
import './styles.css';

const Device = () => {
  const [deviceModalAtomValue,setDeviceModalAtomValue] = useAtom(deviceModalAtom);
  const [confirmModalAtomValue] = useAtom(confirmModalAtom);

  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (device) => navigate(device);

  const renderOutlet = () => {
    const handleOpenAddModal = () => setDeviceModalAtomValue({type: "ADD"})
    return (
      <>
        {(location.pathname.includes('lights') ||
          location.pathname.includes('water-pumps')) && (
          <div className='flex-center-between'>
            <div className="devices__navigation">
              <div
                onClick={() => handleNavigation('lights')}
                className={`devices__navigation__item ${
                  location.pathname.includes('lights') && 'active'
                }`}
              >
                Light
              </div>
              <div
                onClick={() => handleNavigation('water-pumps')}
                className={`devices__navigation__item ${
                  location.pathname.includes('water-pumps') && 'active'
                }`}
              >
                Water pump
              </div>
            </div>
            <button style={{marginRight: 0, width: "160px"}} className="devices__add" onClick={handleOpenAddModal}>
              <FaPlus fontSize="1rem" />
              Add Device
            </button>
          </div>
        )}
        <Outlet />
      </>
    );
  };

  return (
    <div className="devices padding-wrapper">
      <h1 className="page-title">Devices</h1>

      {renderOutlet()}
      {deviceModalAtomValue !== null && <DeviceModal />}
      {confirmModalAtomValue !== null && (
        <ConfirmModal message="Do you want to delete this device?" />
      )}
    </div>
  );
};

export default Device;
