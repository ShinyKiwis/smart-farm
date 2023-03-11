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
  AiOutlineLogout,
  AiOutlineUser,
} from "react-icons/ai"
import {
  MdOutlineWaterDrop,
} from "react-icons/md"
import {
  RiLockPasswordLine,
} from "react-icons/ri"



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
const SubSideBarItem = ({ Item, page,onHover, href, SubItem1, Subpage1, Subhref1, SubItem2, Subpage2, Subhref2 }) => {
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
            <SideBarItem Item={BiHomeAlt2} page="Dashboard" href="/" />
            <div onMouseOver={() => setOnHover(true)} onMouseOut={() => setOnHover(false)}>
            <SubSideBarItem Item={BiCategory} page="Devices" href="/devices" onHover={onHover} 
                            SubItem1={BiBulb} Subpage1="Light" Subhref1="/devices/lights"
                            SubItem2={MdOutlineWaterDrop} Subpage2="Water Pump" Subhref2="/devices/water-pumps"
                            />
            </div>
            <SideBarItem Item={BiHistory} page="History Logs" href="/log" />
            <div onMouseOver={() => setOnHover2(true)} onMouseOut={() => setOnHover2(false)}>
            <SubSideBarItem Item={AiOutlineSetting} page="Setting" href="/user" onHover={onHover2} 
                            SubItem1={AiOutlineUser} Subpage1="Personal Infomation" Subhref1="/user"
                            SubItem2={RiLockPasswordLine} Subpage2="Password" Subhref2="/password"
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
