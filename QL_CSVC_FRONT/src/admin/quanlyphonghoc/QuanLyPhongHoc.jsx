import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2 } from 'lucide-react';
import './QuanLyPhongHoc.css';

const QuanLyPhongHoc = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roomType, setRoomType] = useState('Tất cả');
  const [status, setStatus] = useState('Tất cả');

  const roomData = [
    {
      id: 'A101',
      name: 'Phòng học A101',
      type: 'Phòng học lý thuyết',
      capacity: '50 người',
      equipment: 'Máy chiếu, bảng trắng, hệ thống âm thanh',
      status: 'Hoạt động'
    },
    {
      id: 'B205',
      name: 'Phòng thí nghiệm Hóa học',
      type: 'Phòng thí nghiệm',
      capacity: '30 người',
      equipment: 'Bàn thí nghiệm, tủ hóa chất, hệ thống thông gió',
      status: 'Hoạt động'
    },
    {
      id: 'C301',
      name: 'Phòng máy tính C301',
      type: 'Phòng máy tính',
      capacity: '40 người',
      equipment: '40 máy tính Dell, máy chiếu, điều hòa',
      status: 'Bảo trì'
    },
    {
      id: 'D102',
      name: 'Phòng họp Ban Giám hiệu',
      type: 'Phòng họp',
      capacity: '20 người',
      equipment: 'Bàn họp, màn hình LED, hệ thống hội nghị trực tuyến',
      status: 'Hoạt động'
    },
    {
      id: 'E203',
      name: 'Phòng thực hành Cơ khí',
      type: 'Phòng thực hành',
      capacity: '25 người',
      equipment: 'Máy tiện, máy phay, dụng cụ đo lường',
      status: 'Ngừng sử dụng'
    }
  ];

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Hoạt động':
        return 'status-active';
      case 'Bảo trì':
        return 'status-maintenance';
      case 'Ngừng sử dụng':
        return 'status-inactive';
      default:
        return '';
    }
  };

  const getRoomTypeClass = (type) => {
    switch (type) {
      case 'Phòng học lý thuyết':
        return 'room-type-theory';
      case 'Phòng thí nghiệm':
        return 'room-type-lab';
      case 'Phòng máy tính':
        return 'room-type-computer';
      case 'Phòng họp':
        return 'room-type-meeting';
      case 'Phòng thực hành':
        return 'room-type-practice';
      default:
        return '';
    }
  };

  return (
    <div className="room-management">
      {/* Header */}
      <div className="header">
        <h1 className="page-title">Quản lý phòng học</h1>
        <button className="add-button">
          <Plus size={18} />
          Thêm phòng học
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="stats-grid">
        <div className="stat-card total">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <div className="stat-label">Tổng số phòng</div>
            <div className="stat-number">5</div>
          </div>
        </div>
        
        <div className="stat-card active">
          <div className="stat-icon">✓</div>
          <div className="stat-content">
            <div className="stat-label">Đang hoạt động</div>
            <div className="stat-number">3</div>
          </div>
        </div>
        
        <div className="stat-card maintenance">
          <div className="stat-icon">⚠</div>
          <div className="stat-content">
            <div className="stat-label">Đang bảo trì</div>
            <div className="stat-number">1</div>
          </div>
        </div>
        
        <div className="stat-card inactive">
          <div className="stat-icon">✕</div>
          <div className="stat-content">
            <div className="stat-label">Ngừng sử dụng</div>
            <div className="stat-number">1</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="filters">
        <div className="search-box">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Tìm theo mã phòng, tên phòng, thiết bị..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filter-group">
          <div className="filter-item">
            <label>Loại phòng</label>
            <select value={roomType} onChange={(e) => setRoomType(e.target.value)}>
              <option value="Tất cả">Tất cả</option>
              <option value="Phòng học lý thuyết">Phòng học lý thuyết</option>
              <option value="Phòng thí nghiệm">Phòng thí nghiệm</option>
              <option value="Phòng máy tính">Phòng máy tính</option>
              <option value="Phòng họp">Phòng họp</option>
              <option value="Phòng thực hành">Phòng thực hành</option>
            </select>
          </div>
          
          <div className="filter-item">
            <label>Trạng thái</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Tất cả">Tất cả</option>
              <option value="Hoạt động">Hoạt động</option>
              <option value="Bảo trì">Bảo trì</option>
              <option value="Ngừng sử dụng">Ngừng sử dụng</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="table-container">
        <table className="rooms-table">
          <thead>
            <tr>
              <th>Mã phòng</th>
              <th>Tên phòng</th>
              <th>Loại phòng</th>
              <th>Sức chứa</th>
              <th>Thiết bị có định</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {roomData.map((room) => (
              <tr key={room.id}>
                <td className="room-id">{room.id}</td>
                <td className="room-name">{room.name}</td>
                <td>
                  <span className={`room-type ${getRoomTypeClass(room.type)}`}>
                    {room.type}
                  </span>
                </td>
                <td>{room.capacity}</td>
                <td className="equipment">{room.equipment}</td>
                <td>
                  <span className={`status-badge ${getStatusBadgeClass(room.status)}`}>
                    {room.status}
                  </span>
                </td>
                <td className="actions">
                  <button className="action-btn edit">
                    <Edit size={16} />
                  </button>
                  <button className="action-btn delete">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuanLyPhongHoc;