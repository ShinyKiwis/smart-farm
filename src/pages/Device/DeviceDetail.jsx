/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useMemo, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useLocation, useParams } from 'react-router-dom';
import ScheduleDetail from '../../components/ScheduleDetail';
import SwitchControl from '../../components/SwitchControl';
import "./styles.css"
import { useAtom } from 'jotai';
import { lightsAtom, waterPumpsAtom } from '../../store';
import axios from 'axios';

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
  const [lights,setLights] = useAtom(lightsAtom)
  const [waterPumps,setWaterPumps] = useAtom(waterPumpsAtom)
  const [schedule, setSchedule] = useState([])

  const data = useMemo(() => {
    if(location.pathname.includes('lights')){
      return lights.find(item => item.id === parseInt(id))
    }
    return waterPumps.find((item) => item.id === parseInt(id))
  },[lights, waterPumps,id, location])

  console.log({data})

  const [scheduleSelect, setScheduleSelect] = useState(null)

  const handleSaveSchedule = async (value) => {
    try {
      await axios.post(`http://localhost:5000/api/adafruit/schedule/${data.type}/${value.timeStart}/${value.timeEnd}/${value.repeats}`, {
        _id: value.id,
        description: value.description
      })
    } catch (error) {
      console.log({error})
    }
    window.location.reload()
  }

  const handleToggleSwitch = async (id) => {
    try {
      const res = await axios.post(`http://localhost:5000/api/adafruit/feed/${data.id}/${!data.active}`)
      if(data.type === "light"){
        const tempLights = [...lights].map((light) => {
          if (light.id === id) return { ...light, active: !light.active };
          return light;
        });
        console.log({tempLights})
        setLights(tempLights);
      }
      else{
        const tempWaterPumps = [...waterPumps].map((waterpump) => {
          if (waterpump.id === id)
            return { ...waterpump, active: !waterpump.active };
          return waterpump;
        });
        setWaterPumps(tempWaterPumps);
      }
      // setData(prev => ({...prev, active: !data.active}))
    } catch (error) {
      console.log({error})
    }
  };

  useEffect(() => {
    const getSchedule = async (feedKey) => {
      try {
        const res = await axios.get(`http://localhost:5000/api/adafruit/schedule/${feedKey}`)
        if(res && res.data) setSchedule(res.data)
        console.log(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    if(data){
      getSchedule(data.type)
    }
  }, [data])
  return (
    <div className="device-detail padding-wrapper">
      <div className='device-detail__header'>
        <h1 className="page-title">{data?.name}</h1>
        <SwitchControl active={data?.active || false} onSwitch={() => handleToggleSwitch(data.id)}/>
      </div>
      <div className='device-detail__field'>
        <input placeholder={data?.name}/>
        <button>SAVE</button>
      </div>

      <div className='device-detail__schedule'>
        <div className='device-detail__schedule__add' onClick={() => setScheduleSelect({})}>
          <FaPlus/>
        </div>
        {schedule && schedule.length > 0 && schedule.map((item,i) => (
          <div key={i} className='device-detail__schedule__item'>
            <p onClick={() => setScheduleSelect(item)}> {item.timeStart}-{item.timeEnd}</p>
            <SwitchControl active={item.active} />
          </div>
        ))}
      </div>

      {scheduleSelect && <ScheduleDetail onSave={handleSaveSchedule} schedule={scheduleSelect}/>}
    
  </div>);
};

export default DeviceDetail;
