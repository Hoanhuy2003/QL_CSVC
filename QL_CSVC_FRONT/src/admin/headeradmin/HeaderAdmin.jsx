import React from 'react';
import { Link } from 'react-router-dom'; // thêm vào
import './HeaderAdmin.css';

const HeaderAdmin = ({ 
  darkMode = false, 
  activeTab = 'dashboard',
  pageTitle = 'Dashboard',
  pageSubtitle = 'Tổng quan hệ thống quản lý cơ sở vật chất - Trường Đại học Giao thông Vận tải',
  userName = 'admin',
  onTabChange = () => {},
  onLogout = () => {}
}) => {
  
  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: '🏠',
      path: '/admin/dashboard'
    },
    {
      id: 'users',
      label: 'Quản lý tài khoản',
      icon: '👥',
      path: '/admin/users'
    },
    {
      id: 'devices',
      label: 'Quản lý thiết bị',
      icon: '💻',
      path: '/admin/devices'
    },
    {
      id: 'rooms',
      label: 'Quản lý phòng học',
      icon: '🏢',
      path: '/admin/rooms'
    },
    {
      id: 'schedule',
      label: 'Quản lý lịch học',
      icon: '📅',
      path: '/admin/schedule'
    },
    {
      id: 'reports',
      label: 'Báo cáo',
      icon: '📊',
      path: '/admin/reports'
    }
  ];

  const handleLogoutClick = () => {
    if (window.confirm('Bạn có chắc chắn muốn đăng xuất?')) {
      onLogout();
    }
  };

  return (
    <header className={`header-admin ${darkMode ? 'dark' : ''}`}>
      {/* Navigation Section */}
      <div className={`admin-navigation ${darkMode ? 'dark' : ''}`}>
        <div className="nav-container">
          {/* Logo */}
          <Link to="/admin/dashboard" className={`admin-logo ${darkMode ? 'dark' : ''}`}>
            <div className="logo-icon">UTC</div>
            <span className="logo-text">Hệ thống quản lý CSVC </span>
          </Link>

          {/* Navigation Menu */}
          <nav className="nav-menu">
            {navigationItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => onTabChange(item.id)}
              >
                <span className="nav-icon">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* User Section */}
          <div className="user-section">
            <span className="user-greeting">
              Chào
              <span className="user-name">{userName}</span>
            </span>
            <a
              href="#"
              className="logout-btn"
              onClick={(e) => {
                e.preventDefault();
                handleLogoutClick();
              }}
            >
              <span className="nav-icon">🚪</span>
              <span>Đăng xuất</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderAdmin;
