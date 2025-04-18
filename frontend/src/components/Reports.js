import React from "react";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import bg from "../maps/bg.jpg";

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
    mine_id: "",
    status: false,
    findings: "",
    date: moment().format("YYYY-MM-DD"),
    inspected_by: "",
    recommendations: "",
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
                className="block  text-white shadow-xl  text-[26px]"
              >
                REPORTS
              </Link>
              <Link
                to="/safety"
                className="block text-gray-300  hover:shadow-xl "
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
            SMP REPORTS
          </h1>
          <div className="h-[55vh] mt-4 overflow-y-auto scrollbar-hide">
            <table className=" min-w-full shadow-md">
              <thead className="bg-[#32363a] text-white uppercase text-left sticky top-0">
                <tr className="text-center">
                  <th className="px-4 py-2">report_id</th>
                  <th className="px-4 py-2">mine_id</th>
                  <th className="px-4 py-2">status</th>
                  <th className="px-4 py-2">date</th>
                  <th className="px-4 py-2">inspected_by</th>
                  <th className="px-4 py-2">action</th>
                </tr>
              </thead>
              <tbody className="max-h-[400px] overflow-y-auto scrollbar-hide bg-[#fff1fe] ">
                {smp.map((item, index) => (
                  <tr key={index} className="text-center">
                    <td className="border border-gray-300 text-gray-700 font-semibold px-4 py-2">
                      {item.report_id}
                    </td>
                    <td className="border border-gray-300 text-gray-700 font-semibold px-4 py-2">
                      {item.mine_id}
                    </td>
                    <td className="border border-gray-300 text-gray-700 font-semibold px-4 py-2">
                      {/* {item.status} */}
                      {item.status === "true" ? (
                        <p>Approved</p>
                      ) : (
                        <p>Unapproved</p>
                      )}
                    </td>

                    <td className="border border-gray-300 text-gray-700 font-semibold px-4 py-2">
                      {item.date.slice(0, 10)}
                    </td>
                    <td className="border border-gray-300 text-gray-700 font-semibold px-4 py-2">
                      {item.inspected_by}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {userRole.role !== "owner" && (
                        <button
                          className="px-4 py-1 bg-[#424769] font-semibold hover:bg-gray-600 rounded-md text-white outline-none"
                          onClick={() => openModal(item)}
                        >
                          Update
                        </button>
                      )}
                      {userRole.role !== "owner" && (
                        <button
                          type="button"
                          className="px-4 py-1 ml-2 bg-[#365486]  font-semibold hover:bg-gray-600 rounded-md text-white outline-none"
                          onClick={() => deleteItem(item._id)}
                        >
                          Delete
                        </button>
                      )}
                      {userRole.role === "owner" && (
                        <button
                          type="button"
                          className="px-4 py-1 ml-2 bg-[#365486]  font-semibold hover:bg-gray-600 rounded-md text-white outline-none"
                          onClick={() => approveSMP(item._id)}
                        >
                          Approve
                        </button>
                      )}
                      <button
                        type="button"
                        className="px-4 py-1 ml-2 bg-[#123458] font-semibold hover:bg-gray-600 rounded-md text-white outline-none"
                        onClick={() => openViewModal(item)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
      </div>

      {/* popup form to update */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-gray-300 shadow-lg border-8 border-gray-600 w-2/4">
            <h2 className="text-xl font-bold mb-4">Update SMP</h2>
            <form>
              <div className="flex">
                <label className="block mb-2 mt-2 mr-2 font-semibold text-lg">
                  Report Id{" "}
                </label>
                <input
                  type="text"
                  defaultValue={reportData?.report_id}
                  className="w-[30%] p-2 border rounded mb-4"
                  readOnly="readonly"
                />
                <label className="block ml-4 mb-2 mt-2 mr-11 font-semibold text-lg">
                  Mine Id
                </label>
                <input
                  name="mine_id"
                  type="text"
                  defaultValue={reportData?.mine_id}
                  onChange={handleUpdate}
                  className="w-[40%] p-2 border rounded mb-4"
                />
              </div>
              <div className="flex">
                <label className="block mb-2 mt-2 mr-12 text-lg font-semibold">
                  Date
                </label>
                <input
                  name="date"
                  type="date"
                  defaultValue={reportData?.date.slice(0, 10)}
                  onChange={handleUpdate}
                  className="w-[30%] p-2 border rounded mb-4"
                />

                <label className="block mb-2 mt-2 mr-2 ml-2 text-lg font-semibold">
                  Inspected By
                </label>
                <input
                  name="inspected_by"
                  type="text"
                  defaultValue={reportData?.inspected_by}
                  onChange={handleUpdate}
                  className="w-[40%] p-2 border rounded mb-4"
                />
              </div>
              <label className="block mb-2 font-semibold text-lg">Findings</label>
              <input
                name="inspected_by"
                type="text"
                defaultValue={reportData?.findings}
                onChange={handleUpdate}
                className="w-full p-2 border rounded mb-4"
              />
              <label className="block mb-2 font-semibold text-lg">Recommendations</label>
              <input
                name="inspected_by"
                type="text"
                defaultValue={reportData?.recommendations}
                onChange={handleUpdate}
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
          <div className="p-6 bg-gray-300 shadow-lg border-8 border-gray-600 w-2/4">
            <h2 className="text-xl font-bold mb-4">ADD SMP</h2>
            <form>
              <div className="flex">
                <label className="block mb-2 mt-2 mr-2 font-semibold text-lg">
                  Mine Id
                </label>
                <input
                  name="mine_id"
                  type="text"
                  className="w-[40%] p-2 border rounded mb-4"
                  value={newItem.mine_id}
                  onChange={handleView}
                />

                <label className="block mb-2 mt-2 mr-2 ml-2 font-semibold text-lg">
                  Date
                </label>
                <input
                  name="date"
                  type="date"
                  className="w-[40%] p-2 border rounded mb-4"
                  value={moment().format("YYYY-MM-DD")}
                  onChange={handleView}
                />
              </div>
              <label className="block mb-2 font-semibold text-lg">Findings</label>
              <input
                name="findings"
                type="text"
                className="w-full p-2 border rounded mb-4"
                value={newItem.findings}
                onChange={handleView}
              />
              <label className="block mb-2 font-semibold text-lg">recommendations</label>
              <input
                name="recommendations"
                type="text"
                className="w-full p-2 border rounded mb-4"
                value={newItem.recommendations}
                onChange={handleView}
              />
              <label className="block mb-2 font-semibold text-lg">Inspected By</label>
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
                  className="px-4 py-2 bg-[#365486] font-semibold hover:bg-gray-600 rounded-md text-white"
                  onClick={closeAddModal}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-[#424769] font-semibold hover:bg-gray-600 rounded-md text-white"
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
          <div className="w-2/4  bg-black ">
            <div className=" p-6 bg-gray-300 shadow-lg border-8 border-gray-600">
              <form className=" overflow-y-auto scrollbar-hide ">
                <div className="flex">
                  <label className="block mb-2 mt-2 mr-2 font-semibold text-lg">
                    Report Id
                  </label>
                  <br />
                  <input
                    name="report_id"
                    type="text"
                    className="w-[35%] p-2 border text-gray-700 rounded mb-4 font-stretch-extra-condensed font-bold"
                    defaultValue={reportData?.report_id}
                  />
                  <label className="block ml-4 mb-2 mt-2 mr-2 font-semibold text-lg">
                    Mine Id
                  </label>
                  <input
                    name="mine_id"
                    type="text"
                    className="w-[40%] p-2 border rounded mb-4 text-gray-700 font-stretch-extra-condensed font-bold"
                    defaultValue={reportData?.mine_id}
                  />
                </div>
                <div className="flex">
                  <label className="block mb-2 mt-2 mr-9 text-lg font-semibold">
                    Status
                  </label>
                  <input
                    name="status"
                    type="text"
                    className="w-[35%] p-2 border rounded mb-4 text-gray-700 font-stretch-extra-condensed font-bold"
                    defaultValue={reportData?.status}
                  />
                  <label className="block ml-4 mb-2 mt-2 mr-8 font-semibold text-lg">
                    Date
                  </label>
                  <input
                    name="date"
                    type="text"
                    className="w-[40%] p-2 border rounded mb-4 text-gray-700 font-stretch-extra-condensed font-bold"
                    defaultValue={reportData?.date.slice(0, 10)}
                  />
                </div>
                <label className="block mb-2 font-semibold">Findings</label>
                <input
                  name="findings"
                  type="text"
                  className="w-full p-2 border rounded mb-4 text-gray-700 font-stretch-extra-condensed font-bold"
                  defaultValue={reportData?.findings}
                />
                <label className="block mb-2 font-semibold">
                  Recommendations
                </label>
                <input
                  name="recommendations"
                  type="text"
                  className="w-full p-2 border rounded mb-4 text-gray-700 font-stretch-extra-condensed font-bold"
                  defaultValue={reportData?.recommendations}
                />
                <label className="block mb-2 font-semibold">Inspected By</label>
                <input
                  name="inspected_by"
                  type="text"
                  className="w-full p-2 border rounded mb-4 text-gray-700 font-stretch-extra-condensed font-bold"
                  defaultValue={reportData?.inspected_by}
                />
                <div className="flex justify-end space-x-2 ">
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-500 rounded-xl text-white font-semibold hover:bg-gray-600 "
                    onClick={closeViewModal}
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Reports;
