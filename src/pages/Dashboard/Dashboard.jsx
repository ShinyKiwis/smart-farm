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

  const { lastJsonMessage } = useWebSocket('ws://localhost:5000');

  useEffect(() => {
    if (lastJsonMessage) {
      const { type, data } = lastJsonMessage;
      if (type === 'adafruit') {
        setChartData((prevState) => {
          const newChartData = { ...prevState };
          const feedKey = data.feed;
          const feedData = data.data;
          const labels = feedData
            .filter((feed, index) => index % 5 === 0)
            .reverse()
            .map((feed) => feed.created_at.substring(11, 19));
          const newDataset = {
            ...data.datasets[0],
            data: feedData
              .filter((feed, index) => index % 5 === 0)
              .reverse()
              .map((feed) => feed.value),
          };
          newChartData[feedKey] = {
            ...data,
            labels,
            datasets: [newDataset],
          };
          return newChartData;
        });
      }
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
  )
}


export default Dashboard








// import React, { useEffect, useState } from 'react';
// import './Dashboard.css'
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import { Line } from 'react-chartjs-2';
// import axios from 'axios';
// import moment from 'moment';
// import faker from 'faker'


// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const light = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: 'top',
//       display: false,
//     },
//     title: {
//       display: true,
//       text: 'LIGHT',
//     },
//   },
// };
// const temperature = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top',
//         display: false,
//       },
//       title: {
//         display: true,
//         text: 'TEMPERATURE',
//       },
//     },
//   };
//   const humidity = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top',
//         display: false,
//       },
//       title: {
//         display: true,
//         text: 'HUMIDITY',
//       },
//     },
//   };
//   const moisture = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top',
//         display: false,
//       },
//       title: {
//         display: true,
//         text: 'MOISTURE',
//       },
//     },
//   };
//   const gdd = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top',
//         display: false,
//       },
//       title: {
//         display: true,
//         text: 'GDD',
//       },
//     },
//   };

// const labels = [];

// const data = {
//   labels,
//   datasets: [
//     {
//       label: '',
//       data: [],
//       borderColor: '#C8DCC6',
//       backgroundColor: '#a0e09b',
//     },
//   ],
// };


// const Dashboard = () => {
//   const [chartData, setChartData] = useState({
//     light: data,
//     temperature: data,
//     moisture: data,
//     humidity: data,
//     gdd: data,
//   });

//   useEffect(() => {
//     const fetchChartData = async () => {
//       try {
//         const feedKeys = ['light', 'temperature', 'moisture', 'humidity', 'gdd'];
//         const dataRequests = feedKeys.map((key) => axios.get(`http://localhost:5000/api/adafruit/${key}`));
//         const responses = await Promise.all(dataRequests);
//         const chartDataUpdates = responses.reduce((acc, { data: responseData }, index) => {
//           const labels = responseData.filter((feed, index) => index % 5 === 0).reverse().map((feed) => feed.created_at.substring(11,19));
//           acc[feedKeys[index]] = {
//             ...data,
//             labels,
//             datasets: [
//               {
//                 ...data.datasets[0],
//                 data: responseData.filter((feed, index) => index % 5 === 0).reverse().map((feed) => feed.value),
//               },
//             ],
//           };
//           return acc;
//         }, {});
//         setChartData(chartDataUpdates);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     const interval = setInterval(fetchChartData, 0);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className='dashboard padding-wrapper'>
//       <h1 className="page-title">Dashboard</h1>
//       <div className='DB'>
//         <div className='row'>
//           <div className='holder'>
//             <Line options={light} data={chartData.light} />
//           </div>
//           <div className='holder'>
//             <Line options={temperature} data={chartData.temperature} />
//           </div>
//         </div>
//         <div className='row'>
//           <div className='holder'>
//             <Line options={moisture} data={chartData.moisture} />
//           </div>
//           <div className='holder'>
//             <Line options={humidity} data={chartData.humidity} />
//           </div>
//         </div>
//         <div className='row'>
//           <div className='holder'>
//             <Line options={gdd} data={chartData.gdd} />
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }


// export default Dashboard

