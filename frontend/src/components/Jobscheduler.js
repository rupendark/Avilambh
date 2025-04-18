import React from "react";
import axios from "axios";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Cookies from "js-cookie";

const localizer = momentLocalizer(moment);

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
  const [date, setDate] = useState(new Date());
  const [userRole, setUserRole] = useState({ role: "" });

  useEffect(() => {
    axios
      .get("http://localhost:5000/jobs", {}) // Update if deployed
      .then((response) => {
        setJobs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching job data:", error);
      });
    const token = Cookies.get("jwtToken");
    const parsedData = JSON.parse(token.substring(2));
    const { role } = parsedData[0];
    setUserRole({
      role: role,
    });
  }, []);

  const events = jobs.map((job) => ({
    id: job.job_id,
    task: job.task,
    title: job.task,
    start: new Date(job.start_time),
    end: new Date(job.end_time),
    batch: job.batch,
    smp_id: job.smp_id,
  }));
  const getEventStyle = (event) => {
    const batchColors = {
      1: "#f6c23e", // Yellow
      2: "#1cc88a", // Green
      3: "#36b9cc", // Blue
    };
    return {
      style: {
        backgroundColor: batchColors[event.batch] || "#4e73df", // Default Blue
        color: "#fff",
        borderRadius: "5px",
        padding: "5px",
      },
    };
  };

  // Handle input change fr add
  const handleChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };
  //Handle input change fr update
  const handleChange2 = (e) => {
    setSelectedItem({ ...selectedItem, [e.target.name]: e.target.value });
  };
  //popup form functions
  const handleSelectEvent = (event) => {
    setSelectedItem({
      id: event.id,
      task: event.task,
      batch: event.batch,
      start_time: moment(event.start).format("YYYY-MM-DDTHH:mm"), // Ensure proper format
      end_time: moment(event.end).format("YYYY-MM-DDTHH:mm"),
      smp_id: event.smp_id, // Add missing fields
    });
    setIsModalOpen(true); // Open modal after setting data
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
    try {
      await axios.post("http://localhost:5000/jobs/addItem", newItem);
      sendSMS();
      navigate(0);
    } catch (error) {
      alert("Error submitting form");
    }
  };
  const sendSMS = async () => {
    try {
      await axios.post("http://localhost:5000/send-sms", newItem);
    } catch (error) {
      alert("Error sending sms");
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

  const now = new Date();
  const jobStartTime = selectedItem ? new Date(selectedItem.start_time) : null;
  const isPastJob = jobStartTime && jobStartTime < now;

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
              <Link to="/home" className="block text-gray-300  hover:shadow-xl">
                HOME
              </Link>
              <Link
                to="/Jobs"
                className="block text-white hover:text-white text-[26px] shadow-xl"
              >
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
                className="block text-gray-300 hover:shadow-xl"
              >
                PRODUCTION
              </Link>
            </nav>
          </div>
        </aside>
      </div>

      <div className="w-[80vw] h-[85vh] fixed top-0 right-0">
        <div style={{ height: "80vh", padding: "20px" }}>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            // style={{ height: "100%" }}
            style={{
              height: "100%",
              border: "px solid #ccc", // Add your border style here
              borderRadius: "8px", // Optional: adds rounded corners
              padding: "10px", // Optional: inner spacing
            }}
            eventPropGetter={getEventStyle}
            defaultView={Views.WEEK}
            views={["month", "week", "day"]}
            step={180}
            timeslots={1}
            showMultiDayTimes={true}
            toolbar={true}
            date={date}
            onNavigate={(newDate) => setDate(newDate)}
            dayLayoutAlgorithm={"no-overlap"}
            onSelectEvent={handleSelectEvent}
          />
        </div>

        {userRole.role !== "owner" && (
          <button
            className="absolute bottom-0 right-16 px-4 py-2  bg-gray-500 font-semibold hover:bg-gray-600 rounded-md text-white"
            onClick={openAddModal}
          >
            ADD
          </button>
        )}
      </div>

      {/* popup form to update or delete*/}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
          <div className="p-6 bg-gray-300 shadow-lg border-8  h-2/3  border-gray-600 w-2/4  overflow-y-auto scrollbar-hide">
            <h2 className="text-xl font-bold mb-4">Update Task</h2>

            <form>
              <div className="flex">
                <label className="block mb-2 mt-2 mr-8 font-semibold">
                  Job_id
                </label>
                <input
                  name="job_id"
                  type="text"
                  defaultValue={selectedItem?.id}
                  className="w-[35%] p-2 border rounded mb-4"
                  readOnly="readonly"
                />
                <label className="block mb-2 mt-2 mr-10 ml-4 font-semibold">
                  SMP
                </label>
                <input
                  name="smp_id"
                  type="text"
                  onChange={handleChange2}
                  defaultValue={selectedItem?.smp_id}
                  className="w-[35%] p-2 border rounded mb-4"
                />
              </div>

              <div className="flex">
                <label className="block mb-2 mt-2 mr-2 font-semibold">
                  StartTime
                </label>
                <input
                  name="start_time"
                  type="datetime-local"
                  onChange={handleChange2}
                  min={new Date().toISOString().slice(0, 16)}
                  value={selectedItem?.start_time}
                  className="w-[35%] p-2 border rounded mb-4"
                />
                <label className="block mb-2 mt-2 mr-2 ml-4  font-semibold">
                  EndTime
                </label>
                <input
                  name="end_time"
                  type="datetime-local"
                  onChange={handleChange2}
                  min={selectedItem.start_time}
                  value={selectedItem?.end_time}
                  className="w-[35%] p-2 border rounded mb-4"
                />
              </div>
              <label className="block mb-2 font-semibold">Batch</label>
              <input
                name="batch"
                type="text"
                onChange={handleChange2}
                defaultValue={selectedItem?.batch}
                className="w-full p-2 border rounded mb-4"
              />
              <label className="block mb-2 font-semibold">Task</label>
              <input
                name="task"
                type="String"
                onChange={handleChange2}
                defaultValue={selectedItem?.task}
                className="w-full p-2 border rounded mb-4"
              />

              <div className="flex justify-end space-x-2 mt-6">
                <button
                  type="button"
                  className="px-4 py-1 ml-2 bg-[#365486]  font-semibold hover:bg-gray-600 rounded-md text-white outline-none"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                {userRole.role !== "owner" && !isPastJob && (
                  <>
                    <button
                      type="button"
                      className="px-4 py-1 ml-2 bg-[#424769] font-semibold hover:bg-gray-600 rounded-md text-white outline-none"
                      onClick={() => deleteJob(selectedItem.id)}
                    >
                      delete
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1 ml-2 bg-[#123458] font-semibold hover:bg-gray-600 rounded-md text-white outline-none"
                      onClick={() => updateJob(selectedItem.id)}
                    >
                      Save
                    </button>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      )}

      {/* popup form to add */}
      {isAddModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-300 border-8 border-gray-600 p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Add New Task</h2>
            <form>
              <label className="block mb-2 font-semibold text-lg">SMP ID</label>
              <input
                name="smp_id"
                type="string"
                className="w-full p-2 border rounded mb-4"
                onChange={handleChange}
                value={newItem.smp_id}
              />
              <label className="block mb-2 font-semibold text-lg">Task</label>
              <input
                name="task"
                type="text"
                className="w-full p-2 border rounded mb-4"
                onChange={handleChange}
                value={newItem.task}
              />
              <label className="block mb-2 font-semibold text-lg">Start time</label>
              <input
                name="start_time"
                type="datetime-local"
                className="w-full p-2 border rounded mb-4"
                onChange={handleChange}
                min={new Date().toISOString().slice(0, 16)}
                value={newItem.start_time}
              />
              <label className="block mb-2 font-semibold text-lg">End time</label>
              <input
                name="end_time"
                type="datetime-local"
                className="w-full p-2 border rounded mb-4"
                onChange={handleChange}
                min={newItem.start_time}
                value={newItem.end_time}
              />
              <label className="block mb-2 font-semibold text-lg">Batch</label>
              <input
                name="batch"
                type="string"
                className="w-full p-2 border rounded mb-4"
                onChange={handleChange}
                value={newItem.batch}
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
