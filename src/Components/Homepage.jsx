import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Chat from "./Chat";



function Homepage({ userName,socket, setUserName }) {
  const [newContact, setNewContact] = useState("");
  const [currentChat, setCurrentChat] = useState(null);

  return (
    <>
      <div className="w-full flex gap-4">
        <Sidebar newContact={newContact}  setNewContact={setNewContact}/>
        <Chat userName={userName} socket={socket} setUserName={setUserName}  currentChat={currentChat} setCurrentChat={setCurrentChat} />
      </div>
    </>
  );
}

export default Homepage;
