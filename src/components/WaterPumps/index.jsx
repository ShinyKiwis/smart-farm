import React, { useState } from 'react';
import SwitchControl from '../SwitchControl';
import './styles.css';

const WaterPumpItem = ({ onSwitch, waterPump }) => (
  <div className="water-pumps__item">
    <p>{waterPump.name}</p>
    <SwitchControl active={waterPump.active} onSwitch={onSwitch} />
  </div>
);

const WaterPumps = () => {
  const [waterPumps, setWaterPumps] = useState([
    {
      id: 1,
      name: 'Water Pump 1',
      active: false,
    },
    {
      id: 2,
      name: 'Water Pump 2',
      active: true,
    },
    {
      id: 3,
      name: 'Water Pump 3',
      active: false,
    },
    {
      id: 4,
      name: 'Water Pump 4',
      active: true,
    },
  ]);

  const handleToggleSwitch = (id) => {
    const tempPumps = [...waterPumps].map((waterPump) => {
      if (waterPump.id === id)
        return { ...waterPump, active: !waterPump.active };
      return waterPump;
    });
    setWaterPumps(tempPumps);
  };

  return (
    <div className="water-pumps">
      {waterPumps.map((waterPump) => (
        <WaterPumpItem
          onSwitch={() => handleToggleSwitch(waterPump.id)}
          key={waterPump.id}
          waterPump={waterPump}
        />
      ))}
    </div>
  );
};

export default WaterPumps;
