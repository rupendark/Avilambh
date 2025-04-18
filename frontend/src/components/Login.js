import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import login_bg from "../maps/login_bg.webp";
import login_bg2 from "../maps/bg2.png";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login data:", formData);
    const url = "http://localhost:5000/auth/login";
    const response = await axios.post(url, formData, {
      withCredentials: true, // ✅ Important: Send cookies
    });
    const data = response.data;

    if (data.message==="Login successful") {
      localStorage.setItem("token", data);
      navigate("/landing");
    } else {
      alert("Invalid login");
    }

    if (response) {
      console.log("Login success");
    } else {
      console.log("error");
    }
  };

  return (
    <div
      className=" items-center flex  min-h-screen bg-cover"
      style={{ backgroundImage: `url(${login_bg2})` }}
    >
      <div className="w-[35%] ml-48  p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center mb-2 text-[#7a0505] drop-shadow-2xl">
          WELCOME TO AVILAMBH!
        </h2>
        <div className="w-full p-8 space-y-6 border-4 border-[#FEBA17] bg-[#0805057f] rounded-lg">
          <h2 className="text-3xl font-bold text-center text-white">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username Field */}
            <div>
              <label className="block text-xl font-bold text-[#ffffff]">
                E-mail
              </label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 placeholder-white bg-transparent border-2 border-[#FEBA17] rounded-full focus:outline-none focus:ring focus:border-blue-300 focus:bg-white"
                placeholder="Enter your username"
                required
              />
            </div>
            {/* Password Field */}
            <div>
              <label className="block text-xl font-bold text-white">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 placeholder-white bg-transparent border-2 border-[#FEBA17] rounded-full focus:outline-none focus:ring focus:border-blue-300 focus:bg-white"
                placeholder="Enter your password"
                required
              />
            </div>

            {/* Login Button */}
            <div className="flex">
              <button
                type="submit"
                className="px-12 py-2 mt-4 font-bold text-white bg-[#FEBA17] border-[#FEBA17] rounded-lg hover:bg-transparent hover:border-[#FEBA17] border-4 focus:outline-none focus:ring-2 focus:ring-blue-300 mx-auto"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
