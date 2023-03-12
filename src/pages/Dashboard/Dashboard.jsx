import React from 'react'
import "./Dashboard.css"
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
import faker from 'faker'


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

const labels = ['12AM','1AM','2AM','3AM','4AM','5AM','6AM','7AM','8AM','9AM','11AM','12PM','1PM','1PM','2PM','3PM','4PM','5PM','6PM','7PM','8PM','9PM','10PM','11PM',];

const data = {
  labels,
  datasets: [
    {
      label: '',
      data: labels.map(() =>faker.datatype.float({ min: 0, max: 1 })),
      borderColor: '#C8DCC6',
      backgroundColor: '#a0e09b',
    },
  ],
};


const Dashboard = () => {
  return (
    <div className='dashboard padding-wrapper'>
      <h1 className="page-title">Dashboard</h1>
      <div className='DB'>
        <div className='row'>
          <div className='holder'>
            <Line options={light} data={data} />;
          </div>
          <div className='holder'>
            <Line options={temperature} data={data} />;
          </div>
        </div>
        <div className='row'>
          <div className='holder'>
            <Line options={humidity} data={data} />;
          </div>
          <div className='holder'>
            <Line options={moisture} data={data} />;
          </div>
        </div>
        <div className='row'>
          <div className='holder' id='gdd'>
            <Line options={gdd} data={data} />;
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
