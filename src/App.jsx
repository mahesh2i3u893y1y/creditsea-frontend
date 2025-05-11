import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import UserBody from "./components/UserBody";
import Verifier from "./components/Verifier";
import Admin from "./components/Admin";
import AuthForm from "./components/AuthForm";
import Header from "./components/Header";

const AppRoutes = () => {
  const location = useLocation();

  return (
    <>
      {/* Only show Header if not on "/" (i.e., login route) */}
      {location.pathname !== "/" && <Header />}

      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route path="/user" element={<UserBody />} />
        <Route path="/verifier" element={<Verifier />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App;
