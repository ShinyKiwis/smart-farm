import React, {useState} from 'react';
import { FaSearch, FaFilter } from 'react-icons/fa';
import SwitchControl from '../../components/SwitchControl';
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
      id: 5,
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
          </tr>
        </thead>
        <tbody>
          {devices.map((device) => (
            <tr key={device.id}>
              <td>{device.name}</td>
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
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default AllDevices;
