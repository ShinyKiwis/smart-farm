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
import useWebSocket from 'react-use-websocket';
import moment from 'moment';
import faker from 'faker';

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

  const { lastJsonMessage } = useWebSocket('wss://smart-farm-be.onrender.com');

  useEffect(() => {
    if (lastJsonMessage) {
      console.log(lastJsonMessage);
      const { feed_key, value, created_at } = lastJsonMessage;
      const chartDataUpdates = {
        ...chartData,
        [feed_key]: {
          ...data,
          labels: [...chartData[feed_key].labels, moment(created_at).format('HH:mm:ss')],
          datasets: [
            {
              ...data.datasets[0],
              data: [...chartData[feed_key].datasets[0].data, value],
            },
          ],
        },
      };
      setChartData(chartDataUpdates);
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
