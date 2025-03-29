import React from "react";
import "tailwindcss/tailwind.css";

const jobs = [
  { id: 1, name: "Job A", start: "09:00", end: "11:00" },
  { id: 2, name: "Job B", start: "10:30", end: "12:30" },
  { id: 3, name: "Job C", start: "13:00", end: "15:00" },
];

const timeSlots = [
  "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"
];

const getPosition = (time) => {
  const [hours, minutes] = time.split(":").map(Number);
  return (hours - 8) * 50 + (minutes / 60) * 50; // Assuming each hour is 50px
};

const JobScheduler = () => {
  return (
    <div className="relative w-full max-w-3xl p-4 border shadow-md">
      {/* Time Grid */}
      <div className="relative w-full border-l border-t">
        {timeSlots.map((time, index) => (
          <div key={time} className="relative h-[50px] border-b border-gray-300">
            <span className="absolute -left-12 text-sm text-gray-500">{time}</span>
          </div>
        ))}
      </div>

      {/* Jobs */}
      {jobs.map((job) => (
        <div
          key={job.id}
          className="absolute left-20 bg-blue-500 text-white px-2 py-1 rounded shadow-md"
          style={{
            top: `${getPosition(job.start)}px`,
            height: `${getPosition(job.end) - getPosition(job.start)}px`,
          }}
        >
          {job.name}
        </div>
      ))}
    </div>
  );
};

export default JobScheduler;