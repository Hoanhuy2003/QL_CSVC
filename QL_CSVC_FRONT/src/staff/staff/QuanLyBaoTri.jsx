import React, { useState } from 'react';
import { 
  Wrench,
  AlertTriangle, 
  CheckCircle,
  TrendingUp,
  Plus,
  FileText,
  Search,
  Calendar,
  DollarSign,
  User,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';
import AddMaintenanceModal from './AddMaintenanceModal'; 
import '../staffLayout/styles/quanlybaotri.css';

const MaintenancePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Tất cả');
  const [activeTab, setActiveTab] = useState('history');
  const [showModal, setShowModal] = useState(false); 

  const [maintenanceHistory, setMaintenanceHistory] = useState([
    {
      code: 'TB003',
      name: 'Micro không dây Shure',
      date: '2024-09-15',
      issue: 'Thay pin và kiểm tra tín hiệu',
      technician: 'Nguyễn Văn A',
      cost: '500.000 VND',
      status: 'completed'
    },
    {
      code: 'TB001',
      name: 'Máy chiếu Sony VPL-DX270',
      date: '2024-09-20', 
      issue: 'Vệ sinh bóng đèn và ống kính',
      technician: 'Trần Thị B',
      cost: '300.000 VND',
      status: 'in-progress'
    },
    {
      code: 'TB005',
      name: 'Màn hình LED Samsung',
      date: '2024-09-18',
      issue: 'Sửa chữa pixel chết và hiệu chỉnh màu',
      technician: 'Lê Văn C',
      cost: '1.200.000 VND',
      status: 'completed'
    },
    {
      code: 'TB006',
      name: 'Router Cisco',
      date: '2024-09-22',
      issue: 'Cập nhật firmware và kiểm tra cổng kết nối',
      technician: 'Phạm Văn D',
      cost: 'Miễn phí',
      status: 'stopped'
    }
  ]);

  const disposalRequests = [
    {
      code: 'TB008',
      name: 'Máy chiếu Sony cũ',
      date: '2024-09-10',
      reason: 'Thiết bị quá cũ, hiệu suất thấp, chi phí bảo trì cao',
      estimatedValue: '5.000.000 VND',
      status: 'approved'
    },
    {
      code: 'TB009', 
      name: 'Laptop Dell cũ',
      date: '2024-09-21',
      reason: 'Hết thời gian bảo hành, linh kiện khó tìm',
      estimatedValue: '3.000.000 VND',
      status: 'pending'
    }
  ];

  const handleAddMaintenance = (formData) => {
    console.log('Thêm bảo trì mới:', formData);
    
    const newRecord = {
      code: formData.equipment,
      name: getEquipmentName(formData.equipment),
      date: formData.date,
      issue: formData.description,
      technician: formData.technician,
      cost: formData.cost === '0' ? 'Miễn phí' : `${parseInt(formData.cost).toLocaleString()} VND`,
      status: 'in-progress'
    };

    setMaintenanceHistory(prev => [newRecord, ...prev]);
    
    setShowModal(false);
    
    // Thông báo thành công
    alert('Đã thêm thông tin bảo trì thành công!');
  };

  // Helper function để get tên thiết bị từ mã
  const getEquipmentName = (code) => {
    const equipmentMap = {
      'TB001': 'Máy chiếu Sony VPL-DX270',
      'TB002': 'Micro không dây Shure',
      'TB003': 'Màn hình LED Samsung',
      'TB004': 'Router Cisco',
      'TB005': 'Loa Bluetooth JBL'
    };
    return equipmentMap[code] || 'Thiết bị không xác định';
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'completed': return 'Hoàn thành';
      case 'in-progress': return 'Đang thực hiện';
      case 'stopped': return 'Tạm dừng';
      case 'approved': return 'Đã duyệt';
      case 'pending': return 'Chờ duyệt';
      default: return '';
    }
  };

  const getStatusClass = (status) => {
    switch(status) {
      case 'completed': return 'status-completed';
      case 'in-progress': return 'status-in-progress';
      case 'stopped': return 'status-stopped';
      case 'approved': return 'status-approved';
      case 'pending': return 'status-pending';
      default: return '';
    }
  };

  // Statistics calculations
  const totalMaintenance = maintenanceHistory.length;
  const inProgress = maintenanceHistory.filter(item => item.status === 'in-progress').length;
  const completed = maintenanceHistory.filter(item => item.status === 'completed').length;
  const totalCost = maintenanceHistory.reduce((sum, item) => {
    const cost = parseFloat(item.cost.replace(/[^\d]/g, '')) || 0;
    return sum + cost;
  }, 0);

  const pendingDisposal = disposalRequests.filter(item => item.status === 'pending').length;

  const filteredHistory = maintenanceHistory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.technician.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'Tất cả' || getStatusText(item.status) === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredDisposal = disposalRequests.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.code.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="maintenance-page">
      <div className="maintenance-container">
        {/* Page Header */}
        <div className="page-header">
          <h1>Quản lý bảo trì thiết bị</h1>
          <div className="header-actions">
            <button 
              className="btn-add"
              onClick={() => setShowModal(true)} // Mở modal khi click
            >
              <Plus size={18} />
              Thêm bảo trì
            </button>
            <button className="btn-export">
              <FileText size={18} />
              Đề xuất thanh lý
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="stats-row">
          <div className="stat-card total">
            <div className="stat-icon">
              <Wrench size={24} />
            </div>
            <div className="stat-content">
              <div className="stat-number">{totalMaintenance}</div>
              <div className="stat-label">Tổng bảo trì</div>
              <div className="stat-desc">Tất cả bảo trì</div>
            </div>
          </div>

          <div className="stat-card in-progress">
            <div className="stat-icon">
              <AlertTriangle size={24} />
            </div>
            <div className="stat-content">
              <div className="stat-number">{inProgress}</div>
              <div className="stat-label">Đang thực hiện</div>
              <div className="stat-desc">Bảo trì đang tiến hành</div>
            </div>
          </div>

          <div className="stat-card completed">
            <div className="stat-icon">
              <CheckCircle size={24} />
            </div>
            <div className="stat-content">
              <div className="stat-number">{completed}</div>
              <div className="stat-label">Hoàn thành</div>
              <div className="stat-desc">Bảo trì đã xong</div>
            </div>
          </div>

          <div className="stat-card cost">
            <div className="stat-icon">
              <TrendingUp size={24} />
            </div>
            <div className="stat-content">
              <div className="stat-number">{(totalCost/1000000).toFixed(1)}M</div>
              <div className="stat-label">Chi phí</div>
              <div className="stat-desc">VND tổng chi phí</div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="controls-row">
          <div className="search-box">
            <Search size={20} />
            <input
              type="text"
              placeholder="Tìm theo mã TB, tên thiết bị, người thực hiện..."
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
              <option value="Hoàn thành">Hoàn thành</option>
              <option value="Đang thực hiện">Đang thực hiện</option>
              <option value="Tạm dừng">Tạm dừng</option>
            </select>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="tab-navigation">
          <button 
            className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            Lịch sử bảo trì
          </button>
          <button 
            className={`tab-btn ${activeTab === 'disposal' ? 'active' : ''}`}
            onClick={() => setActiveTab('disposal')}
          >
            Đề xuất thanh lý
            {pendingDisposal > 0 && <span className="tab-badge">{pendingDisposal} chờ duyệt</span>}
          </button>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'history' && (
          <div className="table-container">
            <table className="maintenance-table">
              <thead>
                <tr>
                  <th>Mã TB</th>
                  <th>Tên thiết bị</th>
                  <th>Ngày bảo trì</th>
                  <th>Nội dung</th>
                  <th>Người thực hiện</th>
                  <th>Chi phí</th>
                  <th>Trạng thái</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {filteredHistory.map((item, index) => (
                  <tr key={index}>
                    <td className="code-cell">{item.code}</td>
                    <td>{item.name}</td>
                    <td>{item.date}</td>
                    <td className="issue-cell">{item.issue}</td>
                    <td>
                      <div className="technician-info">
                        <User size={16} />
                        {item.technician}
                      </div>
                    </td>
                    <td className="cost-cell">{item.cost}</td>
                    <td>
                      <span className={`status-badge ${getStatusClass(item.status)}`}>
                        {getStatusText(item.status)}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button className="btn-view" title="Xem chi tiết">
                          <Eye size={16} />
                        </button>
                        <button className="btn-edit" title="Chỉnh sửa">
                          <Edit size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'disposal' && (
          <div className="disposal-section">
            <div className="disposal-header">
              <h2>Đề xuất thanh lý</h2>
              <span className="disposal-count">{pendingDisposal} chờ duyệt</span>
            </div>
            
            <div className="table-container">
              <table className="disposal-table">
                <thead>
                  <tr>
                    <th>Mã TB</th>
                    <th>Tên thiết bị</th>
                    <th>Ngày đề xuất</th>
                    <th>Lý do</th>
                    <th>Giá trị ước tính</th>
                    <th>Trạng thái</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDisposal.map((item, index) => (
                    <tr key={index}>
                      <td className="code-cell">{item.code}</td>
                      <td>{item.name}</td>
                      <td>{item.date}</td>
                      <td className="reason-cell">{item.reason}</td>
                      <td className="value-cell">{item.estimatedValue}</td>
                      <td>
                        <span className={`status-badge ${getStatusClass(item.status)}`}>
                          {getStatusText(item.status)}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button className="btn-view" title="Xem chi tiết">
                            <Eye size={16} />
                          </button>
                          {item.status === 'pending' && (
                            <button className="btn-delete" title="Xóa đề xuất">
                              <Trash2 size={16} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* No Data States */}
        {activeTab === 'history' && filteredHistory.length === 0 && (
          <div className="no-data">
            <p>Không tìm thấy lịch sử bảo trì nào phù hợp</p>
          </div>
        )}

        {activeTab === 'disposal' && filteredDisposal.length === 0 && (
          <div className="no-data">
            <p>Không có đề xuất thanh lý nào</p>
          </div>
        )}

        {/* Add Maintenance Modal */}
        <AddMaintenanceModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSubmit={handleAddMaintenance}
        />
      </div>
    </div>
  );
};

export default MaintenancePage;