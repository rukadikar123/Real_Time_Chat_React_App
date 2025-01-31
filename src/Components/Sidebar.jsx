import { useState } from "react";
import { useChatContext } from "../Context/ChatContext";
import { FaSearch } from "react-icons/fa";

function Sidebar({ setNewContact, newContact }) {
  const { currentChat, setCurrentChat, userName } = useChatContext();

  const { users } = useChatContext();
  console.log(users);
  console.log(currentChat);

  const filteredUsers = users.filter((user) => user !== userName);




  return (
    <>
      <div className=" w-[30%] h-screen bg-white shadow-2xl py-4 flex flex-col gap-6 justify-between">
        <h1 className="font-bold text-xl px-4">Chats</h1>
        <div className="flex items-center rounded-md border-1 mx-4 bg-gray-200 cursor-pointer px-4 gap-4">
          <input
            type="text"
            placeholder="Search"
            className="outline-none w-full  p-1 bg-transparent"
          />
          <FaSearch />
        </div>
        <ul className="overflow-y-auto flex flex-col gap-2  p-2 h-full">
          {filteredUsers?.map((user, id) => (
            <li
              key={id}
              className={` cursor-pointer font-sans px-4 py-2 text-lg  ${currentChat ===user ? "bg-gray-200 " : ""} `}
              onClick={ ()=> setCurrentChat(user) }
            >
              {user}
            </li>
          ))}
        </ul>
        <div className="flex justify-between px-2">
          <input
            value={newContact}
            onChange={(e) => setNewContact(e.target.value)}
            type="text"
            placeholder="Add Contact"
            className="outline-none w-[60%] border-1 rounded-md p-1 bg-transparent"
          />
          <button className="bg-emerald-600 text-white py-1 px-2 rounded-sm ">
            Add Contact
          </button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
