import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { 
  LayoutDashboard, 
  FileCheck, 
  Settings, 
  Calendar, 
  User, 
  Package, 
  Bell,
  ChevronDown,
  LogOut 
} from 'lucide-react'
import './../styles/header.css'

const Header = () => {
  const [showUserMenu, setShowUserMenu] = useState(false)

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo và tên hệ thống */}
        <div className="header-left">
          <div className="logo">
            <Package size={24} />
          </div>
          <span className="system-name">Hệ thống quản lý CSVC</span>
        </div>

        {/* Navigation Menu */}
        <nav className="header-nav">
          <NavLink 
            to="/dashboard" 
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </NavLink>
          <NavLink 
            to="/approval" 
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <FileCheck size={18} />
            <span>Duyệt phiếu mượn</span>
          </NavLink>
          <NavLink 
            to="/maintenance" 
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <Settings size={18} />
            <span>Quản lý bảo trì</span>
          </NavLink>
          <NavLink 
            to="/schedule" 
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <Calendar size={18} />
            <span>Lịch học</span>
          </NavLink>
        </nav>

        {/* User Info */}
        <div className="header-right">
          <div className="notification-btn">
            <Bell size={20} />
            <span className="notification-badge">3</span>
          </div>
          
          <div className="user-info" onClick={() => setShowUserMenu(!showUserMenu)}>
            <User size={20} />
            <span className="username">nhanvien</span>
            <div className="user-menu-toggle">
              <ChevronDown size={16} />
            </div>
            
            {showUserMenu && (
              <div className="user-dropdown">
                <div className="dropdown-item">
                  <NavLink 
                    to="/hoso" 
                    className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                    onClick={() => setShowUserMenu(false)}
                  >
                    <User size={16} />
                    <span>Thông tin cá nhân</span>
                  </NavLink>                  
                </div>
                <div className="dropdown-divider"></div>
                <div className="dropdown-item logout">
                  <LogOut size={16} />
                  <span>Đăng xuất</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header