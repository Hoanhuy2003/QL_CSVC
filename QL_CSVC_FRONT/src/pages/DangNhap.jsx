import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DangNhap.css";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "123") {
      localStorage.setItem("role", "admin");
      navigate("/admin");
    } else if (username === "user" && password === "123") {
      localStorage.setItem("role", "user");
      navigate("/user");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h1 className="system-title">Hệ thống quản lý cơ sở vật chất</h1>
        <h2 className="login-title">Đăng nhập</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Tên đăng nhập"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Đăng nhập</button>
        </form>
        <p className="register-text">
          Chưa có tài khoản?{" "}
          <span onClick={() => navigate("/register")}>Đăng ký ngay</span>
        </p>
      </div>
    </div>
  );
}
