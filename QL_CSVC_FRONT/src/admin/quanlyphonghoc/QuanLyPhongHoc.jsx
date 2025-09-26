import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2 } from 'lucide-react';
import './QuanLyPhongHoc.css';
import ModalRoomThem from './ModalRoomThem'; // Import modal thêm phòng học
const QuanLyPhongHoc = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roomType, setRoomType] = useState('Tất cả');
  const [status, setStatus] = useState('Tất cả');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State cho modal chỉnh sửa
  const [currentRoom, setCurrentRoom] = useState(null); // State lưu trữ dữ liệu phòng học hiện tại
  const [isModalOpen, setIsModalOpen] = useState(false); // State cho modal thêm phòng học

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

  // Hàm mở modal chỉnh sửa và truyền dữ liệu phòng học
  const handleOpenEditModal = (room) => {
    setCurrentRoom(room);
    setIsEditModalOpen(true);
  };

  // Hàm đóng modal chỉnh sửa
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setCurrentRoom(null);
  };

  // Hàm xử lý thay đổi input trong modal chỉnh sửa
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentRoom({ ...currentRoom, [name]: value });
  };

  // Hàm xử lý khi submit form chỉnh sửa
  const handleEditFormSubmit = (e) => {
    e.preventDefault();
    console.log('Updated Room Data:', currentRoom);
    // Logic để cập nhật dữ liệu phòng học trong danh sách
    handleCloseEditModal();
  };
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="room-management">
      {/* ... phần Header, Statistics, Filters không thay đổi */}
      <div className="header">
        <h1 className="page-title">Quản lý phòng học</h1>
        {/* Nút thêm phòng học có thể có modal riêng hoặc sử dụng chung */}
        <button className="add-button" onClick={handleOpenModal}>
          <Plus size={18} />
          Thêm phòng học
        </button>
      </div>
      <div className="stats-grid">
        {/* ... */}
      </div>
      <div className="filters">
        {/* ... */}
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
                  {/* Gán sự kiện onClick để mở modal chỉnh sửa */}
                  <button 
                    className="action-btn edit"
                    onClick={() => handleOpenEditModal(room)}
                  >
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

      {/* Modal chỉnh sửa - chỉ hiển thị khi isEditModalOpen là true và currentRoom có dữ liệu */}
      {isEditModalOpen && currentRoom && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h2>Sửa thông tin phòng học</h2>
              <button className="close-btn" onClick={handleCloseEditModal}>
                &times;
              </button>
            </div>
            <p className="modal-subtitle">
              Điền thông tin để cập nhật phòng học
            </p>

            <form onSubmit={handleEditFormSubmit} className="modal-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="roomCode">Mã phòng *</label>
                  <input
                    type="text"
                    id="roomCode"
                    name="roomCode"
                    value={currentRoom.id} // Mã phòng không cho sửa
                    readOnly 
                    className="read-only-input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="roomName">Tên phòng *</label>
                  <input
                    type="text"
                    id="roomName"
                    name="name"
                    value={currentRoom.name}
                    onChange={handleEditInputChange}
                    placeholder="Phòng học A101"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="roomType">Loại phòng *</label>
                  <select
                    id="roomType"
                    name="type"
                    value={currentRoom.type}
                    onChange={handleEditInputChange}
                  >
                    <option value="Phòng học lý thuyết">Phòng học lý thuyết</option>
                    <option value="Phòng thí nghiệm">Phòng thí nghiệm</option>
                    <option value="Phòng máy tính">Phòng máy tính</option>
                    <option value="Phòng họp">Phòng họp</option>
                    <option value="Phòng thực hành">Phòng thực hành</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="capacity">Sức chứa *</label>
                  <input
                    type="text" // Đổi type về text để phù hợp với dữ liệu mẫu
                    id="capacity"
                    name="capacity"
                    value={currentRoom.capacity}
                    onChange={handleEditInputChange}
                    placeholder="50 người"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="status">Trạng thái</label>
                <select
                  id="status"
                  name="status"
                  value={currentRoom.status}
                  onChange={handleEditInputChange}
                >
                  <option value="Hoạt động">Hoạt động</option>
                  <option value="Bảo trì">Bảo trì</option>
                  <option value="Ngừng sử dụng">Ngừng sử dụng</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="fixedEquipment">Thiết bị cố định</label>
                <textarea
                  id="fixedEquipment"
                  name="equipment"
                  value={currentRoom.equipment}
                  onChange={handleEditInputChange}
                  placeholder="Ví dụ: Máy chiếu, bảng tương tác, hệ thống âm thanh, điều hòa..."
                ></textarea>
              </div>

              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={handleCloseEditModal}>
                  Hủy
                </button>
                <button type="submit" className="add-btn">
                  Cập nhật
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <ModalRoomThem isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default QuanLyPhongHoc;