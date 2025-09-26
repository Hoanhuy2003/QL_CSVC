import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DangKy.css";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    // Giả sử gọi API lưu user vào database
    const newUser = {
      username,
      password,
      email,
      fullname,
      role: "user", // mặc định user
    };

    console.log("Tạo user:", newUser);

    alert("Đăng ký thành công!");
    navigate("/login");
  };

  return (
    <div className="register-container">
      <h2>Đăng ký tài khoản</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Họ và tên"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Tên đăng nhập"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Đăng ký</button>
      </form>

      <p>
        Đã có tài khoản?{" "}
        <span onClick={() => navigate("/login")}>Đăng nhập</span>
      </p>
    </div>
  );
}
