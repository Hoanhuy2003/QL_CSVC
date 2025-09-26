import React from 'react';
import './UserProfile.css';

const UserProfile = () => {
  return (
    <div className="user-profile">
      <h2>Hồ sơ cá nhân</h2>
      <div className="profile-content">
        <div className="profile-left">
          <div className="profile-info">
            <label>Thông tin cơ bản</label>
            <p>Thông tin tài khoản và liên hệ cá nhân</p>
            <div className="info-item">
              <span>Tên tài khoản</span>
              <input type="text" defaultValue="sinhvien" readOnly />
            </div>
            <div className="info-item">
              <span>Mã sinh viên</span>
              <input type="text" defaultValue="SV001" readOnly />
            </div>
            <div className="info-item">
              <span>Họ và tên *</span>
              <input type="text" defaultValue="Nguyễn Văn A" />
            </div>
            <div className="info-item">
              <span>Email *</span>
              <input type="email" defaultValue="nguyenvana@student.university.edu.vn" />
            </div>
            <div className="info-item">
              <span>Số điện thoại</span>
              <input type="tel" defaultValue="0123456789" />
            </div>
            <div className="info-item">
              <span>Trạng thái</span>
              <input type="text" defaultValue="Đang hoạt động" readOnly />
            </div>
          </div>
        </div>
        <div className="profile-right">
          <div className="profile-stats">
            <h3>Thông tin học tập</h3>
            <div className="stat-item">
              <span>Khoa</span>
              <span>Công nghệ Thông tin</span>
            </div>
            <div className="stat-item">
              <span>Ngành</span>
              <span>Kỹ thuật Phần mềm</span>
            </div>
            <div className="stat-item">
              <span>Khoa học</span>
              <span>2024-2028</span>
            </div>
            <div className="stat-item">
              <span>Lớp học</span>
              <span>SE2024A</span>
            </div>
            <div className="stat-item">
              <span>Tín chỉ tích lũy</span>
              <span>18</span>
            </div>
            <div className="stat-item">
              <span>Điểm TB</span>
              <span>8.2</span>
            </div>
          </div>
          <div className="profile-account">
            <h3>Thông tin tài khoản</h3>
            <div className="stat-item">
              <span>Ngày tham gia</span>
              <span>2024-01-15</span>
            </div>
            <div className="stat-item">
              <span>Lần đăng nhập cuối</span>
              <span>Hôm nay, 14:30</span>
            </div>
            <div className="stat-item">
              <span>Quyền truy cập</span>
              <span>Xem lịch & Mượn TB</span>
            </div>
          </div>
        </div>
      </div>
      <button className="save-btn">Cập nhật</button>
    </div>
  );
};

export default UserProfile;