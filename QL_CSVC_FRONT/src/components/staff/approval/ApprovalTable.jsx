// src/components/staff/approval/ApprovalTable.jsx
import React from 'react';
import { Search } from 'lucide-react';
import ApprovalTableRow from './ApprovalTableRow';

const ApprovalTable = ({
                           data,
                           onViewDetail,
                           onApprove,
                           onReject,
                           processingId,
                           onClearFilter,
                           statusText,
                           statusClass
                       }) => {
    return (
        <div className="table-container">
            <table className="approval-table">
                <thead>
                <tr>
                    <th>Mã phiếu</th>
                    <th>Người lập</th>
                    <th>Lớp học</th>
                    <th>Phòng</th>
                    <th>Thời gian mượn</th>
                    <th>Hạn trả</th>
                    <th>Trạng thái</th>
                    <th style={{ textAlign: 'center' }}>Hành động</th>
                </tr>
                </thead>
                <tbody>
                {data.length > 0 ? (
                    data.map((item, index) => (
                        <ApprovalTableRow
                            key={index}
                            item={item}
                            onViewDetail={onViewDetail}
                            onApprove={onApprove}
                            onReject={onReject}
                            isProcessing={processingId === item.id}
                            statusText={statusText}
                            statusClass={statusClass}
                        />
                    ))
                ) : (
                    <tr>
                        <td colSpan="8" style={{ textAlign: 'center', padding: '3rem', color: '#999' }}>
                            <Search size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
                            <p>Không tìm thấy phiếu mượn nào phù hợp</p>
                            {onClearFilter && (
                                <button
                                    onClick={onClearFilter}
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
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default ApprovalTable;