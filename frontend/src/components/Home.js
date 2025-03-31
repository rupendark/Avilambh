import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import Chart from "react-apexcharts";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import map from "../maps/map.gif";
import map2 from "../maps/map2.jpg";

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState([]);
  const [currtime, setCurrTime] = useState();
  const today = moment().format("YYYY-MM-DD");
  const [mapSrc, setMapSrc] = useState(map);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrTime(now);
    }, 60000); // Update time every second
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

  //default chart
  const [chartConfig, setChartConfig] = useState({
    type: "pie",
    width: 150,
    height: 150,
    series: [50, 50],
    options: {
      chart: {
        toolbar: { show: false },
        events: {},
      },
      states: {
        active: {
          filter: {
            type: "none", //  Prevent selection effect on click
          },
        },
        hover: {
          filter: {
            type: "none", //  Prevent hover effect
          },
        },
      },

      stroke: { show: false },
      title: {
        show: "",
      },
      tooltip: {
        enabled: false,
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      colors: ["#22C55E", "#EAB308"],
    },
  });

  // Filter jobs for the current day
  const todayJobs = jobs.filter(
    (job) =>
      moment(job.start_time).isSame(today, "day") ||
      moment(job.end_time).isSame(today, "day")
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
    const nowTime = new Date();

    // console.log(startTime,endTime,nowTime)         // very IMP

    let complete, left;

    if (nowTime >= endTime) {
      complete = 100;
      left = 0;
    } else if (nowTime <= startTime) {
      complete = 0;
      left = 100;
    } else {
      complete = nowTime - startTime;
      left = endTime - nowTime;
    }
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
        labels: ["Completed", "Remaining"],
        dataLabels: {
          enabled: false,
        },
        legend: {
          show: false,
        },
      },
    });
  };

  const handleSelectEvent = (item) => {
    setSelectedJob({
      id: item.job_id,
      task: item.task,
      batch: item.batch,
      start_time: item.start_time,
      end_time: item.end_time,
      smp_id: item.smp_id,
    });
  };

  useEffect(() => {
    if (selectedJob && selectedJob.start_time && selectedJob.end_time) {
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
        <div className="w-[80vw] h-[90vh] fixed top-0 right-0 overflow-y-auto">
          <div className="bg-slate-500 h-[50vh] w-[60vw] mx-auto mt-4 relative flex p-4">
            <img
              src={mapSrc}
              alt="Site Map"
              class="w-[40vw] border border-gray-400 shadow-lg ml-8"
            />

            <div class="absolute right-16 top-12 flex flex-col space-y-3">
              <button
                class="w-32 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
                onClick={()=>setMapSrc(map)}
              >
                Mine 1
              </button>
              <button class="w-32 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600" onClick={()=>setMapSrc(map2)}>
                Mine 2
              </button>
              <button class="w-32 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600">
                Mine 3
              </button>
              <button class="w-32 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600">
                Mine 4
              </button>
              <button class="w-32 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600">
                Mine 5
              </button>
            </div>
          </div>

          {/* //job progress */}
          <div className="w-[60vw] h-[45vh] bg-slate-500 mx-auto my-6 grid grid-cols-5 ">
            <div className="p-6 col-span-2 mx-auto">
              <div className="text-white w-72 left">
                {selectedJob.id || "job_id"} : {selectedJob.task || "Task"}
                <br />
                batch : {selectedJob.batch || "task not selected"}
                <br />
                SMP : {selectedJob.smp_id || "task not selected"}
              </div>
              <Chart {...chartConfig} />

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span className="text-gray-700 text-sm">Completed</span>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                  <span className="text-gray-700 text-sm">Remaining</span>
                </div>
              </div>
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
