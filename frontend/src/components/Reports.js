import React from "react";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const Reports = () => {
  // const recommendations = [
  //   "Reinforce tunnel support with additional beams",
  //   "Schedule maintenance for ventilation system",
  //   "Inspect and secure all loose wiring",
  //   "Continue regular safety inspections",
  //   "Clear emergency exits and enforce regulations",
  //   "Repair or replace dust control system",
  //   "Schedule periodic maintenance"
  // ];
  const [smp, setSmp] = useState([]);
  const [formData, setFormData] = useState({
    report_id: "",
    mine_id: "",
    status: "",
    findings: "",
    date: "",
    inspected_by: "",
    recommendations: "",
  });

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
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await axios.post(
        "http://localhost:5000/reports/addItem",
        formData
      );
      console.log("Data saved:", response.data);
      alert("Form submitted successfully!");
    } catch (error) {
      alert("Error submitting form");
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
            </nav>
          </div>
        </aside>
      </div>

      <div className="w-[80vw] h-[85vh] fixed  top-0 right-0">
        <h2>SMP REPORT</h2>

        <div className="h-3/4 overflow-y-auto">
          <table className="w-4/5 mx-auto border border-gray-300 shadow-md ">
            <thead className="bg-gray-700 text-white  uppercase text-left sticky top-0 z-5">
              <tr className="text-center">
                <th className="px-4 py-2">report_id</th>
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
                    {item.status}
                  </td>

                  <td className="border border-gray-300 px-4 py-2">
                    {item.date.slice(0, 10)}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.inspected_by}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button className="px-4 py-1 bg-[#ff2188] rounded-md text-white outline-none">
                      update
                    </button>
                    <button
                      type="button"
                      className="px-4 py-1 ml-2 bg-red-500 rounded-md text-white outline-none"
                    >
                      Delete
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

      {/* Report Form
        <div className="max-w-2xl mx-auto bg-gray-300 p-6 rounded-lg shadow-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="report_id"
                placeholder="Report_id"
                value={formData.report_id}
                onChange={handleChange}
                className="p-2 border border-gray-400 rounded w-full"
              />
              <input
                type="text"
                name="status"
                placeholder="Report Status"
                value={formData.status}
                onChange={handleChange}
                className="p-2 border border-gray-400 rounded w-full"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="mine_id"
                placeholder="Mine_id"
                value={formData.mine_id}
                onChange={handleChange}
                className="p-2 border border-gray-400 rounded w-full"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="p-2 border border-gray-400 rounded w-full"
              />
              <input
                type="text"
                name="inspected_by"
                placeholder="Inspected_by"
                value={formData.inspected_by}
                onChange={handleChange}
                className="p-2 border border-gray-400 rounded w-full"
              />
            </div>
            <textarea
              name="findings"
              placeholder="Findings"
              value={formData.findings}
              onChange={handleChange}
              className="p-2 border border-gray-400 rounded w-full h-16"
            />

            <textarea
              name="recommendations"
              placeholder="Recommendations"
              value={formData.recommendations}
              onChange={handleChange}
              className="p-2 border border-gray-400 rounded w-full h-16"
            />
            <div className="flex space-x-4 justify-end p-4">
              <button
                type="button"
                className="px-6 py-2 bg-gray-800 text-white rounded-lg "
              >
                Update
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-gray-800 text-white rounded-lg "
              >
                Add
              </button>
            </div>
          </form> 
        </div> */}

      {/* <div className="w-2/3 mx-auto mt-10 p-6 bg-gray-100 shadow-lg rounded-xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Recommendations</h2>
              <div className="max-h-60 overflow-y-auto">
                  <ul className="list-disc list-inside text-gray-700">
                      {recommendations.map((rec, index) => (
                      <li key={index} className="py-1">{rec}</li>
                      ))}
                  </ul>
                </div>
          </div> */}
      {/* </div> */}

      <Footer />
    </>
  );
};

export default Reports;
