import React from "react";
import { Routes, Route, BrowserRouter, Navigate} from "react-router-dom";
import Home from './pages/Home';
import MyProfile from "./pages/MyProfile";
import CompanyRegister from './pages/CompanyRegister';
import Managers from './pages/Managers';
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import RegisterManager from "./pages/RegisterManager";
import ManagerHome from "./managerPanel/pages/ManagerHome";
import ManagerMyProfile from "./managerPanel/pages/ManagerMyProfile";
import EmployeeRegister from "./managerPanel/pages/EmployeeRegister";
// import EmployeeList from "./managerPanel/pages/EmployeeList";
import AdvanceListManager from "./managerPanel/pages/AdvanceListManager";
import ExpenseList from "./managerPanel/pages/ExpenseList";
import PermissionList from "./managerPanel/pages/PermissionList";
import ManagersEmployeePage from "./managerPanel/pages/ManagersEmployeePage";
import EmployeeHome from "./employeePanel/pages/EmployeeHome";
import EmployeeMyProfile from "./employeePanel/pages/EmployeeMyProfile";
import MyExpense from "./employeePanel/pages/MyExpense";
import MyAdvance from "./employeePanel/pages/MyAdvance";
import MyPermission from "./employeePanel/pages/MyPermission";
import NotFound from "./pages/NotFound";
import Princing from "./pages/Princing";
import RegisterControl from "./pages/RegisterControl";
import PricingControl from "./pages/PricingControl";
import jwt_decode from "jwt-decode";
import { useState, useEffect } from "react";

export default function App() {

  const [userRole, setUserRole] = useState(null);
  const [userStatus, setUserStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Token'ı localStorage'dan çek
    const token = localStorage.getItem("TOKEN");
    
    if (token) {
      // Token varsa, decode edip userRole ve userStatus'ü ayarla
      try {
        const decodedToken = jwt_decode(token);
        setUserRole(decodedToken.role);
        setUserStatus(decodedToken.status);
      } catch (error) {
        console.error("Token decode hatası:", error);
      }
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    // Token işlemleri tamamlanana kadar bekleme ekranı göster
    return <div>Loading...</div>;
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Login />} ></Route>
          <Route path="/login" exact element={<Login />}></Route>
          <Route path="/register" exact element={<Register />}></Route>
          <Route path="/registermanager" exact element={<RegisterManager />}></Route>
          <Route path="/reset-password" exact element={<ForgotPassword />}></Route>
          {/* Admin routes */}
          <Route path="/home" exact element={(userRole === "ADMIN") ? <Home /> : <Login />} ></Route>
          <Route path="/myprofile" exact element={(userRole === "ADMIN") ? <MyProfile /> : <Login />} ></Route>
          <Route path="/companyregister" exact element={(userRole === "ADMIN") ? <CompanyRegister /> : <Login />} ></Route>
          <Route path="/managers" exact element={(userRole === "ADMIN") ? <Managers /> : <Login />} ></Route>
          {/* Manager routes */}
          <Route path="/managerhome" exact element={(userRole === "MANAGER" && userStatus === "ACTIVE") ? <ManagerHome /> : <Login/>} ></Route>
          <Route path="/managermyprofile" exact element={(userRole === "MANAGER" && userStatus === "ACTIVE") ? <ManagerMyProfile /> : <Login/>} ></Route>
          <Route path="/employeeregister" exact element={(userRole === "MANAGER" && userStatus === "ACTIVE") ? <EmployeeRegister /> : <Login/>} ></Route>
          <Route path="/advancelist" exact element={(userRole === "MANAGER" && userStatus === "ACTIVE") ? <AdvanceListManager /> : <Login/>} ></Route>
          <Route path="/expenselist" exact element={(userRole === "MANAGER" && userStatus === "ACTIVE") ? <ExpenseList /> : <Login/>} ></Route>
          <Route path="/permissionlist" exact element={(userRole === "MANAGER" && userStatus === "ACTIVE") ? <PermissionList /> : <Login/>} ></Route>
          <Route path="/managersemployeepage" exact element={(userRole === "MANAGER" && userStatus === "ACTIVE") ? <ManagersEmployeePage /> : <Login/>} ></Route>
          {/* Employee routes */}
          <Route path="/employeehome" exact element={(userRole === "EMPLOYEE") ? <EmployeeHome /> : <Login/>} ></Route>
          <Route path="/employeemyprofile" exact element={(userRole === "EMPLOYEE") ? <EmployeeMyProfile /> : <Login/>} ></Route>
          <Route path="/myexpense" exact element={(userRole === "EMPLOYEE") ? <MyExpense /> : <Login/>} ></Route>
          <Route path="/myadvance" exact element={(userRole === "EMPLOYEE") ? <MyAdvance /> : <Login/>} ></Route>
          <Route path="/mypermission" exact element={(userRole === "EMPLOYEE") ? <MyPermission /> : <Login/>} ></Route>

          <Route path="*" exact element={<NotFound />} ></Route>
          <Route path="/pricing" exact element={<Princing />} ></Route>
          <Route path="/registercontrol" exact element={<RegisterControl />} ></Route>
          <Route path="/pricingcontrol" exact element={<PricingControl />} ></Route>

        </Routes>
      </BrowserRouter>
    </>
  )
}