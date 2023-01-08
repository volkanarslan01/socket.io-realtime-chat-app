import React, { useEffect, useState } from "react";
import "./App.css";
import ScrolltoBottom from "react-scroll-to-bottom";
function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      currentMessage("");
    }
  };
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);
  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <ScrolltoBottom className="message-container">
          {messageList.map((data) => {
            return (
              <div
                className="message"
                id={username === data.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{data.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{data.time}</p>
                    <p id="author">{data.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrolltoBottom>
      </div>
      <div className="chat-footer">
        <input
          value={currentMessage}
          onKeyDown={(event) => {
            event.key === "Enter" && sendMessage();
          }}
          type="text"
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
        />
        <button type="button" onClick={sendMessage}>
          &#9658;
        </button>
      </div>
    </div>
  );
}

export default Chat;
