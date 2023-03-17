/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useLocation, useParams } from 'react-router-dom';
import ScheduleDetail from '../../components/ScheduleDetail';
import SwitchControl from '../../components/SwitchControl';
import "./styles.css"

const devices = {
  lights: [
    {
      id: 1,
      name: 'Light 1',
      active: false,
      schedule: [
        {
          time: '09:00 - 12:00',
          description: 'Morning shift',
          days: ["Mon", "Tue", "Wed", "Sun"],
          active: false
        },
        {
          time: '11:00 - 12:00',
          description: 'Morning shift',
          days: ["Mon", "Tue", "Wed", "Sun"],
          active: true
        },
      ],
    },
  ],
  waterPumps: [
    {
      id: 1,
      name: 'Water pump 1',
      active: false,
      schedule: [
        {
          time: '09:00 - 12:00',
          description: 'Morning shift',
          days: ["Mon", "Tue", "Wed", "Sun"],
          active: false
        },
        {
          time: '11:00 - 12:00',
          description: 'Morning shift',
          days: ["Mon", "Tue", "Wed", "Sun"],
          active: true
        },
      ],
    },
  ],
};

const DeviceDetail = () => {
  const location = useLocation();
  const { id } = useParams();
  const [data, setData] = useState();
  const [scheduleSelect, setScheduleSelect] = useState(null)

  useEffect(() => {
    const getData = () => {
      if (location.pathname.includes('lights')) {
        const light = devices.lights.find((item) => item.id === parseInt(id));
        setData(light);
        return;
      }
      const waterPump = devices.waterPumps.find((item) => item.id === parseInt(id));
      setData(waterPump);
    };
    getData()
  }, [id,location]);

  const handleSaveSchedule = () => {
    setScheduleSelect(null)
  }
  
  return (
    <div className="device-detail padding-wrapper">
      <div className='device-detail__header'>
        <h1 className="page-title">{data?.name}</h1>
        <SwitchControl active={data?.active || false} onSwitch={() =>{}}/>
      </div>
      <div className='device-detail__field'>
        <input placeholder={data?.name}/>
        <button>SAVE</button>
      </div>

      <div className='device-detail__schedule'>
        <div className='device-detail__schedule__add'>
          <FaPlus/>
        </div>
        {data && data.schedule.map((item,i) => (
          <div key={i} className='device-detail__schedule__item'>
            <p onClick={() => setScheduleSelect(item)}> {item.time}</p>
            <SwitchControl active={item.active} />
          </div>
        ))}
      </div>

      {scheduleSelect && <ScheduleDetail onSave={handleSaveSchedule} schedule={scheduleSelect}/>}
    
  </div>);
};

export default DeviceDetail;
