import React from "react";
import Footer from "./Footer";
import axios from "axios";
import moment from "moment";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import bg from "../maps/bg.jpg";

const Production = () => {
  const navigate = useNavigate();
  const [production, setProduction] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [userRole, setUserRole] = useState({ role: "" });
  const [productionData, setProductionData] = useState({
    Production_Id: "",
    Mine_Id: "",
    Date: "",
    Quantity: "",
    Quality: "",
  });
  const [newItem, setNewItem] = useState({
    // production_id: "",
    mine_id: "",
    date: "",
    quantity: "",
    quality: "",
  });
  const today = moment().format("YYYY-MM-DD");
  // Handle Production Add
  const handleView = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  //Handle input change for update
  const handleProductionUpdate = (e) => {
    setProductionData({ ...productionData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/production", {
        withCredentials: true,
      })
      .then((response) => {
        setProduction(response.data);
      })
      .catch((error) => {
        console.error("Error fetching production data:", error);
      });
    const token = Cookies.get("jwtToken");
    const parsedData = JSON.parse(token.substring(2));
    const { role } = parsedData[0];
    setUserRole({
      role: role,
    });
  }, []);

  //popup form functions
  const openModal = (item) => {
    setProductionData(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setProductionData(null);
  };

  // popup ADD Production functions
  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
    setNewItem({
      Production_Id: "",
      Mine_Id: "",
      Date: "",
      Quantity: "",
      Quality: "",
    });
  };

  // CURD Operations
  const addProduction = async (e) => {
    e.preventDefault();
    console.log(newItem);
    try {
      await axios.post("http://localhost:5000/production/addItem", newItem);
      navigate(0);
      console.log("Data saved:");
    } catch (error) {
      alert("Error submitting form");
    }
  };
  const updateItem = async (id) => {
    try {
      console.log(productionData);
      await axios.put(
        `http://localhost:5000/production/update/${id}`,
        productionData
      );
      navigate(0);
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/production/delete/${id}`);
      navigate(0);
    } catch (error) {
      console.error("Error deleting item:", error);
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
                className="block text-gray-300  hover:shadow-xl "
              >
                REPORTS
              </Link>
              <Link
                to="/safety"
                className="block text-gray-300 hover:shadow-xl"
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
                className="block  text-white shadow-xl  text-[26px]"
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
        <div className="p-4 w-5/6 h-[78vh] mt-12  bg-[#46505af5] mx-auto border-2">
          <h1 className="text-white text-4xl font-semibold text-center">
            PRODUCTION REPORTS
          </h1>
          <div className="h-[55vh] mt-4 overflow-y-auto scrollbar-hide">
            <table className=" min-w-full shadow-md">
              <thead className="bg-[#32363a] text-white  uppercase text-left sticky top-0">
                <tr className="text-center">
                  <th className="px-4 py-2">Production ID</th>
                  <th className="px-4 py-2">Mine ID</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Quality</th>
                  <th className="px-4 py-2">Quantity</th>
                  {userRole.role !== "owner" && (
                    <th className="px-4 py-2">Actions</th>
                  )}
                </tr>
              </thead>
              <tbody className="max-h-[400px] overflow-y-auto scrollbar-hide bg-[#fff1fe] ">
                {production.map((item) => (
                  <tr key={item.Production_Id} className="text-center">
                    <td className="border border-gray-300 px-4 py-2">
                      {item.Production_Id}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {item.Mine_Id}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {item.Date}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {item.Quality}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {item.Quantity}
                    </td>
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
                          onClick={() => deleteItem(item._id)}
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
          <button
            className="absolute bottom-16 right-32 bg-[#a3acac] text-lg font-bold hover:bg-gray-500 text-white px-6 py-1 rounded-lg"
            onClick={() => openAddModal()}
          >
            Add
          </button>
        </div>
      </div>
      {/* popup form to update*/}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-300 border-8 border-gray-600 p-6 w-1/3 rounded-lg shadow-lg overflow-y-auto scrollbar-hide">
            <h2 className="text-xl font-bold mb-4">Update Production</h2>
            <form>
              <label className="block mb-2">Production Id</label>
              <input
                type="text"
                defaultValue={productionData?.Production_Id}
                className="w-full p-2 border rounded mb-4"
                readOnly="readonly"
              />
              <label className="block mb-2">Mine Id</label>
              <input
                name="mine_id"
                type="text"
                defaultValue={productionData?.Mine_Id}
                onChange={handleProductionUpdate}
                className="w-full p-2 border rounded mb-4"
              />

              <label className="block mb-2">Date</label>
              <input
                name="date"
                type="date"
                defaultValue={productionData?.Date}
                onChange={handleProductionUpdate}
                className="w-full p-2 border rounded mb-4"
              />

              <label className="block mb-2">Quality</label>
              <input
                name="quality"
                type="text"
                defaultValue={productionData?.Quality}
                onChange={handleProductionUpdate}
                className="w-full p-2 border rounded mb-4"
              />

              <label className="block mb-2">Quantity</label>
              <input
                name="quantity"
                type="text"
                defaultValue={productionData?.Quantity}
                onChange={handleProductionUpdate}
                className="w-full p-2 border rounded mb-4"
              />

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-[#365486] rounded-md text-white font-semibold hover:bg-gray-600"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-[#123458] rounded-md text-white font-semibold hover:bg-gray-600"
                  onClick={() => updateItem(productionData._id)}
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
          <div className="bg-gray-300 border-8 border-gray-600 p-6 w-1/3 rounded-lg shadow-lg overflow-y-auto scrollbar-hide">
            <h2 className="text-xl font-bold mb-4">ADD Production</h2>
            <form>
              <label className="block mb-2">Mine Id</label>
              <input
                name="mine_id"
                type="text"
                className="w-full p-2 border rounded mb-4"
                value={newItem.mine_id}
                onChange={handleView}
              />
              <label className="block mb-2">Date</label>
              <input
                name="date"
                type="date"
                className="w-full p-2 border rounded mb-4"
                value={today}
                onChange={handleView}
              />
              <label className="block mb-2">Quality</label>
              <input
                name="quality"
                type="text"
                className="w-full p-2 border rounded mb-4"
                value={newItem.quality}
                onChange={handleView}
              />
              <label className="block mb-2">Quantity</label>
              <input
                name="quantity"
                type="number"
                className="w-full p-2 border rounded mb-4"
                value={newItem.quantity}
                onChange={handleView}
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
                  type="button"
                  className="px-4 py-2 bg-[#424769] font-semibold hover:bg-gray-600 rounded-md text-white"
                  onClick={addProduction}
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

export default Production;
