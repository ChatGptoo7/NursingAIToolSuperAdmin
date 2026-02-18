import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/login/Login";
import ClinicianLayout from "../components/CommanLayout/CommonLayout";
import { AdminDashboard } from "../pages/admin-dashboard/AdminDashboard";
import { User } from "../pages/User/User";
import { UserDetails } from "../pages/user-details/UserDetails";
 

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public */}
        <Route path="/" element={<Login />} />

        {/* ADMIN ROUTES */}
        <Route element={ 
          <ClinicianLayout/> }>
          <Route path="/" >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="user" element={<User />} />
            <Route path="user/details/:id" element={<UserDetails />} />
          </Route>
        </Route>
 

      </Routes>
    </BrowserRouter>
  );
}
