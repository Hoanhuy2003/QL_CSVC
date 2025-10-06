import React, { useState } from 'react';
import '../staffLayout/styles/addmaintenancemodal.css';

const AddMaintenanceModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    equipment: '',
    date: '',
    technician: '',
    description: '',
    cost: '0'
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    // Validate required fields
    if (!formData.equipment || !formData.date || !formData.technician || !formData.description) {
      alert('Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }

    // Call parent's submit handler
    onSubmit(formData);
    
    // Reset form
    setFormData({
      equipment: '',
      date: '',
      technician: '',
      description: '',
      cost: '0'
    });
  };

  const handleClose = () => {
    // Reset form when closing
    setFormData({
      equipment: '',
      date: '',
      technician: '',
      description: '',
      cost: '0'
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Thêm thông tin bảo trì</h3>
          <button 
            className="modal-close"
            onClick={handleClose}
          >
            ×
          </button>
        </div>
        
        <div className="modal-subtitle">
          Ghi nhận thông tin bảo trì thiết bị
        </div>

        <div className="modal-form">
          <div className="form-group">
            <label>Thiết bị *</label>
            <select
              value={formData.equipment}
              onChange={(e) => handleInputChange('equipment', e.target.value)}
            >
              <option value="">Chọn thiết bị</option>
              <option value="TB001">TB001 - Máy chiếu Sony VPL-DX270</option>
              <option value="TB002">TB002 - Micro không dây Shure</option>
              <option value="TB003">TB003 - Màn hình LED Samsung</option>
              <option value="TB004">TB004 - Router Cisco</option>
              <option value="TB005">TB005 - Loa Bluetooth JBL</option>
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Ngày bảo trì *</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                placeholder="dd/mm/yyyy"
              />
            </div>
            <div className="form-group">
              <label>Người thực hiện *</label>
              <input
                type="text"
                value={formData.technician}
                onChange={(e) => handleInputChange('technician', e.target.value)}
                placeholder="Tên người thực hiện"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Nội dung bảo trì *</label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Mô tả chi tiết công việc bảo trì..."
              rows={4}
            />
          </div>

          <div className="form-group">
            <label>Chi phí (VND)</label>
            <input
              type="number"
              value={formData.cost}
              onChange={(e) => handleInputChange('cost', e.target.value)}
              min="0"
            />
            <div className="form-note">
              Để trống hoặc nhập 0 nếu không có chi phí
            </div>
          </div>
        </div>

        <div className="modal-actions">
          <button 
            className="btn-cancel"
            onClick={handleClose}
          >
            Hủy
          </button>
          <button 
            className="btn-submit"
            onClick={handleSubmit}
          >
            Thêm bảo trì
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMaintenanceModal;