import React, { useState } from 'react';
import './QuanLyTaiKhoan.css';

const QuanLyTaiKhoan = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('Tất cả');
  const [statusFilter, setStatusFilter] = useState('Tất cả');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);

  // SỬA: Thêm hàm setAccounts và bổ sung trường permissions vào dữ liệu
  const [accounts, setAccounts] = useState([
    {
      id: 1,
      username: 'admin1',
      role: 'Admin',
      code: 'NV001',
      email: 'admin@university.edu.vn',
      status: 'Đang hoạt động',
      permissions: {
        xemThietBi: true,
        quanLyNguoiDung: true,
        muonThietBi: false,
        duyetMuonThietBi: true,
        xemBaoCao: true,
        quanLyPhongHoc: false,
      }
    },
    {
      id: 2,
      username: 'nhanvien1',
      role: 'Nhân viên',
      code: 'NV002',
      email: 'nhanvien@university.edu.vn',
      status: 'Đang hoạt động',
      permissions: {
        xemThietBi: true,
        quanLyNguoiDung: false,
        muonThietBi: true,
        duyetMuonThietBi: false,
        xemBaoCao: true,
        quanLyPhongHoc: true,
      }
    },
    {
      id: 3,
      username: 'giangvien1',
      role: 'Giảng viên',
      code: 'GV001',
      email: 'giangvien@university.edu.vn',
      status: 'Đang hoạt động',
      permissions: {
        xemThietBi: true,
        quanLyNguoiDung: false,
        muonThietBi: true,
        duyetMuonThietBi: false,
        xemBaoCao: false,
        quanLyPhongHoc: false,
      }
    },
    {
      id: 4,
      username: 'sinhvien1',
      role: 'Sinh viên',
      code: 'SV001',
      email: 'sinhvien@student.university.edu.vn',
      status: 'Đang hoạt động',
      permissions: {
        xemThietBi: true,
        quanLyNguoiDung: false,
        muonThietBi: true,
        duyetMuonThietBi: false,
        xemBaoCao: false,
        quanLyPhongHoc: false,
      }
    }
  ]);

  // State cho form trong modal
  const [formData, setFormData] = useState({
    id: null,
    username: '',
    password: '',
    role: 'Sinh viên',
    code: '',
    email: '',
    status: 'Đang hoạt động',
    permissions: {
      xemThietBi: true,
      quanLyNguoiDung: false,
      muonThietBi: false,
      duyetMuonThietBi: false,
      xemBaoCao: false,
      quanLyPhongHoc: false,
    },
  });

  // HÀM MỞ MODAL VÀ ĐIỀN DỮ LIỆU
  const handleEdit = (id) => {
    const accountToEdit = accounts.find(acc => acc.id === id);
    setEditingAccount(accountToEdit);
    setFormData(accountToEdit); // Điền dữ liệu vào form
    setIsModalOpen(true);
  };

  const handleAddAccount = () => {
    setEditingAccount(null);
    // Reset form về trạng thái mặc định khi thêm mới
    setFormData({
      id: null,
      username: '',
      password: '',
      role: 'Sinh viên',
      code: '',
      email: '',
      status: 'Đang hoạt động',
      permissions: {
        xemThietBi: true,
        quanLyNguoiDung: false,
        muonThietBi: false,
        duyetMuonThietBi: false,
        xemBaoCao: false,
        quanLyPhongHoc: false,
      },
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingAccount(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePermissionChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      permissions: {
        ...formData.permissions,
        [name]: checked,
      },
    });
  };

  // HÀM LƯU TÀI KHOẢN
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.id) {
      // Logic cập nhật
      setAccounts(accounts.map(acc => 
        acc.id === formData.id ? formData : acc
      ));
    } else {
      // Logic thêm mới
      const newAccount = { ...formData, id: accounts.length + 1 };
      setAccounts([...accounts, newAccount]);
    }
    handleCloseModal();
  };

  // HÀM XÓA TÀI KHOẢN
  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa tài khoản này?')) {
      setAccounts(accounts.filter(acc => acc.id !== id));
    }
  };

  const filteredAccounts = accounts.filter(account => {
    const matchesSearch = account.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          account.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          account.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'Tất cả' || account.role === roleFilter;
    const matchesStatus = statusFilter === 'Tất cả' || account.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="quan-ly-tai-khoan">
      <div className="header">
        <h1>Quản lý tài khoản</h1>
        {/* <button className="btn-add" onClick={handleAddAccount}>
          <span className="plus-icon">+</span>
          Thêm tài khoản
        </button> */}
      </div>

      <div className="filters">
        <div className="search-box">
          <div className="search-label">Tìm kiếm</div>
          <div className="search-input-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Tìm theo tên tài khoản, email, mã SV/NV..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        <div className="filter-group">
          <div className="filter-item">
            <label>Vai trò</label>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="filter-select"
            >
              <option value="Tất cả">Tất cả</option>
              <option value="Admin">Admin</option>
              <option value="Nhân viên">Nhân viên</option>
              <option value="Giảng viên">Giảng viên</option>
              <option value="Sinh viên">Sinh viên</option>
            </select>
          </div>

          <div className="filter-item">
            <label>Trạng thái</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="filter-select"
            >
              <option value="Tất cả">Tất cả</option>
              <option value="Đang hoạt động">Đang hoạt động</option>
              <option value="Ngưng hoạt động">Ngưng hoạt động</option>
            </select>
          </div>
        </div>
      </div>

      <div className="table-container">
        <table className="accounts-table">
          <thead>
            <tr>
              <th>Tên tài khoản</th>
              <th>Vai trò</th>
              <th>Mã SV/NV</th>
              <th>Email</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredAccounts.map(account => (
              <tr key={account.id}>
                <td>{account.username}</td>
                <td>
                  <span className={`role-badge role-${account.role.toLowerCase().replace(' ', '-')}`}>
                    {account.role}
                  </span>
                </td>
                <td>{account.code}</td>
                <td>{account.email}</td>
                <td>
                  <span className={`status-badge status-${account.status.toLowerCase().replace(' ', '-')}`}>
                    {account.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="btn-edit"
                      onClick={() => handleEdit(account.id)}
                      title="Chỉnh sửa"
                    >
                      ✏️
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(account.id)}
                      title="Xóa"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{editingAccount ? 'Sửa tài khoản' : 'Thêm tài khoản'}</h2>
              <button className="close-button" onClick={handleCloseModal}>&times;</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-grid">
                  <div className="form-group">
                    <label>Tên tài khoản *</label>
                    <input type="text" name="username" value={formData.username} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label>Mật khẩu</label>
                    <input type="password" name="password" placeholder="Để trống nếu không đổi" onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>Vai trò *</label>
                    <select name="role" value={formData.role} onChange={handleChange} required>
                      <option value="Admin">Admin</option>
                      <option value="Nhân viên">Nhân viên</option>
                      <option value="Giảng viên">Giảng viên</option>
                      <option value="Sinh viên">Sinh viên</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Trạng thái *</label>
                    <select name="status" value={formData.status} onChange={handleChange} required>
                      <option value="Đang hoạt động">Đang hoạt động</option>
                      <option value="Ngưng hoạt động">Ngưng hoạt động</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Mã SV/NV</label>
                    <input type="text" name="code" value={formData.code} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>Email *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                  </div>
                </div>

                <div className="permissions-section">
                  <h3>Quyền</h3>
                  <div className="permissions-grid">
                    <div className="permission-item">
                      <input type="checkbox" id="xemThietBi" name="xemThietBi" checked={formData.permissions.xemThietBi} onChange={handlePermissionChange} />
                      <label htmlFor="xemThietBi">Xem thiết bị</label>
                    </div>
                    <div className="permission-item">
                      <input type="checkbox" id="duyetMuonThietBi" name="duyetMuonThietBi" checked={formData.permissions.duyetMuonThietBi} onChange={handlePermissionChange} />
                      <label htmlFor="duyetMuonThietBi">Duyệt mượn thiết bị</label>
                    </div>
                    <div className="permission-item">
                      <input type="checkbox" id="quanLyNguoiDung" name="quanLyNguoiDung" checked={formData.permissions.quanLyNguoiDung} onChange={handlePermissionChange} />
                      <label htmlFor="quanLyNguoiDung">Quản lý người dùng</label>
                    </div>
                    <div className="permission-item">
                      <input type="checkbox" id="xemBaoCao" name="xemBaoCao" checked={formData.permissions.xemBaoCao} onChange={handlePermissionChange} />
                      <label htmlFor="xemBaoCao">Xem báo cáo</label>
                    </div>
                    <div className="permission-item">
                      <input type="checkbox" id="muonThietBi" name="muonThietBi" checked={formData.permissions.muonThietBi} onChange={handlePermissionChange} />
                      <label htmlFor="muonThietBi">Mượn thiết bị</label>
                    </div>
                    <div className="permission-item">
                      <input type="checkbox" id="quanLyPhongHoc" name="quanLyPhongHoc" checked={formData.permissions.quanLyPhongHoc} onChange={handlePermissionChange} />
                      <label htmlFor="quanLyPhongHoc">Quản lý phòng học</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={handleCloseModal}>Hủy</button>
                <button type="submit" className="btn-primary">{editingAccount ? 'Cập nhật' : 'Thêm'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuanLyTaiKhoan;