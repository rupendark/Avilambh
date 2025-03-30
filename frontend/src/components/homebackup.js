import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import Chart from "react-apexcharts";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState([]);
  const [currtime, setCurrTime] = useState(new Date());
  const today = moment().format("YYYY-MM-DD");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const now2 = now.toISOString().slice(0, 16);
      setCurrTime(now2);
    }, 1000); // Update time every second
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/jobs")
      .then((response) => {
        setJobs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching job data:", error);
      });
  }, []);

  const startTime = new Date(selectedJob.start_time); // Example start time
  const currTime = new Date(currtime); // Example end time
  const endTime = new Date(selectedJob.end_time); // Example end time
  const diff1 = currTime - startTime; // Difference in milliseconds
  const diff2 = endTime - currTime; // Difference in milliseconds
  const [chartConfig, setChartConfig] = useState({
    type: "pie",
    width: 150,
    height: 150,
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
  });

  // Filter jobs for the current day
  const todayJobs = jobs.filter((job) =>
    moment(job.start_time).isSame(today, "day")
  );

  const getJobStyle = (batch) => {
    const batchColors = {
      1: "#f6c23e", // Yellow
      2: "#1cc88a", // Green
      3: "#36b9cc", // Blue
    };
    return {
      backgroundColor: batchColors[batch] || "#4e73df", // Default Blue
      color: "#fff",
      padding: "10px",
      borderRadius: "5px",
      marginBottom: "8px",
    };
  };

  const updateChartConfig = (job) => {
    const startTime = new Date(job.start_time);
    const endTime = new Date(job.end_time);
    const nowTime = new Date(currtime);

    console.log(startTime,endTime,nowTime)

    const complete = nowTime - startTime > 0 ? nowTime - startTime : 0;
    const left = endTime - nowTime > 0 ? endTime - nowTime : 0;

    console.log(complete,left)
    setChartConfig({
      type: "pie",
      width: 150,
      height: 150,
      series: [complete, left],
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
        colors: [ "#00897b","#ff8f00"],
        legend: {
          show: false,
        },
      },
    });
  };

  const handleSelectEvent = (item) => {
    console.log("selected");
    setSelectedJob({
      id: item.id,
      task: item.task,
      batch: item.batch,
      start_time: moment(item.start_time).format("YYYY-MM-DDTHH:mm"), // Ensure proper format
      end_time: moment(item.end_time).format("YYYY-MM-DDTHH:mm"),
      smp_id: item.smp_id, // Add missing fields
    });
    updateChartConfig(selectedJob);
  };


  useEffect(() => {
    if (selectedJob.start_time && selectedJob.end_time) {
      updateChartConfig(selectedJob);
    }
  }, [selectedJob, currtime]);

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
        <div className="w-[80vw] h-[80vh] fixed top-0 right-0 ">
          <div className="w-[60vw] h-[40vh] bg-slate-500 mx-auto my-6 grid grid-cols-5 ">
            <div className="p-6 col-span-2 mx-auto">
              {selectedJob.task || "Task"}
              <Chart {...chartConfig} />
            </div>

            <div className="h-[40vh] p-4 col-span-3">
              <h2 className="text-2xl font-bold mb-4 ">Today's Job Schedule</h2>
              <div className="h-[30vh] overflow-y-auto scrollbar-hide">
                <div className="grid grid-cols-4 gap-4 ">
                  {todayJobs.length > 0 ? (
                    todayJobs.map((job) => (
                      <div
                        key={job.job_id}
                        style={getJobStyle(job.batch)}
                        className="h-[15vh]"
                        onClick={() => handleSelectEvent(job)}
                      >
                        <strong>{job.task}</strong>
                        <br />
                        <span className="text-xs">
                          from: {moment(job.start_time).format("hh:mm A")}
                          <br />
                          to: {moment(job.end_time).format("hh:mm A")}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p>No jobs scheduled for today.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </>
    </div>
  );
};

export default Home;
