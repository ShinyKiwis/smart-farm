import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import useWebSocket, { ReadyState } from 'react-use-websocket';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const light = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
      display: false,
    },
    title: {
      display: true,
      text: 'LIGHT',
    },
  },
};

const temperature = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
      display: false,
    },
    title: {
      display: true,
      text: 'TEMPERATURE',
    },
  },
};

const humidity = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
      display: false,
    },
    title: {
      display: true,
      text: 'HUMIDITY',
    },
  },
};

const moisture = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
      display: false,
    },
    title: {
      display: true,
      text: 'MOISTURE',
    },
  },
};

const gdd = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
      display: false,
    },
    title: {
      display: true,
      text: 'GDD',
    },
  },
};

const labels = [];

const data = {
  labels,
  datasets: [
    {
      label: '',
      data: [],
      borderColor: '#C8DCC6',
      backgroundColor: '#a0e09b',
    },
  ],
};

const Dashboard = () => {
  const [chartData, setChartData] = useState({
    light: data,
    temperature: data,
    moisture: data,
    humidity: data,
    gdd: data,
  });

  const feedKeys = ['light', 'temperature', 'moisture', 'humidity', 'gdd'];

  const socketUrl = 'ws://localhost:5000/api/adafruit/realtime';
  const [socketData, setSocketData] = useState([]);

  const { lastJsonMessage, readyState } = useWebSocket(socketUrl);

  useEffect(() => {
    if (lastJsonMessage) {
      const newData = lastJsonMessage.filter((item) => feedKeys.includes(item.feed_key));

      const chartDataUpdates = newData.reduce((acc, item) => {
        const key = item.feed_key;
        const labels = [
          ...chartData[key].labels.slice(-29),
          moment(item.created_at).format('HH:mm:ss').toString(),
        ];

        acc[key] = {
          ...data,
          labels,
          datasets: [
            {
              ...data.datasets[0],
              data: [...chartData[key].datasets[0].data.slice(-29), item.value],
            },
          ],
        };

        return acc;
      }, {});

      setChartData((prevState) => ({
        ...prevState,
        ...chartDataUpdates,
      }));
    }
  }, [lastJsonMessage]);

  return (
    <div className='dashboard padding-wrapper'>
      <h1 className='page-title'>Dashboard</h1>
      <div className='DB'>
        <div className='row'>
          <div className='holder'>
            <Line options={light} data={chartData.light} />
          </div>
          <div className='holder'>
            <Line options={temperature} data={chartData.temperature} />
          </div>
        </div>
        <div className='row'>
          <div className='holder'>
            <Line options={moisture} data={chartData.moisture} />
          </div>
          <div className='holder'>
            <Line options={humidity} data={chartData.humidity} />
          </div>
        </div>
        <div className='row'>
          <div className='holder'>
            <Line options={gdd} data={chartData.gdd} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
