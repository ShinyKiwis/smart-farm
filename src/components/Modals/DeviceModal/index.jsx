/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react'
import ModalLayout from '../ModalLayout'
import { GrClose } from 'react-icons/gr';
import "./styles.css"
import { useAtom } from 'jotai';
import { deviceModalAtom } from '../../../store';

const DeviceModal = () => {
  const [name, setName] = useState("")
  const [category, setCategory] = useState("")
  const [deviceModalAtomValue,setDeviceModalAtomValue] = useAtom(deviceModalAtom)
  const handleCloseModal = () => setDeviceModalAtomValue(null)

  const handleSubmit = (e) => {
    e.preventDefaut()
    handleCloseModal()
  }

  useEffect(() => {
    if(deviceModalAtomValue.type === "UPDATE"){
      setName(deviceModalAtomValue.device.name)
    }
  },[deviceModalAtomValue])

  return (
    <ModalLayout>
        <div className='device-modal'>
          <h1>{deviceModalAtomValue.type === "ADD" ? "Add Device" : "Update Device"}</h1>
          <form action="" onSubmit={handleSubmit}>
            <div className='device-modal__form-group'>
              <label htmlFor="device_name">Device Name</label>
              <input value={name} onChange={e => setName(e.target.value)} name="device_name" type="text" />
            </div>
            <div className='device-modal__form-group'>
              <label htmlFor="device_category">Device Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="light"><span>Light</span></option>
                <option value ="water-pump"><span>Water Pump</span></option>
              </select>
            </div>
            <button type="submit">Save</button>
          </form>
          <div className='close-modal-mark' onClick={handleCloseModal}>
            <GrClose/>
          </div>
        </div>
    </ModalLayout>
  )
}

export default DeviceModal