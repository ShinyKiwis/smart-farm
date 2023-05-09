import React, {useState} from 'react'
import "./Settings.css"
import axios from 'axios'


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

const InputArea = ({type,label,name, placeholder, onChange}) =>{
  return (
      <div className='input'>
        <label>{label}:</label>
        <input type={type} name={name} placeholder={placeholder} onChange={onChange} />
      </div>
  )
}


const SetPassword = () => {
  const [Password, setPassword] = useState();
  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const OnSubmitBtn = async(e) => {
    e.preventDefault();
    const storedUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : "";
    try {
      const data = {
        username: storedUser.Username,
        password: Password
      };
      console.log(data);
      console.log("Update password successfully");
      await axios.post("http://localhost:5000/api/user/update/password", data);
    } 
    catch (error) {
      console.log(error);
    }
  }
  return (
    <div className='user padding-wrapper'>
      <h1 className="page-title">Password</h1>
      <Avatar />
      <form className='form'>
        <div className='holder'>
          <InputArea type="password" label = "New Password" name = "Newpassword" placeholder="New Password" onChange={onPasswordChange}/>
          <InputArea type="password" label = "Confirm New Password" name = "RePassword" placeholder="Re-enter New Password"/>
        </div>
        <div className='submit'>
          <button type="submit" name="submit_password" className='save' disabled={!Password} onClick={OnSubmitBtn}>Change
          </button>
        </div>
      </form>
    </div>
  )
}

export default SetPassword
