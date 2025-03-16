import React from 'react'
import Footer from "./Footer";
import { Link } from "react-router-dom";

const Saftey = () => {
  return (
    <>
    <div className="flex h-[85vh]">
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
    <div className="w-[80vw] h-[85vh] fixed -z-10 top-0 right-0">SAFETY</div>

    <Footer/>
    </>
  )
}

export default Saftey