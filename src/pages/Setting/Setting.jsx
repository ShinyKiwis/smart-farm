import React from 'react'
import "./Settings.css"
import { Link } from 'react-router-dom'

const Avatar = () => {
  return (
    <div className='ava'>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjYmlp9JDeNMaFZzw9S3G1dVztGqF_2vq9nA&usqp=CAU" />
      <div className='avatar_info'>
        <h4><b>Push in boots</b></h4>
        <h5>Administrator</h5>
      </div>
    </div>
  )
}



const Setting = () => {
  return (
    <div className='user padding-wrapper'>
      <h1 className="page-title">Setting</h1>
      <Avatar />
        <div className='setting holder'>
            <Link to="/user">
            <button>Personal Information</button>
            </Link><br/>
            <Link to="/password">
            <button>Password</button>
            </Link><br/>
            <Link to="/thresholds">
            <button>Thresholds</button>
            </Link>
        </div>
    </div>
  )
}

export default Setting
