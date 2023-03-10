import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'
import SideBar from './components/SideBar/SideBar';
import MainContent from './components/MainContent/MainContent';
import Dashboard from './pages/Dashboard';
import Device from './pages/Device';
import User from './pages/User';
import HistoryLog from './pages/HistoryLog';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <SideBar />
        <MainContent>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/devices" element={<Device />} />
            <Route path="/user" element={<User />} />
            <Route path="/log" element={<HistoryLog />} />
          </Routes>
        </MainContent>
      </BrowserRouter>
    </div>
  )
}

export default App
