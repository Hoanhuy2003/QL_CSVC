import React, { useState } from 'react';
import { Calendar, List, Plus } from 'lucide-react';
import './QuanLyLichHoc.css';

const QuanLyLichHoc = () => {
  const [currentView, setCurrentView] = useState('calendar');
  
  // Dữ liệu lịch học mẫu
  const scheduleData = {
    'Thứ 2': [
      {
        id: 1,
        time: '07:30 - 10:00',
        subject: 'Lập trình Java cơ bản',
        room: 'A101',
        instructor: 'TS. Nguyễn Văn A',
        type: 'theory'
      },
      {
        id: 2,
        time: '13:30 - 16:00',
        subject: 'Cơ sở dữ liệu',
        room: 'B205',
        instructor: 'ThS. Trần Thị B',
        type: 'lab'
      },
      {
        id: 3,
        time: '13:30 - 16:00',
        subject: 'Hướng đối tượng',
        room: 'D205',
        instructor: 'ThS. Trần Thị Ba',
        type: 'practice'
      }
    ],
    'Thứ 3': [
      {
        id: 4,
        time: '07:30 - 10:00',
        subject: 'Mạng máy tính',
        room: 'C301',
        instructor: 'TS. Lê Văn C',
        type: 'theory'
      }
    ],
    'Thứ 4': [
      {
        id: 5,
        time: '13:30 - 16:00',
        subject: 'Toán cao cấp A1',
        room: 'A102',
        instructor: 'PGS. Phạm Thị D',
        type: 'theory'
      }
    ],
    'Thứ 5': [
      {
        id: 6,
        time: '07:30 - 11:00',
        subject: 'Thực hành Cơ khí',
        room: 'E203',
        instructor: 'TS. Nguyễn Văn A',
        type: 'practice'
      }
    ],
    'Thứ 6': [
        {
        id: 7,
        time: '07:30 - 11:00',
        subject: 'Thực hành Tin học',
        room: 'C203',
        instructor: 'TS. Nguyễn Đức Dư',
        type: 'practice'
      }
    ],
    'Thứ 7': [],
    'Chủ nhật': []
  };

  const weekDays = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'];

  const getClassTypeColor = (type) => {
    switch (type) {
      case 'theory':
        return 'class-theory';
      case 'lab':
        return 'class-lab';
      case 'practice':
        return 'class-practice';
      default:
        return 'class-theory';
    }
  };

  const renderScheduleCard = (classItem) => (
    <div key={classItem.id} className={`schedule-card ${getClassTypeColor(classItem.type)}`}>
      <div className="schedule-time">{classItem.time}</div>
      <div className="schedule-subject">{classItem.subject}</div>
      <div className="schedule-room">{classItem.room}</div>
      <div className="schedule-instructor">{classItem.instructor}</div>
    </div>
  );

  const renderEmptyDay = () => (
    <div className="empty-day">
      <div className="empty-text">Không có lịch học</div>
    </div>
  );

  return (
    <div className="schedule-management">
      {/* Header */}
      <div className="header">
        <h1 className="page-title">Quản lý lịch học</h1>
        <div className="header-actions">
          <button 
            className={`view-button ${currentView === 'calendar' ? 'active' : ''}`}
            onClick={() => setCurrentView('calendar')}
          >
            <Calendar size={18} />
            Lịch biểu
          </button>
          <button 
            className={`view-button ${currentView === 'list' ? 'active' : ''}`}
            onClick={() => setCurrentView('list')}
          >
            <List size={18} />
            Danh sách
          </button>
          <button className="add-button">
            <Plus size={18} />
            Thêm lịch học
          </button>
        </div>
      </div>

      {/* Schedule Title */}
      <div className="schedule-title">
        <h2>Lịch học trong tuần</h2>
      </div>

      {/* Weekly Schedule Grid */}
      <div className="schedule-grid">
        {weekDays.map((day) => (
          <div key={day} className="day-column">
            <div className="day-header">
              <h3>{day}</h3>
            </div>
            <div className="day-content">
              {scheduleData[day].length > 0 
                ? scheduleData[day].map(renderScheduleCard)
                : renderEmptyDay()
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuanLyLichHoc;