import React, { useState } from 'react';
import './RoomGrid.css';

const RoomGrid = ({ darkMode }) => {
  const [filter, setFilter] = useState('all'); // 'all', 'occupied', 'available', 'maintenance'

  const rooms = [
    {
      id: '2A08',
      title: 'Cấu Trúc dữ liệu nhóm 1 2021-2022 2',
      devices: [
        { name: 'Remote', count: 1, icon: '📺' },
        { name: 'Micro', count: 1, icon: '🎤' },
        { name: 'Chìa Khóa', count: 2, icon: '🔑' }
      ],
      type: 'occupied',
      status: 'Đang sử dụng'
    },
    {
      id: '2A16',
      title: 'Công Nghệ Phần Mềm nhóm 2 2021-2022 1',
      devices: [
        { name: 'Micro', count: 1, icon: '🎤' },
        { name: 'Chìa Khóa', count: 1, icon: '🔑' }
      ],
      type: 'occupied',
      status: 'Đang sử dụng'
    },
    {
      id: '2A36',
      title: '',
      devices: [
        { name: 'Remote', count: 1, icon: '📺' },
        { name: 'Micro', count: 1, icon: '🎤' },
        { name: 'Chìa Khóa', count: 1, icon: '🔑' }
      ],
      type: 'available',
      status: 'Sẵn sàng'
    },
    {
      id: '2B11',
      title: '',
      devices: [],
      type: 'maintenance',
      status: 'Bảo trì'
    },
    {
      id: '2B25',
      title: '',
      devices: [
        { name: 'Chìa Khóa', count: 1, icon: '🔑' }
      ],
      type: 'available',
      status: 'Sẵn sàng'
    },
    {
      id: '2B32',
      title: '',
      devices: [
        { name: 'Remote', count: 2, icon: '📺' },
        { name: 'Micro', count: 3, icon: '🎤' },
        { name: 'Chìa Khóa', count: 2, icon: '🔑' }
      ],
      type: 'available',
      status: 'Sẵn sàng'
    },
    {
      id: '2C15',
      title: 'Thực hành Lập trình Web',
      devices: [
        { name: 'Máy chiếu', count: 1, icon: '📽️' },
        { name: 'Laptop', count: 2, icon: '💻' },
        { name: 'Chìa Khóa', count: 1, icon: '🔑' }
      ],
      type: 'occupied',
      status: 'Đang sử dụng'
    },
    {
      id: '2C22',
      title: '',
      devices: [
        { name: 'Micro', count: 2, icon: '🎤' },
        { name: 'Loa', count: 1, icon: '🔊' }
      ],
      type: 'available',
      status: 'Sẵn sàng'
    },
    {
      id: '3A01',
      title: '',
      devices: [
        { name: 'Máy tính', count: 1, icon: '🖥️' }
      ],
      type: 'maintenance',
      status: 'Bảo trì'
    }
  ];

  const filteredRooms = rooms.filter(room => {
    if (filter === 'all') return true;
    return room.type === filter;
  });

  const getStatusText = (type) => {
    switch (type) {
      case 'occupied': return 'Đang sử dụng';
      case 'available': return 'Sẵn sàng';
      case 'maintenance': return 'Bảo trì';
      default: return 'Không xác định';
    }
  };

  const getActionText = (type) => {
    switch (type) {
      case 'occupied': return '📋 Xem chi tiết';
      case 'available': return '📝 Lập phiếu mượn';
      case 'maintenance': return '🔧 Đang bảo trì';
      default: return '❓ Không xác định';
    }
  };

  const handleRoomAction = (room) => {
    console.log(`Action for room ${room.id}:`, room.type);
    // Xử lý logic cho từng loại phòng
    switch (room.type) {
      case 'available':
        alert(`Lập phiếu mượn cho phòng ${room.id}`);
        break;
      case 'occupied':
        alert(`Xem chi tiết phòng ${room.id}`);
        break;
      case 'maintenance':
        alert(`Phòng ${room.id} đang trong quá trình bảo trì`);
        break;
      default:
        alert(`Hành động cho phòng ${room.id}`);
    }
  };

  const roomCounts = {
    all: rooms.length,
    occupied: rooms.filter(r => r.type === 'occupied').length,
    available: rooms.filter(r => r.type === 'available').length,
    maintenance: rooms.filter(r => r.type === 'maintenance').length
  };

  return (
    <div className={`room-grid-container ${darkMode ? 'dark' : ''}`}>
      {/* Header */}
      <div className="room-grid-header">
        <h1 className={`room-grid-title ${darkMode ? 'dark' : ''}`}>
          Quản lý Phòng & Thiết bị
        </h1>
        <p className={`room-grid-subtitle ${darkMode ? 'dark' : ''}`}>
          Theo dõi trạng thái và quản lý việc mượn trả thiết bị trong các phòng học, 
          phòng thí nghiệm một cách hiệu quả và dễ dàng.
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="filter-section">
        <button 
          className={`filter-button ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          <span>🏢</span>
          Tất cả ({roomCounts.all})
        </button>
        <button 
          className={`filter-button occupied ${filter === 'occupied' ? 'active' : ''}`}
          onClick={() => setFilter('occupied')}
        >
          <span>🔴</span>
          Đang sử dụng ({roomCounts.occupied})
        </button>
        <button 
          className={`filter-button available ${filter === 'available' ? 'active' : ''}`}
          onClick={() => setFilter('available')}
        >
          <span>🟢</span>
          Sẵn sàng ({roomCounts.available})
        </button>
        <button 
          className={`filter-button ${filter === 'maintenance' ? 'active' : ''}`}
          onClick={() => setFilter('maintenance')}
        >
          <span>🟡</span>
          Bảo trì ({roomCounts.maintenance})
        </button>
      </div>

      {/* Rooms Grid */}
      <div className="rooms-grid">
        {filteredRooms.map((room) => (
          <div 
            key={room.id} 
            className={`room-card ${room.type} ${darkMode ? 'dark' : ''}`}
          >
            {/* Room Header */}
            <div className="room-header">
              <h3 className="room-id">{room.id}</h3>
              <span className={`room-status ${room.type}`}>
                {getStatusText(room.type)}
              </span>
            </div>

            {/* Room Title */}
            {room.title && (
              <p className="room-title">{room.title}</p>
            )}

            {/* Devices Section */}
            <div className="devices-section">
              <h4 className="devices-title">Thiết bị</h4>
              <div className="devices-list">
                {room.devices.length > 0 ? (
                  room.devices.map((device, index) => (
                    <div key={index} className="device-item">
                      <span className="device-icon">{device.icon}</span>
                      <span className="device-count">{device.count}</span>
                      <span>{device.name}</span>
                    </div>
                  ))
                ) : (
                  <div className="device-item">
                    <span className="device-icon">📭</span>
                    <span>Không có thiết bị</span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Button */}
            <div className="room-actions">
              <button 
                className={`action-button ${room.type}`}
                onClick={() => handleRoomAction(room)}
                disabled={room.type === 'maintenance'}
              >
                {getActionText(room.type)}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredRooms.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          color: darkMode ? '#9ca3af' : '#6b7280'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
          <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>
            Không tìm thấy phòng nào
          </h3>
          <p>Thử thay đổi bộ lọc để xem các phòng khác</p>
        </div>
      )}
    </div>
  );
};

export default RoomGrid;