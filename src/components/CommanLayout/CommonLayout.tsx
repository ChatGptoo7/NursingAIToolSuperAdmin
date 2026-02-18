import { useState } from "react";
import { Outlet } from "react-router-dom";
import "./CommonLayout.css";
import CommonSidebar from "./CommonSidebar";
import CommonHeader from "./CommonHeader";
import CommonFotter from "./CommonFooter";

export default function ClinicianLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={`main_wrapper ${sidebarOpen ? "sidebar-open" : ""}`}>
      
      <CommonSidebar sidebarOpen={sidebarOpen} />

      <div className="main_layout">
        <CommonHeader
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />

        <main className="main_content">
          <Outlet />
        </main>
      </div>

      {/* Backdrop (mobile only) */}
      {sidebarOpen && (
        <div
          className="sidebar_backdrop"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <CommonFotter/>
    </div>
  );
}
