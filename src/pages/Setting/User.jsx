import React, {useState} from 'react'
import "./Settings.css"
import {useRef} from 'react';
import axios from 'axios';



const Avatar = () => {
  const inputRef = useRef(null);


  const handleClick = event => {
    // 👇️ open file input box on click of another element
    inputRef.current.click();
    event.preventDefault();
  };

  const handleFileChange = event => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }

    console.log('fileObj is', fileObj);

    // reset file input
    event.target.value = null;

    // is now empty
    console.log(event.target.files);
    // can still access file object here
    console.log(fileObj);
    console.log(fileObj.name);
    event.preventDefault();
  };
  return (
    <div className='setavatar'>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjYmlp9JDeNMaFZzw9S3G1dVztGqF_2vq9nA&usqp=CAU" />
        <input ref={inputRef} hidden type="file" onChange={handleFileChange}/>
        <button onClick={handleClick}>Choose File</button>
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


const User = () => {
  const [Username, setUsername] = useState('');
  const onUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const [Fullname, setFullname] = useState();
  const onFullnameChange = (e) => {
    setFullname(e.target.value);
  };

  const [Email, setEmail] = useState();
  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const OnSubmitBtn = async(e) => {
    e.preventDefault();
    const storedUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : "";
    try {
      const data = {
        currentUsername: storedUser.username,
        data: {
          username: Username,
          fullname: Fullname,
          email: Email,
        }
      };
      const Ndata = {"username":Username}
      console.log(data);
      window.localStorage.setItem('user', JSON.stringify({Username}))
      console.log("Success update")
      await axios.post("http://localhost:5000/api/user/update/info", data);  
    } catch (error) {
      console.error(error);
      message.error("Failed in updating info");
    }
  }

  return (
    <div className='user padding-wrapper'>
      <h1 className="page-title">Users</h1>
      <form className='form'>
        <Avatar />
        <div className='holder'>
          <InputArea type="text" label = "Username" name = "Username" placeholder="Username" onChange={onUsernameChange}/>
          <InputArea type="text" label = "Fullname" name = "Fullname" placeholder="Push in boots" onChange={onFullnameChange}/>
          <InputArea type="text" label = "Email" name = "Email" placeholder="Email" onChange={onEmailChange}/>
        </div>
        <div className='submit'>
          <button type="submit" name="submit" className='save' onClick={OnSubmitBtn} disabled={!Username && !Fullname && !Email}>Save</button>
        </div>
      </form>
    </div>
  )
}

export default User
