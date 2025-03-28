import React from "react";
import axios from "axios";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Jobscheduler = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [newItem, setNewItem] = useState({
    batch: "",
    task: "",
    start_time: "",
    end_time: "",
    smp_id: "",
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
      .get("http://localhost:5000/jobs", {}) // Update if deployed
      .then((response) => {
        setJobs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching job data:", error);
      });
  }, []);

  //popup form functions
  const openModal = (item) => {
    setSelectedItem(jobs[0]);
    console.log(jobs[0]);
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
      job_id: "", // Unique auto increment
      batch: "",
      task: "",
      start_time: "",
      end_time: "",
      smp_id: "",
    });
  };

  //   CURD operations
  const addJob = async (e) => {
    e.preventDefault();
    console.log(newItem);
    try {
      await axios.post("http://localhost:5000/jobs/addItem", newItem);
      navigate(0);
      console.log("Data saved:");
    } catch (error) {
      alert("Error submitting form");
    }
  };

  const deleteJob = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/jobs/delete/${id}`);
      navigate(0);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };
  const updateJob = async (id) => {
    try {
      console.log(selectedItem);
      await axios.put(`http://localhost:5000/jobs/update/${id}`, selectedItem);
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
              <Link
                to="/Jobs"
                className="block text-gray-300 hover:text-white underline"
              >
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
            </nav>
          </div>
        </aside>
      </div>

      <div className="w-[80vw] h-[85vh] fixed top-0 right-0">
        <button onClick={openModal}>UPDATE</button>
        <button onClick={openAddModal}>ADD</button>
      </div>



      {/* popup form to update or delete*/}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 h-2/4  overflow-y-auto scrollbar-hide">
            <h2 className="text-xl font-bold mb-4">Update Task</h2>
            <form>
              <label className="block mb-2">Job_id</label>
              <input
                name="job_id"
                type="text"
                defaultValue={selectedItem?.job_id}
                className="w-full p-2 border rounded mb-4"
                readOnly="readonly"
              />
              <label className="block mb-2">SMP</label>
              <input
                name="smp_id"
                type="text"
                onChange={handleChange2}
                defaultValue={selectedItem?.smp_id}
                className="w-full p-2 border rounded mb-4"
              />

              <label className="block mb-2">Batch</label>
              <input
                name="batch"
                type="text"
                onChange={handleChange2}
                defaultValue={selectedItem?.batch}
                className="w-full p-2 border rounded mb-4"
              />

              <label className="block mb-2">StartTime</label>
              <input
                name="start_time"
                type="datetime-local"
                onChange={handleChange2}
                defaultValue={selectedItem?.start_time.slice(0,16)}
                className="w-full p-2 border rounded mb-4"
              />
              <label className="block mb-2">EndTime</label>
              <input
                name="end_time"
                type="datetime-local"
                onChange={handleChange2}
                defaultValue={selectedItem?.end_time.slice(0,16)}
                className="w-full p-2 border rounded mb-4"
              />
              <label className="block mb-2">Task</label>
              <input
                name="task"
                type="String"
                onChange={handleChange2}
                defaultValue={selectedItem?.task}
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
                  onClick={() => updateJob(selectedItem._id)}
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
            <h2 className="text-xl font-bold mb-4">Add New Task</h2>
            <form>
              <label className="block mb-2">Task</label>
              <input
                name="task"
                type="text"
                className="w-full p-2 border rounded mb-4"
                onChange={handleChange}
                value={newItem.task}
              />
              <label className="block mb-2">Start time</label>
              <input
                name="start_time"
                type="datetime-local"
                className="w-full p-2 border rounded mb-4"
                onChange={handleChange}
                value={newItem.start_time}
              />
              <label className="block mb-2">end time</label>
              <input
                name="end_time"
                type="datetime-local"
                className="w-full p-2 border rounded mb-4"
                onChange={handleChange}
                value={newItem.end_time}
              />
              <label className="block mb-2">batch</label>
              <input
                name="batch"
                type="string"
                className="w-full p-2 border rounded mb-4"
                onChange={handleChange}
                value={newItem.batch}
              />
              <label className="block mb-2">SMP ID</label>
              <input
                name="smp_id"
                type="string"
                className="w-full p-2 border rounded mb-4"
                onChange={handleChange}
                value={newItem.smp_id}
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
                  onClick={addJob}
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

export default Jobscheduler;
