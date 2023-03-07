import "./SideBar.css";
import {
  MdOutlineDashboard,
} from "react-icons/md";
import {
    FaUserAlt,
} from "react-icons/fa"
import {
  AiOutlineControl
} from "react-icons/ai"
import { useState } from "react";
import {Link} from "react-router-dom"
import { MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem } from 'mdb-react-ui-kit';

const SideBarItem = ({ Item, page, onHover, href }) => {
  return (
    <Link className="sidebar_link" to={href} >
      <div className="sidebar_item">
        {<Item className="sidebar_img" />}
        <h3 style={onHover ? { display: "block" } : { display: "none" }}>
          {page}
        </h3>
      </div>
    </Link>
  );
};

const Logo = () => {
  return (
    <div className="logo">
      <img src="/images/logo.png" />
    </div>
  );
};


const SideBar = () => {
  const [onHover, setOnHover] = useState(false);
  return (
    <div
      className="sidebar"
      onMouseOver={() => setOnHover(true)}
      onMouseOut={() => setOnHover(false)}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <Logo />
      </div>
      
      <MDBDropdown className="dropdown">
        <MDBDropdownToggle className="dropdown-btn"><FaUserAlt/></MDBDropdownToggle>
        <MDBDropdownMenu className="dropdown-menu">
            <MDBDropdownItem className="dropdown-item" link href="/user">User</MDBDropdownItem>
            <MDBDropdownItem className="dropdown-item" link href="/employee">Employee List</MDBDropdownItem>
            <MDBDropdownItem className="dropdown-item" link>Log out</MDBDropdownItem>
        </MDBDropdownMenu>
        <div style={onHover ? { display: "block" } : { display: "none" }}>
          <h4>Meo Di Here</h4>
          <h5>Administrator</h5>
        </div>
      </MDBDropdown>
      
      <SideBarItem Item={MdOutlineDashboard} page="DASHBOARD" onHover={onHover} href="/" />
      <SideBarItem Item={AiOutlineControl} page="DEVICE" onHover={onHover} href="/devices" />
      
    </div>
  );
};

export default SideBar;
