import React from "react";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Reports = () => {
  const navigate = useNavigate();
  const [smp, setSmp] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [reportData, setReportData] = useState({
    report_id: "",
    mine_id: "",
    status: "",
    findings: "",
    date: "",
    inspected_by: "",
    recommendations: "",
  });
  const [newItem, setNewItem] = useState({
    report_id: "",
    mine_id: "",
    status: "",
    date: "",
    inspected_by: "",
  });
  const [userRole, setUserRole] = useState({ role: "" });

  // Handle SMP Add
  const handleView = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  //Handle input change fr update
  const handleUpdate = (e) => {
    setReportData({ ...reportData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/reports", {
        withCredentials: true, // ✅ Important: Send cookies
      }) // Update if deployed
      .then((response) => {
        setSmp(response.data);
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
    setReportData(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setReportData(null);
  };

  // View Smp
  const openViewModal = (item) => {
    setReportData(item);
    setIsViewModalOpen(true);
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
  };

  // popup add smp functions
  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
    setNewItem({
      report_id: "",
      mine_id: "",
      status: "",
      date: "",
      inspected_by: "",
    });
  };

  const addSMP = async (e) => {
    e.preventDefault();
    console.log(newItem);
    try {
      const response = await axios.post(
        "http://localhost:5000/reports/addItem",
        newItem
      );
      navigate(0);
      console.log("Data saved:", response.data);
    } catch (error) {
      alert("Error submitting form");
    }
  };

  const updateItem = async (id) => {
    try {
      reportData.status = false;
      await axios.put(`http://localhost:5000/reports/update/${id}`, reportData);
      navigate(0);
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };
  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/reports/delete/${id}`);
      navigate(0);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };
  const approveSMP = async (id) => {
    try {
      await axios.put(`http://localhost:5000/reports/approve/${id}`);
      navigate(0);
    } catch (error) {
      console.error("Error updating flag:", error);
    }
  };

  return (
    <>
      <div className="flex h-[90vh]">
        {/* Sidebar */}
        <aside className="w-[20vw]  bg-[#86afe7] text-white p-6 flex flex-col justify-between">
          <div>
            <h1 className="text-5xl font-bold text-[#123458] text-center drop-shadow-xl">
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
                className="block  text-white shadow-xl  text-[26px]"
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
                className="block text-gray-300  hover:shadow-xl "
              >
                PRODUCTION
              </Link>
            </nav>
          </div>
        </aside>
      </div>

      <div className="w-[80vw] h-[85vh] fixed  top-8 right-0">
        <div className="h-3/4 overflow-y-auto">
          <table className="w-4/5 mx-auto border border-gray-300 shadow-md ">
            <thead className="bg-gray-700 text-white  uppercase text-left sticky top-0 z-5">
              <tr className="text-center">
                <th className="px-4 py-2">report_id</th>
                <th className="px-4 py-2">mine_id</th>
                <th className="px-4 py-2">status</th>
                <th className="px-4 py-2">date</th>
                <th className="px-4 py-2">inspected_by</th>
                <th className="px-4 py-2">action</th>
              </tr>
            </thead>
            <tbody className="max-h-[400px] overflow-y-auto scrollbar-hide">
              {smp.map((item, index) => (
                <tr key={index} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">
                    {item.report_id}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.mine_id}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {/* {item.status} */}
                    {item.status === "true" ? (
                      <p>Approved</p>
                    ) : (
                      <p>Unapproved</p>
                    )}
                  </td>

                  <td className="border border-gray-300 px-4 py-2">
                    {item.date.slice(0, 10)}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.inspected_by}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {userRole.role !== "owner" && (
                      <button
                        className="px-4 py-1 bg-gray-500 rounded-md text-white outline-none"
                        onClick={() => openModal(item)}
                      >
                        update
                      </button>
                    )}
                    {userRole.role !== "owner" && (
                      <button
                        type="button"
                        className="px-4 py-1 ml-2 bg-gray-500 rounded-md text-white outline-none"
                        onClick={() => deleteItem(item._id)}
                      >
                        Delete
                      </button>
                    )}
                    {userRole.role === "owner" && (
                      <button
                        type="button"
                        className="px-4 py-1 ml-2 bg-gray-500 rounded-md text-white outline-none"
                        onClick={() => approveSMP(item._id)}
                      >
                        Approve
                      </button>
                    )}
                    <button
                      type="button"
                      className="px-4 py-1 ml-2 bg-gray-500 rounded-md text-white outline-none"
                      onClick={() => openViewModal(item)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {userRole.role !== "owner" && (
            <button
              className="absolute bottom-6 right-32 bg-gray-500 text-white px-6 py-1 rounded"
              onClick={openAddModal}
            >
              Add
            </button>
          )}
        </div>
      </div>

      {/* popup form to update */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Update SMP</h2>
            <form>
              <label className="block mb-2">Report Id</label>
              <input
                type="text"
                defaultValue={reportData?.report_id}
                className="w-full p-2 border rounded mb-4"
                readOnly="readonly"
              />
              <label className="block mb-2">Mine Id</label>
              <input
                name="mine_id"
                type="text"
                defaultValue={reportData?.mine_id}
                onChange={handleUpdate}
                className="w-full p-2 border rounded mb-4"
              />
              <label className="block mb-2">Date</label>
              <input
                name="date"
                type="date"
                defaultValue={reportData?.date.slice(0, 10)}
                onChange={handleUpdate}
                className="w-full p-2 border rounded mb-4"
              />

              <label className="block mb-2">Inspected By</label>
              <input
                name="inspected_by"
                type="text"
                defaultValue={reportData?.inspected_by}
                onChange={handleUpdate}
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
                  type="button"
                  className="px-4 py-2 bg-blue-600 rounded-md text-white"
                  onClick={() => updateItem(reportData._id)}
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
            <h2 className="text-xl font-bold mb-4">ADD SMP</h2>
            <form>
              <label className="block mb-2">Mine Id</label>
              <input
                name="mine_id"
                type="text"
                className="w-full p-2 border rounded mb-4"
                value={newItem.mine_id}
                onChange={handleView}
              />
              <label className="block mb-2">Status</label>
              <input
                name="status"
                type="text"
                className="w-full p-2 border rounded mb-4"
                value={newItem.status}
                onChange={handleView}
              />
              <label className="block mb-2">Date</label>
              <input
                name="date"
                type="date"
                className="w-full p-2 border rounded mb-4"
                value={newItem.date}
                onChange={handleView}
              />
              <label className="block mb-2">Findings</label>
              <input
                name="findings"
                type="text"
                className="w-full p-2 border rounded mb-4"
                value={newItem.findings}
                onChange={handleView}
              />
              <label className="block mb-2">recommendations</label>
              <input
                name="recommendations"
                type="text"
                className="w-full p-2 border rounded mb-4"
                value={newItem.recommendations}
                onChange={handleView}
              />
              <label className="block mb-2">Inspected By</label>
              <input
                name="inspected_by"
                type="text"
                className="w-full p-2 border rounded mb-4"
                value={newItem.inspected_by}
                onChange={handleView}
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
                  type="button"
                  className="px-4 py-2 bg-gray-500 rounded-md text-white"
                  onClick={addSMP}
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* NEW SMP TABLE */}

      {isViewModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">View SMP</h2>
            <form className="h-[80vh] overflow-y-auto scrollbar-hide">
              <label className="block mb-2">Report Id</label>
              <input
                name="report_id"
                type="text"
                className="w-full p-2 border rounded mb-4"
                defaultValue={reportData?.report_id}
              />
              <label className="block mb-2">Mine Id</label>
              <input
                name="mine_id"
                type="text"
                className="w-full p-2 border rounded mb-4"
                defaultValue={reportData?.mine_id}
              />
              <label className="block mb-2">Status</label>
              <input
                name="status"
                type="text"
                className="w-full p-2 border rounded mb-4"
                defaultValue={reportData?.status}
              />
              <label className="block mb-2">Date</label>
              <input
                name="date"
                type="date"
                className="w-full p-2 border rounded mb-4"
                defaultValue={reportData?.date}
              />
              <label className="block mb-2">Findings</label>
              <input
                name="findings"
                type="text"
                className="w-full p-2 border rounded mb-4"
                defaultValue={reportData?.findings}
              />
              <label className="block mb-2">recommendations</label>
              <input
                name="recommendations"
                type="text"
                className="w-full p-2 border rounded mb-4"
                defaultValue={reportData?.recommendations}
              />
              <label className="block mb-2">Inspected By</label>
              <input
                name="inspected_by"
                type="text"
                className="w-full p-2 border rounded mb-4"
                defaultValue={reportData?.inspected_by}
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-400 rounded-md text-white"
                  onClick={closeViewModal}
                >
                  Cancel
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

export default Reports;
