import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HeaderAdmin from "./admin/headeradmin/HeaderAdmin";
import DashboardAdmin from "./admin/dashboardadmin/DashboardAdmin";
import QuanLyTaiKhoan from "./admin/quanlytaikhoan/QuanLyTaiKhoan";
import QuanLyThietBi from "./admin/quanlythietbi/QuanLyThietBi";

function App() {
  return (
    <Router>
      <div>
        {/* Header luôn hiện */}
        <HeaderAdmin />

        {/* Nội dung thay đổi theo route */}
        <Routes>
          {/* Route mặc định, khi vào "/" thì redirect sang /admin/dashboard */}
          <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />

          {/* Dashboard */}
          <Route path="/admin/dashboard" element={<DashboardAdmin />} />

          {/* Ví dụ sau này có thêm */}
          <Route path="/admin/users" element={<QuanLyTaiKhoan />} />
          <Route path="/admin/devices" element={<QuanLyThietBi />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
