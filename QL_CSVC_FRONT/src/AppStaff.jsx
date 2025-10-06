import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './staff/staffLayout/layout/Header';
import Dashboard from './staff/staff/Dashboard';
import DuyetPhieuMuon from './staff/staff/DuyetPhieuMuon';
import QuanLyBaoTri from './staff/staff/QuanLyBaoTri';
import LichHoc from './staff/staff/LichHoc';
import HoSo from './staff/staff/HoSo';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/approval" element={<DuyetPhieuMuon />} />
          <Route path="/maintenance" element={<QuanLyBaoTri />} />
          <Route path="/schedule" element={<LichHoc />} />
          <Route path="/hoso" element={<HoSo />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
