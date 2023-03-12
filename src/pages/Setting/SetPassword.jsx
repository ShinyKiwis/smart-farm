import React from 'react'
import "./Settings.css"


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


const InputArea = ({type,label,name, placeholder}) =>{
  return (
      <div className='input'>
        <label>{label}:</label>
        <input type={type} name = {name} placeholder  ={placeholder} />
      </div>
  )
}


const SetPassword = () => {
  return (
    <div className='user padding-wrapper'>
      <h1 className="page-title">Password</h1>
      <Avatar />
      <form className='form'>
        <hr></hr>
        <InputArea type="password" label = "Old Password" name = "OldPassword" placeholder="Old Password"/>
        <hr></hr>
        <InputArea type="password" label = "New Password" name = "Newpassword" placeholder="New Password"/>
        <InputArea type="password" label = "Confirm New Password" name = "RePassword" placeholder="Re-enter New Password"/>
        <div className='submit'>
          <button type="submit" name="submit_password" className='save'>Change
          </button>
        </div>
      </form>
    </div>
  )
}

export default SetPassword
