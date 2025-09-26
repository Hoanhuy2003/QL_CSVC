import React from 'react';
import './UserDashboard.css';

const UserDashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <p>Sinh viên | Hệ thống quản lý CSV | Tổng số đánh giá</p>
      </div>
      <div className="dashboard-grid">
        <div className="card">
          <h3>Phê duyệt</h3>
          <p>5</p>
          <p>2 đã duyệt, 2 đang duyệt</p>
        </div>
        <div className="card">
          <h3>Lớp học</h3>
          <p>7</p>
          <p>2 lớp học mới</p>
        </div>
        <div className="card">
          <h3>Môn học</h3>
          <p>6</p>
          <p>6 đã đăng ký học kỳ mới</p>
        </div>
        <div className="card">
          <h3>Sắp tới</h3>
          <p>3</p>
          <p>Lớp học tuần này</p>
        </div>
        <div className="card large-card">
          <h3>Lịch học sắp tới</h3>
          <p>Các lớp học trong tuần này</p>
          <ul>
            <li>Lập trình Java cơ bản <span>Hôm nay</span> <span>13:30 - 16:00 A101</span></li>
            <li>Mạng máy tính <span>Ngày mai</span> <span>07:30 - 10:00 C301</span></li>
            <li>Thuật toán và cấu trúc dữ liệu <span>Thứ 4</span> <span>13:30 - 16:00 B201</span></li>
          </ul>
        </div>
        <div className="card large-card">
          <h3>Thao tác nhanh</h3>
          <p>Các tác vụ thường dùng</p>
          <ul>
            <li>Muon thẻ bi <span>LTC001</span> <span>2 phiếu chưa duyệt</span></li>
            <li>Xem lịch học <span>LTC002</span> <span>2 lớp học mới</span></li>
            <li>HĐ xã hội nhân <span>Cap nhat thong tin</span></li>
          </ul>
        </div>
        <div className="card large-card">
          <h3>Học đi đôi với hành</h3>
          <p>Cập nhật mức độ</p>
          <ul>
            <li>Phieu muon PM007 <span>hoan thanh</span> <span>Mong Minh Tinh da duoc duyét</span></li>
            <li>Lich hoc LTC001 <span>Lien he giao vien day</span> <span>de nang cao duoc dua vao dang duyet</span></li>
            <li>Phieu muon PM008 <span>de tai trao doi</span> <span>2 ngay tuoc</span></li>
          </ul>
        </div>
        <div className="card large-card">
          <h3>Tiến độ học tập</h3>
          <p>Tiến trình học tập hiện tại</p>
          <ul>
            <li>Mon đ3 ngày <span>6/8</span></li>
            <li>Tinh chi ly <span>18/120</span></li>
            <li>Diem trung binh <span>8.2/10</span></li>
          </ul>
        </div>
        <div className="card">
          <h3>Thiết bị đang mượn</h3>
          <p>2</p>
          <p>2 phiếu đang đợi duyệt</p>
        </div>
        <div className="card">
          <h3>Giờ học tuần này</h3>
          <p>18</p>
          <p>Giờ học tuần</p>
        </div>
        <div class="card">
          <h3>Tình trạng học</h3>
          <p>Tốt</p>
          <p>Điểm danh đầy đủ</p>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;