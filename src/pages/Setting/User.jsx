import React from 'react'
import "./Settings.css"
import {useRef} from 'react';



const Avatar = () => {
  const inputRef = useRef(null);


  const handleClick = () => {
    // 👇️ open file input box on click of another element
    inputRef.current.click();
  };

  const handleFileChange = event => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }

    console.log('fileObj is', fileObj);

    // 👇️ reset file input
    event.target.value = null;

    // 👇️ is now empty
    console.log(event.target.files);

    // 👇️ can still access file object here
    console.log(fileObj);
    console.log(fileObj.name);
  };
  return (
    <div className='setavatar'>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjYmlp9JDeNMaFZzw9S3G1dVztGqF_2vq9nA&usqp=CAU" />
        <input ref={inputRef} hidden type="file" onChange={handleFileChange}/>
        <button onClick={handleClick}>Choose File</button>
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
        <Avatar />
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
