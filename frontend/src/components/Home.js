import React from "react";

import { Link } from "react-router-dom";
import Footer from "./Footer";

const Home = () => {
  return (
    <div>
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
                  className="block text-gray-300 hover:text-white underline"
                >
                  HOME
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
                  className="block text-gray-300 hover:text-white"
                >
                  TRANSPORT
                </Link>
                <Link
                  to="/inventory"
                  className="block text-gray-300 hover:text-white"
                >
                  INVENTORY
                </Link>
              </nav>
            </div>
          </aside>
        </div>
        <div className="w-[80vw] h-[85vh] fixed -z-10 top-0 right-0">HOME</div>
        <Footer />
      </>
    </div>
  );
};

export default Home;
