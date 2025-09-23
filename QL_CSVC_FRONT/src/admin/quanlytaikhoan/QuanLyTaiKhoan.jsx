import React, { useState } from 'react';
import './QuanLyTaiKhoan.css';

const QuanLyTaiKhoan = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('Tất cả');
  const [statusFilter, setStatusFilter] = useState('Tất cả');

  const [accounts] = useState([
    {
      id: 1,
      username: 'admin1',
      role: 'Admin',
      code: 'NV001',
      email: 'admin@university.edu.vn',
      status: 'Đang hoạt động'
    },
    {
      id: 2,
      username: 'nhanvien1',
      role: 'Nhân viên',
      code: 'NV002',
      email: 'nhanvien@university.edu.vn',
      status: 'Đang hoạt động'
    },
    {
      id: 3,
      username: 'giangvien1',
      role: 'Giảng viên',
      code: 'GV001',
      email: 'giangvien@university.edu.vn',
      status: 'Đang hoạt động'
    },
    {
      id: 4,
      username: 'sinhvien1',
      role: 'Sinh viên',
      code: 'SV001',
      email: 'sinhvien@student.university.edu.vn',
      status: 'Đang hoạt động'
    }
  ]);

  const handleEdit = (id) => {
    console.log('Edit account:', id);
  };

  const handleDelete = (id) => {
    console.log('Delete account:', id);
  };

  const handleAddAccount = () => {
    console.log('Add new account');
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
        <button className="btn-add" onClick={handleAddAccount}>
          <span className="plus-icon">+</span>
          Thêm tài khoản
        </button>
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
                  <span className={`status-badge status-active`}>
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
    </div>
  );
};

export default QuanLyTaiKhoan;