import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { FaSearch } from 'react-icons/fa';
import './styles.css';

const HistoryLog = () => {
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchHistoryLog = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/logger?page=${currentPage}`);
        setLogs(res.data.logs);
        setTotalPages(res.data.totalPages);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchHistoryLog();
  }, [currentPage]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredLogs = logs.filter((log) =>
    log.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const renderPagination = () => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === currentPage || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
        pages.push(
          <li key={i} className={currentPage === i ? 'active' : ''}>
            <button onClick={() => handlePageChange(i)}>{i}</button>
          </li>
        );
      } else if (pages[pages.length - 1] !== '...') {
        pages.push('...');
      }
    }

    return (
      <ul className="pagination">
        {totalPages > 1 &&
          <>
            <li>
              <button onClick={handleFirstPage}>First</button>
            </li>
            <li>
              <button onClick={handlePrevPage}>Prev</button>
            </li>
            {pages}
            <li>
              <button onClick={handleNextPage}>Next</button>
            </li>
            <li>
              <button onClick={handleLastPage}>Last</button>
            </li>
          </>
        }
      </ul>
    );
  };

  return (
    <div className="devices padding-wrapper">
      <h1 className="page-title">History Log</h1>

      <div className="devices__finder">
        <div className="devices__finder__search">
          <input placeholder="Search" value={searchTerm} onChange={handleSearch} />
          <span>
            <FaSearch />
          </span>
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
          {!isLoading && filteredLogs.length === 0 && (
            <p style={{ textAlign: 'center' }}>No logs found.</p>
          )}
          {!isLoading && filteredLogs.length > 0 &&
            filteredLogs.map((log) => (
              <tr key={log._id}>
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

      {renderPagination()}
    </div>
  );
};

export default HistoryLog;
