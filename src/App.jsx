import { createStore, Provider, useAtom } from "jotai";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Lights from './components/Lights';
import MainContent from './components/MainContent/MainContent';
import WaterPumps from './components/WaterPumps';
import SideBar from './components/SideBar/SideBar';
import Dashboard from './pages/Dashboard/Dashboard';
import Device from './pages/Device';
import AllDevices from './pages/Device/AllDevices';
import DeviceDetail from './pages/Device/DeviceDetail';
import HistoryLog from './pages/HistoryLog';
import Login from './pages/Login/Login';
import SetPassword from './pages/Setting/SetPassword';
import Setting from './pages/Setting/Setting';
import User from './pages/Setting/User';
import {authAtom} from "./store"
import { useEffect } from "react";
import Thresholds from "./pages/Setting/Thresholds";


const myStore = createStore()

function App() {
  const [auth, setAuth] = useAtom(authAtom);

  useEffect(() => {
    const user = window.localStorage.getItem("user")
    if(user) setAuth(JSON.parse(user))
    else setAuth(null)
  },[])

  if(!auth){
    return <Login/>
  }

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
            <Route path="/setting/thresholds" element={<Thresholds/>} />
            
            <Route path="/setting" element={<Setting />} />
            <Route path="/log" element={<HistoryLog />} />
            {/* <Route path="/login" element={<Login />} /> */}
          </Routes>
        </MainContent>
      </BrowserRouter>
    </div>
    </Provider>
  )
}

export default App
