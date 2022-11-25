import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Profile from "./components/Profile/Profile";
import CodeGenerator from "./components/CodeGenerator/CodeGenerator2";
import { useState } from "react";
import { Home } from "./components/Home";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Executor from "./components/Executor/Executor";
import Documentation from "./components/Documentation/Documentation";
import CustomNavbar from "./components/CustomNavbar/CustomNavbar";

function App() {
  const [user, setUser] = useState();
  const loggedInRoutes = (
    <>
      <Route exact path="/profile" element={<Profile />} />
      <Route exact path="/executor" element={<Executor />} />
      <Route exact path="/documentation" element={<Documentation />} />
      <Route exact path="/generator" element={<CodeGenerator user={user} />} />
    </>
  );
  return (
    <div className="App">
      <Router>
        <CustomNavbar user={user} setUser={setUser} />
        <Routes>
          <Route exact path="/" element={<Home />} />
          {user && loggedInRoutes}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
