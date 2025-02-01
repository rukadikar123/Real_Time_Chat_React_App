import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  // State Variables
  const [userName, setUserName] = useState("");
  const [users, setUsers] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Listen for the "user-list" event from the server and sends a list of all connected users
    socket.on("user-list", (userList) => {
      console.log("User list received:", userList);

      // Update the state with the new user list received from the server
      setUsers(userList);
    });

    // Cleanup function to remove the "user-list" event listener when the component unmounts
    return () => {
      socket.off("user-list");
    };
  }, []);

  //hanfle logout function
  const handleLogout = (navigate) => {
    socket.emit("logout"); // Emit a "logout" event to the server
    socket.disconnect(); // Disconnect the socket
    setUsers((prevuser) => prevuser.filter((user) => user !== userName)); // Update the users list by removing the current user from the list

    // Remove the current user's messages from the state
    setMessages((prevmsg) => {
      const newmessages = { ...prevmsg };
      delete newmessages[userName];
      return newmessages;
    });
    setUserName("");
    setCurrentChat(null); // Reset the current chat to `null` since the user is logging out
    navigate("/"); // Redirect the user to the login page
  };

  return (
    <ChatContext.Provider
      value={{
        userName,
        setUserName,
        socket,
        handleLogout,
        users,
        newMessage,
        setNewMessage,
        currentChat,
        setCurrentChat,
        messages,
        setMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  return useContext(ChatContext);
};
