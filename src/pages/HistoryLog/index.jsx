import React, { useState } from 'react';
import { FaSearch, FaFilter } from 'react-icons/fa';
import { useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import "./styles.css"

const HistoryLog = () => {
  const [logs, setLogs] = useState([]);
  const[isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchHistoryLog = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/logger');
        setLogs(res.data.reverse());
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };

    const interval = setInterval(() => {
      fetchHistoryLog();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

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
            <th>Type</th>
            <th>Content</th>
          </tr>
        </thead>
        <tbody>
          {isLoading && <p style={{ textAlign: 'center' }}>Loading...</p>}
          {!isLoading && logs &&
            logs.map((log) => (
              <tr key={log.id}>
                <td style={{ width: '12%' }}>
                  {moment(log.time).format('HH:MM')}
                </td>
                <td style={{ width: '12%' }}>
                  {moment(log.time).format('DD/MM/YYYY')}
                </td>
                <td style={{ width: '15%', textTransform: 'capitalize' }}>
                  {log.feed_key}
                </td>
                <td
                  style={{
                    width: '20%',
                    color: log.type === '[EVENT]' ? '#C8DCC6' : 'red',
                    fontWeight: '600',
                  }}
                >
                  {log.type}
                </td>
                <td style={{ width: '40%' }}>{log.content}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryLog;
