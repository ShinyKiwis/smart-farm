import React from 'react'
import "./Settings.css"
import {useState} from 'react';
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
  }

  return (
    <div className='user padding-wrapper'>
      <h1 className="page-title">Thresholds</h1>
      <form className='form'>
        <br></br>

        <div className='input'>
            <label>Temperature:</label>
            <input
                type='number'
                placeholder="Min"
                id="thresholds"
                onChange={onTempMinChange}
            />
            <input
                type='number'
                placeholder="Max"
                id="thresholds"
                onChange={onTempMaxChange}
            />
        </div>
        <hr></hr>
        <div className='input'>
            <label>Moisture:</label>
            <input
                type='number'
                placeholder="Min"
                id="thresholds"
                onChange={onMoisMinChange}
            />
            <input
                type='number'
                placeholder="Max"
                id="thresholds"
                onChange={onMoisMaxChange}
            />
        </div>
        <hr></hr>
        <div className='input'>
            <label>Hudmidity:</label>
            <input
                type='number'
                placeholder="Min"
                id="thresholds"
                onChange={onHumidMinChange}
            />
            <input
                type='number'
                placeholder="Max"
                id="thresholds"
                onChange={onHumidMaxChange}
            />
        </div>
        <hr></hr>
        <div className='input'>
            <label>GDD:</label>
            <input
                type='number'
                placeholder="Min"
                id="thresholds"
                onChange={onGDDMinChange}
            />
            <input
                type='number'
                placeholder="Max"
                id="thresholds"
                onChange={onGDDMaxChange}
            />
        </div>
        <hr></hr>

        <div className='submit'>
          <button onClick={Onsubmitbtn} name="submit" className='save'>Save</button>
        </div>
      </form>
    </div>
  )
}

export default Thresholds;
