// src/components/staff/approval/ApprovalTableRow.jsx
import React from 'react';
import { Eye, Check, X, RefreshCw } from 'lucide-react';
const ApprovalTableRow = ({
                              item,
                              onViewDetail,
                              onApprove,
                              onReject,
                              isProcessing,
                              statusText,
                              statusClass
                          }) => {
    const canApprove = item.status === 'CHO_DUYET';

    return (
        <tr>
            <td><strong>{item.id}</strong></td>
            <td>{item.student}</td>
            <td>{item.class}</td>
            <td>{item.room}</td>
            <td>{item.borrowTime}</td>
            <td>{item.returnTime}</td>
            <td>
        <span className={`status-badge ${statusClass[item.status] || ''}`}>
          {statusText[item.status] || item.status}
        </span>
            </td>
            <td>
                <div className="action-buttons">
                    <button
                        className="btn-view"
                        title="Xem chi tiết"
                        onClick={() => onViewDetail(item)}
                    >
                        <Eye size={16} />
                    </button>

                    {canApprove && (
                        <>
                            <button
                                className="btn-approve"
                                title="Duyệt phiếu"
                                onClick={() => onApprove(item.id)}
                                disabled={isProcessing}
                            >
                                {isProcessing ? (
                                    <RefreshCw size={16} style={{ animation: 'spin 1s linear infinite' }} />
                                ) : (
                                    <Check size={16} />
                                )}
                            </button>

                            <button
                                className="btn-reject"
                                title="Từ chối phiếu"
                                onClick={() => onReject(item.id)}
                                disabled={isProcessing}
                            >
                                <X size={16} />
                            </button>
                        </>
                    )}
                </div>
            </td>
        </tr>
    );
};

export default ApprovalTableRow;