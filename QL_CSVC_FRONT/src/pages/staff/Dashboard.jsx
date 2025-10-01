import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  AlertTriangle,
  CheckCircle,
  Wrench,
  TrendingUp,
  Clock,
  Calendar,
  FileText,
  Settings
} from 'lucide-react';
import './../../components/staff/styles/dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleQuickAction = (route) => {
    navigate(route);
  };

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        {/* Dashboard Header */}
        <div className="dashboard-header">
          <div>
            <h1 className="page-title">Dashboard</h1>
            <p className="page-subtitle">Chào mừng nhanvien - Nhân viên | Hệ thống quản lý cơ sở vật chất</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card pending">
            <div className="stat-icon">
              <AlertTriangle size={24} />
            </div>
            <div className="stat-content">
              <div className="stat-number">8</div>
              <div className="stat-label">Phiếu chờ duyệt</div>
              <div className="stat-sublabel">Cần xử lý</div>
            </div>
          </div>

          <div className="stat-card approved">
            <div className="stat-icon">
              <CheckCircle size={24} />
            </div>
            <div className="stat-content">
              <div className="stat-number">15</div>
              <div className="stat-label">Đã duyệt</div>
              <div className="stat-sublabel">Phiếu mượn đã duyệt</div>
            </div>
          </div>

          <div className="stat-card maintenance">
            <div className="stat-icon">
              <Wrench size={24} />
            </div>
            <div className="stat-content">
              <div className="stat-number">12</div>
              <div className="stat-label">Bảo trì</div>
              <div className="stat-sublabel">9 đã hoàn thành</div>
            </div>
          </div>

          <div className="stat-card efficiency">
            <div className="stat-icon">
              <TrendingUp size={24} />
            </div>
            <div className="stat-content">
              <div className="stat-number">95%</div>
              <div className="stat-label">Hiệu suất</div>
              <div className="stat-sublabel">Xử lý đúng hạn</div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="dashboard-content">
          {/* Recent Activities */}
          <div className="activity-section">
            <div className="section-header">
              <h2>Hoạt động gần đây</h2>
              <p>Các thay đổi và cập nhật mới nhất</p>
            </div>

            <div className="activity-list">
              <div className="activity-item completed">
                <div className="activity-icon">
                  <CheckCircle size={20} />
                </div>
                <div className="activity-content">
                  <div className="activity-title">
                    Phiếu mượn PM005 từ sinh viên Nguyễn Văn D đã được duyệt
                  </div>
                  <div className="activity-time">30 phút trước</div>
                </div>
              </div>

              <div className="activity-item completed">
                <div className="activity-icon">
                  <CheckCircle size={20} />
                </div>
                <div className="activity-content">
                  <div className="activity-title">
                    Báo trì thiết bị TB003 - Micro không dây đã hoàn thành
                  </div>
                  <div className="activity-time">2 giờ trước</div>
                </div>
              </div>

              <div className="activity-item warning">
                <div className="activity-icon">
                  <AlertTriangle size={20} />
                </div>
                <div className="activity-content">
                  <div className="activity-title">
                    Phiếu mượn PM006 từ lớp LTC007 cần được duyệt
                  </div>
                  <div className="activity-time">3 giờ trước</div>
                </div>
              </div>

              <div className="activity-item info">
                <div className="activity-icon">
                  <Calendar size={20} />
                </div>
                <div className="activity-content">
                  <div className="activity-title">
                    Lịch học mới được cập nhật
                  </div>
                  <div className="activity-time">4 giờ trước</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="actions-section">
            <div className="section-header">
              <h2>Thao tác nhanh</h2>
              <p>Các tác vụ thường dùng</p>
            </div>

            <div className="quick-actions">
              <div 
                className="action-card"
                onClick={() => handleQuickAction('/approval')}
                style={{ cursor: 'pointer' }}
              >
                <div className="action-icon">
                  <FileText size={24} />
                </div>
                <div className="action-content">
                  <div className="action-title">Duyệt phiếu mượn</div>
                  <div className="action-count">8 phiếu chờ</div>
                </div>
              </div>

              <div 
                className="action-card"
                onClick={() => handleQuickAction('/maintenance')}
                style={{ cursor: 'pointer' }}
              >
                <div className="action-icon">
                  <Settings size={24} />
                </div>
                <div className="action-content">
                  <div className="action-title">Quản lý bảo trì</div>
                  <div className="action-count">Thêm, theo dõi bảo trì</div>
                </div>
              </div>

              {/* Thêm nút Lịch học */}
              <div 
                className="action-card"
                onClick={() => handleQuickAction('/schedule')}
                style={{ cursor: 'pointer' }}
              >
                <div className="action-icon">
                  <Calendar size={24} />
                </div>
                <div className="action-content">
                  <div className="action-title">Lịch học</div>
                  <div className="action-count">Xem lịch học</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;