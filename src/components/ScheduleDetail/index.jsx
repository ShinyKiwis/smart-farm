/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import TimePicker from 'react-time-picker';

import './styles.css';

const DAYS = ["Mon", "Tue", "Wed", "Thurs", "Fri", "Sat", "Sun"]

const ScheduleDetail = ({ schedule, onSave }) => {
  const [timeFrom, setTimeFrom] = useState(schedule.time.split(' - ')[0]);
  const [timeTo, setTimeTo] = useState(schedule.time.split(' - ')[1]);

  const [days, setDays] = useState(schedule.days || [])

    const handleChooseDay =(day) => {
        let tempDays = [...days]
        console.log("before, ",tempDays)
        const index = tempDays.findIndex(item => item === day)
        if(index !== -1){
            tempDays = tempDays.filter((item, i) => i !== index)
        }
        else tempDays = [...tempDays, day]
        setDays(tempDays)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSave()
    }

  return (
    <div className="schedule-detail">
      <div className="schedule-detail__time-picker">
        <TimePicker
          format="hh:mm"
          clearIcon={true}
          disableClock
          onChange={setTimeFrom}
          value={timeFrom}
        />
        <h1>TO</h1>
        <TimePicker
          format="hh:mm"
          clearIcon={true}
          disableClock
          onChange={setTimeTo}
          value={timeTo}
        />
      </div>
      <div className='schedule-detail__days-picker'>
        {DAYS.map(day => (
            <p key={day} onClick={() => handleChooseDay(day)} className={days.filter(item => item === day).length > 0 ? "active" : ""} >
                {day}
             </p>      
        ))}
      </div>

      <form onSubmit={handleSubmit} className='schedule-detail__field'>
        <input placeholder={schedule.description}/>
        <button type='submit'>SAVE</button>
      </form>
    </div>
  );
};

export default ScheduleDetail;
