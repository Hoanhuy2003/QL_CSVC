import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Admin
import HeaderAdmin from "./admin/headeradmin/HeaderAdmin";
import DashboardAdmin from "./admin/dashboardadmin/DashboardAdmin";
import QuanLyTaiKhoan from "./admin/quanlytaikhoan/QuanLyTaiKhoan";
import QuanLyThietBi from "./admin/quanlythietbi/QuanLyThietBi";
import QuanLyLichHoc from "./admin/quanlylichhoc/QuanLyLichHoc";
import QuanLyPhongHoc from "./admin/quanlyphonghoc/QuanLyPhongHoc";

// User
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import DangNhap from "./pages/DangNhap";
import DangKy from "./pages/DangKy";

// Component bảo vệ route theo role
function ProtectedRoute({ children, allowedRole }) {
  const role = localStorage.getItem("role"); // lấy role từ localStorage
  if (role !== allowedRole) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  return (
    <Router>
      <div>
        <Routes>
          {/* Trang mặc định */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* Auth */}
          <Route path="/login" element={<DangNhap />} />
          <Route path="/register" element={<DangKy />} />

          {/* Admin routes */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute allowedRole="admin">
                <div>
                  <HeaderAdmin />
                  <Routes>
                    <Route
                      path="dashboard"
                      element={<DashboardAdmin />}
                    />
                    <Route
                      path="users"
                      element={<QuanLyTaiKhoan />}
                    />
                    <Route
                      path="devices"
                      element={<QuanLyThietBi />}
                    />
                    <Route
                      path="schedule"
                      element={<QuanLyLichHoc />}
                    />
                    <Route
                      path="rooms"
                      element={<QuanLyPhongHoc />}
                    />
                  </Routes>
                </div>
              </ProtectedRoute>
            }
          />

          {/* User routes */}
          <Route
            path="/user"
            element={
              <ProtectedRoute allowedRole="user">
                <div>
                  <Header />
                  <Sidebar />
                </div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
