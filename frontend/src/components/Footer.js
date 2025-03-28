import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const Footer = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [newItem, setNewItem] = useState({
    name: "aa",
    role: "bbb",
  });
  useEffect(() => {
    const token = Cookies.get("jwtToken");
    const parsedData = JSON.parse(token.substring(2));
    const { role, name } = parsedData[0];
    console.log(role, name); // Outputs array of objects
    setNewItem({
      name: name,
      role: role,
    });
  }, []);

  const handleLogout = () => {
    // Clear local storage
    localStorage.clear();

    // Clear cookies
    document.cookie.split(";").forEach((cookie) => {
      document.cookie =
        "jwtToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    });
    navigate("/");
  };

  return (
    <footer className="bg-gray-900 py-4 px-6 h-[10vh] flex justify-between items-center">
      <div className="flex justify-between items-center space-x-12">
        {/* Left Section: Name & Role in Two Rows */}
        <div className="flex flex-col">
          <span className="text-white text-xl">{newItem.name}</span>
          <span className="text-gray-400 text-lg">{newItem.role}</span>
        </div>

        {/* Right Section: Logout Button */}
        <button
          onClick={() => setShowPopup(true)}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
        >
          Logout
        </button>
      </div>
      <p className="text-sm text-gray-400">&copy; Avilambh2025</p>
      <p className="text-sm text-gray-300">
        <span className="font-bold">Owner:</span> Mr 979797XXXX
      </p>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="mb-4 text-lg font-semibold">
              Logout from the System?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
              >
                Yes
              </button>
              <button
                onClick={() => setShowPopup(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400 transition-all"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
