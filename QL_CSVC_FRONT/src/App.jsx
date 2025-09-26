import React from 'react';
   import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
   import UserHeader from './components/header/UserHeader/Header';
   import BorrowRequest from './pages/user/BorrowRequest';
   import UserDashboard from './pages/user/UserDashboard';
   import UserProfile from './pages/user/UserProfile';


   const App = () => {
     return (
       <Router>
         <UserHeader />
         <Routes>
           <Route path="/" element={<UserDashboard />} />
           <Route path="/borrow-request" element={<BorrowRequest />} />
           <Route path="/dashboard" element={<UserDashboard />} />
           <Route path="/profile" element={<UserProfile />} />
           {/* Thêm route cho Mở rộng và Lịch học nếu cần */}
           <Route path="/expand" element={<div>Trang Mở rộng</div>} />
           <Route path="/schedule" element={<div>Trang Lịch học</div>} />
         </Routes>
       </Router>
     );
   };
   
export default App;