import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import UserBody from "./components/UserBody";
import Verifier from "./components/Verifier";
import Admin from "./components/Admin";
// import LoanForm from "./components/LoanForm";
import AuthForm from "./components/AuthForm";
// import Navbar from "./components/Navbar"; 

// const Layout = () => (
//   <>
//     <Navbar /> {/* Navbar for all pages */}
//     <Routes />
//   </>
// );

const App = () => {
  return (
    <Router>
      {/* Redirect from `/` to `/user` */}
      <Routes>
        {/* <Route path="/" element={<Navigate to="/user" replace />} /> */}
        
        {/* Main Layout with Navbar included */}
          <Route path="/" element={<AuthForm/>} />
          <Route path="/user" element={<UserBody />} />
          <Route path="/verifier" element={<Verifier />} />
          <Route path="/admin" element={<Admin />} />
        
      </Routes>
    </Router>
  );
};

export default App;
