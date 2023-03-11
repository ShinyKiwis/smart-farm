/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import './styles.css';

const Device = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (device) => navigate(device);

  const renderOutlet = () => (
    <>
      {(location.pathname.includes('lights') ||
        location.pathname.includes('water-pumps')) && (
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
      )}
      <Outlet />
    </>
  );

  return (
    <div className="devices padding-wrapper">
      <h1 className="page-title">Devices</h1>
      
      {renderOutlet()}
    </div>
  );
};

export default Device;
