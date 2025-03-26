import React from "react";
import axios from "axios";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Saftey = () => {
  const [drills, setDrills] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/safety", {}) // Update if deployed
      .then((response) => {
        setDrills(response.data);
      })
      .catch((error) => {
        console.error("Error fetching transport data:", error);
      });
  }, []);
  return (
    <>
      <div className="flex h-[90vh]">
        {/* Sidebar */}
        <aside className="w-[20vw]  bg-[#4A4752] text-white p-6 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold text-[#359BD2] text-center">
              AVILAMBH
            </h1>
            <nav className="mt-6 space-y-4 pt-24 pl-8">
              <Link
                to="/home"
                className="block text-gray-300 hover:text-white "
              >
                HOME
              </Link>
              <Link
                to="/reports"
                className="block text-gray-300 hover:text-white"
              >
                REPORTS
              </Link>
              <Link
                to="/safety"
                className="block text-gray-300 hover:text-white underline"
              >
                SAFETY
              </Link>
              <Link
                to="/transport"
                className="block text-gray-300 hover:text-white "
              >
                TRANSPORT
              </Link>
              <Link
                to="/inventory"
                className="block text-gray-300 hover:text-white "
              >
                INVENTORY
              </Link>
            </nav>
          </div>
        </aside>
      </div>
      <div className="w-[80vw] h-[85vh] fixed  top-0 right-0">
        <div className="p-4 bg-gray-200">
          <div className="p-4 w-5/6 h-[75vh]  bg-gray-500 mx-auto" classDate="p-4">
            <h1 className="text-white text-xl">Production Record</h1>
            <div className="h-4/5 overflow-y-auto scrollbar-hide">
              <table className=" p-3 min-w-full bg-white">
                <thead className="bg-gray-400">
                  <tr className="bg-gray-400 text-center w-auto">
                    <th className="text-white border p-2">Drill_ID</th>
                    <th className="text-white border p-2">training_type</th>
                    <th className="text-white border p-2">Scheduled Date</th>
                    <th className="text-white border p-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {drills.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-100 text-center">
                      <td className="border p-2">{item.drill_id}</td>
                      <td className="border p-2">{item.training_type}</td>
                      <td className="border p-2">
                        {item.scheduled_date.slice(0, 10)}
                      </td>
                      <td className="border p-2 ">
                        <button className="px-4 py-1 bg-red-500 rounded-md text-white outline-none ">
                          view
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex space-x-4 justify-end p-4">
            <button
              type="button"
              className="px-6 py-2 bg-gray-800 text-white rounded-lg "
            >
              {" "}
              Update{" "}
            </button>
            <button
              type="button"
              className="px-6 py-2 bg-gray-800 text-white rounded-lg "
            >
              {" "}
              Add{" "}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Saftey;
