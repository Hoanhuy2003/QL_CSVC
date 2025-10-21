// src/components/staff/approval/ApprovalControls.jsx
import React from 'react';
import { Search, RefreshCw } from 'lucide-react';

const FILTER_OPTIONS = [
    { value: 'Tất cả', label: 'Tất cả trạng thái' },
    { value: 'Chờ duyệt', label: '⏳ Chờ duyệt' },
    { value: 'Đã duyệt', label: '✓ Đã duyệt' },
    { value: 'Quá hạn', label: '⚠ Quá hạn' },
    { value: 'Đã trả', label: '✓ Đã trả' },
    { value: 'Từ chối', label: '✗ Từ chối' }
];

const ApprovalControls = ({
                              searchTerm,
                              onSearchChange,
                              statusFilter,
                              onFilterChange,
                              onRefresh,
                              loading
                          }) => {
    return (
        <div className="controls-row">
            <div className="search-box">
                <Search size={20} />
                <input
                    type="text"
                    placeholder="Tìm theo mã phiếu, người lập, lớp học, phòng..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>

            <div className="filter-group">
                <select
                    value={statusFilter}
                    onChange={(e) => onFilterChange(e.target.value)}
                    className="filter-dropdown"
                >
                    {FILTER_OPTIONS.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>

                <button
                    onClick={onRefresh}
                    className="btn-refresh"
                    title="Làm mới dữ liệu"
                    disabled={loading}
                >
                    <RefreshCw size={18} />
                </button>
            </div>
        </div>
    );
};

export default ApprovalControls;