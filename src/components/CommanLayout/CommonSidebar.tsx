import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
// import "./PhysicianLayout.css";

import './sidebar.scss';
import { AssignPhysicianIcon, CompleteReportIcon, DashboardIcon, DownloadReportIcon, DraftReportIcon, FileDashboardIcon, FileIcon, FileReportIcon, SettingDashboardIcon, SupportIcon, UploadReportIcon, UserDashboardIcon } from "../../assets/icons/Icons";
import { useState } from "react";
import { FileText, Settings, Users } from "lucide-react";
import { useAuth } from "../../auth/AuthProvide";
export interface CommanSidebarProp {
  sidebarOpen: boolean
}
export default function CommonSidebar({ sidebarOpen }: CommanSidebarProp) {
  const { t } = useTranslation();
 
   const { user } = useAuth();        
  const role = user?.userType;  
  return (
    <>
      <div className={`app_sidebar ${sidebarOpen ? "open" : ""}`}>
        {/* Logo */}
        <div className="sidebar_logo" style={{height: '77px'}}>
          {/* <img src={authLogo} alt="logo" /> */}
          <h2>AI Nursing</h2>
        </div>


        <div className="sidebar_menu_grp">
          <div className="sidebar_menu">
            <div className="sidebar_module_tittle">
              <h3>{t('menu.menu')}</h3>
            </div>
            {/* admin menu */}
            {
              
                <div className="sidebar_menu_list">
                  <NavLink to="/dashboard" className="sidebar_menu_item">
                    <DashboardIcon />
                    <span>Dashboard</span>
                  </NavLink>
                   <NavLink to="/user" className="sidebar_menu_item">
                    <UserDashboardIcon />
                    <span>Admin</span>
                  </NavLink>
                   {/* <NavLink to="/admin/setting" className="sidebar_menu_item">
                    <SettingDashboardIcon />
                    <span>System Settings</span>
                  </NavLink>
                   <NavLink to="/admin/logs" className="sidebar_menu_item">
                     <FileDashboardIcon />
                    <span>Audit Logs</span>
                  </NavLink> */}
                </div>
              
            }
            {/* ================= CLINICIAN MENU ================= */}
            {/* {role === "nurse" && (
              <div className="sidebar_menu_list">
                <NavLink to="/user/dashboard" className="sidebar_menu_item">
                  <DashboardIcon />
                  <span>Dashboard</span>
                </NavLink>

                <NavLink to="/user/uploadProcess" className="sidebar_menu_item">
                  <UploadReportIcon />
                  <span>Upload Report</span>
                </NavLink>

                <NavLink to="/user/DraftTestCases" className="sidebar_menu_item">
                  <DraftReportIcon />
                  <span>Draft Report</span>
                </NavLink>
 
                <NavLink to="/user/download" className="sidebar_menu_item">
                  <DownloadReportIcon />
                  <span>Download Reports</span>
                </NavLink>
              </div>
            )} */}

             
          </div>

          {/* SUPPORT (COMMON) */}
          {/* {
            role!='admin'&&
            (

              <div className="sidebar_menu">
            <div className="sidebar_module_tittle">
              <h3>Support</h3>
            </div>
            <div className="sidebar_menu_list">
              <NavLink to="/user/faq" className="sidebar_menu_item">
                <SupportIcon />
                <span>{t("menu.faqs")}</span>
              </NavLink>

              <NavLink to="/user/support" className="sidebar_menu_item">
                <SupportIcon />
                <span>{t("menu.support")}</span>
              </NavLink>
            </div>
          </div>
            )
          } */}
        </div>
      </div>
    </>
  );
}
