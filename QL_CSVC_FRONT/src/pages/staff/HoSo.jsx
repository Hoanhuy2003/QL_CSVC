import React, { useState, useEffect } from 'react';
import {
    User,
    Mail,
    Phone,
    Edit,
    Briefcase
} from 'lucide-react';
import './../../components/staff/styles/hoso.css';

const HoSo = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState({
        ma_nv: "",
        ten_nv: "",
        email: "",
        sdt: "",
        dangLamViec: true,
        role: "Nhân viên"
    });

    // 🟩 Gọi API để lấy dữ liệu nhân viên
    useEffect(() => {
        const fetchNhanVien = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/nhan_vien/NV01');
                if (!response.ok) throw new Error("Không thể tải dữ liệu nhân viên");
                const data = await response.json();
                setFormData(prev => ({
                    ...prev,
                    ma_nv: data.ma_nv,
                    ten_nv: data.ten_nv,
                    email: data.email,
                    sdt: data.sdt,
                    dangLamViec: data.dangLamViec
                }));
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchNhanVien();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/nhan_vien/${formData.ma_nv}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (!response.ok) throw new Error("Cập nhật thất bại");
            alert("Cập nhật thông tin thành công!");
            setIsEditing(false);
        } catch (err) {
            console.error(err);
            alert("Lỗi khi cập nhật thông tin");
        }
    };

    if (isLoading) {
        return <div className="dashboard"><h2>Đang tải dữ liệu...</h2></div>;
    }

    return (
        <div className="dashboard">
            <div className="dashboard-container">
                {/* Header Section */}
                <div className="dashboard-header">
                    <h1 className="page-title">Hồ sơ cá nhân</h1>
                    <button
                        className="edit-btn"
                        onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                    >
                        <Edit size={18} />
                        {isEditing ? "Lưu" : "Chỉnh sửa"}
                    </button>
                </div>

                <div className="dashboard-content">
                    {/* Left Panel - Personal Information */}
                    <div className="left-panel">
                        <div className="info-card">
                            <div className="card-header">
                                <User size={20} />
                                <h2>Thông tin cá nhân</h2>
                            </div>
                            <div className="card-subtitle">
                                Thông tin tài khoản và liên hệ cá nhân
                            </div>

                            <div className="form-section">
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Mã nhân viên</label>
                                        <input
                                            type="text"
                                            value={formData.ma_nv}
                                            readOnly
                                            className="form-input"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Trạng thái</label>
                                        <div className={`status-badge ${formData.dangLamViec ? "active" : "inactive"}`}>
                                            {formData.dangLamViec ? "Đang làm việc" : "Đã nghỉ"}
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group full-width">
                                    <label>Họ và tên *</label>
                                    <input
                                        type="text"
                                        name="ten_nv"
                                        value={formData.ten_nv}
                                        readOnly={!isEditing}
                                        onChange={handleChange}
                                        className="form-input"
                                    />
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Email *</label>
                                        <div className="input-with-icon">
                                            <Mail size={18} />
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                readOnly={!isEditing}
                                                onChange={handleChange}
                                                className="form-input"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Số điện thoại</label>
                                        <div className="input-with-icon">
                                            <Phone size={18} />
                                            <input
                                                type="tel"
                                                name="sdt"
                                                value={formData.sdt}
                                                readOnly={!isEditing}
                                                onChange={handleChange}
                                                className="form-input"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Panel */}
                    <div className="right-panel">
                        <div className="info-card">
                            <div className="card-header">
                                <Briefcase size={20} />
                                <h2>Thông tin công việc</h2>
                            </div>

                            <div className="work-info-grid">
                                <div className="work-item">
                                    <div className="work-label">Vai trò</div>
                                    <div className="work-value">{formData.role}</div>
                                </div>
                                <div className="work-item">
                                    <div className="work-label">Phòng ban</div>
                                    <div className="work-value">Phòng Quản lý Cơ sở vật chất</div>
                                </div>
                                <div className="work-item">
                                    <div className="work-label">Chức vụ</div>
                                    <div className="work-value">Nhân viên thiết bị</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HoSo;
