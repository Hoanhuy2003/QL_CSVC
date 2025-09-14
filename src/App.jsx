import React from "react";
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import RoomGrid from "./components/roomgrid/RoomGrid";
import LoanForm from "./components/loanform/LoanForm";
import DetailLoanForm from "./components/detailloanform/DetailLoanForm";



function App() {
  return (
    <>
    <div>
      <Header />
      <Sidebar />
      <RoomGrid />
      <LoanForm />
      {/* <DetailLoanForm /> */}   //muốn hiện DetailLoanForm thì bỏ comment dòng này
    </div>
    </>
    
  )
}

export default App;
