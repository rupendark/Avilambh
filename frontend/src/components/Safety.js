import React from "react";
import axios from "axios";
import Footer from "./Footer";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import bg from "../maps/bg.jpg";

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
        <aside className="w-[20vw]  bg-[#4a586c] text-white p-6 flex flex-col justify-between">
          <div>
            <h1 className="text-5xl font-bold text-[#c0c0c0] text-center drop-shadow-xl">
              AVILAMBH
            </h1>
            <nav className="text-[18px] font-bold mt-6 font-sans  space-y-4 pt-24 pl-8  hover:text-white ">
              <Link to="/home" className="block text-gray-300 hover:shadow-xl">
                HOME
              </Link>
              <Link to="/Jobs" className="block text-gray-300 hover:shadow-xl ">
                JOB SCHEDULE
              </Link>
              <Link
                to="/reports"
                className="block text-gray-300 hover:shadow-xl"
              >
                REPORTS
              </Link>
              <Link
                to="/safety"
                className="block  text-white shadow-xl  text-[26px]"
              >
                SAFETY
              </Link>
              <Link
                to="/transport"
                className="block text-gray-300 hover:shadow-xl"
              >
                TRANSPORT
              </Link>
              <Link
                to="/inventory"
                className="block text-gray-300 hover:shadow-xl"
              >
                INVENTORY
              </Link>
              <Link
                to="/production"
                className="block text-gray-300  hover:shadow-xl "
              >
                PRODUCTION
              </Link>
            </nav>
          </div>
        </aside>
      </div>
      <div
              className="w-[80vw] h-[90vh] fixed top-0 right-0 overflow-y-auto scrollbar-hide bg-cover"
              style={{ backgroundImage: `url(${bg})` }}
            >
          <div className="p-4 w-5/6 h-[78vh] mt-12  bg-[#46505af5] mx-auto">
            <h1 className="text-white text-4xl font-semibold text-center">
              Safety Drills
            </h1>
            <div className="h-[55vh] mt-4 overflow-y-auto scrollbar-hide">
            <table className=" min-w-full shadow-md">
                <thead className="bg-[#32363a]">
                  <tr className="bg-[#32363a] text-center w-auto">
                    <th className="text-white border p-2">Drill_ID</th>
                    <th className="text-white border p-2">training_type</th>
                    <th className="text-white border p-2">Scheduled Date</th>
                    <th className="text-white border p-2">Incharge</th>
                    {userRole.role !== "owner" && (
                      <th className="text-white border p-2">Action</th>
                    )}
                  </tr>
                </thead>
                <tbody className="max-h-[400px] overflow-y-auto scrollbar-hide bg-[#fff1fe] ">
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
                            className="px-4 py-1 bg-[#424769] font-semibold hover:bg-gray-600 rounded-md text-white outline-none"
                            onClick={() => openModal(item)}
                          >
                            update
                          </button>
                          <button
                            type="button"
                            className="px-4 py-1 ml-2 bg-[#365486]  font-semibold hover:bg-gray-600 rounded-md text-white outline-none"
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
            <button
              className="absolute bottom-16 right-32 bg-[#a3acac] text-lg font-bold hover:bg-gray-500 text-white px-6 py-1 rounded-lg"
              onClick={openAddModal}
            >
              Add
            </button>
          )}
        </div>

      {/* popup form to update or delete*/}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
          <div className="bg-gray-300 border-8 border-gray-600 p-6 rounded-lg shadow-lg w-1/3 overflow-y-auto scrollbar-hide">
            <h2 className="text-xl font-bold mb-4">Update Drill</h2>
            <form>
              <div className="flex">
                <label className="block mb-2 mt-2 mr-8 text-lg font-semibold">
                  Drill_id
                </label>
                <input
                  name="drill_id"
                  type="text"
                  defaultValue={selectedItem?.drill_id}
                  className="w-[30%] p-2 border rounded mb-4"
                  readOnly="readonly"
                />
                <label className="block mb-2 mt-2 mr-8 ml-4 text-lg font-semibold">
                  Date
                </label>
                <input
                  name="scheduled_date"
                  type="date"
                  onChange={handleChange2}
                  defaultValue={selectedItem?.scheduled_date.slice(0, 10)}
                  className="w-[30%] p-2 border rounded mb-4"
                />
              </div>

              <label className="block mb-2 font-semibold">Type</label>
              <input
                name="training_type"
                type="text"
                onChange={handleChange2}
                defaultValue={selectedItem?.training_type}
                className="w-full p-2 border rounded mb-4"
              />

              <label className="block mb-2 font-semibold">Incharge</label>
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
                  className="px-4 py-2 bg-[#365486] font-semibold hover:bg-gray-600 rounded-md text-white"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#424769] font-semibold hover:bg-gray-600 rounded-md text-white"
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
          <div className="bg-gray-300 border-8 border-gray-600 p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Add New Item</h2>
            <form>
              <label className="block mb-2 font-semibold">Type</label>
              <input
                name="training_type"
                type="text"
                className="w-full p-2 border rounded mb-4"
                onChange={handleChange}
                value={newItem.training_type}
              />
              <label className="block mb-2 font-semibold">Date</label>
              <input
                name="scheduled_date"
                type="date"
                className="w-full p-2 border rounded mb-4"
                onChange={handleChange}
                value={newItem.scheduled_date}
              />
              <label className="block mb-2 font-semibold">Incharge</label>
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
                  className="px-4 py-2 bg-[#365486] font-semibold hover:bg-gray-600 rounded-md text-white"
                  onClick={closeAddModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#424769] font-semibold hover:bg-gray-600 rounded-md text-white"
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
