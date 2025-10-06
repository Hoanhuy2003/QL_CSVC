import React, { useState } from 'react';
import { Clock, Calendar, List, Plus, ExternalLink } from 'lucide-react';
import '../staffLayout/styles/lichhoc.css';

const LichHoc = () => {
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'calendar'

  const scheduleData = [
    {
      id: 'LTC001',
      name: 'Lập trình Java cơ bản',
      day: 'Thứ 2',
      time: '07:30 - 10:00',
      room: 'A101',
      roomDetail: 'Phòng học A101'
    },
    {
      id: 'LTC006',
      name: 'Thuật toán và cấu trúc dữ liệu',
      day: 'Thứ 3',
      time: '13:30 - 16:00',
      room: 'B201',
      roomDetail: 'Phòng học B201'
    },
    {
      id: 'LTC005',
      name: 'Thực hành Cơ khí',
      day: 'Thứ 5',
      time: '07:30 - 11:00',
      room: 'E203',
      roomDetail: 'Phòng thực hành Cơ khí'
    }
  ];

  const weekDays = [
    { key: 'thu2', label: 'Thứ 2' },
    { key: 'thu3', label: 'Thứ 3', isToday: true },
    { key: 'thu4', label: 'Thứ 4' },
    { key: 'thu5', label: 'Thứ 5' },
    { key: 'thu6', label: 'Thứ 6' },
    { key: 'thu7', label: 'Thứ 7' },
    { key: 'chunhat', label: 'Chủ nhật' }
  ];

  const getClassesForDay = (dayKey) => {
    const dayMap = {
      'thu2': 'Thứ 2',
      'thu3': 'Thứ 3',
      'thu4': 'Thứ 4',
      'thu5': 'Thứ 5',
      'thu6': 'Thứ 6',
      'thu7': 'Thứ 7',
      'chunhat': 'Chủ nhật'
    };
    return scheduleData.filter(item => item.day === dayMap[dayKey]);
  };

  return (
    <div className="schedule-container">
      {/* Header */}
      <div className="schedule-header">
        <div className="schedule-title">
          <h1>Lịch học của bạn</h1>
          <p className="schedule-subtitle">Quản lý lịch giảng dạy cá nhân</p>
        </div>
        <div className="schedule-actions">
          <button 
            className={`btn ${viewMode === 'calendar' ? 'btn-dark' : 'btn-outline'}`}
            onClick={() => setViewMode('calendar')}
          >
            <Calendar size={16} />
            Lịch biểu
          </button>
          <button 
            className={`btn ${viewMode === 'list' ? 'btn-dark' : 'btn-outline'}`}
            onClick={() => setViewMode('list')}
          >
            <List size={16} />
            Danh sách
          </button>
          <button className="btn btn-primary">
            <Plus size={16} />
            Thêm lịch học
          </button>
        </div>
      </div>

      {/* Schedule Content */}
      {viewMode === 'list' ? (
        <>
          {/* Today's Schedule */}
          <div className="today-schedule">
            <div className="today-title">
              <Clock className="icon" />
              <h2>Lịch học hôm nay</h2>
            </div>
            <p className="today-date">Thứ 3</p>
            
            <div className="today-class">
              <div className="today-class-info">
                <h3>Thuật toán và cấu trúc dữ liệu</h3>
                <p className="today-class-details">13:30 - 16:00 • Phòng học B201</p>
              </div>
              <div className="today-class-code">LTC006</div>
            </div>
          </div>

          {/* Schedule Table */}
          <div className="schedule-table-container">
            <table className="schedule-table">
              <thead>
                <tr>
                  <th>Mã LTC</th>
                  <th>Tên lớp</th>
                  <th>Thứ</th>
                  <th>Thời gian</th>
                  <th>Phòng học</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {scheduleData.map((item) => (
                  <tr key={item.id}>
                    <td className="class-code">{item.id}</td>
                    <td className="class-name">{item.name}</td>
                    <td className="class-day">{item.day}</td>
                    <td>
                      <div className="class-time">
                        <Clock className="icon" />
                        {item.time}
                      </div>
                    </td>
                    <td>
                      <div className="class-room">{item.room}</div>
                      <div className="class-room-detail">{item.roomDetail}</div>
                    </td>
                    <td className="class-actions">
                      <button className="btn-action" title="Xem chi tiết">
                        <ExternalLink className="icon" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <>
          {/* Today's Schedule */}
          <div className="today-schedule">
            <div className="today-title">
              <Clock className="icon" />
              <h2>Lịch học hôm nay</h2>
            </div>
            <p className="today-date">Thứ 3</p>
            
            <div className="today-class">
              <div className="today-class-info">
                <h3>Thuật toán và cấu trúc dữ liệu</h3>
                <p className="today-class-details">13:30 - 16:00 • Phòng học B201</p>
              </div>
              <div className="today-class-code">LTC006</div>
            </div>
          </div>

          {/* Weekly Calendar */}
          <div className="weekly-calendar">
            <h2 className="calendar-title">Lịch học trong tuần</h2>
            <div className="calendar-grid">
              {weekDays.map((day) => {
                const classes = getClassesForDay(day.key);
                return (
                  <div key={day.key} className={`calendar-day ${day.isToday ? 'today' : ''}`}>
                    <div className="day-header">
                      <h3>{day.label}</h3>
                      {day.isToday && <span className="today-badge">Hôm nay</span>}
                    </div>
                    <div className="day-content">
                      {classes.length > 0 ? (
                        classes.map((classItem) => (
                          <div key={classItem.id} className="calendar-class">
                            <div className="class-time-small">{classItem.time}</div>
                            <div className="class-name-small">{classItem.name}</div>
                            <div className="class-room-small">{classItem.room}</div>
                            <div className="class-code-small">{classItem.id}</div>
                          </div>
                        ))
                      ) : (
                        <div className="no-class">Không có lịch học</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LichHoc;