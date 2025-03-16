import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const Inventory = () => {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/inventory",{
      withCredentials: true,  // ✅ Important: Send cookies
    })  // Update if deployed
      .then((response) => {
        setInventory(response.data);
      })
      .catch((error) => {
        console.error("Error fetching inventory data:", error);
      });
  }, []);

  return (
    <>
      <div className="flex h-[85vh]">
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
                className="block text-gray-300 hover:text-white"
              >
                SAFETY
              </Link>
              <Link
                to="/transport"
                className="block text-gray-300 hover:text-white"
              >
                TRANSPORT
              </Link>
              <Link
                to="/inventory"
                className="block text-gray-300 hover:text-white underline"
              >
                INVENTORY
              </Link>
            </nav>
          </div>
        </aside>
      </div>
      <div className="w-[80vw] h-[85vh] absolute top-0 right-0 mt-4">
        <div className="max-h-[400px] overflow-y-auto">
          <table className="w-4/5 mx-auto border border-gray-300 shadow-md ">
            <thead class="bg-gray-700 text-white  uppercase text-left sticky top-0 z-10">
              <tr className="text-center">
                <th class="px-4 py-2">ID</th>
                <th class="px-4 py-2">Name</th>
                <th class="px-4 py-2">Quantity</th>
                <th class="px-4 py-2">Reorder Level</th>
                <th class="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody className="max-h-[400px] overflow-y-auto">
              {inventory.map((item) => (
                <tr key={item.id} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">
                    {item.Inventory_Id}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.item_name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.quantity}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.reorder_level}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button className="px-4 py-1 bg-[#ff2188] rounded-md text-white outline-none">update</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Inventory;
