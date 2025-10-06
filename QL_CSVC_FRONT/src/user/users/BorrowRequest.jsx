import React, { useState } from 'react';
import './BorrowRequest.css';

const BorrowRequest = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const equipmentStats = [
    { label: 'Thiết bị chưa dùng', count: 7, status: 'green' },
    { label: 'Phiếu chờ duyệt', count: 1, status: 'orange' },
    { label: 'Đã duyệt', count: 1, status: 'green' },
  ];

  const equipmentList = [
    { id: 'TB001', name: 'Máy chiếu Sony VPL-DX270', type: 'Thiết bị chiếu', available: 5, selected: false },
    { id: 'TB002', name: 'Laptop Dell Inspiron 15', type: 'Máy tính', available: 8, selected: false },
    { id: 'TB003', name: 'Micro không dây Shure', type: 'Thiết bị âm thanh', available: 3, selected: false },
    { id: 'TB004', name: 'Switch Cisco 24 port', type: 'Thiết bị mạng', available: 2, selected: false },
    { id: 'TB005', name: 'Màn hình LED Samsung 55"', type: 'Thiết bị chiếu', available: 4, selected: false },
    { id: 'TB006', name: 'Router Cisco ASR1000', type: 'Thiết bị mạng', available: 1, selected: false },
    { id: 'TB007', name: 'Máy in HP Laserjet Pro', type: 'Thiết bị văn phòng', available: 6, selected: false },
  ];

  const requestList = [
    { id: 'PM001', class: 'Lập trình Java cơ bản', room: 'A101', startTime: '08:00:00 22/9/2024', endTime: '11:00:00 22/9/2024', equipment: 'TB001 x1, TB003 x2', status: 'Chờ duyệt' },
    { id: 'PM007', class: 'Mạng máy tính', room: 'C301', startTime: '13:30:00 20/9/2024', endTime: '16:00:00 20/9/2024', equipment: 'TB004 x1', status: 'Đã duyệt' },
    { id: 'PM008', class: 'Cơ sở dữ liệu', room: 'B205', startTime: '07:30:00 18/9/2024', endTime: '10:00:00 18/9/2024', equipment: 'TB002 x3', status: 'Đã trả' },
  ];

  return (
    <div className="borrow-request">
      <div className="header-section">
        <h2>Phiếu mượn đã tạo</h2>
        <p>Trạng thái các yêu cầu mượn thiết bị</p>
      </div>
      <div className="stats-section">
        {equipmentStats.map((stat, index) => (
          <div key={index} className={`stat-card ${stat.status}`}>
            <h3>{stat.label}</h3>
            <p>{stat.count}</p>
          </div>
        ))}
      </div>
      <div className="equipment-section">
        <h3>Thiết bị chưa dùng</h3>
        <p>Danh sách thiết bị có thể mượn</p>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Tìm theo mã TB, tên thiết bị..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select>
            <option>Tất cả</option>
          </select>
        </div>
        {equipmentList
          .filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.id.includes(searchTerm))
          .map((item) => (
            <div key={item.id} className="equipment-item">
              <span>{item.id}</span>
              <span>{item.name}</span>
              <span>{item.type}</span>
              <span>{item.available} còn</span>
              <button className="select-btn">+ Chọn</button>
            </div>
          ))}
      </div>
      <div className="request-section">
        <h3>Phiếu mượn đã tạo</h3>
        <p>Đang theo dõi yêu cầu mượn thiết bị</p>
        <div className="request-table">
          <div className="request-header">
            <span>Mã phiếu</span>
            <span>Lớp học</span>
            <span>Phòng</span>
            <span>Thời gian mượn</span>
            <span>Hạn trả</span>
            <span>Thiết bị</span>
            <span>Trạng thái</span>
          </div>
          {requestList.map((request) => (
            <div key={request.id} className="request-item">
              <span>{request.id}</span>
              <span>{request.class}</span>
              <span>{request.room}</span>
              <span>{request.startTime}</span>
              <span>{request.endTime}</span>
              <span>{request.equipment}</span>
              <span className={`status ${request.status === 'Chờ duyệt' ? 'pending' : request.status === 'Đã duyệt' ? 'approved' : 'returned'}`}>
                {request.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BorrowRequest;