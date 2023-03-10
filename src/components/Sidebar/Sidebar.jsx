import React from 'react'
import './Sidebar.css'
import {Link} from "react-router-dom"
import { useState } from "react";

import {
  BiCategory,
  BiHomeAlt2,
  BiHistory,
  BiBulb,
} from "react-icons/bi"
import {
  AiOutlineSetting,
  AiOutlineLogout
} from "react-icons/ai"
import {
  MdOutlineWaterDrop,
} from "react-icons/md"


const Logo = () => {
  return (
    <div className="logo">
      <img src="https://upload.wikimedia.org/wikipedia/commons/d/de/HCMUT_official_logo.png" />
      <h4><b>SMART FARM</b></h4>
    </div>
  );
};

const Avatar = () => {
  return (
    <div className='avatar'>
      <img src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745" />
      <div className='avatar_info'>
        <h4><b>Push in boots</b></h4>
        <h5>Administrator</h5>
      </div>
    </div>
  )
}

const SideBarItem = ({ Item, page, href, }) => {
  return (
    <>
      <Link className="sidebar_link" to={href} >
        <div className="sidebar_item">
          {<Item className="sidebar_img" />}
          <h3>
            {page}
          </h3>
        </div>
      </Link>
    </>
  );
};
const SubSideBarItem = ({ Item, page,onHover, href, }) => {
  return (
    <>
      <Link className="sub_sidebar_link" to={href} >
        <div className="sub_sidebar_item">
          {<Item className="sidebar_img" />}
          <h3>
            {page}
          </h3>
        </div>
      </Link>
      <div className='devices_popout' style={onHover ? { display: "block" } : { display: "none" }}>
        <SideBarItem Item={BiBulb} page="Light" href="/devices" />
        <SideBarItem Item={MdOutlineWaterDrop} page="Water Pump" href="/devices" />
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
  return (
    <div>
      <div className='bground'>
        <div className='sidebar'>
          <Logo/>
          <Avatar/>
          <div className='sidebar_container' onMouseOver={() => setOnHover(true)} onMouseOut={() => setOnHover(false)}>
            <SideBarItem Item={BiHomeAlt2} page="Dashboard" href="/" />
            <SubSideBarItem Item={BiCategory} page="Devices" href="/devices" onHover={onHover} />
            <SideBarItem Item={BiHistory} page="History Logs" href="/log" />
            <SideBarItem Item={AiOutlineSetting} page="Setting" href="/user" />
          </div>
          <Logout/>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
