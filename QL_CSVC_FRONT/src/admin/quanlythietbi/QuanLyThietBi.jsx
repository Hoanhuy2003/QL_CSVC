import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit,Trash2 } from 'lucide-react';
import './QuanLyThietBi.css';

const QuanLyThietBi = ({ darkMode = false }) => {
  const [activeTab, setActiveTab] = useState('danh-sach');
  const [searchTerm, setSearchTerm] = useState('');
  const [deviceTypeFilter, setDeviceTypeFilter] = useState('tat-ca');
  const [statusFilter, setStatusFilter] = useState('tat-ca');
  const [devices, setDevices] = useState([]);
  const [filteredDevices, setFilteredDevices] = useState([]);
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // States cho modal SỬA
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); 
  const [currentDevice, setCurrentDevice] = useState(null); 

  // Form data cho mua mới
  const [formData, setFormData] = useState({
    deviceId: '',
    deviceName: '',
    deviceType: '',
    purchaseDate: '',
    quantity: 1,
    supplier: '',
    price: ''
  });

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

  // Mock purchase history data
  const mockHistory = [
    {
      id: 'TB002',
      name: 'Laptop Dell Inspiron 15',
      purchaseDate: '2024-02-20',
      quantity: 5,
      price: 18000000,
      supplier: 'Dell Technologies Vietnam'
    },
    {
      id: 'TB001',
      name: 'Máy chiếu Sony VPL-DX270',
      purchaseDate: '2024-01-15',
      quantity: 2,
      price: 25000000,
      supplier: 'Công ty TNHH Sony Việt Nam'
    }
  ];
  const mainHistory = [
    {
      id: 'TB003',
      name: 'Micro không dây Shure',
      purchaseDate: '2024-03-10',
      people: 'Nguyễn Văn A',
      supplier: 'Công ty TNHH Âm Thanh Việt',
      price: 500000
    },
    {
      id: 'TB004',
      name: 'Máy in HP LaserJet',
      purchaseDate: '2024-02-25',
      people: 'Trần Văn B',
      supplier: 'Công ty TNHH HP Việt Nam',
      price: 12000000
    }
  ]
  const liquidationHistory = [
    {
      id: 'TB005',
      name: 'Bảng tương tác Samsung',
      liquidationDate: '2024-03-05',
      priceLiquidation: 3000000,
      reason: 'Hỏng nặng, không thể sửa chữa'
    },
    {
      id: 'TB006',
      name: 'Camera Canon EOS 80D',
      liquidationDate: '2024-01-30',
      priceLiquidation: 15000000,
      reason: 'Lỗi phần cứng, chi phí sửa chữa cao'
    }
  ]

  // Action tabs configuration
  const actionTabs = [
    { id: 'danh-sach', label: 'Danh sách thiết bị', icon: '📋' },
    { id: 'mua-moi', label: 'Mua mới', icon: '🛒' },
    { id: 'bao-tri', label: 'Bảo trì', icon: '🔧' },
    { id: 'thanh-ly', label: 'Thanh lý', icon: '🗑️' }
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
    setPurchaseHistory(mockHistory);
    
    const nextId = `TB${String(mockDevices.length + 1).padStart(3, '0')}`;
    setFormData(prev => ({ ...prev, deviceId: nextId }));
  }, []);

  // Filter devices based on search and filters
  useEffect(() => {
    let filtered = devices;
    if (searchTerm) {
      filtered = filtered.filter(device =>
        device.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        device.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
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
    if (statusFilter !== 'tat-ca') {
      filtered = filtered.filter(device => device.status === statusFilter);
    }
    setFilteredDevices(filtered);
  }, [searchTerm, deviceTypeFilter, statusFilter, devices]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (!formData.deviceName || !formData.deviceType || !formData.purchaseDate || 
          !formData.supplier || !formData.price) {
        alert('Vui lòng điền đầy đủ thông tin!');
        return;
      }
      await new Promise(resolve => setTimeout(resolve, 1000));
      const newPurchase = {
        id: formData.deviceId,
        name: formData.deviceName,
        purchaseDate: formData.purchaseDate,
        quantity: parseInt(formData.quantity),
        price: parseInt(formData.price),
        supplier: formData.supplier
      };
      setPurchaseHistory(prev => [newPurchase, ...prev]);
      const deviceTypeMap = {
        'thiet-bi-chieu': 'Thiết bị chiếu',
        'may-tinh': 'Máy tính',
        'thiet-bi-am-thanh': 'Thiết bị âm thanh',
        'thiet-bi-van-phong': 'Thiết bị văn phòng',
        'thiet-bi-giang-day': 'Thiết bị giảng dạy',
        'thiet-bi-quay-phim': 'Thiết bị quay phim'
      };
      const newDevice = {
        id: formData.deviceId,
        name: formData.deviceName,
        type: deviceTypeMap[formData.deviceType],
        status: 'dang-su-dung',
        quantity: parseInt(formData.quantity)
      };
      setDevices(prev => [...prev, newDevice]);
      const nextId = `TB${String(devices.length + 2).padStart(3, '0')}`;
      setFormData({
        deviceId: nextId,
        deviceName: '',
        deviceType: '',
        purchaseDate: '',
        quantity: 1,
        supplier: '',
        price: ''
      });
      alert('Thêm thông tin mua mới thành công!');
    } catch (error) {
      alert('Có lỗi xảy ra, vui lòng thử lại!');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Format price for display
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

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
  
  // Lấy class CSS tương ứng với status
  const getStatusClass = (status) => {
    switch(status) {
      case 'dang-su-dung':
        return 'status-in-use';
      case 'dang-muon':
        return 'status-on-loan';
      case 'dang-bao-tri':
        return 'status-under-maintenance';
      case 'da-thanh-ly':
        return 'status-liquidated';
      default:
        return '';
    }
  };

  const handleView = (deviceId) => {
    console.log('View device:', deviceId);
  };
  
  // Hàm mở modal chỉnh sửa
  const handleOpenEditModal = (deviceId) => {
    const deviceToEdit = devices.find(d => d.id === deviceId);
    if (deviceToEdit) {
      setCurrentDevice(deviceToEdit);
      setIsEditModalOpen(true);
    }
  };

  // Hàm đóng modal chỉnh sửa
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setCurrentDevice(null);
  };

  // Xử lý thay đổi input trong modal chỉnh sửa
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentDevice(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Xử lý khi submit form chỉnh sửa
  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updatedDevices = devices.map(device =>
      device.id === currentDevice.id ? currentDevice : device
    );
    setDevices(updatedDevices);
    handleCloseEditModal();
  };

  const handleDelete = (deviceId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa thiết bị này?')) {
      console.log('Delete device:', deviceId);
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
                        <span className={`status-badge ${getStatusClass(device.status)}`}>
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
                            onClick={() => handleOpenEditModal(device.id)}
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

        {/* Other Tab Contents (Mua mới, Bảo trì, Thanh lý) */}
        {activeTab === 'mua-moi' && (
          <div className="mua-moi-section">
            <div className="form-panel">
              <h2 className="form-title">Thêm thông tin mua mới</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Mã thiết bị</label>
                  <input
                    type="text"
                    name="deviceId"
                    className="form-input readonly"
                    value={formData.deviceId}
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Tên thiết bị</label>
                  <input
                    type="text"
                    name="deviceName"
                    className="form-input"
                    placeholder="Nhập tên thiết bị"
                    value={formData.deviceName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Loại thiết bị</label>
                  <select
                    name="deviceType"
                    className="form-select"
                    value={formData.deviceType}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Chọn loại thiết bị</option>
                    {deviceTypes.slice(1).map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Ngày mua</label>
                  <input
                    type="date"
                    name="purchaseDate"
                    className="form-input"
                    value={formData.purchaseDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Số lượng</label>
                  <input
                    type="number"
                    name="quantity"
                    className="form-input"
                    min="1"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Nhà cung cấp</label>
                  <input
                    type="text"
                    name="supplier"
                    className="form-input"
                    placeholder="Tên nhà cung cấp"
                    value={formData.supplier}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Đơn giá (VND)</label>
                  <div className="price-input-wrapper">
                    <input
                      type="number"
                      name="price"
                      className="form-input"
                      placeholder="25000000"
                      value={formData.price}
                      onChange={handleInputChange}
                      min="0"
                      required
                    />
                    <span className="currency-suffix">VND</span>
                  </div>
                </div>
                <button 
                  type="submit" 
                  className="submit-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Đang xử lý...' : 'Thêm thông tin mua mới'}
                </button>
              </form>
            </div>
            <div className="history-panel">
              <h2 className="history-title">Lịch sử mua mới gần đây</h2>
              <div className="history-list">
                {purchaseHistory.length > 0 ? (
                  purchaseHistory.map((item) => (
                    <div key={item.id} className="history-item">
                      <div className="item-header">
                        <h3 className="item-name">{item.name}</h3>
                        <span className="item-code">{item.id}</span>
                      </div>
                      <div className="item-details">
                        <div className="item-detail">
                          <span className="detail-label">Ngày mua:</span>
                          <span className="detail-value">{formatDate(item.purchaseDate)}</span>
                        </div>
                        <div className="item-detail">
                          <span className="detail-label">Số lượng:</span>
                          <span className="quantity-badge">{item.quantity}</span>
                        </div>
                        <div className="item-detail">
                          <span className="detail-label">Đơn giá:</span>
                          <span className="detail-value price-value">
                            {formatPrice(item.price)} VND
                          </span>
                        </div>
                        <div className="item-detail">
                          <span className="detail-label">Nhà cung cấp:</span>
                          <span className="detail-value">{item.supplier}</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="empty-state">
                    <div className="empty-state-icon">📦</div>
                    <h3 className="empty-state-title">Chưa có lịch sử mua mới</h3>
                    <p className="empty-state-subtitle">
                      Các thiết bị được mua mới sẽ hiển thị tại đây
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Các tab Bảo trì và Thanh lý tương tự */}
        {activeTab === 'bao-tri' && (
          <div className="bao-tri-section">
            <div className="form-panel">
              <h2 className="form-title">Thêm thông tin bảo trì</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Mã thiết bị</label>
                  <input
                    type="text"
                    name="deviceId"
                    className="form-input readonly"
                    value={formData.deviceId}
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Ngày bảo trì</label>
                  <input
                    type="date"
                    name="purchaseDate"
                    className="form-input"
                    value={formData.purchaseDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Nội dung bảo trì</label>
                  <input
                    type="text"
                    name="supplier"
                    className="form-input"
                    placeholder="Nội dung bảo trì"
                    value={formData.supplier}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Người thực hiện</label>
                  <input
                    type="text"
                    name="supplier"
                    className="form-input"
                    placeholder="Tên người thực hiện"
                    value={formData.supplier}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Chi phí (VND)</label>
                  <div className="price-input-wrapper">
                    <input
                      type="number"
                      name="price"
                      className="form-input"
                      placeholder="50000"
                      value={formData.price}
                      onChange={handleInputChange}
                      min="0"
                      required
                    />
                    <span className="currency-suffix">VND</span>
                  </div>
                </div>
                <button 
                  type="submit" 
                  className="submit-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Đang xử lý...' : 'Thêm thông tin bao trì'}
                </button>
              </form>
            </div>
            <div className="history-panel">
              <h2 className="history-title">Lịch sử bảo trì gần đây</h2>
              <div className="history-list">
                {mainHistory.length > 0 ? (
                  mainHistory.map((item) => (
                    <div key={item.id} className="history-item">
                      <div className="item-header">
                        <h3 className="item-name">{item.name}</h3>
                        <span className="item-code">{item.id}</span>
                      </div>
                      <div className="item-details">
                        <div className="item-detail">
                          <span className="detail-label">Ngày bảo trì:</span>
                          <span className="detail-value">{formatDate(item.purchaseDate)}</span>
                        </div>
                        <div className="item-detail">
                          <span className="detail-label">Người thực hiện:</span>
                          <span className="detail-value">{item.people}</span>
                        </div>
                        <div className="item-detail">
                          <span className="detail-label">Chi phí:</span>
                          <span className="detail-value price-value">
                            {formatPrice(item.price)} VND
                          </span>
                        </div>
                        <div className="item-detail">
                          <span className="detail-label">Nhà cung cấp:</span>
                          <span className="detail-value">{item.supplier}</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="empty-state">
                    <div className="empty-state-icon">📦</div>
                    <h3 className="empty-state-title">Chưa có lịch sử mua mới</h3>
                    <p className="empty-state-subtitle">
                      Các thiết bị được mua mới sẽ hiển thị tại đây
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {activeTab === 'thanh-ly' && (
          <div className="thanh-ly-section">
            <div className="form-panel">
              <h2 className="form-title">Thêm thông tin thanh lý</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Mã thiết bị</label>
                  <input
                    type="text"
                    name="deviceId"
                    className="form-input readonly"
                    value={formData.deviceId}
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Ngày thanh lý</label>
                  <input
                    type="date"
                    name="purchaseDate"
                    className="form-input"
                    value={formData.purchaseDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Lý do thanh lý</label>
                  <input
                    type="text"
                    name="reason"
                    className="form-input"
                    placeholder="Lý do thanh lý"
                    value={formData.reason}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Giá trị thu hồi (VND)</label>
                  <div className="price-input-wrapper">
                    <input
                      type="number"
                      name="price"
                      className="form-input"
                      placeholder="50000"
                      value={formData.price}
                      onChange={handleInputChange}
                      min="0"
                      required
                    />
                    <span className="currency-suffix">VND</span>
                  </div>
                </div>
                <button 
                  type="submit" 
                  className="submit-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Đang xử lý...' : 'Xác nhận thanh lý'}
                </button>
              </form>
            </div>
            <div className="history-panel">
              <h2 className="history-title">Lịch sử bảo trì gần đây</h2>
              <div className="history-list">
                {liquidationHistory.length > 0 ? (
                  liquidationHistory.map((item) => (
                    <div key={item.id} className="history-item">
                      <div className="item-header">
                        <h3 className="item-name">{item.name}</h3>
                        <span className="item-code">{item.id}</span>
                      </div>
                      <div className="item-details">
                        <div className="item-detail">
                          <span className="detail-label">Ngày thanh lý:</span>
                          <span className="detail-value">{formatDate(item.liquidationDate)}</span>
                        </div>
                        <div className="item-detail">
                          <span className="detail-label">Giá trị thu hồi:</span>
                          <span className="detail-value price-value">
                            {formatPrice(item.priceLiquidation)} VND
                          </span>
                        </div>
                        <div className="item-detail">
                          <span className="detail-label">Lý do thanh lý:</span>
                          <span className="detail-value">{item.reason}</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="empty-state">
                    <div className="empty-state-icon">📦</div>
                    <h3 className="empty-state-title">Chưa có lịch sử mua mới</h3>
                    <p className="empty-state-subtitle">
                      Các thiết bị được mua mới sẽ hiển thị tại đây
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* MODAL CHỈNH SỬA THIẾT BỊ */}
      {isEditModalOpen && currentDevice && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h2>Sửa thông tin thiết bị</h2>
              <button className="close-btn" onClick={handleCloseEditModal}>
                &times;
              </button>
            </div>
            <p className="modal-subtitle">
              Điền thông tin để cập nhật thiết bị
            </p>

            <form onSubmit={handleEditSubmit} className="modal-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="deviceId">Mã thiết bị</label>
                  <input
                    type="text"
                    id="deviceId"
                    name="id"
                    value={currentDevice.id}
                    readOnly
                    className="read-only-input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="deviceName">Tên thiết bị *</label>
                  <input
                    type="text"
                    id="deviceName"
                    name="name"
                    value={currentDevice.name || ''}
                    onChange={handleEditInputChange}
                    placeholder="Tên thiết bị"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="deviceType">Loại thiết bị *</label>
                  <select
                    id="deviceType"
                    name="type"
                    value={currentDevice.type || ''}
                    onChange={handleEditInputChange}
                  >
                    {deviceTypes.slice(1).map(type => (
                      <option key={type.value} value={type.label}>{type.label}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="status">Tình trạng *</label>
                  <select
                    id="status"
                    name="status"
                    value={currentDevice.status || ''}
                    onChange={handleEditInputChange}
                  >
                    {statusOptions.slice(1).map(status => (
                      <option key={status.value} value={status.value}>{status.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="quantity">Số lượng tồn</label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={currentDevice.quantity || ''}
                    onChange={handleEditInputChange}
                    min="0"
                  />
                </div>
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
    </div>
  );
};

export default QuanLyThietBi;