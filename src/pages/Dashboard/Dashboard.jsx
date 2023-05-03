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
import axios from 'axios';

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
      backgroundColor: '#58c750',
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
  const [max, setMax] = useState({
    light: 0,
    temperature: 0,
    moisture: 0,
    humidity: 0,
    gdd: 0
  });
  const [min, setMin] = useState({
    light: 0,
    temperature: 0,
    moisture: 0,
    humidity: 0,
    gdd: 0
  });
  const [avg, setAvg] = useState({
    light: 0,
    temperature: 0,
    moisture: 0,
    humidity: 0,
    gdd: 0
  });
  const [length, setlength] = useState({
    light: 0,
    temperature: 0,
    moisture: 0,
    humidity: 0,
    gdd: 0
  });

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const feedKeys = ['light', 'temperature', 'moisture', 'humidity', 'gdd'];
        const dataRequests = feedKeys.map((key) => axios.get(`http://localhost:5000/api/adafruit/feed/${key}`));
        const responses = await Promise.all(dataRequests);
        const chartDataUpdates = responses.reduce((acc, { data: responseData }, index) => {
          const values = responseData.map((feed) => feed.value);
          const filteredValues = values.map(str => parseInt(str, 10));
          const maxVal = (filteredValues !== "-Infinity") ? Math.max(...filteredValues).toFixed(2) : 0;
          const minVal = Math.min(...filteredValues).toFixed(2);
          const avgVal = (filteredValues.reduce((total, val) => total + val, 0)/filteredValues.length).toFixed(2);
          const length = filteredValues.length;
          // console.log(maxVal)
          // console.log(minVal)
          // console.log(avgVal)
          const labels = responseData.filter((feed, index) => index % 5 === 0).reverse().map((feed) => feed.created_at.substring(11,19));
          acc[feedKeys[index]] = {
            ...data,
            labels,
            datasets: [
              {
                ...data.datasets[0],
                data: responseData.filter((feed, index) => index % 5 === 0).reverse().map((feed) => (feed.value !== null && feed.value == "null" && feed.value == "Infinity" && feed.value == "-Infinity") ?  '0' : feed.value),
              },
            ],
          };
          setMax(prevMax => ({
            ...prevMax,
            [feedKeys[index]]: maxVal
          }));
          setMin(prevMin => ({
            ...prevMin,
            [feedKeys[index]]: minVal
          }));
          setAvg(prevAvg => ({
            ...prevAvg,
            [feedKeys[index]]: avgVal
          }));
          setlength(prevAvg => ({
            ...prevAvg,
            [feedKeys[index]]: length
          }));
          console.log(max.light)
          console.log(min.light)
          console.log(avg.light)
          return acc;
        }, {});
        setChartData(chartDataUpdates);
      } catch (error) {
        console.error(error);
      }
    };
    fetchChartData();
  }, []);


  const { lastJsonMessage } = useWebSocket('ws://localhost:5000');
  useEffect(() => {
    if (lastJsonMessage) {
      const { feed_key, value, created_at } = lastJsonMessage;
      console.log(lastJsonMessage)
      const newData = {
        x: moment(created_at).format('HH:mm:ss'),
        y: parseFloat(value),
      };
      switch (feed_key) {
        case 'light':
          setChartData((prevState) => ({
            ...prevState,
            light: {
              ...prevState.light,
              labels: [...prevState.light.labels, newData.x],
              datasets: [
                {
                  data: [...prevState.light.datasets[0].data, newData.y],
                  borderColor: '#C8DCC6',
                  backgroundColor: '#58c750',
                },
              ],
            },
          }));
          setMax(prevMax => (newData.y > prevMax.light ? { ...prevMax, light: newData.y } : prevMax));
          setMin(prevMin => (newData.y < prevMin.light ? { ...prevMin, light: newData.y } : prevMin));
          setAvg(prevAvg => ({ ...prevAvg, light: (((prevAvg.light * length.light) + newData.y) / (length.light + 1)).toFixed(2) }));
          break;
        case 'temperature':
          setChartData((prevState) => ({
            ...prevState,
            temperature: {
              ...prevState.temperature,
              labels: [...prevState.temperature.labels, newData.x],
              datasets: [
                {
                  data: [
                    ...prevState.temperature.datasets[0].data,
                    newData.y,
                  ],
                  borderColor: '#C8DCC6',
                  backgroundColor: '#58c750',                },
              ],
            },
          }));
          setMax(prevMax => (newData.y > prevMax.temperature ? { ...prevMax, temperature: newData.y } : prevMax));
          setMin(prevMin => (newData.y < prevMin.temperature ? { ...prevMin, temperature: newData.y } : prevMin));
          setAvg(prevAvg => ({ ...prevAvg, temperature: (((prevAvg.temperature * length.temperature) + newData.y) / (length.temperature + 1)).toFixed(2) }));
          break;
        case 'moisture':
          setChartData((prevState) => ({
            ...prevState,
            moisture: {
              ...prevState.moisture,
              labels: [...prevState.moisture.labels, newData.x],
              datasets: [
                {
                  data: [...prevState.moisture.datasets[0].data, newData.y],
                  borderColor: '#C8DCC6',
                  backgroundColor: '#58c750',                },
              ],
            },
          }));
          setMax(prevMax => (newData.y > prevMax.moisture ? { ...prevMax, moisture: newData.y } : prevMax));
          setMin(prevMin => (newData.y < prevMin.moisture ? { ...prevMin, moisture: newData.y } : prevMin));
          setAvg(prevAvg => ({ ...prevAvg, moisture: (((prevAvg.moisture * length.moisture) + newData.y) / (length.moisture + 1)).toFixed(2) }));
          break;
        case 'humidity':
          setChartData((prevState) => ({
            ...prevState,
            humidity: {
              ...prevState.humidity,
              labels: [...prevState.humidity.labels, newData.x],
              datasets: [
                {
                  data: [...prevState.humidity.datasets[0].data, newData.y],
                  borderColor: '#C8DCC6',
                  backgroundColor: '#58c750',                },
              ],
            },
          }));
          setMax(prevMax => (newData.y > prevMax.humidity ? { ...prevMax, humidity: newData.y } : prevMax));
          setMin(prevMin => (newData.y < prevMin.humidity ? { ...prevMin, humidity: newData.y } : prevMin));
          setAvg(prevAvg => ({ ...prevAvg, humidity: (((prevAvg.humidity * length.humidity) + newData.y) / (length.humidity + 1)).toFixed(2) }));
          break;
        case 'gdd':
          setChartData((prevState) => ({
            ...prevState,
            gdd: {
              ...prevState.gdd,
              labels: [...prevState.gdd.labels, newData.x],
              datasets: [
                {
                  data: [...prevState.gdd.datasets[0].data, newData.y],
                  borderColor: '#C8DCC6',
                  backgroundColor: '#58c750',                },
              ],
            },
          }));
          setMax(prevMax => (newData.y > prevMax.gdd ? { ...prevMax, gdd: newData.y } : prevMax));
          setMin(prevMin => (newData.y < prevMin.gdd ? { ...prevMin, gdd: newData.y } : prevMin));
          (avg.gdd) ?
          setAvg(prevAvg => (
            { ...prevAvg, gdd: (((prevAvg.gdd * length.gdd) + newData.y) / (length.gdd + 1)).toFixed(2) }
            )) : 0;
          break;
      }
    }
  }, [lastJsonMessage]);


  return (
    <div className='dashboard padding-wrapper'>
      <h1 className='page-title'>Dashboard</h1>
      <div className='DB'>
        <div className='row'>
          <div className='holder'>
            <div className='stats'>
              <div className='value'>
                <h5>Max value:</h5>
                <h3>{max.light}</h3>
              </div>
              <div className='value'>
                <h5>Min value:</h5>
                <h3>{min.light}</h3>
              </div>
              <div className='value'>
                <h5>Avg value:</h5>
                <h3>{avg.light}</h3>
              </div>
            </div>
            <Line options={light} data={chartData.light} />
          </div>
          <div className='holder'>
            <div className='stats'>
              <div className='value'>
                <h5>Max value:</h5>
                <h3>{max.temperature}</h3>
              </div>
              <div className='value'>
                <h5>Min value:</h5>
                <h3>{min.temperature}</h3>
              </div>
              <div className='value'>
                <h5>Avg value:</h5>
                <h3>{avg.temperature}</h3>
              </div>
            </div>
            <Line options={temperature} data={chartData.temperature} />
          </div>
        </div>
        <div className='row'>
          <div className='holder'>
            <div className='stats'>
              <div className='value'>
                <h5>Max value:</h5>
                <h3>{max.moisture}</h3>
              </div>
              <div className='value'>
                <h5>Min value:</h5>
                <h3>{min.moisture}</h3>
              </div>
              <div className='value'>
                <h5>Avg value:</h5>
                <h3>{avg.moisture}</h3>
              </div>
            </div>
            <Line options={moisture} data={chartData.moisture} />
          </div>
          <div className='holder'>
            <div className='stats'>
              <div className='value'>
                <h5>Max value:</h5>
                <h3>{max.humidity}</h3>
              </div>
              <div className='value'>
                <h5>Min value:</h5>
                <h3>{min.humidity}</h3>
              </div>
              <div className='value'>
                <h5>Avg value:</h5>
                <h3>{avg.humidity}</h3>
              </div>
            </div>
            <Line options={humidity} data={chartData.humidity} />
          </div>
        </div>
        <div className='row'>
          <div className='holder'>
            <div className='stats'>
              <div className='value'>
                <h5>Max value:</h5>
                <h3>{max.gdd}</h3>
              </div>
              <div className='value'>
                <h5>Min value:</h5>
                <h3>{min.gdd}</h3>
              </div>
              <div className='value'>
                <h5>Avg value:</h5>
                <h3>{avg.gdd}</h3>
              </div>
            </div>
            <Line options={gdd} data={chartData.gdd} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
