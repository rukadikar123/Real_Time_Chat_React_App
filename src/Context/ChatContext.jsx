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

  const handleLogout=(navigate)=>{
    socket.emit("logout")
    socket.disconnect();
    setUsers((prevuser)=> prevuser.filter((user)=> user !==userName))
    setMessages((prevmsg)=>{
      const newmessages={...prevmsg};
      delete newmessages[userName];
      return newmessages
    })
    setUserName("");
    setCurrentChat(null)
    navigate("/")

  }


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
