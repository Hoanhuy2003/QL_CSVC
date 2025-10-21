import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, CheckCircle, Wrench, TrendingUp, Calendar, FileText, Settings } from 'lucide-react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/vi';
import './../../components/staff/styles/dashboard.css';

dayjs.extend(relativeTime);
dayjs.locale('vi');

const Dashboard = () => {
    const navigate = useNavigate();

    const [stats, setStats] = useState({
        pending: 0,
        approved: 0,
        maintenance: 0,
        efficiency: '0%',
    });

    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                // Lấy thống kê
                const statsResponse = await axios.get('http://localhost:8080/api/dashboard/stats');
                const data = statsResponse.data;

                setStats({
                    pending: data.phieuChoDuyet || 0,
                    approved: data.phieuDaDuyet || 0,
                    maintenance: (data.baoTriHoanThanh || 0) + (data.baoTriDang || 0),
                    efficiency: data.hieuSuat || '0%',
                });

                // Lấy hoạt động gần đây
                const activitiesResponse = await axios.get('http://localhost:8080/api/dashboard/recent-activities');
                const activitiesData = activitiesResponse.data.map(item => {
                    let icon, className;

                    switch(item.loai) {
                        case 'BAO_TRI':
                            icon = <Wrench size={20} />;
                            className = 'warning';
                            break;
                        case 'PHIEU_MUON':
                            icon = <FileText size={20} />;
                            className = 'info';
                            break;
                        default:
                            icon = <Calendar size={20} />;
                            className = 'completed';
                    }

                    return {
                        ...item,
                        icon,
                        className,
                        timeAgo: dayjs(item.thoi_gian).fromNow()
                    };
                });

                setActivities(activitiesData);
            } catch (err) {
                console.error('Lỗi khi lấy dữ liệu:', err);
                setError('Không thể tải dữ liệu. Vui lòng thử lại sau.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleQuickAction = (route) => {
        navigate(route);
    };

    if (loading) {
        return (
            <div className="dashboard">
                <div className="dashboard-container">
                    <div style={{ textAlign: 'center', padding: '60px 0' }}>
                        <p style={{ fontSize: '18px', color: '#6b7280' }}>Đang tải dữ liệu...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="dashboard">
                <div className="dashboard-container">
                    <div style={{ textAlign: 'center', padding: '60px 0' }}>
                        <AlertTriangle size={48} style={{ color: '#ef4444', margin: '0 auto 16px' }} />
                        <p style={{ fontSize: '18px', color: '#ef4444' }}>{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard">
            <div className="dashboard-container">
                {/* Header */}
                <div className="dashboard-header">
                    <h1 className="page-title">Dashboard</h1>
                    <p className="page-subtitle">Chào mừng nhân viên | Hệ thống quản lý cơ sở vật chất</p>
                </div>

                {/* Stats Cards */}
                <div className="stats-grid">
                    <div className="stat-card pending">
                        <div className="stat-icon">
                            <AlertTriangle size={24} />
                        </div>
                        <div className="stat-content">
                            <div className="stat-number">{stats.pending}</div>
                            <div className="stat-label">Phiếu chờ duyệt</div>
                            <div className="stat-sublabel">Cần xử lý</div>
                        </div>
                    </div>

                    <div className="stat-card approved">
                        <div className="stat-icon">
                            <CheckCircle size={24} />
                        </div>
                        <div className="stat-content">
                            <div className="stat-number">{stats.approved}</div>
                            <div className="stat-label">Đã duyệt</div>
                            <div className="stat-sublabel">Phiếu mượn đã duyệt</div>
                        </div>
                    </div>

                    <div className="stat-card maintenance">
                        <div className="stat-icon">
                            <Wrench size={24} />
                        </div>
                        <div className="stat-content">
                            <div className="stat-number">{stats.maintenance}</div>
                            <div className="stat-label">Bảo trì</div>
                            <div className="stat-sublabel">Đang xử lý / Hoàn thành</div>
                        </div>
                    </div>

                    <div className="stat-card efficiency">
                        <div className="stat-icon">
                            <TrendingUp size={24} />
                        </div>
                        <div className="stat-content">
                            <div className="stat-number">{stats.efficiency}</div>
                            <div className="stat-label">Hiệu suất</div>
                            <div className="stat-sublabel">Xử lý đúng hạn</div>
                        </div>
                    </div>
                </div>

                {/* Dashboard Content Grid */}
                <div className="dashboard-content">
                    {/* Recent Activities */}
                    <div className="activity-section">
                        <div className="section-header">
                            <h2>Hoạt động gần đây</h2>
                            <p>Cập nhật mới nhất</p>
                        </div>
                        <div className="activity-list">
                            {activities.length === 0 ? (
                                <p style={{ textAlign: 'center', color: '#6b7280', padding: '20px 0' }}>
                                    Không có hoạt động nào
                                </p>
                            ) : (
                                activities.map(activity => (
                                    <div key={activity.id} className={`activity-item ${activity.className}`}>
                                        <div className="activity-icon">{activity.icon}</div>
                                        <div className="activity-content">
                                            <div className="activity-title">{activity.nguoi_thuc_hien}</div>

                                            {/* Hiển thị mô tả hoạt động chi tiết */}
                                            <div className="activity-description">
                                                {activity.hanh_dong}
                                            </div>

                                            <div className="activity-time">{activity.timeAgo}</div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="actions-section">
                        <div className="section-header">
                            <h2>Thao tác nhanh</h2>
                            <p>Các tác vụ thường dùng</p>
                        </div>
                        <div className="quick-actions">
                            <div
                                className="action-card"
                                onClick={() => handleQuickAction('/approval')}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => e.key === 'Enter' && handleQuickAction('/approval')}
                            >
                                <div className="action-icon">
                                    <FileText size={24} />
                                </div>
                                <div className="action-content">
                                    <div className="action-title">Duyệt phiếu mượn</div>
                                    <div className="action-count">{stats.pending} phiếu chờ</div>
                                </div>
                            </div>

                            <div
                                className="action-card"
                                onClick={() => handleQuickAction('/maintenance')}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => e.key === 'Enter' && handleQuickAction('/maintenance')}
                            >
                                <div className="action-icon">
                                    <Settings size={24} />
                                </div>
                                <div className="action-content">
                                    <div className="action-title">Quản lý bảo trì</div>
                                    <div className="action-count">{stats.maintenance} phiếu</div>
                                </div>
                            </div>

                            <div
                                className="action-card"
                                onClick={() => handleQuickAction('/schedule')}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => e.key === 'Enter' && handleQuickAction('/schedule')}
                            >
                                <div className="action-icon">
                                    <Calendar size={24} />
                                </div>
                                <div className="action-content">
                                    <div className="action-title">Lịch học</div>
                                    <div className="action-count">Xem lịch học</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;