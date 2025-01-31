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
      console.log("Received message:", data);

      setMessages((prevmsg) => ({
        ...prevmsg,
        [data.userName]: [...(prevmsg[data.userName] || []), data],
      }));
    });

    return () => {
      socket.off("chat-message");
    };
  }, [socket, setMessages]);

  console.log(messages);

  const handleSendMessage = () => {
    if (newMessage.trim() && currentChat) {
      const ChatMessage = { userName, newMessage, to: currentChat };
      socket.emit("send-chat-message", ChatMessage);
      setMessages((prevmsg) => ({
        ...prevmsg,
        [currentChat]: [...(prevmsg[currentChat] || []), ChatMessage],
      }));
      setNewMessage("");
      console.log(`message send to : ${currentChat}`);
    }
  };
  // const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col bg-gray-800 justify-between gap-6 w-full p-4">
        <div className="flex flex-col gap-3">
          <div>
            <h1>{userName}</h1>
          </div>
          <div className="w-full border border-gray-200"></div>
        </div>

        <div className="h-full overflow-y-auto flex flex-col p-2">
          {currentChat &&
            (messages[currentChat] || []).map((message, id) => (
              <div
                key={id}
                className={`p-2 my-1 rounded-lg max-w-max ${
                  message.userName === userName
                    ? "bg-blue-600 text-white  ml-auto "
                    : "bg-gray-700  text-gray-200 "
                }`}
              >
                <strong className="text-gray-100">{message.userName}</strong>:{" "}
                {message.newMessage}
              </div>
            ))}
        </div>
        <div className="p-2 border-t bg-gray-200 flex items-center">
          <input
            type="text"
            placeholder="Type a message"
            className="flex-1 p-2 border rounded-lg"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            onClick={handleSendMessage}
            className="ml-2 bg-blue-500 text-white p-2 rounded-lg"
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
}

export default Chat;
