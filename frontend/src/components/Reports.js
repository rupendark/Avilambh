import React from "react";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Reports = () => {
  const navigate = useNavigate();
  const [smp, setSmp] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
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

  // Handle SMP View
  //  const handleView = (e) => {
  //   setNewItem({ ...newItem, [e.target.name]: e.target.value });

  //Handle input change fr update
  const handleUpdate = (e) => {
    setReportData({ ...reportData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/smpReport", {
        withCredentials: true, // ✅ Important: Send cookies
      }) // Update if deployed
      .then((response) => {
        setSmp(response.data);
      })
      .catch((error) => {
        console.error("Error fetching inventory data:", error);
      });
  }, []);

  // Handle input change
  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  // Handle form submission
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log(formData);
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:5000/reports/addItem",
  //       formData
  //     );
  //     console.log("Data saved:", response.data);
  //     alert("Form submitted successfully!");
  //   } catch (error) {
  //     alert("Error submitting form");
  //   }
  // };

  //popup form functions
  const openModal = (item) => {
    setReportData(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setReportData(null);
  };

  // popup view smp functions
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

  // CURD Operations
  const updateItem = async (id) => {
    try {
      console.log(reportData);
      await axios.put(
        `http://localhost:5000/smpReport/update/${id}`,
        reportData
      );
      navigate(0);
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/smpReport/delete/${id}`);
      navigate(0);
    } catch (error) {
      console.error("Error deleting item:", error);
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
                className="block text-gray-300 hover:text-white underline"
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

      <div className="w-[80vw] h-[85vh] fixed  top-8 right-0">

        <div className="h-3/4 overflow-y-auto">
          <table className="w-4/5 mx-auto border border-gray-300 shadow-md ">
            <thead class="bg-gray-700 text-white  uppercase text-left sticky top-0 z-5">
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
              {smp.map((item) => (
                <tr key={item.id} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">
                    {item.report_id}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.mine_id}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.status}
                  </td>

                  <td className="border border-gray-300 px-4 py-2">
                    {item.date.slice(0, 10)}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.inspected_by}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      className="px-4 py-1 bg-gray-500 rounded-md text-white outline-none"
                      onClick={() => openModal(item)}
                    >
                      update
                    </button>
                    <button
                      type="button"
                      className="px-4 py-1 ml-2 bg-gray-500 rounded-md text-white outline-none"
                      onClick={() => deleteItem(item._id)}
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      className="px-4 py-1 ml-2 bg-gray-500 rounded-md text-white outline-none"
                      onClick={() => openAddModal()}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button className="absolute bottom-6 right-32 bg-blue-500 text-white px-6 py-1 rounded">
            Add
          </button>
        </div>
      </div>

      {/* popup form to update or delete*/}
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

              <label className="block mb-2">Status</label>
              <input
                name="status"
                type="text"
                defaultValue={reportData?.status}
                onChange={handleUpdate}
                className="w-full p-2 border rounded mb-4"
              />

              <label className="block mb-2">Date</label>
              <input
                name="date"
                type="date"
                defaultValue={reportData?.date}
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
            <h2 className="text-xl font-bold mb-4">View SMP</h2>
            <form>
              <label className="block mb-2">Report Id</label>
              <input
                name="report_id"
                type="text"
                className="w-full p-2 border rounded mb-4"
                value={newItem.report_id}
                // onChange={handleView}
              />
              <label className="block mb-2">Mine Id</label>
              <input
                name="mine_id"
                type="text"
                className="w-full p-2 border rounded mb-4"
                value={newItem.mine_id}
                // onChange={handleView}
              />
              <label className="block mb-2">Status</label>
              <input
                name="status"
                type="text"
                className="w-full p-2 border rounded mb-4"
                value={newItem.status}
                // onChange={handleView}
              />
              <label className="block mb-2">Date</label>
              <input
                name="date"
                type="date"
                className="w-full p-2 border rounded mb-4"
                value={newItem.date}
                // onChange={handleView}
              />
              <label className="block mb-2">Inspected By</label>
              <input
                name="inspected_by"
                type="text"
                className="w-full p-2 border rounded mb-4"
                value={newItem.inspected_by}
                // onChange={handleView}
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
                  className="px-4 py-2 bg-green-600 rounded-md text-white"
                  // onClick={addSMP}
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

export default Reports;
