import React from "react";
import axios from "axios";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import bg from "../maps/bg.jpg";

const Inventory = () => {
  const navigate = useNavigate();
  const [inventory, setInventory] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [newItem, setNewItem] = useState({
    item_name: "",
    quantity: "",
    reorder_level: "",
  });
  const [userRole, setUserRole] = useState({ role: "" });

  // Handle input change
  const handleChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };
  //Handle input change fr update
  const handleChange2 = (e) => {
    setSelectedItem({ ...selectedItem, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/inventory", {
        withCredentials: true, // ✅ Important: Send cookies
      }) // Update if deployed
      .then((response) => {
        setInventory(response.data);
      })
      .catch((error) => {
        console.error("Error fetching inventory data:", error);
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
    setSelectedItem(item);
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
      Inventory_Id: "INV90",
      item_name: "",
      quantity: "",
      reorder_level: "",
    });
  };

  //CURD operations
  const addInventory = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/inventory/addItem", newItem);
      navigate(0);
    } catch (error) {
      alert("Error submitting form");
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/inventory/delete/${id}`);
      navigate(0);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const updateItem = async (id) => {
    try {
      console.log(selectedItem);
      await axios.put(
        `http://localhost:5000/inventory/update/${id}`,
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
                className="block  text-white shadow-xl  text-[26px]"
              >
                INVENTORY
              </Link>
              <Link
                to="/production"
                className="block text-gray-300 hover:shadow-xl"
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
            INVENTORY
          </h1>
          <div className="h-[55vh] mt-4 overflow-y-auto scrollbar-hide">
            <table className=" min-w-full shadow-md">
              <thead className="bg-[#32363a] text-white  uppercase text-left sticky top-0">
                <tr className="text-center">
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Quantity</th>
                  <th className="px-4 py-2">Reorder Level</th>
                  {userRole.role !== "owner" && (
                    <th className="px-4 py-2">Action</th>
                  )}
                </tr>
              </thead>
              <tbody className="max-h-[400px] overflow-y-auto scrollbar-hide bg-[#fff1fe] ">
                {inventory.map((item) => (
                  <tr key={item.Inventory_Id} className="text-center">
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
          {userRole.role !== "owner" && (
            <button
              className="absolute bottom-16 right-32 bg-[#a3acac] text-lg font-bold hover:bg-gray-500 text-white px-6 py-1 rounded-lg"
              onClick={() => openAddModal()}
            >
              Add
            </button>
          )}
        </div>
      </div>

      {/* popup form to update or delete*/}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-300 border-8 border-gray-600 p-6 w-1/3 rounded-lg shadow-lg overflow-y-auto scrollbar-hide">
            <h2 className="text-xl font-bold mb-4">Update Inventory</h2>
            <form>
              <label className="block mb-2">Item Id</label>
              <input
                type="text"
                defaultValue={selectedItem?.Inventory_Id}
                className="w-full p-2 border rounded mb-4"
                readOnly="readonly"
              />
              <label className="block mb-2">Item Name</label>
              <input
                name="item_name"
                type="text"
                defaultValue={selectedItem?.item_name}
                onChange={handleChange2}
                className="w-full p-2 border rounded mb-4"
              />

              <label className="block mb-2">Quantity</label>
              <input
                name="quantity"
                type="number"
                defaultValue={selectedItem?.quantity}
                onChange={handleChange2}
                className="w-full p-2 border rounded mb-4"
              />

              <label className="block mb-2">Reorder Level</label>
              <input
                name="reorder_level"
                type="number"
                defaultValue={selectedItem?.reorder_level}
                onChange={handleChange2}
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
                  onClick={() => updateItem(selectedItem._id)}
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
            <h2 className="text-xl font-bold mb-4">Add New Item</h2>
            <form>
              <label className="block mb-2">Item Name</label>
              <input
                name="item_name"
                type="text"
                className="w-full p-2 border rounded mb-4"
                value={newItem.item_name}
                onChange={handleChange}
              />
              <label className="block mb-2">Quantity</label>
              <input
                name="quantity"
                type="number"
                className="w-full p-2 border rounded mb-4"
                value={newItem.quantity}
                onChange={handleChange}
              />
              <label className="block mb-2">Reorder Level</label>
              <input
                name="reorder_level"
                type="number"
                className="w-full p-2 border rounded mb-4"
                value={newItem.reorder_level}
                onChange={handleChange}
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
                  onClick={addInventory}
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

export default Inventory;
