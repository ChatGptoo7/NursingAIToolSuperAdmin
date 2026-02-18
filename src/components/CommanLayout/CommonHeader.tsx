import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Dropdown, Nav, Tab } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Form from "react-bootstrap/Form";

 

import {
  ArrowDownIcon,
  BellIcon,
  CloseIcon,
  HamburgerIcon,
  SearchIcon,
} from "../../assets/icons/Icons";

import profileAvtar from "../../assets/img/profileAvtar.png";
import "./CommonLayout.css";
import "./header.scss";
import LanguageToggle from "../langaugeToggle/LanguageToggle";
import { useGetuserProfileDetails } from "../../hooks/User/User";
import { getInitials } from "../../comman/Getinitials";
import { useAuth } from "../../auth/AuthProvide";
export interface CommanHeaderProps{
    onToggleSidebar:()=>void
}
export default function CommonHeader({ onToggleSidebar }:CommanHeaderProps) {
  const { t } = useTranslation();
 const {data:userDetails}=useGetuserProfileDetails();
  const { logout } = useAuth();
 const [userData,setUserData]=useState<any>();
  const dropdownRef = useRef(null);
  useEffect(()=>{
    if(userDetails){
      setUserData({
        firstName:userDetails.data?.responseObject?.firstName,
        lastName:userDetails.data?.responseObject?.lastName,
        nameinitial:getInitials(userDetails.data?.responseObject?.firstName,userDetails.data?.responseObject?.lastName),
        profile:userDetails?.data?.responseObject?.profile,
        roleName:userDetails?.data?.responseObject?.roleName
      })
    }
  },[userDetails])
  /* ------------------ STATE ------------------ */
  const [notifications, ] = useState([]);
  const [unreadCount, ] = useState(0);
  const [loading, ] = useState(false);

 

  
 

  /* ------------------ RENDER ------------------ */
  return (
    <header className="app_header">
      {/* LEFT */}
      <div className="header_left">
        <button className="toggle_btn" onClick={onToggleSidebar}>
          <HamburgerIcon />
        </button>

        <div className="header_search">
          <span>
            <SearchIcon />
          </span>
          <Form.Control placeholder={t("header.search")} />
        </div>
      </div>

      {/* RIGHT */}
      <div className="header_right">
        <LanguageToggle />

        {/* 🔔 NOTIFICATION */}
        <Dropdown className="notification_btn" ref={dropdownRef}>
          <Dropdown.Toggle id="notification-dropdown">
            {unreadCount > 0 && (
              <span className="notification_count">{unreadCount}</span>
            )}
            <BellIcon />
          </Dropdown.Toggle>

          <Dropdown.Menu align="end" className="notification_menu">
            <div className="notification_header">
              <h6>Notifications</h6>
              <button>
                <CloseIcon />
              </button>
            </div>

            <Tab.Container defaultActiveKey="all">
              <Nav variant="pills" className="notification_tab">
                <Nav.Item>
                  <Nav.Link eventKey="all">All</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="unread">
                    Unread <span>{unreadCount}</span>
                  </Nav.Link>
                </Nav.Item>
              </Nav>

              <Tab.Content>
                {/* ALL */}
                <Tab.Pane eventKey="all">
                  <ul className="notification_list">
                    {!loading && notifications.length === 0 && (
                      <li className="text-center p-3">
                        No notifications
                      </li>
                    )}

                    
                  </ul>
                </Tab.Pane>

                <Tab.Pane eventKey="unread">
                  <ul className="notification_list">
                   
 
                  </ul>
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </Dropdown.Menu>
        </Dropdown>

        {/* USER PROFILE */}
        <Dropdown align="end" className="user_account">
          <Dropdown.Toggle as="div" className="profile-toggle">
            {/* {
              userData?.profile ? (
                <img src={profileAvtar} alt="profile" />
              ):
              (
                <span className="profilinitials">
                  {userData?.nameinitial || ''}
                </span>
              )
            }

            <div className="profile_info">
              <h3 className="profile_name">
                    {userData?.firstName || '' +" "+userData?.lastName || ''}
              </h3>
              <p className="profile_role">{userData?.roleName || ''}</p>
            </div> */}

            <ArrowDownIcon />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {/* <Dropdown.Item as={NavLink} to="/profile/details">
              Profile
            </Dropdown.Item> */}
            <Dropdown.Divider />
            <Dropdown.Item className="text-danger" onClick={logout}>
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </header>
  );
}
