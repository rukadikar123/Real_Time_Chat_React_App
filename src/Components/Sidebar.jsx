import React from "react";

function Sidebar({ setNewContact, newContact, setCurrentChat, currentChat }) {


  return (
    <>
      <div className=" w-[30%] h-screen bg-gray-300 py-2 px-4 flex flex-col gap-6 justify-between">
        <h1>Chats</h1>
        <div>
          <input
            type="text"
            placeholder="Search"
            className="outline-none w-full rounded-md border-1 p-1 bg-transparent"
          />
        </div>
        <div className="overflow-y-auto flex flex-col gap-2 bg-amber-100 p-2 h-full">
          contacts
        </div>
        <div className="flex justify-between">
          <input
            value={newContact}
            onChange={(e) => setNewContact(e.target.value)}
            type="text"
            placeholder="Add Contact"
            className="outline-none w-[60%] border-1 rounded-md p-1 bg-transparent"
          />
          <button
        
            className="bg-emerald-600 text-white py-1 px-2 rounded-sm "
          >
            Add Contact
          </button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
