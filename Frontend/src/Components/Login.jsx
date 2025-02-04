import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useChatContext } from "../Context/ChatContext";

function Login() {
  const { userName, socket, setUserName } = useChatContext(); // Retrieve Data from context

  const navigate = useNavigate();

  // handle user login
  const handleLogin = () => {
    if (userName.trim()) {
      socket.emit("new-user", userName); // Emit an event to the server with the "new-user" event name and send userName
      navigate("/homepage"); //redirect to homepage
    }
  };
  return (
    <>
      <div>
        <div className="h-screen flex items-center justify-center bg-gray-100">
          <div className="p-8 bg-white shadow rounded-lg">
            <h2 className="text-xl font-bold mb-4">Login</h2>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full p-2 border rounded-lg mb-4"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
            <button
              onClick={handleLogin}
              className="w-full bg-blue-500 hover:cursor-pointer hover:scale-105 transition-all duration-140 text-white p-2 rounded-lg"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
