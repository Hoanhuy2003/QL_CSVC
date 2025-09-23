import React from 'react';
import './DashboardAdmin.css';

const DashboardAdmin = () => {
  return (
    <div className="dashboard">

      {/* Main Content */}
      <div className="main-content">
        {/* Dashboard Title */}
        <div className="dashboard-header">
          <h1>Dashboard</h1>
          <p>Tổng quan hệ thống quản lý cơ sở vật chất - Trường Đại học Giao Thông Vận Tải</p>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon user-icon">👥</div>
            <div className="stat-content">
              <div className="stat-label">Tổng người dùng</div>
              <div className="stat-number">248</div>
              <div className="stat-change positive">+12 người dùng mới tháng này</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon device-icon">💬</div>
            <div className="stat-content">
              <div className="stat-label">Tổng thiết bị</div>
              <div className="stat-number">156</div>
              <div className="stat-change">132 đang hoạt động, 8 bảo trì</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon room-icon">🏢</div>
            <div className="stat-content">
              <div className="stat-label">Phòng học</div>
              <div className="stat-number">42</div>
              <div className="stat-change">38 phòng sẵn sàng sử dụng</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon schedule-icon">📅</div>
            <div className="stat-content">
              <div className="stat-label">Lịch học</div>
              <div className="stat-number">128</div>
              <div className="stat-change">24 lịch học sắp tới</div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="content-grid">
          {/* Recent Activities */}
          <div className="section">
            <h2>Hoạt động gần đây</h2>
            <p className="section-subtitle">Các thay đổi và cập nhật mới nhất trong hệ thống</p>
            
            <div className="activity-list">
              <div className="activity-item">
                <div className="activity-icon info">ℹ️</div>
                <div className="activity-content">
                  <div className="activity-title">Thiết bị TB005 - Máy chiếu Sony đã được mua mới</div>
                  <div className="activity-time">2 giờ trước</div>
                </div>
              </div>

              <div className="activity-item">
                <div className="activity-icon warning">⚠️</div>
                <div className="activity-content">
                  <div className="activity-title">Báo trì thiết bị TB003 - Micro không dây hoàn thành</div>
                  <div className="activity-time">4 giờ trước</div>
                </div>
              </div>

              <div className="activity-item">
                <div className="activity-icon calendar">📅</div>
                <div className="activity-content">
                  <div className="activity-title">Lịch học mới cho lớp LTC006 đã được thêm</div>
                  <div className="activity-time">6 giờ trước</div>
                </div>
              </div>

              <div className="activity-item">
                <div className="activity-icon user">👤</div>
                <div className="activity-content">
                  <div className="activity-title">Tài khoản mới cho giảng viên GV006 đã được tạo</div>
                  <div className="activity-time">1 ngày trước</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="section">
            <h2>Thao tác nhanh</h2>
            <p className="section-subtitle">Các tác vụ thường dùng</p>

            <div className="quick-actions">
              <div className="action-item">
                <div className="action-icon user-manage">👤</div>
                <div className="action-content">
                  <div className="action-title">Quản lý người dùng</div>
                  <div className="action-subtitle">Thêm, sửa tài khoản</div>
                </div>
              </div>

              <div className="action-item">
                <div className="action-icon device-manage">💻</div>
                <div className="action-content">
                  <div className="action-title">Quản lý thiết bị</div>
                  <div className="action-subtitle">Mua mới, bảo trì</div>
                </div>
              </div>

              <div className="action-item">
                <div className="action-icon schedule-manage">📋</div>
                <div className="action-content">
                  <div className="action-title">Lên lịch học</div>
                  <div className="action-subtitle">Thêm lịch mới</div>
                </div>
              </div>

              <div className="action-item">
                <div className="action-icon report">📊</div>
                <div className="action-content">
                  <div className="action-title">Xem báo cáo</div>
                  <div className="action-subtitle">Thống kê, phân tích</div>
                </div>
              </div>
            </div>

            {/* System Status */}
            <div className="system-status">
              <h3>Tình trạng hệ thống</h3>
              <p className="status-subtitle">Trạng thái hoạt động hiện tại</p>

              <div className="status-list">
                <div className="status-item">
                  <span className="status-label">Máy chủ</span>
                  <span className="status-indicator good">● Hoạt động tốt</span>
                </div>
                <div className="status-item">
                  <span className="status-label">Cơ sở dữ liệu</span>
                  <span className="status-indicator stable">● Kết nối ổn định</span>
                </div>
                <div className="status-item">
                  <span className="status-label">Sao lưu dữ liệu</span>
                  <span className="status-indicator warning">● Đang thực hiện</span>
                </div>
                <div className="status-item">
                  <span className="status-label">Bảo mật</span>
                  <span className="status-indicator safe">● An toàn</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="bottom-stats">
          <div className="bottom-stat-card">
            <div className="bottom-stat-icon">📈</div>
            <div className="bottom-stat-content">
              <div className="bottom-stat-label">Thiết bị sử dụng</div>
              <div className="bottom-stat-number">84.6%</div>
              <div className="bottom-stat-subtitle">Tỷ lệ thiết bị đang hoạt động</div>
            </div>
          </div>

          <div className="bottom-stat-card">
            <div className="bottom-stat-icon">🏢</div>
            <div className="bottom-stat-content">
              <div className="bottom-stat-label">Phòng khả dụng</div>
              <div className="bottom-stat-number">90.5%</div>
              <div className="bottom-stat-subtitle">Phòng sẵn sàng sử dụng</div>
            </div>
          </div>

          <div className="bottom-stat-card">
            <div className="bottom-stat-icon">⏰</div>
            <div className="bottom-stat-content">
              <div className="bottom-stat-label">Lịch học tuần này</div>
              <div className="bottom-stat-number">24</div>
              <div className="bottom-stat-subtitle">Buổi học được lên lịch</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;