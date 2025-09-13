import React, { useState } from 'react';
import './Header.css';

const Header = ({ darkMode, title = "Mượn Trả Thiết Bị", showSearch = true }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('Search for:', searchValue);
    // Xử lý logic tìm kiếm ở đây
  };

  return (
    <header className={`header ${darkMode ? 'dark' : ''}`}>
      <div className="header-content">
        {/* Left Side */}
        <div className="header-left">
          <div>
            <h1 className="header-title">{title}</h1>
            <div className="breadcrumb">Trang chủ / Quản lý thiết bị</div>
          </div>
        </div>

        {/* Right Side */}
        <div className="header-right">
          {/* Search */}
          {showSearch && (
            <form onSubmit={handleSearchSubmit} className="search-container">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Tìm kiếm phòng, thiết bị..."
                className="search-input"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </form>
          )}

          {/* Actions */}
          <div className="header-actions">
            {/* Notifications */}
            <button className="notification-btn" title="Thông báo">
              🔔
              <span className="notification-badge"></span>
            </button>

            {/* User Info */}
            <div className="user-info" title="Thông tin tài khoản">
              <div className="user-avatar">A</div>
              <div className="user-details">
                <h4>Admin</h4>
                <p>Quản trị viên</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;