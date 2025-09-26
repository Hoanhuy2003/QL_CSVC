import React from "react";
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import RoomGrid from "./components/roomgrid/RoomGrid";

import RoomGrid from "./components/roomgrid/RoomGrid";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
    <>
     <BrowserRouter>
      <Routes>
        {/* Trang mặc định */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Auth */}
        <Route path="/login" element={<DangNhap />} />
        <Route path="/register" element={<DangKy />} />

        {/* Ví dụ sau khi login */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRole="admin">
              <h1 style={{ textAlign: "center" }}>Xin chào ADMIN 👑</h1>
            </ProtectedRoute>
          }
        />
        <Route
          path="/user"
          element={
            <ProtectedRoute allowedRole="user">
              <div>
      <Header />
      <Sidebar />
      <RoomGrid />
    </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
    </>
    
  )
}

export default App;
