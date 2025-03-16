import { Routes, Route } from "react-router-dom";

import Landingpage from "./components/Landingpage"

import Transport from "./components/Transport";
import Inventory from "./components/Inventory";
import Production from "./components/Production";
import Reports from "./components/Reports";
import Home from "./components/Home";
import Safety from "./components/Safety";
import Login from "./components/Login";


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/" element={<Landingpage />} /> */}
        <Route path="/home" element={<Home />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/production" element={<Production />} />
        <Route path="/transport" element={<Transport />} />
        <Route path="/safety" element={<Safety />} />
      </Routes>
    </div>
  );
}

export default App;
