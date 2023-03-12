import React from 'react'
import "./Settings.css"

const Avatar = () => {
  return (
    <div className='setavatar'>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjYmlp9JDeNMaFZzw9S3G1dVztGqF_2vq9nA&usqp=CAU" />
        <label>
          <input
            type="file" 
            name="avatar"
          />
        </label>
    </div>
  )
}

const AvaSetting = () => {
  return (
    <div className='avaSetting'>
      <Avatar />
        <label>
          <button type="submit" name="avatar" className='upload'>Upload
          </button>
          <button type="submit" name="avatar">Cancel
          </button>
        </label>
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


const User = () => {
  return (
    <div className='user padding-wrapper'>
      <h1 className="page-title">Settings</h1>
      <form className='form'>
        <AvaSetting />
        <hr></hr>
        <InputArea type="text" label = "Username" name = "Username" placeholder="Username"/>
        <hr></hr>
        <InputArea type="text" label = "Fullname" name = "Fullname" placeholder="Push in boots"/>
        <hr></hr>
        <InputArea type="text" label = "Role" name = "Role" placeholder="Manager"/>
        <hr></hr>
        <InputArea type="text" label = "Email" name = "Email" placeholder="Email"/>
        <InputArea type="password" label = "Password" name = "Password" placeholder="Password"/>
        <div className='submit'>
          <button type="submit" name="submit" className='save'>Save
          </button>
          <button type="submit" name="cancel">Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default User
