// src/pages/staff/DuyetPhieuMuon.jsx
import React, { useState, useEffect } from 'react';
import { RefreshCw, XCircle } from 'lucide-react';

// Components
import ApprovalHeader from '../../components/staff/approval/ApprovalHeader';
import ApprovalStats from '../../components/staff/approval/ApprovalStats';
import ApprovalControls from '../../components/staff/approval/ApprovalControls';
import ApprovalTable from '../../components/staff/approval/ApprovalTable';
import BorrowDetailModal from './BorrowDetailModal';

// Styles
import './../../components/staff/styles/duyetphieumuon.css';

// ==================== CONSTANTS ====================
const API_BASE_URL = 'http://localhost:8080/api/phieu-muon';

const STATUS_TEXT = {
    'CHO_DUYET': 'Chờ duyệt',
    'DA_DUYET': 'Đã duyệt',
    'DANG_MUON': 'Đang mượn',
    'DA_TRA': 'Đã trả',
    'TRA_THIEU': 'Trả thiếu',
    'QUA_HAN': 'Quá hạn',
    'TU_CHOI': 'Từ chối',
    'DA_HUY': 'Đã hủy'
};

const STATUS_CLASS = {
    'CHO_DUYET': 'status-pending',
    'DA_DUYET': 'status-approved',
    'DANG_MUON': 'status-borrowing',
    'DA_TRA': 'status-returned',
    'TRA_THIEU': 'status-incomplete',
    'QUA_HAN': 'status-overdue',
    'TU_CHOI': 'status-rejected',
    'DA_HUY': 'status-cancelled'
};

const LOAI_PHIEU_TEXT = {
    'CA_NHAN': 'Cá nhân',
    'LOP_HOC': 'Lớp học'
};

// ==================== HELPER FUNCTIONS ====================

