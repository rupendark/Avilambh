import React from "react";
import axios from "axios";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import bg from "../maps/bg.jpg";

const Transport = () => {
  const navigate = useNavigate();
  const [transport, setTransport] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [newItem, setNewItem] = useState({
    vehicle_no: "",
    driver_name: "",
    transport_date: "",
    destination: "",
    quantity: "",
    flag: "false",
  });
  const [userRole, setUserRole] = useState({ role: "" });

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
        // withCredentials: true, // ✅ Important: Send cookies
      }) // Update if deployed
      .then((response) => {
        setTransport(response.data);
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
      await axios.post("http://localhost:5000/transport/addItem", newItem);
      navigate(0);
      console.log("Data saved:");
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
                className="block text-gray-300 hover:shadow-xl"
              >
                SAFETY
              </Link>
              <Link
                to="/transport"
                className="block  text-white shadow-xl  text-[26px]"
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
        {/* scheduled transport */}
        <div className="p-4 w-5/6 h-[45vh] bg-[#46505af5] mx-auto mt-12">
          <div>
            <h1 className="text-white text-3xl font-semibold text-center">
              Schedule Transport
            </h1>
          </div>

          <div className="h-[35vh] mt-2 overflow-y-auto scrollbar-hide">
            <table className="w-full mx-auto shadow-md">
              <thead className="bg-[#32363a] text-white sticky uppercase top-0 z-5">
                <tr className="text-center w-auto">
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Driver</th>
                  <th className="px-4 py-2">Vehical</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">To</th>
                  <th className="px-4 py-2">Qunatity</th>
                  {userRole.role !== "owner" && (
                    <th className="px-4 py-2 w-40">Action</th>
                  )}
                </tr>
              </thead>
              <tbody className="max-h-4/5overflow-y-auto scrollbar-hide bg-[#fff1fe] ">
                {inCompletedTransport.map((item) => (
                  <tr key={item.transport_id} className="text-center">
                    <td className="pl-2">{item.transport_id}</td>
                    <td className="pl-2">{item.driver_name}</td>
                    <td className="pl-2">{item.vehicle_no}</td>
                    <td className="w-auto pl-2">
                      {item.transport_date
                        ? item.transport_date.slice(0, 10)
                        : "N/A"}
                    </td>
                    <td className="pl-2">{item.destination}</td>
                    <td className="pl-2">{item.quantity}</td>
                    {userRole.role !== "owner" && (
                      <td className="flex pr-2">
                        <button
                          type="button"
                          className="px-4 py-1 ml-2 bg-[#365486]  font-semibold hover:bg-gray-600 rounded-md text-white outline-none"
                          onClick={() => deleteTransport(item._id)}
                        >
                          Delete
                        </button>
                        <button
                          type="button"
                          className="px-4 py-1 ml-2 bg-[#424769] font-semibold hover:bg-gray-600 rounded-md text-white outline-none"
                          onClick={() => openModal(item)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="px-4 py-1 ml-2 bg-[#123458] font-semibold hover:bg-gray-600 rounded-md text-white outline-none"
                          onClick={() => compTransport(item._id)}
                        >
                          done
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            {userRole.role !== "owner" && (
              <button
                className="absolute right-32 bg-[#a3acac] font-bold hover:bg-gray-500 text-white px-6 py-1 mt-2 rounded-lg"
                onClick={() => openAddModal()}
              >
                Add
              </button>
            )}
          </div>
        </div>

        {/* completed transports*/}
        <div className="p-4 pt-2 w-5/6 h-60  bg-[#46505af5] mx-auto">
          <h1 className="text-white text-3xl font-semibold text-center">
            Completed Transport
          </h1>
          <div className="h-3/4 mt-2 overflow-y-auto scrollbar-hide">
            <table className="min-w-full  shadow-md">
              <thead className="bg-[#32363a] text-white sticky uppercase top-0 z-5">
                <tr className="text-center w-auto">
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Driver</th>
                  <th className="px-4 py-2">Vehical</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">To</th>
                  <th className="px-4 py-2">Qunatity</th>
                </tr>
              </thead>
              <tbody className="max-h-4/5 overflow-y-auto scrollbar-hide bg-[#fff1fe] ">
                {completedTransport.map((item) => (
                  <tr key={item.transport_id} className="text-center">
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
      </div>

      {/* popup form to update or delete*/}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
          <div className="bg-gray-300 border-8 border-gray-600 p-6 rounded-lg shadow-lg overflow-y-auto scrollbar-hide">
          <h2 className="text-xl font-bold mb-4">Update Inventory</h2>
            <form>
              <div className="flex">
                <label className="block mb-2 mt-2 mr-2 font-semibold text-lg">
                  Transport_id
                </label>
                <input
                  name="transport_id"
                  type="text"
                  defaultValue={selectedItem?.transport_id}
                  className="w-[30%] p-2 border rounded mb-4 mr-4"
                  readOnly="readonly"
                />
                <label className="block mb-2 mt-2 mr-4 font-semibold text-lg">
                  Vehicle
                </label>
                <input
                  name="vehicle_no"
                  type="text"
                  onChange={handleChange2}
                  defaultValue={selectedItem?.vehicle_no}
                  className="w-[40%] p-2 border rounded mb-4"
                />
              </div>
              <div className="flex">
                <label className="block mb-2 mt-2 mr-16 ml-2 font-semibold text-lg">
                  Date
                </label>
                <input
                  name="transport_date"
                  type="text"
                  onChange={handleChange2}
                  defaultValue={selectedItem?.transport_date.slice(0, 10)}
                  className="w-[30%]  p-2 border rounded mb-4 mr-2"
                />
                <label className="block mb-2 mt-2 mr-2 font-semibold text-lg">
                  Quantity
                </label>
                <input
                  name="quantity"
                  type="number"
                  onChange={handleChange2}
                  defaultValue={selectedItem?.quantity}
                  className="w-[40%]  p-2 border rounded mb-4"
                />
              </div>
              <label className="block mb-2 font-semibold text-lg">Driver</label>
              <input
                name="driver_name"
                type="text"
                onChange={handleChange2}
                defaultValue={selectedItem?.driver_name}
                className="w-full p-2 border rounded mb-4"
              />
              <label className="block mb-2 font-semibold text-lg">
                Destination
              </label>
              <input
                name="destination"
                type="text"
                onChange={handleChange2}
                defaultValue={selectedItem?.destination}
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
                  type="submit"
                  className="px-4 py-2 bg-[#123458] rounded-md text-white font-semibold hover:bg-gray-600"
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
          <div className="p-6 bg-gray-300 shadow-lg border-8 border-gray-600 w-2/4">
            <h2 className="text-xl font-bold mb-4">Add New Item</h2>
            <form>
              <div className="flex">
                <label className="block mb-2 mt-2 mr-8 ml-2 font-semibold text-lg">
                  Date
                </label>
                <input
                  name="transport_date"
                  type="date"
                  onChange={handleChange}
                  defaultValue={newItem.transport_date}
                  className="w-[30%]  p-2 border rounded mb-4 mr-8"
                />
                <label className="block mb-2 mt-2 mr-4 font-semibold text-lg">
                  Quantity
                </label>
                <input
                  name="quantity"
                  type="number"
                  onChange={handleChange}
                  defaultValue={newItem.quantity}
                  className="w-[40%]  p-2 border rounded mb-4"
                />
              </div>
              <label className="block mb-2 font-semibold text-lg">Driver</label>
              <input
                name="driver_name"
                type="text"
                className="w-full p-2 border rounded mb-4"
                onChange={handleChange}
                value={newItem.driver_name}
              />
              <label className="block mb-2 font-semibold text-lg">
                Vehical_no
              </label>
              <input
                name="vehicle_no"
                type="text"
                className="w-full p-2 border rounded mb-4"
                onChange={handleChange}
                value={newItem.vehicle_no}
              />
              <label className="block mb-2 font-semibold text-lg">
                Destination
              </label>
              <input
                name="destination"
                type="text"
                className="w-full p-2 border rounded mb-4"
                onChange={handleChange}
                value={newItem.destination}
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-[#365486] rounded-md text-white font-semibold hover:bg-gray-600"
                  onClick={closeAddModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#123458] rounded-md text-white font-semibold hover:bg-gray-600"
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
