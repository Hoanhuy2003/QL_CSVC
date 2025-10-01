import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/staff/layout/Header'
import Dashboard from './pages/staff/Dashboard'
import ApprovalPage from './pages/staff/DuyetPhieuMuon'
import MaintenancePage from './pages/staff/QuanLyBaoTri'
import LichHoc from './pages/staff/LichHoc'
import HoSo from './pages/staff/HoSo'

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/approval" element={<ApprovalPage />} />
          <Route path="/maintenance" element={<MaintenancePage />} />
          <Route path="/schedule" element={<LichHoc />} />
          <Route path="/hoso" element={<HoSo />} />
        </Routes>
      </main>
    </div>
  )
}

export default App