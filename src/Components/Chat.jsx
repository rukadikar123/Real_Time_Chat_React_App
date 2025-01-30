import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Chat({userName, socket, setUserName}) {
    const [newMessage, setNewMessage] = useState("");

    const navigate = useNavigate();
  
  return (
    <>
      <div className="flex flex-col justify-between w-full p-4">
        <div className="flex justify-between">
          <h1>{userName}</h1>
         
        </div>
        <div className="h-full overflow-y-auto">
         chatsmsgs
        </div>
        <div className="p-4 border-t bg-white flex items-center">
          <input
            type="text"
            placeholder="Type a message"
            className="flex-1 p-2 border rounded-lg"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            className="ml-4 bg-blue-500 text-white p-2 rounded-lg"
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
}

export default Chat;
