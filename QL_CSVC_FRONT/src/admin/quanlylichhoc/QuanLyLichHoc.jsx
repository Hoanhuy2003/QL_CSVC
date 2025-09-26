import React, { useState } from 'react';
import { Calendar, List, Plus, Edit, Trash2, Clock } from 'lucide-react';
import './QuanLyLichHoc.css';

const QuanLyLichHoc = () => {
  const [currentView, setCurrentView] = useState('calendar');
  
  // Dữ liệu lịch học mẫu
  const scheduleData = {
    'Thứ 2': [
      {
        id: 1,
        code: 'LTC001',
        time: '07:30 - 10:00',
        subject: 'Lập trình Java cơ bản',
        room: 'A101',
        roomDescription: 'Phòng học A101',
        instructor: 'TS. Nguyễn Văn A',
        type: 'theory',
        day: 'Thứ 2'
      },
      {
        id: 2,
        code: 'LTC002',
        time: '13:30 - 16:00',
        subject: 'Cơ sở dữ liệu',
        room: 'B205',
        roomDescription: 'Phòng thí nghiệm B205',
        instructor: 'ThS. Trần Thị B',
        type: 'lab',
        day: 'Thứ 2'
      },
      {
        id: 3,
        code: 'LTC003',
        time: '13:30 - 16:00',
        subject: 'Hướng đối tượng',
        room: 'D205',
        roomDescription: 'Phòng thực hành D205',
        instructor: 'ThS. Trần Thị Ba',
        type: 'practice',
        day: 'Thứ 2'
      }
    ],
    'Thứ 3': [
      {
        id: 4,
        code: 'LTC003',
        time: '07:30 - 10:00',
        subject: 'Mạng máy tính',
        room: 'C301',
        roomDescription: 'Phòng máy tính C301',
        instructor: 'TS. Lê Văn C',
        type: 'theory',
        day: 'Thứ 3'
      }
    ],
    'Thứ 4': [
      {
        id: 5,
        code: 'LTC004',
        time: '13:30 - 16:00',
        subject: 'Toán cao cấp A1',
        room: 'A102',
        roomDescription: 'Phòng học A102',
        instructor: 'PGS. Phạm Thị D',
        type: 'theory',
        day: 'Thứ 4'
      }
    ],
    'Thứ 5': [
      {
        id: 6,
        code: 'LTC005',
        time: '07:30 - 11:00',
        subject: 'Thực hành Cơ khí',
        room: 'E203',
        roomDescription: 'Phòng thực hành Cơ khí',
        instructor: 'TS. Nguyễn Văn A',
        type: 'practice',
        day: 'Thứ 5'
      }
    ],
    'Thứ 6': [
        {
        id: 7,
        code: 'LTC006',
        time: '07:30 - 11:00',
        subject: 'Thực hành Tin học',
        room: 'C203',
        roomDescription: 'Phòng thực hành Tin học',
        instructor: 'TS. Nguyễn Đức Dư',
        type: 'practice',
        day: 'Thứ 6'
      }
    ],
    'Thứ 7': [],
    'Chủ nhật': []
  };

  const weekDays = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'];

  // Chuyển đổi dữ liệu thành mảng phẳng cho view danh sách
  const flatScheduleData = Object.values(scheduleData).flat();

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

  const renderListView = () => (
    <div className="list-view">
      {/* Header của bảng */}
      <div className="list-header">
        <div className="list-header-cell">Mã LTC</div>
        <div className="list-header-cell">Tên lớp</div>
        <div className="list-header-cell">Thứ</div>
        <div className="list-header-cell">Thời gian</div>
        <div className="list-header-cell">Phòng học</div>
        <div className="list-header-cell">Giảng viên</div>
        <div className="list-header-cell">Hành động</div>
      </div>
      
      {/* Dữ liệu */}
      {flatScheduleData.map((classItem) => (
        <div key={classItem.id} className="list-row">
          <div className="list-cell list-code">{classItem.code}</div>
          <div className="list-cell list-subject">{classItem.subject}</div>
          <div className="list-cell">{classItem.day}</div>
          <div className="list-cell list-time">
            <Clock size={14} className="time-icon" />
            {classItem.time}
          </div>
          <div className="list-cell list-room">
            <div className="room-name">{classItem.room}</div>
            <div className="room-description">{classItem.roomDescription}</div>
          </div>
          <div className="list-cell">{classItem.instructor}</div>
          <div className="list-cell list-actions">
            <button className="action-btn edit-btn">
              <Edit size={16} />
            </button>
            <button className="action-btn delete-btn">
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderCalendarView = () => (
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
        <h2>{currentView === 'calendar' ? 'Lịch học trong tuần' : 'Danh sách lịch học'}</h2>
      </div>

      {/* Content */}
      {currentView === 'calendar' ? renderCalendarView() : renderListView()}

    
    </div>
  );
};

export default QuanLyLichHoc;