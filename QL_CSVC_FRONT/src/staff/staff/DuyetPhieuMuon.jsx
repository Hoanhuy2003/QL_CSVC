// src/pages/staff/DuyetPhieuMuon.jsx
import React, { useState } from 'react';
import { 
  Clock,
  AlertTriangle, 
  CheckCircle,
  XCircle,
  Search,
  Eye,
  Check,
  X
} from 'lucide-react';
import '../staffLayout/styles/duyetphieumuon.css';
import BorrowDetailModal from './BorrowDetailModal';

const ApprovalPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Tất cả');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  // Mock dữ liệu
  const mockData = [
    {
      id: 'PM001',
      student: 'Nguyễn Văn A (GV001)',
      class: 'Lập trình Java cơ bản LTC001',
      room: 'A101 Phòng học A101',
      borrowTime: '08:00:00 22/9/2024',
      returnTime: '11:00:00 22/9/2024',
      status: 'pending'
    },
    {
      id: 'PM002', 
      student: 'TS. Trần Thị B (GV002)',
      class: 'Cơ sở dữ liệu LTC002',
      room: 'B205 Phòng thí nghiệm B205',
      borrowTime: '13:30:00 23/9/2024',
      returnTime: '16:00:00 23/9/2024',
      status: 'approved'
    },
    {
      id: 'PM003',
      student: 'Lê Minh C (SV003)',
      class: 'Mạng máy tính G301',
      room: 'C102 Phòng lab C102',
      borrowTime: '09:00:00 24/9/2024',
      returnTime: '12:00:00 24/9/2024',
      status: 'overdue'
    },
    {
      id: 'PM004',
      student: 'Phạm Thị D (SV004)',
      class: 'Tin học văn phòng T201',
      room: 'D301 Phòng máy tính',
      borrowTime: '14:00:00 25/9/2024', 
      returnTime: '17:00:00 25/9/2024',
      status: 'approved'
    }
  ];

  // Hàm mở modal chi tiết
  const handleViewDetail = (request) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRequest(null);
  };

  // Hàm hiển thị trạng thái
  const getStatusText = (status) => {
    switch(status) {
      case 'pending': return 'Chờ duyệt';
      case 'approved': return 'Đã duyệt';
      case 'overdue': return 'Quá hạn';
      default: return '';
    }
  };

  const getStatusClass = (status) => {
    switch(status) {
      case 'pending': return 'status-pending';
      case 'approved': return 'status-approved';
      case 'overdue': return 'status-overdue';
      default: return '';
    }
  };

  // Lọc dữ liệu
  const filteredData = mockData.filter(item => {
    const matchesSearch = 
      item.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'Tất cả' || getStatusText(item.status) === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Thống kê
  const totalRequests = mockData.length;
  const pendingCount = mockData.filter(item => item.status === 'pending').length;
  const approvedCount = mockData.filter(item => item.status === 'approved').length;
  const overdueCount = mockData.filter(item => item.status === 'overdue').length;

  return (
    <div className="approval-page">
      <div className="approval-container">
        {/* Header */}
        <div className="page-header">
          <h1>Duyệt phiếu mượn thiết bị</h1>
          <div className="status-badges">
            <span className="badge-pending">{pendingCount} chờ duyệt</span>
            <span className="badge-approved">{approvedCount} đã duyệt</span>
            <span className="badge-overdue">{overdueCount} quá hạn</span>
          </div>
        </div>

        {/* Statistics */}
        <div className="stats-row">
          <div className="stat-card total">
            <Clock size={24} />
            <div>
              <div className="stat-number">{totalRequests}</div>
              <div className="stat-label">Tổng phiếu mượn</div>
            </div>
          </div>

          <div className="stat-card pending">
            <AlertTriangle size={24} />
            <div>
              <div className="stat-number">{pendingCount}</div>
              <div className="stat-label">Chờ duyệt</div>
            </div>
          </div>

          <div className="stat-card approved">
            <CheckCircle size={24} />
            <div>
              <div className="stat-number">{approvedCount}</div>
              <div className="stat-label">Đã duyệt</div>
            </div>
          </div>

          <div className="stat-card overdue">
            <XCircle size={24} />
            <div>
              <div className="stat-number">{overdueCount}</div>
              <div className="stat-label">Quá hạn</div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="controls-row">
          <div className="search-box">
            <Search size={20} />
            <input
              type="text"
              placeholder="Tìm theo mã phiếu, người lập, lớp học..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-dropdown">
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="Tất cả">Tất cả</option>
              <option value="Chờ duyệt">Chờ duyệt</option>
              <option value="Đã duyệt">Đã duyệt</option>
              <option value="Quá hạn">Quá hạn</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="table-container">
          <table className="approval-table">
            <thead>
              <tr>
                <th>Mã phiếu</th>
                <th>Người lập</th>
                <th>Lớp học</th>
                <th>Phòng</th>
                <th>Thời gian mượn</th>
                <th>Hạn trả</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.student}</td>
                  <td>{item.class}</td>
                  <td>{item.room}</td>
                  <td>{item.borrowTime}</td>
                  <td>{item.returnTime}</td>
                  <td>
                    <span className={`status-badge ${getStatusClass(item.status)}`}>
                      {getStatusText(item.status)}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn-view" 
                        title="Xem chi tiết"
                        onClick={() => handleViewDetail(item)}
                      >
                        <Eye size={16} />
                      </button>
                      {item.status === 'pending' && (
                        <>
                          <button className="btn-approve" title="Duyệt">
                            <Check size={16} />
                          </button>
                          <button className="btn-reject" title="Từ chối">
                            <X size={16} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredData.length === 0 && (
            <div className="no-data">
              <p>Không tìm thấy phiếu mượn nào phù hợp</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal chi tiết */}
      <BorrowDetailModal 
        isOpen={isModalOpen}
        onClose={closeModal}
        requestData={selectedRequest}
      />
    </div>
  );
};

export default ApprovalPage;
