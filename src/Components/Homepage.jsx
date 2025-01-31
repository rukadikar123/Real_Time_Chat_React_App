import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Chat from "./Chat";



function Homepage() {

  const [newContact, setNewContact] = useState("");
 

  return (
    <>
      <div className="w-full flex gap-4">
        <Sidebar newContact={newContact}  setNewContact={setNewContact}/>
        <Chat   />
      </div>
    </>
  );
}

export default Homepage;
