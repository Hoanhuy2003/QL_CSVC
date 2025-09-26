import React from 'react';
   import { NavLink } from 'react-router-dom';
   import './Header.css';

   const UserHeader = () => {
     const handleLogout = () => {
       // Thêm logic đăng xuất (ví dụ: xóa token, chuyển hướng)
       window.location.href = '/login'; // Chuyển hướng đến trang login sau khi đăng xuất
     };

     return (
       <header className="header">
         <div className="header-left">
           <img src="../../../../public/logo-nike.jpg" alt="ABC Logo" className="logo" />
           <span className="title">Hệ thống quản lý CSVC</span>
         </div>
         <div className="header-center">
            <NavLink to="/dashboard" className={({ isActive }) => isActive ? "nav-btn active" : "nav-btn"}>Dashboard</NavLink>
            <NavLink to="/borrow-request" className={({ isActive }) => isActive ? "nav-btn active" : "nav-btn"}>Mượn thiết bị</NavLink>
            <NavLink to="/schedule" className={({ isActive }) => isActive ? "nav-btn active" : "nav-btn"}>Lịch học</NavLink>
            <NavLink to="/profile" className={({ isActive }) => isActive ? "nav-btn active" : "nav-btn"}>Hồ sơ</NavLink>
         </div>
         <div className="header-right">
           <span className="user-info">Sinh viên</span>
           <button className="logout-btn" onClick={handleLogout}>Đăng xuất</button>
         </div>
       </header>
     );
   };

   export default UserHeader;