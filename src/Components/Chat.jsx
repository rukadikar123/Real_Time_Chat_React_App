import React, { useEffect } from "react";
import { useChatContext } from "../Context/ChatContext";

function Chat() {
  const {
    userName,
    newMessage,
    setNewMessage,
    currentChat,
    socket,
    setMessages,
    messages,
  } = useChatContext();

  useEffect(() => {
    socket.on("chat-message", (data) => {
      if (data.userName === userName && data.to === userName) {
        return; // Ignore duplicate message when chatting with self
      }
      console.log("Received message:", data)
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("chat-message");
    };
  }, [ socket]);

  console.log(messages);

  const handleSendMessage = () => {
    if (newMessage.trim() && currentChat) {
      const ChatMessage = { userName, newMessage, to: currentChat };
      socket.emit("send-chat-message", ChatMessage);
      setNewMessage("");
      console.log(`message send to : ${currentChat}`);
    }
  };
  // const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col justify-between gap-6 w-full p-4">
        <div className="flex justify-between">
          <h1>{userName}</h1>
        </div>
        <div className="h-full overflow-y-auto">
          {currentChat && messages?.map((message, id) => (
            <div
              key={id}
              className={`p-2 my-1 rounded ${
                message.userName === userName 
                  ? "bg-blue-500 text-white text-end " 
                  : "bg-red-300 text-black text-start"
              }`}
            >
              <strong className="text-gray-600">{message.userName}</strong>:{" "}
              {message.newMessage}
            </div>
          ))}
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
            onClick={handleSendMessage}
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
