// src/components/staff/approval/ApprovalStats.jsx
import React from 'react';
import { Clock, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

const StatCard = ({ icon: Icon, number, label, type }) => {
    return (
        <div className={`stat-card ${type}`}>
            <Icon size={24} />
            <div>
                <div className="stat-number">{number}</div>
                <div className="stat-label">{label}</div>
            </div>
        </div>
    );
};

const ApprovalStats = ({ totalRequests, pendingCount, approvedCount, overdueCount }) => {
    return (
        <div className="stats-row">
            <StatCard
                icon={Clock}
                number={totalRequests}
                label="Tổng phiếu mượn"
                type="total"
            />
            <StatCard
                icon={AlertTriangle}
                number={pendingCount}
                label="Chờ duyệt"
                type="pending"
            />
            <StatCard
                icon={CheckCircle}
                number={approvedCount}
                label="Đã duyệt"
                type="approved"
            />
            <StatCard
                icon={XCircle}
                number={overdueCount}
                label="Quá hạn"
                type="overdue"
            />
        </div>
    );
};

export default ApprovalStats;