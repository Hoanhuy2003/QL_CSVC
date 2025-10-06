import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar,
  Edit,
  Briefcase
} from 'lucide-react';
import '../staffLayout/styles/hoso.css';

const HoSo = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "Trần Thị B",
    email: "nguyenvana@university.edu.vn",
    phone: "0123456789",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        {/* Header Section */}
        <div className="dashboard-header">
          <h1 className="page-title">Hồ sơ cá nhân</h1>
          <button 
            className="edit-btn" 
            onClick={() => setIsEditing(!isEditing)}
          >
            <Edit size={18} />
            {isEditing ? "Lưu" : "Chỉnh sửa"}
          </button>
        </div>

        <div className="dashboard-content">
          {/* Left Panel - Personal Information */}
          <div className="left-panel">
            <div className="info-card">
              <div className="card-header">
                <User size={20} />
                <h2>Thông tin cá bản</h2>
              </div>
              <div className="card-subtitle">
                Thông tin tài khoản và liên hệ cá nhân
              </div>

              <div className="form-section">
                <div className="form-row">
                  <div className="form-group">
                    <label>Tên tài khoản</label>
                    <input 
                      type="text" 
                      value="nhanvien" 
                      readOnly 
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>Vai trò</label>
                    <div className="role-badge">
                      <span>Nhân viên</span>
                    </div>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Mã nhân viên</label>
                    <input 
                      type="text" 
                      value="GV001" 
                      readOnly 
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>Trạng thái</label>
                    <div className="status-badge active">
                      Đang hoạt động
                    </div>
                  </div>
                </div>

                <div className="form-group full-width">
                  <label>Họ và tên *</label>
                  <input 
                    type="text" 
                    name="fullName"
                    value={formData.fullName} 
                    readOnly={!isEditing}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Email *</label>
                    <div className="input-with-icon">
                      <Mail size={18} />
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email} 
                        readOnly={!isEditing}
                        onChange={handleChange}
                        className="form-input"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Số điện thoại</label>
                    <div className="input-with-icon">
                      <Phone size={18} />
                      <input 
                        type="tel" 
                        name="phone"
                        value={formData.phone} 
                        readOnly={!isEditing}
                        onChange={handleChange}
                        className="form-input"
                      />
                    </div>
                  </div>
                </div>

                {/* Thêm 2 ô mật khẩu chỉ khi isEditing = true */}
                {isEditing && (
                  <>
                    <div className="form-group full-width">
                      <label>Mật khẩu</label>
                      <input 
                        type="password" 
                        name="password"
                        value={formData.password} 
                        onChange={handleChange}
                        className="form-input"
                      />
                    </div>
                    <div className="form-group full-width">
                      <label>Xác minh mật khẩu</label>
                      <input 
                        type="password" 
                        name="confirmPassword"
                        value={formData.confirmPassword} 
                        onChange={handleChange}
                        className="form-input"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Right Panel giữ nguyên */}
          <div className="right-panel">
            <div className="info-card">
              <div className="card-header">
                <Briefcase size={20} />
                <h2>Thông tin công việc</h2>
              </div>

              <div className="work-info-grid">
                <div className="work-item">
                  <div className="work-label">Phòng ban</div>
                  <div className="work-value">Phòng Quản lý Cơ sở vật chất</div>
                </div>
                <div className="work-item">
                  <div className="work-label">Chức vụ</div>
                  <div className="work-value">Nhân viên quản lý thiết bị</div>
                </div>
                <div className="work-item">
                  <div className="work-label">Cấp bậc</div>
                  <div className="work-value">Trung cấp</div>
                </div>
                <div className="work-item">
                  <div className="work-label">Kinh nghiệm</div>
                  <div className="work-value">5 năm</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HoSo;
