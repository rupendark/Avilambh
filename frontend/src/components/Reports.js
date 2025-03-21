import React from 'react'
import Footer from "./Footer";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState} from "react";

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

  const [formData, setFormData] = useState({
    report_id: "",
    mine_id: "",
    status: "",
    findings: "",
    date: "",
    inspected_by: "",
    recommendations: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

   // Handle form submission
   const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    try {
      const response = await axios.post("http://localhost:5000/reports/addItem", formData);
      console.log("Data saved:", response.data);
      alert("Form submitted successfully!");
    } catch (error) {
      alert("Error submitting form");
    }
  };

  return (
    <>
    <div className="flex h-[85vh]">
      {/* Sidebar */}
      <aside className="w-[20vw]  bg-[#4A4752] text-white p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-4xl font-bold text-[#359BD2] text-center">AVILAMBH</h1>
          <nav className="mt-6 space-y-4 pt-24 pl-8">
            <Link to="/home" className="block text-gray-300 hover:text-white ">HOME</Link>
            <Link to="/reports" className="block text-gray-300 hover:text-white underline">REPORTS</Link>
            <Link to="/safety" className="block text-gray-300 hover:text-white">SAFETY</Link>
            <Link to="/transport" className="block text-gray-300 hover:text-white ">TRANSPORT</Link>
            <Link to="/inventory" className="block text-gray-300 hover:text-white ">INVENTORY</Link>
          </nav>
        </div>
      </aside>
    </div>

    <div className="w-[80vw] h-[85vh] fixed  top-0 right-0">
      <h2>SMP REPORT</h2>

      {/* Report Form */}
      <div className="max-w-2xl mx-auto bg-gray-300 p-6 rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* First Row */}
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

        {/* Second Row */}
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

        {/* Third Row */}
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

        {/* Findings */}
        <textarea
          name="findings"
          placeholder="Findings"
          value={formData.findings}
          onChange={handleChange}
          className="p-2 border border-gray-400 rounded w-full h-16"
        />

        {/* Recommendations */}
        <textarea
          name="recommendations"
          placeholder="Recommendations"
          value={formData.recommendations}
          onChange={handleChange}
          className="p-2 border border-gray-400 rounded w-full h-16"
        />
           <div className="flex space-x-4 justify-end p-4">
            <button type='button' className="px-6 py-2 bg-gray-800 text-white rounded-lg ">
                  Update
                </button>
                <button type='submit' className="px-6 py-2 bg-gray-800 text-white rounded-lg " >
                  Add
                </button>
        </div>    
      </form>
      </div>
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
    </div>

                        
     
    <Footer/>
    </>
  )
}

export default Reports