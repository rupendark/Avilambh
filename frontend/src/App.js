import {Navigate, Routes, Route } from "react-router-dom";

import Landingpage from "./components/Landingpage"
import Transport from "./components/Transport";
import Inventory from "./components/Inventory";
import Production from "./components/Production";
import Reports from "./components/Reports";
import Home from "./components/Home";
import Safety from "./components/Safety";
import Login from "./components/Login";
import Jobscheduler from "./components/Jobscheduler";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" />;
};


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/landing" element={<PrivateRoute><Landingpage/></PrivateRoute>}/>
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/jobs" element={<PrivateRoute><Jobscheduler /></PrivateRoute>} />
        <Route path="/inventory" element={<PrivateRoute><Inventory /></PrivateRoute>} />
        <Route path="/reports" element={<PrivateRoute><Reports /></PrivateRoute>} />
        <Route path="/production" element={<PrivateRoute><Production /></PrivateRoute>} />
        <Route path="/transport" element={<PrivateRoute><Transport /></PrivateRoute>} />
        <Route path="/safety" element={<PrivateRoute><Safety /></PrivateRoute>} />
      </Routes>
    </div>
  );
}

export default App;
