import { createStore, Provider } from "jotai";
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Lights from './components/Lights';
import MainContent from './components/MainContent/MainContent';
import SideBar from './components/SideBar/SideBar';
import WaterPumps from './components/WaterPumps';
import Dashboard from './pages/Dashboard/Dashboard';
import Device from './pages/Device';
import AllDevices from './pages/Device/AllDevices';
import DeviceDetail from './pages/Device/DeviceDetail';
import HistoryLog from './pages/HistoryLog';
import Login from './pages/Login/Login';
import SetPassword from './pages/Setting/SetPassword';
import Setting from './pages/Setting/Setting';
import User from './pages/Setting/User';


const myStore = createStore()

function App() {
  const [auth, setAuth] = useState(true);
  if(!auth){
    return <Login />
  }
  console.log("the fuck")
  return (
    <Provider store={myStore}>
    <div className="App">
      <BrowserRouter>
        <SideBar />
        <MainContent>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/devices" element={<Device />}>
              <Route index element={<AllDevices />}  />
              <Route path="lights" element={<Lights />} />
              <Route path="water-pumps" element={<WaterPumps />} />
            </Route>
            <Route path="/devices/lights/:id" element={<DeviceDetail />} />
            <Route path="/devices/water-pumps/:id" element={<DeviceDetail />} />
            <Route path="/user" element={<User />} />
            <Route path="/password" element={<SetPassword />} />
            <Route path="/setting" element={<Setting />} />
            <Route path="/log" element={<HistoryLog />} />
            <Route path="/login" element={<Dashboard />} />
          </Routes>
        </MainContent>
      </BrowserRouter>
    </div>
    </Provider>
  )
}

export default App
