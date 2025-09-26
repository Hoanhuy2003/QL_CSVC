import React, { useState } from 'react';
import './ModalRoomThem.css';

const ModalRoomThem = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    roomCode: '',
    roomName: '',
    roomType: '',
    capacity: '',
    status: 'Hoạt động',
    fixedEquipment: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle form submission
    console.log('Form data:', formData);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Thêm phòng học mới</h2>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>
        <p className="modal-subtitle">
          Điền thông tin để tạo phòng học
        </p>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="roomCode">Mã phòng *</label>
              <input
                type="text"
                id="roomCode"
                name="roomCode"
                value={formData.roomCode}
                onChange={handleChange}
                placeholder="A101"
              />
            </div>
            <div className="form-group">
              <label htmlFor="roomName">Tên phòng *</label>
              <input
                type="text"
                id="roomName"
                name="roomName"
                value={formData.roomName}
                onChange={handleChange}
                placeholder="Phòng học A101"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="roomType">Loại phòng *</label>
              <select
                id="roomType"
                name="roomType"
                value={formData.roomType}
                onChange={handleChange}
              >
                <option value="">Chọn loại phòng</option>
                <option value="Phòng học">Phòng học</option>
                <option value="Phòng thí nghiệm">Phòng thí nghiệm</option>
                <option value="Phòng họp">Phòng họp</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="capacity">Sức chứa *</label>
              <input
                type="number"
                id="capacity"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                placeholder="50"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="status">Trạng thái</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
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
              name="fixedEquipment"
              value={formData.fixedEquipment}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Hủy
            </button>
            <button type="submit" className="add-btn">
              Thêm mới
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalRoomThem;