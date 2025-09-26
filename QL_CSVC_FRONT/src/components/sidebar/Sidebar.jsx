import React from "react";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ darkMode, setDarkMode }) => {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("role"); // xoá role
    navigate("/login"); // chuyển về trang login
  };

  const menuItems = [
    { label: "Trang Chủ", icon: "🏠", active: false },
    { label: "Phòng - Thiết Bị", icon: "📱", active: false },
    { label: "Loại Thiết Bị", icon: "📡", active: false },
    { label: "Thiết Bị", icon: "💻", active: false },
    { label: "Lớp Tin Chỉ", icon: "📚", active: false },
    { label: "Thống Kê", icon: "📊", active: true },
    { label: "Quản Trị", icon: "⚙️", active: false },
  ];

  return (
    <div className={`sidebar ${darkMode ? "dark" : ""}`}>
      {/* Logo Section */}
      <div className="logo-section">
        <div className="logo-container">
          <div className="logo-icon">P</div>
          <div className="logo-text">
            <h2>PTITHCM</h2>
            <p>Quản lý Thiết Bị</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="menu-nav">
        {menuItems.map((item, index) => (
          <a
            key={index}
            href="#"
            className={`menu-item ${item.active ? "active" : ""}`}
            onClick={(e) => e.preventDefault()}
          >
            <span className="menu-icon">{item.icon}</span>
            {item.label}
          </a>
        ))}
      </nav>

      {/* Bottom Menu */}
      <div className="bottom-menu">
        <a href="#" className="bottom-menu-item" onClick={(e) => e.preventDefault()}>
          <span className="menu-icon">👤</span>
          Admin
        </a>
        <a href="#" className="bottom-menu-item" onClick={handleLogout}>
          <span className="menu-icon">🚪</span>
          Đăng Xuất
        </a>

        <div className="dark-mode-toggle">
          <span className="dark-mode-label">
            <span className="menu-icon">🌙</span>
            Dark mode
          </span>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`toggle-switch ${darkMode ? "active" : ""}`}
          >
            <span className={`toggle-slider ${darkMode ? "active" : ""}`}></span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
