import React, { useState } from 'react';
import './LoanForm.css';

const LoanForm = ({ isOpen = true, onClose = () => {}, roomId = "2A36" }) => {
  const [selectedClass, setSelectedClass] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [returnTime, setReturnTime] = useState('09:17');

  const classes = [
    'Toán Rời Rạc 2 nhóm 1 (2022-2023 hk1)',
    'Cấu Trúc Dữ Liệu nhóm 2 (2022-2023 hk1)',
    'Công Nghệ Phần Mềm nhóm 3 (2022-2023 hk1)',
    'Lập Trình Web nhóm 1 (2022-2023 hk1)',
    'Cơ Sở Dữ Liệu nhóm 2 (2022-2023 hk1)'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      roomId,
      selectedClass,
      returnDate,
      returnTime
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <h2 className="modal-title">
            Thêm Phiếu Mượn<br />
            Phòng - {roomId}
          </h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        {/* Form */}
        <form className="modal-form" onSubmit={handleSubmit}>
          {/* Lớp học */}
          <div className="form-group">
            <label htmlFor="class-select" className="form-label">
              Lớp Học <span className="required">*</span>
            </label>
            <select
              id="class-select"
              className="form-select"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              required
            >
              <option value="">Chọn lớp học...</option>
              {classes.map((className, index) => (
                <option key={index} value={className}>
                  {className}
                </option>
              ))}
            </select>
            <div className="select-arrow">▼</div>
          </div>

          {/* Hạn trả */}
          <div className="form-group">
            <label htmlFor="return-date" className="form-label">
              Hạn Trả <span className="required">*</span>
            </label>
            <div className="datetime-container">
              <input
                type="date"
                id="return-date"
                className="form-input date-input"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                required
              />
              <input
                type="time"
                className="form-input time-input"
                value={returnTime}
                onChange={(e) => setReturnTime(e.target.value)}
                required
              />
              <button type="button" className="calendar-button" disabled>
                📅
              </button>
            </div>
          </div>

          {/* Submit */}
          <button type="submit" className="submit-button">
            THÊM
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoanForm;
