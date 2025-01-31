import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [userName, setUserName] = useState("");
  const [users, setUsers] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("user-list", (userList) => {
      console.log("User list received:", userList);
      
      setUsers(userList);
      
      
    });

    return () => {
      socket.off("user-list");
    };
  }, []);


  return (
    <ChatContext.Provider
      value={{
        userName,
        setUserName,
        socket,
        users,
        newMessage,
        setNewMessage,
        currentChat,
        setCurrentChat,
        messages,
        setMessages
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  return useContext(ChatContext);
};
