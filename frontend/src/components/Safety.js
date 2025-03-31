import React from "react";
import axios from "axios";
import Footer from "./Footer";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const Saftey = () => {
  const navigate = useNavigate();
  const [drills, setDrills] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [newItem, setNewItem] = useState({
    mine_id: "",
    training_type: "",
    scheduled_date: "",
    issue_detected: "",
    potential_danger: "",
    incharge: "",
  });
  const [userRole, setUserRole] = useState({ role: "" });

  useEffect(() => {
    axios
      .get("http://localhost:5000/safety", {}) // Update if deployed
      .then((response) => {
        setDrills(response.data);
      })
      .catch((error) => {
        console.error("Error fetching transport data:", error);
      });
    const token = Cookies.get("jwtToken");
    const parsedData = JSON.parse(token.substring(2));
    const { role } = parsedData[0];
    setUserRole({
      role: role,
    });
  }, []);

  // Handle input change fr add
  const handleChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };
  //Handle input change fr update
  const handleChange2 = (e) => {
    setSelectedItem({ ...selectedItem, [e.target.name]: e.target.value });
  };

  const openModal = (item) => {
    setSelectedItem(item);
    console.log(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
    setNewItem({
      training_type: "",
      scheduled_date: "",
      incharge: "",
    });
  };

  const addDrills = async (e) => {
    e.preventDefault();
    console.log(newItem);
    try {
      await axios.post("http://localhost:5000/safety/addItem", newItem);
      navigate(0);
      console.log("Data saved:");
    } catch (error) {
      alert("Error submitting form");
    }
  };
  const updateDrills = async (id) => {
    try {
      console.log(selectedItem);
      await axios.put(
        `http://localhost:5000/safety/update/${id}`,
        selectedItem
      );
      navigate(0);
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

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
              <Link to="/Jobs" className="block text-gray-300 hover:text-white">
                JOB SCHEDULE
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
              <Link
                to="/production"
                className="block text-gray-300 hover:text-white"
              >
                PRODUCTION
              </Link>
            </nav>
          </div>
        </aside>
      </div>
      <div className="w-[80vw] h-[85vh] fixed  top-0 right-0">
        <div className="p-4 bg-gray-200">
          <div className="p-4 w-5/6 h-[75vh]  bg-gray-500 mx-auto">
            <h1 className="text-white text-xl">Safety drills/trainings</h1>
            <div className="h-4/5 overflow-y-auto scrollbar-hide mt-4">
              <table className=" p-3 min-w-full bg-white">
                <thead className="bg-gray-400">
                  <tr className="bg-gray-400 text-center w-auto">
                    <th className="text-white border p-2">Drill_ID</th>
                    <th className="text-white border p-2">training_type</th>
                    <th className="text-white border p-2">Scheduled Date</th>
                    <th className="text-white border p-2">Incharge</th>
                    {userRole.role !== "owner" && (
                      <th className="text-white border p-2">Action</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {drills.map((item) => (
                    <tr
                      key={item.drill_id}
                      className="hover:bg-gray-100 text-center"
                    >
                      <td className="border p-2">{item.drill_id}</td>
                      <td className="border p-2">{item.training_type}</td>
                      <td className="border p-2">
                        {item.scheduled_date.slice(0, 10)}
                      </td>
                      <td className="border p-2">{item.incharge}</td>
                      {userRole.role !== "owner" && (
                        <td className="border border-gray-300 px-4 py-2">
                          <button
                            className="px-4 py-1 bg-[#ff2188] rounded-md text-white outline-none"
                            onClick={() => openModal(item)}
                          >
                            update
                          </button>
                          <button
                            type="button"
                            className="px-4 py-1 ml-2 bg-red-500 rounded-md text-white outline-none"
                            // onClick={() => deleteItem(item._id)}
                          >
                            Delete
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {userRole.role !== "owner" && (
            <div className="flex space-x-4 justify-end p-4">
              <button
                type="button"
                className="px-6 py-2 bg-gray-800 text-white rounded-lg "
                onClick={openAddModal}
              >
                Add
              </button>
            </div>
          )}
        </div>
      </div>

      {/* popup form to update or delete*/}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 h-2/4  overflow-y-auto scrollbar-hide">
            <h2 className="text-xl font-bold mb-4">Update Drill</h2>
            <form>
              <label className="block mb-2">Drill_id</label>
              <input
                name="drill_id"
                type="text"
                defaultValue={selectedItem?.drill_id}
                className="w-full p-2 border rounded mb-4"
                readOnly="readonly"
              />
              <label className="block mb-2">Type</label>
              <input
                name="training_type"
                type="text"
                onChange={handleChange2}
                defaultValue={selectedItem?.training_type}
                className="w-full p-2 border rounded mb-4"
              />
              <label className="block mb-2">Date</label>
              <input
                name="scheduled_date"
                type="date"
                onChange={handleChange2}
                defaultValue={selectedItem?.scheduled_date.slice(0, 10)}
                className="w-full p-2 border rounded mb-4"
              />
              <label className="block mb-2">Incharge</label>
              <input
                name="incharge"
                type="text"
                onChange={handleChange2}
                defaultValue={selectedItem?.incharge}
                className="w-full p-2 border rounded mb-4"
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-400 rounded-md text-white"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 rounded-md text-white"
                  onClick={() => updateDrills(selectedItem._id)}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* popup form to add */}
      {isAddModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Add New Item</h2>
            <form>
              <label className="block mb-2">Type</label>
              <input
                name="training_type"
                type="text"
                className="w-full p-2 border rounded mb-4"
                onChange={handleChange}
                value={newItem.training_type}
              />
              <label className="block mb-2">Date</label>
              <input
                name="scheduled_date"
                type="date"
                className="w-full p-2 border rounded mb-4"
                onChange={handleChange}
                value={newItem.scheduled_date}
              />
              <label className="block mb-2">Incharge</label>
              <input
                name="incharge"
                type="text"
                className="w-full p-2 border rounded mb-4"
                onChange={handleChange}
                value={newItem.incharge}
              />

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-400 rounded-md text-white"
                  onClick={closeAddModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 rounded-md text-white"
                  onClick={addDrills}
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Saftey;
