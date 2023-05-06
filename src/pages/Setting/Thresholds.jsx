import React from 'react'
import "./Settings.css"
import { useState, useEffect } from 'react';
import axios from 'axios';

const Thresholds = () => {
  
  const [TempMin, setTempMin] = useState(0);
  const [TempMax, setTempMax] = useState(0);
  const onTempMinChange = (e) => {
    setTempMin(e.target.value);
  };
  const onTempMaxChange = (e) => {
    setTempMax(e.target.value);
  };

  const [MoisMin, setMoisMin] = useState(0);
  const [MoisMax, setMoisMax] = useState(0);
  const onMoisMinChange = (e) => {
    setMoisMin(e.target.value);
  };
  const onMoisMaxChange = (e) => {
    setMoisMax(e.target.value);
  };

  const [HumidMin, setHumidMin] = useState(0);
  const [HumidMax, setHumidMax] = useState(0);
  const onHumidMinChange = (e) => {
    setHumidMin(e.target.value);
  };
  const onHumidMaxChange = (e) => {
    setHumidMax(e.target.value);
  };

  const [GDDMin, setGDDMin] = useState(0);
  const [GDDMax, setGDDMax] = useState(0);
  const onGDDMinChange = (e) => {
    setGDDMin(e.target.value);
  };
  const onGDDMaxChange = (e) => {
    setGDDMax(e.target.value);
  };

  useEffect(() => {
    const fetchThresholds = async () => {
      try {
        const result = await axios.get("http://localhost:5000/api/adafruit/threshold");
        const data = result.data;
        setTempMin(data[0].min);
        setTempMax(data[0].max);
        setHumidMin(data[1].min);
        setHumidMax(data[1].max);
        setMoisMin(data[2].min);
        setMoisMax(data[2].max);
        setGDDMin(data[3].min);
        setGDDMax(data[3].max);
      } catch (error) {
        console.error(error);
      }
    };

    fetchThresholds();
  }, []);

  const Onsubmitbtn = async (e) => {
    e.preventDefault();
    try {
      const responseTemp = await axios.post(`http://localhost:5000/api/adafruit/Temp/${TempMin}/${TempMax}`);
      console.log(responseTemp);
      const responseMois = await axios.post(`http://localhost:5000/api/adafruit/Mois/${MoisMin}/${MoisMax}`);
      console.log(responseMois);
      const responseHumid = await axios.post(`http://localhost:5000/api/adafruit/Humid/${HumidMin}/${HumidMax}`);
      console.log(responseHumid);
      const responseGDD = await axios.post(`http://localhost:5000/api/adafruit/GDD/${GDDMin}/${GDDMax}`);
      console.log(responseGDD);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='user padding-wrapper'>
      <h1 className="page-title">Thresholds</h1>
      <form className='form'>
        <br></br>

        <div className='row'>
          <div className='threshold'>
              <label>Temperature</label>
              <div>
                <input
                    type='number'
                    placeholder="Min"
                    id="thresholds"
                    onChange={onTempMinChange}
                    value={TempMin}
                />
                <input
                    type='number'
                    placeholder="Max"
                    id="thresholds"
                    onChange={onTempMaxChange}
                    value={TempMax}
                />
              </div>
          </div>
          <div className='threshold'>
              <label>Moisture</label>
              <div>
                <input
                    type='number'
                    placeholder="Min"
                    id="thresholds"
                    onChange={onMoisMinChange}
                    value={MoisMin}
                />
                <input
                    type='number'
                    placeholder="Max"
                    id="thresholds"
                    onChange={onMoisMaxChange}
                    value={MoisMax}
                />
              </div>
          </div>
        </div>
        <div className='row'>
          <div className='threshold'>
              <label>Hudmidity</label>
              <div>
                <input
                    type='number'
                    placeholder="Min"
                    id="thresholds"
                    onChange={onHumidMinChange}
                    value={HumidMin}
                />
                <input
                    type='number'
                    placeholder="Max"
                    id="thresholds"
                    onChange={onHumidMaxChange}
                    value={HumidMax}
                />
              </div>
          </div>
          <div className='threshold'>
              <label>GDD</label>
              <div>
                <input
                    type='number'
                    placeholder="Min"
                    id="thresholds"
                    onChange={onGDDMinChange}
                    value={GDDMin}
                />
                <input
                    type='number'
                    placeholder="Max"
                    id="thresholds"
                    onChange={onGDDMaxChange}
                    value={GDDMax}
                />
              </div>
          </div>
        </div>
      </form>
    </div>
  );
}
export default Thresholds
