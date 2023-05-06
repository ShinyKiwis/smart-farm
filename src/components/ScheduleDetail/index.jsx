/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import TimePicker from 'react-time-picker';

import './styles.css';

const DAYSVALUE = ['2', '3', '4', '5', '6', '7', '8'];

const DAYS = ['Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];

const ScheduleDetail = ({ schedule, onSave }) => {
  const [timeStart, setTimeStart] = useState(schedule.timeStart ? schedule.timeStart.slice(0, 5) : "00:00");
  const [timeEnd, setTimeEnd] = useState(schedule.timeEnd ? schedule.timeEnd.slice(0, 5) : "00:00");

  const [days, setDays] = useState(schedule?.repeats || []);
  const handleChooseDay = (day) => {
    let tempDays = [...days];
    console.log('before, ', tempDays);
    const index = tempDays.findIndex((item) => item === day);
    if (index !== -1) {
      tempDays = tempDays.filter((item, i) => i !== index);
    } else tempDays = [...tempDays, day];
    setDays(tempDays);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({timeStart, timeEnd, repeats:days, id: schedule._id});
  };

  return (
    <div className="schedule-detail">
      <div className="schedule-detail__time-picker">
        <TimePicker
          format="HH:mm"
          clearIcon={true}
          disableClock
          onChange={setTimeStart}
          value={timeStart}
        />
        <h1>TO</h1>
        <TimePicker
          format="HH:mm"
          clearIcon={true}
          disableClock
          onChange={setTimeEnd}
          value={timeEnd}
        />
      </div>
      <div className="schedule-detail__days-picker">
        {DAYS.map((day, i) => (
          <p
            key={day}
            onClick={() => handleChooseDay(DAYSVALUE[i])}
            className={days.includes(DAYSVALUE[i]) ? 'active' : ''}
          >
            {day}
          </p>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="schedule-detail__field">
        <input placeholder={schedule.description} />
        <button type="submit">SAVE</button>
      </form>
    </div>
  );
};

export default ScheduleDetail;
