// src/components/staff/approval/ApprovalHeader.jsx
import React from 'react';

const ApprovalHeader = ({ pendingCount, approvedCount, overdueCount }) => {
    return (
        <div className="page-header">
            <div>
                <h1>Duyệt phiếu mượn thiết bị</h1>
                <p style={{ color: '#666', fontSize: '0.95rem', marginTop: '0.5rem' }}>
                    Quản lý và phê duyệt các yêu cầu mượn thiết bị từ sinh viên
                </p>
            </div>
            <div className="status-badges">
                <span className="badge-pending">{pendingCount} chờ duyệt</span>
                <span className="badge-approved">{approvedCount} đã duyệt</span>
                <span className="badge-overdue">{overdueCount} quá hạn</span>
            </div>
        </div>
    );
};

export default ApprovalHeader;