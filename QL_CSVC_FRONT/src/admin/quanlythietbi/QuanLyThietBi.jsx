import React, { useState, useEffect } from 'react';
import './QuanLyThietBi.css';

const QuanLyThietBi = ({ darkMode = false }) => {
  const [activeTab, setActiveTab] = useState('danh-sach');
  const [searchTerm, setSearchTerm] = useState('');
  const [deviceTypeFilter, setDeviceTypeFilter] = useState('tat-ca');
  const [statusFilter, setStatusFilter] = useState('tat-ca');
  const [devices, setDevices] = useState([]);
  const [filteredDevices, setFilteredDevices] = useState([]);

  // Mock data thiết bị
  const mockDevices = [
    {
      id: 'TB001',
      name: 'Máy chiếu Sony VPL-DX270',
      type: 'Thiết bị chiếu',
      status: 'dang-su-dung',
      quantity: 5
    },
    {
      id: 'TB002',
      name: 'Laptop Dell Inspiron 15',
      type: 'Máy tính',
      status: 'dang-muon',
      quantity: 10
    },
    {
      id: 'TB003',
      name: 'Micro không dây Shure',
      type: 'Thiết bị âm thanh',
      status: 'dang-bao-tri',
      quantity: 3
    },
    {
      id: 'TB004',
      name: 'Máy in HP LaserJet',
      type: 'Thiết bị văn phòng',
      status: 'da-thanh-ly',
      quantity: 0
    },
    {
      id: 'TB005',
      name: 'Bảng tương tác Samsung',
      type: 'Thiết bị giảng dạy',
      status: 'dang-su-dung',
      quantity: 8
    },
    {
      id: 'TB006',
      name: 'Camera Canon EOS 80D',
      type: 'Thiết bị quay phim',
      status: 'dang-muon',
      quantity: 2
    }
  ];

  // Action tabs configuration
  const actionTabs = [
    {
      id: 'danh-sach',
      label: 'Danh sách thiết bị',
      icon: '📋'
    },
    {
      id: 'mua-moi',
      label: 'Mua mới',
      icon: '🛒'
    },
    {
      id: 'bao-tri',
      label: 'Bảo trì',
      icon: '🔧'
    },
    {
      id: 'thanh-ly',
      label: 'Thanh lý',
      icon: '🗑️'
    }
  ];

  // Device types for filter
  const deviceTypes = [
    { value: 'tat-ca', label: 'Tất cả' },
    { value: 'thiet-bi-chieu', label: 'Thiết bị chiếu' },
    { value: 'may-tinh', label: 'Máy tính' },
    { value: 'thiet-bi-am-thanh', label: 'Thiết bị âm thanh' },
    { value: 'thiet-bi-van-phong', label: 'Thiết bị văn phòng' },
    { value: 'thiet-bi-giang-day', label: 'Thiết bị giảng dạy' },
    { value: 'thiet-bi-quay-phim', label: 'Thiết bị quay phim' }
  ];

  // Status options for filter
  const statusOptions = [
    { value: 'tat-ca', label: 'Tất cả' },
    { value: 'dang-su-dung', label: 'Đang sử dụng' },
    { value: 'dang-muon', label: 'Đang mượn' },
    { value: 'dang-bao-tri', label: 'Đang bảo trì' },
    { value: 'da-thanh-ly', label: 'Đã thanh lý' }
  ];

  // Load mock data
  useEffect(() => {
    setDevices(mockDevices);
    setFilteredDevices(mockDevices);
  }, []);

  // Filter devices based on search and filters
  useEffect(() => {
    let filtered = devices;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(device =>
        device.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        device.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Device type filter
    if (deviceTypeFilter !== 'tat-ca') {
      filtered = filtered.filter(device => {
        const typeMap = {
          'thiet-bi-chieu': 'Thiết bị chiếu',
          'may-tinh': 'Máy tính',
          'thiet-bi-am-thanh': 'Thiết bị âm thanh',
          'thiet-bi-van-phong': 'Thiết bị văn phòng',
          'thiet-bi-giang-day': 'Thiết bị giảng dạy',
          'thiet-bi-quay-phim': 'Thiết bị quay phim'
        };
        return device.type === typeMap[deviceTypeFilter];
      });
    }

    // Status filter
    if (statusFilter !== 'tat-ca') {
      filtered = filtered.filter(device => device.status === statusFilter);
    }

    setFilteredDevices(filtered);
  }, [searchTerm, deviceTypeFilter, statusFilter, devices]);

  // Get status label
  const getStatusLabel = (status) => {
    const statusMap = {
      'dang-su-dung': 'Đang sử dụng',
      'dang-muon': 'Đang mượn',
      'dang-bao-tri': 'Đang bảo trì',
      'da-thanh-ly': 'Đã thanh lý'
    };
    return statusMap[status] || status;
  };

  // Handle actions
  const handleView = (deviceId) => {
    console.log('View device:', deviceId);
    // Implement view logic
  };

  const handleEdit = (deviceId) => {
    console.log('Edit device:', deviceId);
    // Implement edit logic
  };

  const handleDelete = (deviceId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa thiết bị này?')) {
      console.log('Delete device:', deviceId);
      // Implement delete logic
      setDevices(devices.filter(device => device.id !== deviceId));
    }
  };

  return (
    <div className={`quan-ly-thiet-bi ${darkMode ? 'dark' : ''}`}>
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <h1 className="page-title">Quản lý thiết bị</h1>
        </div>

        {/* Action Tabs */}
        <div className="action-tabs">
          {actionTabs.map(tab => (
            <button
              key={tab.id}
              className={`action-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="action-tab-icon">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Filters Section */}
        <div className="filters-section">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="search-input"
              placeholder="Tìm theo mã TB, tên thiết bị..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-dropdown">
            <select
              className="dropdown-select"
              value={deviceTypeFilter}
              onChange={(e) => setDeviceTypeFilter(e.target.value)}
            >
              {deviceTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-dropdown">
            <select
              className="dropdown-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              {statusOptions.map(status => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Data Table */}
        {activeTab === 'danh-sach' && (
          <div className="data-table-container">
            <table className="data-table">
              <thead className="table-header">
                <tr>
                  <th>Mã TB</th>
                  <th>Tên thiết bị</th>
                  <th>Loại</th>
                  <th>Tình trạng</th>
                  <th>Số lượng tồn</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody className="table-body">
                {filteredDevices.length > 0 ? (
                  filteredDevices.map((device) => (
                    <tr key={device.id}>
                      <td>
                        <span className="device-id">{device.id}</span>
                      </td>
                      <td>{device.name}</td>
                      <td>{device.type}</td>
                      <td>
                        <span className={`status-badge ${device.status}`}>
                          {getStatusLabel(device.status)}
                        </span>
                      </td>
                      <td>
                        <span className={`quantity ${device.quantity === 0 ? 'zero' : ''}`}>
                          {device.quantity}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button
                            className="action-btn view"
                            title="Xem chi tiết"
                            onClick={() => handleView(device.id)}
                          >
                            👁️
                          </button>
                          <button
                            className="action-btn edit"
                            title="Chỉnh sửa"
                            onClick={() => handleEdit(device.id)}
                          >
                            ✏️
                          </button>
                          <button
                            className="action-btn delete"
                            title="Xóa"
                            onClick={() => handleDelete(device.id)}
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                      {searchTerm || deviceTypeFilter !== 'tat-ca' || statusFilter !== 'tat-ca'
                        ? 'Không tìm thấy thiết bị nào phù hợp với bộ lọc'
                        : 'Chưa có thiết bị nào trong hệ thống'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Other Tab Contents */}
        {activeTab === 'mua-moi' && (
          <div className="data-table-container" style={{ padding: '40px', textAlign: 'center' }}>
            <h3 style={{ color: darkMode ? '#f1f5f9' : '#1e293b', marginBottom: '16px' }}>
              🛒 Trang Mua Thiết Bị Mới
            </h3>
            <p style={{ color: '#94a3b8' }}>
              Chức năng mua thiết bị mới sẽ được triển khai tại đây
            </p>
          </div>
        )}

        {activeTab === 'bao-tri' && (
          <div className="data-table-container" style={{ padding: '40px', textAlign: 'center' }}>
            <h3 style={{ color: darkMode ? '#f1f5f9' : '#1e293b', marginBottom: '16px' }}>
              🔧 Trang Bảo Trì Thiết Bị
            </h3>
            <p style={{ color: '#94a3b8' }}>
              Chức năng quản lý bảo trì thiết bị sẽ được triển khai tại đây
            </p>
          </div>
        )}

        {activeTab === 'thanh-ly' && (
          <div className="data-table-container" style={{ padding: '40px', textAlign: 'center' }}>
            <h3 style={{ color: darkMode ? '#f1f5f9' : '#1e293b', marginBottom: '16px' }}>
              🗑️ Trang Thanh Lý Thiết Bị
            </h3>
            <p style={{ color: '#94a3b8' }}>
              Chức năng thanh lý thiết bị sẽ được triển khai tại đây
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuanLyThietBi;