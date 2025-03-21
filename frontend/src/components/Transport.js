import React from "react";
import axios from "axios";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Transport = () => {
  const navigate = useNavigate();
  const [transport, setTransport] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [newItem, setNewItem] = useState({
    transport_id: "",
    vehicle_no: "",
    driver_name: "",
    transport_date: "",
    destination: "",
    quantity: "",
    flag: "false",
  });
  // Handle input change fr add
  const handleChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };
  //Handle input change fr update
  const handleChange2 = (e) => {
    setSelectedItem({ ...selectedItem, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/transport", {
        withCredentials: true, // ✅ Important: Send cookies
      }) // Update if deployed
      .then((response) => {
        setTransport(response.data);
      })
      .catch((error) => {
        console.error("Error fetching transport data:", error);
      });
  }, []);

  const completedTransport = transport.filter((item) => item.flag);
  const inCompletedTransport = transport.filter((item) => !item.flag);

  //popup form functions
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
      vehical_no: "",
      driver_name: "",
      date: "",
      destination: "",
      quantity: "",
    });
  };

  //CURD operations
  const addTransport = async (e) => {
    e.preventDefault();
    console.log(newItem);
    try {
      const response = await axios.post(
        "http://localhost:5000/transport/addItem",
        newItem
      );
      navigate(0);
      console.log("Data saved:", response.data);
    } catch (error) {
      alert("Error submitting form");
    }
  };
  const compTransport = async (id) => {
    console.log(id);
    try {
      await axios.put(`http://localhost:5000/transport/complete/${id}`);
      navigate(0);
    } catch (error) {
      console.error("Error updating flag:", error);
    }
  };
  const deleteTransport = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/transport/delete/${id}`);
      navigate(0);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };
  const updateTransport = async (id) => {
    try {
      console.log(selectedItem);
      await axios.put(
        `http://localhost:5000/transport/update/${id}`,
        selectedItem
      );
      navigate(0);
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

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
                className="block text-gray-300 hover:text-white underline"
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

      <div className="w-[80vw] h-[85vh] fixed top-0 right-0">
        {/* completed transports*/}
        <div className="w-5/6 h-48  bg-gray-900 mx-auto mt-8">
          <span className="text-white">Completed Transport</span>
          <div className="h-4/5 overflow-y-auto scrollbar-hide">
            <table className="w-full mx-aut shadow-md">
              <thead className="bg-gray-700 text-white sticky top-0 z-5">
                <tr className="text-center w-auto">
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Driver</th>
                  <th className="px-4 py-2">Vehical</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">To</th>
                  <th className="px-4 py-2">Qunatity</th>
                </tr>
              </thead>
              <tbody className="max-h-4/5 text-white text-sm">
                {completedTransport.map((item) => (
                  <tr key={item.id} className="text-center">
                    <td className="pl-2">{item.transport_id}</td>
                    <td className="pl-2">{item.driver_name}</td>
                    <td className="pl-2">{item.vehicle_no}</td>
                    <td className="w-auto pl-2">
                      {item.transport_date
                        ? item.transport_date.slice(0, 10)
                        : "N/A"}
                    </td>
                    <td className="pl-2">{item.destination}</td>
                    <td className="">{item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* scheduled transport */}
        <div className="w-5/6 h-48 bg-gray-900 mx-auto my-6">
          <span className="text-white">Schedule Transport</span>
          <div className="h-4/5 overflow-y-auto scrollbar-hide">
            <table className="w-full mx-aut shadow-md">
              <thead className="bg-gray-700 text-white sticky top-0 z-5">
                <tr className="text-center w-auto">
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Driver</th>
                  <th className="px-4 py-2">Vehical</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">To</th>
                  <th className="px-4 py-2">Qunatity</th>
                  <th className="px-4 py-2 w-40">Action</th>
                </tr>
              </thead>
              <tbody className="max-h-4/5 text-white text-sm">
                {inCompletedTransport.map((item) => (
                  <tr key={item.id} className="text-center">
                    <td className="pl-2">{item.transport_id}</td>
                    <td className="pl-2">{item.driver_name}</td>
                    <td className="pl-2">{item.vehicle_no}</td>
                    <td className="w-auto pl-2">
                      {item.transport_date
                        ? item.transport_date.slice(0, 10)
                        : "N/A"}
                    </td>
                    <td className="pl-2">{item.destination}</td>
                    <td className="">{item.quantity}</td>
                    <td className="flex">
                      <button
                        type="button"
                        className="px-4 py-1 ml-2 bg-red-500 rounded-md text-white outline-none"
                        onClick={() => deleteTransport(item._id)}
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        className="px-4 py-1 ml-2 bg-yellow-600 rounded-md text-white outline-none"
                        onClick={() => openModal(item)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="px-4 py-1 ml-2 bg-green-500 rounded-md text-white outline-none mr-4"
                        onClick={() => compTransport(item._id)}
                      >
                        done
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
            className="absolute bottom-3 right-24 bg-blue-500 text-white px-6 py-1 rounded"
            onClick={() => openAddModal()}
          >
            Add
          </button>
        </div>
      </div>

      {/* popup form to update or delete*/}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 h-2/4  overflow-y-auto scrollbar-hide">
            <h2 className="text-xl font-bold mb-4">Update Inventory</h2>
            <form>
              <label className="block mb-2">Transport_id</label>
              <input
                name="transport_id"
                type="text"
                defaultValue={selectedItem?.transport_id}
                className="w-full p-2 border rounded mb-4"
                readOnly="readonly"
              />
              <label className="block mb-2">Vehicle</label>
              <input
                name="vehicle_no"
                type="text"
                onChange={handleChange2}
                defaultValue={selectedItem?.vehicle_no}
                className="w-full p-2 border rounded mb-4"
              />

              <label className="block mb-2">Driver</label>
              <input
                name="driver_name"
                type="text"
                onChange={handleChange2}
                defaultValue={selectedItem?.driver_name}
                className="w-full p-2 border rounded mb-4"
              />

              <label className="block mb-2">Date</label>
              <input
                name="transport_date"
                type="text"
                onChange={handleChange2}
                defaultValue={selectedItem?.transport_date.slice(0, 10)}
                className="w-full p-2 border rounded mb-4"
              />
              <label className="block mb-2">Destination</label>
              <input
                name="destination"
                type="text"
                onChange={handleChange2}
                defaultValue={selectedItem?.destination}
                className="w-full p-2 border rounded mb-4"
              />
              <label className="block mb-2">Quantity</label>
              <input
                name="quantity"
                type="number"
                onChange={handleChange2}
                defaultValue={selectedItem?.quantity}
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
                  onClick={() => updateTransport(selectedItem._id)}
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
              <label className="block mb-2">Id</label>
              <input
                name="transport_id"
                type="text"
                className="w-full p-2 border rounded mb-4"
                onChange={handleChange}
                value={newItem.transport_id}
              />
              <label className="block mb-2">Driver</label>
              <input
                name="driver_name"
                type="text"
                className="w-full p-2 border rounded mb-4"
                onChange={handleChange}
                value={newItem.driver_name}
              />
              <label className="block mb-2">Vehical_no</label>
              <input
                name="vehicle_no"
                type="text"
                className="w-full p-2 border rounded mb-4"
                onChange={handleChange}
                value={newItem.vehicle_no}
              />
              <label className="block mb-2">Date</label>
              <input
                name="transport_date"
                type="date"
                className="w-full p-2 border rounded mb-4"
                onChange={handleChange}
                value={newItem.transport_date}
              />
              <label className="block mb-2">Destination</label>
              <input
                name="destination"
                type="text"
                className="w-full p-2 border rounded mb-4"
                onChange={handleChange}
                value={newItem.destination}
              />
              <label className="block mb-2">Quantity</label>
              <input
                name="quantity"
                type="number"
                className="w-full p-2 border rounded mb-4"
                onChange={handleChange}
                value={newItem.quantity}
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
                  onClick={addTransport}
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

export default Transport;
