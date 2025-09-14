// DetailLoanForm.jsx
import React, { useState } from 'react';
import './DetailLoanForm.css';

const DetailLoanForm = () => {
  const [selectedStudent, setSelectedStudent] = useState('NI5DCCN001');

  const students = [
    'NI5DCCN001 Lê Văn A',
    'NI5DCCN002 Nguyễn Văn B'
  ];

  const borrowedDevices = [
    { student: 'NI5DCCN001 Lê Văn A', items: ['Máy Chiếu-MC3', 'Cáp Type C-TYPEC1'] },
    { student: 'NI5DCCN002 Nguyễn Văn B', items: ['Cáp HDMI-HDMI4'] }
  ];

  const equipment = {
    HDMI: ['HDMI5', 'HDMI6', 'HDMI7', 'HDMI8'],
    Key: ['KEY4'],
    Projector: ['MC1', 'MC3'],
    Micro: ['MIC4'],
    TypeC: ['TYPEC2', 'TYPEC3', 'TYPEC4']
  };

  return (
    <div className="detail-overlay">
      <div className="detail-container">
        <div className="header">
          <h2>Chi Tiết Phiếu Mượn</h2>
        </div>

        <div className="info-loan-section">
          <div className="info-box">
            <p><strong>Lớp:</strong> Công Nghệ Phần Mềm nhóm 2</p>
            <p><strong>Phòng:</strong> 2AI6</p>
            <p><strong>Ngày mượn:</strong> 31/05/2022 05:29</p>
            <p><strong>Hạn Trả:</strong> 31/05/2022 12:00</p>
          </div>

          <div className="loan-box">
            {borrowedDevices.map((bd, index) => (
              <div key={index} className="loan-entry">
                <select>
                  <option>{bd.student}</option>
                </select>
                {bd.items.map((item, idx) => (
                  <div className="loan-item" key={idx}>
                    <select><option>{item}</option></select>
                    <button className="btn red">Mất</button>
                    <button className="btn blue">Trả</button>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="borrower-id-box">
          <label>Sinh viên mượn</label>
          <input value={selectedStudent} readOnly />
        </div>

        <div className="equipment-grid">
          {Object.entries(equipment).map(([key, list]) => (
            <div className="equipment-col" key={key}>
              <h4>{key === 'HDMI' ? 'Cáp HDMI' :
                  key === 'Key' ? 'Chìa Khóa' :
                  key === 'Projector' ? 'Máy Chiếu' :
                  key === 'Micro' ? 'Micro' :
                  'Cáp Type C'}</h4>
              {list.map((item, idx) => (
                <label key={idx}>
                  <input type="checkbox" /> {item}
                </label>
              ))}
            </div>
          ))}
        </div>

        <div className="footer">
          <button className="submit-btn">Ghi Mượn</button>
        </div>
      </div>
    </div>
  );
};

export default DetailLoanForm;