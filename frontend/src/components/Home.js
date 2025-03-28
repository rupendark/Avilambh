import React from "react";
import Chart from "react-apexcharts";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const Home = () => {
  const startTime = new Date("2024-03-25T10:00:00"); // Example start time
  const currTime = new Date("2024-03-25T15:30:00");   // Example end time
  const endTime = new Date("2024-03-26T19:30:00");   // Example end time
  const diff1 = currTime - startTime; // Difference in milliseconds
  const diff2 = endTime - currTime; // Difference in milliseconds
  const chartConfig = {
    type: "pie",
    width: 280,
    height: 280,
    series: [diff1, diff2],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      title: {
        show: "",
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#ff8f00", "#00897b"],
      legend: {
        show: false,
      },
    },
  };
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
                  to="/Jobs"
                  className="block text-gray-300 hover:text-white"
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
        <div className="w-[80vw] h-[85vh] fixed -z-10 top-0 right-0">
          <Chart {...chartConfig} />
        </div>
        <Footer />
      </>
    </div>
  );
};

export default Home;
