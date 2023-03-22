  import React from 'react'
  import './Sidebar.css'
  import {Link, useLocation} from "react-router-dom"
  import { useState } from "react";

  import {
    AiOutlineLogout,
    AiFillSetting,
  } from "react-icons/ai"
  import {
    MdDashboard,
    MdIntegrationInstructions,
    MdLightbulb,
    MdWaterDrop
  } from "react-icons/md"
  import {
    FaHistory,
    FaUser,
    FaLock
  } from "react-icons/fa"



  const Logo = () => {
    return (
      <div className="logo">
        <img src="https://upload.wikimedia.org/wikipedia/commons/d/de/HCMUT_official_logo.png" />
        <h4><b>SMART FARM</b></h4>
      </div>
    );
  };

  const Avatar = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    return (
      <div className='avatar'>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjYmlp9JDeNMaFZzw9S3G1dVztGqF_2vq9nA&usqp=CAU" />
        <div className='avatar_info'>
          <h4><b>{storedUser.username}</b></h4>
          <h5>Administrator</h5>
        </div>
      </div>
    )
  }

  const SideBarItem = ({ Item, page, href }) => {
    const location = useLocation();

    // Check if the current path matches the `href` prop
    const isActive = location.pathname === href;

    return (
      <>
        <Link className="sidebar_link" to={href}>
          <div className={isActive ? "sidebar_item active" : "sidebar_item"}>
            {<Item className="sidebar_img" size={".8em"} />}
            <h3 className={isActive ? "active" : ""}>
              {page}
            </h3>
          </div>
        </Link>
      </>
    );
  };
  const SubSideBarItem = ({ Item, page,onHover, href, SubItem1, Subpage1, Subhref1, SubItem2, Subpage2, Subhref2 }) => {
    const location = useLocation();

    // Check if the current path matches the `href` prop
    const isActive = location.pathname === href;
    return (
      <>
        <Link className="sub_sidebar_link" to={href} >
          <div className={isActive ? "sub_sidebar_item active" : "sub_sidebar_item"}>
            {<Item className="sidebar_img" />}
            <h3>
              {page}
            </h3>
          </div>
        </Link>
        <div className='devices_popout' /*style={onHover ? { display: "block" } : { display: "none" }}*/>
          <SideBarItem Item={SubItem1} page={Subpage1} href={Subhref1} />
          <SideBarItem Item={SubItem2} page={Subpage2} href={Subhref2} />
        </div>
      </>
    );
  };

  const Logout = () => {
    return (
      <div className='logout'>
        <SideBarItem Item={AiOutlineLogout} page="Logout" href="/" />
      </div>
    )
  }


  const Sidebar = () => {
    const [onHover, setOnHover] = useState(false);
    const [onHover2, setOnHover2] = useState(false);
    return (
      <div>
        <div className='bground'>
          <div className='sidebar'>
            <Logo/>
            <Avatar/>
            <div className='sidebar_container'>
              <SideBarItem Item={MdDashboard} page="Dashboard" href="/" id="dashboard" />
              <div onMouseOver={() => setOnHover(true)} onMouseOut={() => setOnHover(false)}>
              <SubSideBarItem Item={MdIntegrationInstructions} page="Devices" href="/devices" onHover={onHover} id="device"
                              SubItem1={MdLightbulb} Subpage1="Light" Subhref1="/devices/lights"
                              SubItem2={MdWaterDrop} Subpage2="Water Pump" Subhref2="/devices/water-pumps"
                              />
              </div>
              <SideBarItem Item={FaHistory} page="History Logs" href="/log" id="log"/>
              <div onMouseOver={() => setOnHover2(true)} onMouseOut={() => setOnHover2(false)}>
              <SubSideBarItem Item={AiFillSetting} page="Setting" href="/setting" onHover={onHover2} id="setting"
                              SubItem1={FaUser} Subpage1="Personal Infomation" Subhref1="/user"
                              SubItem2={FaLock} Subpage2="Password" Subhref2="/password"
                              />
              </div>
            </div>
            <Logout/>
          </div>
        </div>
      </div>
    )
  }

  export default Sidebar
