import React from 'react';
import { FaSearch, FaFilter } from 'react-icons/fa';
import './styles.css';

const HistoryLog = () => {
  const logs = [
    {
      id: 1,
      date: '10-03-23',
      time: '09:00:52',
      category: 'Light',
      device: 'Light 1',
      event: 'Turned on',
    },
    {
      id: 2,
      date: '10-03-23',
      time: '09:00:52',
      category: 'Light',
      device: 'Light 1',
      event: 'Turned on',
    },
    {
      id: 3,
      date: '10-03-23',
      time: '09:00:52',
      category: 'Lightsaduasytdjhkastdhjkasgdhjagsdhjgsadjhsagdjhsgadhj',
      device: 'Light 1',
      event: 'Turned on',
    },
    {
      id: 4,
      date: '10-03-23',
      time: '09:00:52',
      category: 'Water Pump',
      device: 'Water Pump 1',
      event: 'Turned asdkjhasjkdhaasdsadsadsdsadasdsdskjdghjkasdghjasdghjasgdhjasgdhjasgdjhsagdhjg',
    },
  ];

  return (
    <div className="devices padding-wrapper">
      <h1 className="page-title">History Log</h1>

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
      <table cellSpacing="0" className="history-logs__table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Category</th>
            <th>Device</th>
            <th>Event</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id}>
              <td style={{width: '12%'}}>{log.date}</td>
              <td style={{width: '12%'}}>{log.time}</td>
              <td style={{width: '15%'}}>{log.category}</td>
              <td style={{width: '20%'}}>{log.device}</td>
              <td style={{width: '40%'}}>{log.event}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryLog;
