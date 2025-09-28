import React from 'react';
import { X, Eye, Check, XCircle } from 'lucide-react';
import './../../components/staff/styles/borrowdetailmodal.css';

const BorrowDetailModal = ({ isOpen, onClose, requestData }) => {
  if (!isOpen) return null;

  const equipmentList = [
    {
      id: 'TB001',
      name: 'Máy chiếu Sony',
      quantity: 1,
      status: 'Chưa trả'
    },
    {
      id: 'TB003', 
      name: 'Micro không dây',
      quantity: 2,
      status: 'Chưa trả'
    }
  ];

  const handleApprove = () => {
    console.log('Approved request');
    onClose();
  };

  const handleReject = () => {
    console.log('Rejected request');
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        {/* Modal Header */}
        <div className="modal-header">
          <h2 className="modal-title">Chi tiết phiếu mượn PM001</h2>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="modal-content">
          <p className="modal-subtitle">Cần thông tin chi tiết về phiếu mượn thiết bị</p>

          {/* Basic Info */}
          <div className="info-grid">
            <div className="info-section">
              <h3 className="section-title">Người lập phiếu</h3>
              <p className="info-text">Nguyễn Văn A (SV001)</p>
            </div>
            <div className="info-section">
              <h3 className="section-title">Lớp học</h3>
              <p className="info-text">Lập trình Java cơ bản (LTC001)</p>
            </div>
            <div className="info-section">
              <h3 className="section-title">Phòng</h3>
              <p className="info-text">Phòng học A101 (A101)</p>
            </div>
            <div className="info-section">
              <h3 className="section-title">Trạng thái</h3>
              <span className="status-badge pending">Chờ duyệt</span>
            </div>
          </div>

          {/* Equipment List */}
          <div className="equipment-section">
            <h3 className="section-title">Danh sách thiết bị</h3>
            <div className="equipment-table-container">
              <table className="equipment-table">
                <thead>
                  <tr>
                    <th>Mã TB</th>
                    <th>Tên thiết bị</th>
                    <th>Số lượng</th>
                    <th>Trạng thái trả</th>
                    <th>Ghi chú</th>
                  </tr>
                </thead>
                <tbody>
                  {equipmentList.map((item) => (
                    <tr key={item.id}>
                      <td className="equipment-id">{item.id}</td>
                      <td className="equipment-name">{item.name}</td>
                      <td className="equipment-quantity">{item.quantity}</td>
                      <td>
                        <span className="status-badge not-returned">{item.status}</span>
                      </td>
                      <td className="equipment-note">-</td>
    
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Đóng
          </button>
          <button className="btn btn-success" onClick={handleApprove}>
            <Check size={16} />
            Duyệt
          </button>
          <button className="btn btn-danger" onClick={handleReject}>
            <XCircle size={16} />
            Từ chối
          </button>
        </div>
      </div>
    </div>
  );
};

export default BorrowDetailModal;