const formatDateTime = (datetime) => {
    if (!datetime) return '';
    const date = new Date(datetime);
    if (isNaN(date.getTime())) return '';

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${hours}:${minutes} ${day}/${month}/${year}`;
};

const formatCurrency = (amount) => {
    if (!amount || amount === 0) return '0₫';
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(amount);
};

// ==================== MAIN COMPONENT ====================

const DuyetPhieuMuon = () => {
    // States
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('Tất cả');
    const [loaiPhieuFilter, setLoaiPhieuFilter] = useState('Tất cả');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [borrowRequests, setBorrowRequests] = useState([]);
    const [stats, setStats] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [processingId, setProcessingId] = useState(null);

    // Load data on mount
    useEffect(() => {
        loadData();
    }, []);

    // Fetch data from API
    const loadData = async () => {
        try {
            setLoading(true);
            setError(null);

            const [borrowResponse, statsResponse] = await Promise.all([
                fetch(`${API_BASE_URL}/all`),
                fetch(`${API_BASE_URL}/thong-ke/trang-thai`)
            ]);

            if (!borrowResponse.ok || !statsResponse.ok) {
                throw new Error('Không thể tải dữ liệu từ server');
            }

            const borrowData = await borrowResponse.json();
            const statsData = await statsResponse.json();

            console.log('📊 Borrow Data:', borrowData);
            console.log('📈 Stats Data:', statsData);

            setBorrowRequests(borrowData);
            setStats(statsData);
        } catch (err) {
            setError(err.message);
            console.error('❌ Error loading data:', err);
        } finally {
            setLoading(false);
        }
    };

    // Map API Response to display format
    const mapApiToDisplay = (item) => {
        return {
            id: item.maPM || '',
            loaiPhieu: item.loaiPhieu || 'CA_NHAN',
            loaiPhieuText: LOAI_PHIEU_TEXT[item.loaiPhieu] || 'N/A',
            student: item.tenNguoiMuon || 'N/A',
            room: item.tenPhong || item.maPhong || '',
            borrowTime: formatDateTime(item.thoiDiemMuon),
            returnTime: formatDateTime(item.hanTra),
            actualReturnTime: formatDateTime(item.thoiDiemTra),
            status: item.trangThai || 'CHO_DUYET',
            statusText: STATUS_TEXT[item.trangThai] || 'N/A',

            // Thông tin bổ sung
            nguoiLapPhieu: item.nguoiLapPhieu || null,
            nguoiDuyet: item.nguoiDuyet || null,
            ngayDuyet: formatDateTime(item.ngayDuyet),
            lyDoTuChoi: item.lyDoTuChoi || null,

            soThietBi: item.soThietBi || 0,
            soThietBiDaTra: item.soThietBiDaTra || 0,
            tongPhiBoiThuong: item.tongPhiBoiThuong || 0,
            tongPhiBoiThuongText: formatCurrency(item.tongPhiBoiThuong),

            daQuaHan: item.daQuaHan || false,
            danhSachThietBi: item.danhSachThietBi || [],

            rawData: item
        };
    };

    // Approve request - CẦN BỔ SUNG ENDPOINT Ở BACKEND
    const handleApprove = async (maPM) => {
        if (!window.confirm('Bạn có chắc chắn muốn duyệt phiếu mượn này?')) {
            return;
        }

        setProcessingId(maPM);
        try {
            // Lấy mã nhân viên - TẠM THỜI hardcode
            const maNV = localStorage.getItem('maNV') || 'NV001';

            // TODO: Backend cần thêm endpoint PUT /{maPM}/duyet
            const response = await fetch(`${API_BASE_URL}/${maPM}/duyet`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    maNV: maNV,
                    choDuyet: true,
                    lyDoTuChoi: null
                })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || 'Có lỗi xảy ra khi duyệt phiếu');
            }

            const data = await response.json();

            alert('✅ Đã duyệt phiếu mượn thành công!');
            await loadData(); // Reload data
        } catch (err) {
            console.error('❌ Error approving:', err);
            alert('❌ ' + err.message);
        } finally {
            setProcessingId(null);
        }
    };

    // Reject request - CẦN BỔ SUNG ENDPOINT Ở BACKEND
    const handleReject = async (maPM) => {
        const reason = window.prompt('Nhập lý do từ chối (bắt buộc):');

        if (reason === null) return; // User cancelled

        if (!reason || reason.trim() === '') {
            alert('⚠️ Vui lòng nhập lý do từ chối!');
            return;
        }

        setProcessingId(maPM);
        try {
            const maNV = localStorage.getItem('maNV') || 'NV001';

            // TODO: Backend cần thêm endpoint PUT /{maPM}/duyet
            const response = await fetch(`${API_BASE_URL}/${maPM}/duyet`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    maNV: maNV,
                    choDuyet: false,
                    lyDoTuChoi: reason.trim()
                })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || 'Có lỗi xảy ra khi từ chối phiếu');
            }

            const data = await response.json();

            alert('✅ Đã từ chối phiếu mượn!');
            await loadData();
        } catch (err) {
            console.error('❌ Error rejecting:', err);
            alert('❌ ' + err.message);
        } finally {
            setProcessingId(null);
        }
    };

    // Modal handlers
    const handleViewDetail = (request) => {
        setSelectedRequest(request);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedRequest(null);
    };

    // Filter data
    const displayData = borrowRequests.map(mapApiToDisplay);

    const filteredData = displayData.filter(item => {
        // Search filter
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch =
            item.student.toLowerCase().includes(searchLower) ||
            item.id.toLowerCase().includes(searchLower) ||
            item.room.toLowerCase().includes(searchLower);

        // Status filter
        let matchesStatus = true;
        if (statusFilter !== 'Tất cả') {
            matchesStatus = item.status === statusFilter;
        }

        // Loại phiếu filter
        let matchesLoaiPhieu = true;
        if (loaiPhieuFilter !== 'Tất cả') {
            matchesLoaiPhieu = item.loaiPhieu === loaiPhieuFilter;
        }

        return matchesSearch && matchesStatus && matchesLoaiPhieu;
    });

    // Clear filters
    const handleClearFilters = () => {
        setSearchTerm('');
        setStatusFilter('Tất cả');
        setLoaiPhieuFilter('Tất cả');
    };

    // Calculate stats
    const totalRequests = stats['TAT_CA'] || 0;
    const pendingCount = stats['CHO_DUYET'] || 0;
    const approvedCount = stats['DA_DUYET'] || 0;
    const overdueCount = stats['QUA_HAN'] || 0;

    // ==================== RENDER ====================

    // Loading state
    if (loading) {
        return (
            <div className="approval-page">
                <div className="approval-container">
                    <div style={{ textAlign: 'center', padding: '3rem' }}>
                        <RefreshCw size={48} style={{ animation: 'spin 1s linear infinite' }} />
                        <p style={{ marginTop: '1rem', fontSize: '1.1rem' }}>Đang tải dữ liệu...</p>
                    </div>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="approval-page">
                <div className="approval-container">
                    <div style={{ textAlign: 'center', padding: '3rem', color: '#e74c3c' }}>
                        <XCircle size={48} />
                        <p style={{ marginTop: '1rem', fontSize: '1.1rem' }}>❌ Lỗi: {error}</p>
                        <button
                            onClick={loadData}
                            style={{
                                marginTop: '1.5rem',
                                padding: '0.75rem 1.5rem',
                                backgroundColor: '#3498db',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontSize: '1rem',
                                transition: 'background-color 0.2s'
                            }}
                            onMouseOver={(e) => e.target.style.backgroundColor = '#2980b9'}
                            onMouseOut={(e) => e.target.style.backgroundColor = '#3498db'}
                        >
                            <RefreshCw size={16} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
                            Thử lại
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Main content
    return (
        <div className="approval-page">
            <div className="approval-container">

                <ApprovalHeader
                    pendingCount={pendingCount}
                    approvedCount={approvedCount}
                    overdueCount={overdueCount}
                />

                <ApprovalStats
                    totalRequests={totalRequests}
                    pendingCount={pendingCount}
                    approvedCount={approvedCount}
                    overdueCount={overdueCount}
                />

                <ApprovalControls
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    statusFilter={statusFilter}
                    onFilterChange={setStatusFilter}
                    loaiPhieuFilter={loaiPhieuFilter}
                    onLoaiPhieuChange={setLoaiPhieuFilter}
                    onRefresh={loadData}
                    loading={loading}
                    statusOptions={Object.keys(STATUS_TEXT)}
                    statusText={STATUS_TEXT}
                />

                {/* Results summary */}
                {(searchTerm || statusFilter !== 'Tất cả' || loaiPhieuFilter !== 'Tất cả') && (
                    <div style={{
                        padding: '0.75rem 1rem',
                        backgroundColor: '#f8f9fa',
                        borderRadius: '6px',
                        marginBottom: '1rem',
                        fontSize: '0.95rem',
                        color: '#666',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <span>
                            Tìm thấy <strong>{filteredData.length}</strong> phiếu mượn
                            {searchTerm && ` với từ khóa "${searchTerm}"`}
                            {statusFilter !== 'Tất cả' && ` - Trạng thái: ${STATUS_TEXT[statusFilter]}`}
                            {loaiPhieuFilter !== 'Tất cả' && ` - Loại: ${LOAI_PHIEU_TEXT[loaiPhieuFilter]}`}
                        </span>
                        <button
                            onClick={handleClearFilters}
                            style={{
                                padding: '0.4rem 0.8rem',
                                backgroundColor: '#e74c3c',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '0.85rem',
                                transition: 'background-color 0.2s'
                            }}
                            onMouseOver={(e) => e.target.style.backgroundColor = '#c0392b'}
                            onMouseOut={(e) => e.target.style.backgroundColor = '#e74c3c'}
                        >
                            Xóa bộ lọc
                        </button>
                    </div>
                )}

                <ApprovalTable
                    data={filteredData}
                    onViewDetail={handleViewDetail}
                    onApprove={handleApprove}
                    onReject={handleReject}
                    processingId={processingId}
                    statusText={STATUS_TEXT}
                    statusClass={STATUS_CLASS}
                />

                {/* Empty state */}
                {filteredData.length === 0 && !loading && (
                    <div style={{
                        textAlign: 'center',
                        padding: '3rem',
                        color: '#999'
                    }}>
                        <p style={{ fontSize: '1.1rem' }}>Không tìm thấy phiếu mượn nào</p>
                        {(searchTerm || statusFilter !== 'Tất cả' || loaiPhieuFilter !== 'Tất cả') && (
                            <button
                                onClick={handleClearFilters}
                                style={{
                                    marginTop: '1rem',
                                    padding: '0.5rem 1rem',
                                    backgroundColor: '#3498db',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}
                            >
                                Xóa bộ lọc
                            </button>
                        )}
                    </div>
                )}

            </div>

            <BorrowDetailModal
                isOpen={isModalOpen}
                onClose={closeModal}
                requestData={selectedRequest}
            />
        </div>
    );
};

export default DuyetPhieuMuon;