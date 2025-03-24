import React,{useState} from 'react'
import Footer from "./Footer";
import { Link } from "react-router-dom";

const Saftey = () => {
  const safety_data = [
    { drill_id: 1, date: "12 mar", training_type: "A" },
    { drill_id: 2, date: "16 apr", training_type: "B"},
    { drill_id: 3, date: "6 feb", training_type: "C"},
  ];
  return (
    <>
    <div className="flex h-[90vh]">
      {/* Sidebar */}
      <aside className="w-[20vw]  bg-[#4A4752] text-white p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-4xl font-bold text-[#359BD2] text-center">AVILAMBH</h1>
          <nav className="mt-6 space-y-4 pt-24 pl-8">
            <Link to="/home" className="block text-gray-300 hover:text-white ">HOME</Link>
            <Link to="/reports" className="block text-gray-300 hover:text-white">REPORTS</Link>
            <Link to="/safety" className="block text-gray-300 hover:text-white underline">SAFETY</Link>
            <Link to="/transport" className="block text-gray-300 hover:text-white ">TRANSPORT</Link>
            <Link to="/inventory" className="block text-gray-300 hover:text-white ">INVENTORY</Link>
          </nav>
        </div>
      </aside>
    </div>
    <div className="w-[80vw] h-[85vh] fixed -z-10 top-0 right-0">SAFETY
    <div className='p-4 bg-gray-200'>
    <div className="p-4 min-w-full bg-gray-500" classDate="p-4">
    <h1 className='text-white text-lg'>Production Record</h1>
    <table className=" p-3 min-w-full bg-white">
      <thead className='bg-gray-400'>
        <tr className="bg-gray-400 text-left">
          <th className="text-white border p-2">Drill_ID</th>
          <th className="text-white border p-2">Date</th>
          <th className="text-white border p-2">training_type</th>
        </tr>
      </thead>
      <tbody>
        {safety_data.map((row) => (
          <tr key={row.id} className="hover:bg-gray-100">
            <td className="border p-2">{row.drill_id}</td>        
            <td className="border p-2">{row.date}</td>
            <td className="border p-2">{row.training_type}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
   <div className="flex space-x-4 justify-end p-4">
          <button type='button' className="px-6 py-2 bg-gray-800 text-white rounded-lg "> Update </button>                
          <button type='button' className="px-6 py-2 bg-gray-800 text-white rounded-lg "> Add </button>         
        </div> 
  </div>
  </div>
  <Footer/>
</>
  )
}

export default Saftey