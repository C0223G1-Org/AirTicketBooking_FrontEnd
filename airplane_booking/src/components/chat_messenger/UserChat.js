// UserChat.jsx
import React, { useState, useEffect } from "react";
import { database, ref, push, onValue } from "../../firebase-chat.js";
import "../../css/search_ticket/style-popup.css";

const UserChat = () => {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [chatStarted, setChatStarted] = useState(false);
  const [chatId, setChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [adminMessages, setAdminMessages] = useState([]);

  useEffect(() => {
    if (chatId) {
      const messagesRef = ref(database, `chats/${chatId}/messages`);
      onValue(messagesRef, (snapshot) => {
        const data = snapshot.val();
        const messages = data ? Object.values(data) : [];

        setMessages(messages);
      });
    }
    const adminMessagesRef = ref(database, `chats/${chatId}/adminMessages`);
    onValue(adminMessagesRef, (snapshot) => {
      const data = snapshot.val();
      const messages = data ? Object.values(data) : [];
      console.log(messages);
      setAdminMessages(messages);
    });
  }, [chatId]);

  const handleStartChat = async () => {
    // Tạo room chat riêng cho người dùng
    const chatRef = push(ref(database, "chats"));
    const newChatId = chatRef.key;

    // Lưu tên người dùng và chat ID vào database
    push(ref(database, `chats/${newChatId}/user`), username);
    push(ref(database, `users/${username}`), newChatId);

    setChatId(newChatId);
    setChatStarted(true);
  };

  const handleSendMessage = () => {
    if (message.trim() === "") return;

    const newMessage = {
      sender: username,
      content: message,
      timestamp: Date.now(),
    };

    // Gửi tin nhắn mới lên database
    push(ref(database, `chats/${chatId}/messages`), newMessage);

    setMessage("");
  };

  return (
    <>
      <div
        className="container"
        id="_livechat_container"
        style={{
          width: "600px",
          border: "1px",
          display: chatStarted ? "block" : "none",
        }}
      >
        <div className="container" style={{ width: "600px", border: "1px" }}>
          <div
            id="fpt_ai_livechat_container_header"
            style={{
              background: "#1F6987FF",
              color: "#ffffffff",
              height: "60px",
            }}
          >
            <div>
              <h4 style={{ position: "relative", top: "15px", left: "24px" }}>
                CodeGym AirLine
              </h4>
            </div>
          </div>

          <div className="row clearfix">
            <div className="col-lg-12">
              <div>
                <div className="chat_messenger">
                  <div className="chat-history">
                    <ul className="m-b-0">
                      {messages.map((message, index) => (
                        <li
                        key={index}
                        className={`clearfix ${
                          message.sender === "admin"
                            ? "seft-message-user"
                            : "other-message-admin"
                        }`}
                      >
                        <div className="message">{message.content}</div>
                      </li>
                      ))}
                      {adminMessages.map((msg, index) => (
                        <li key={index} className="clearfix">
                          <div className="message other-message">
                            {msg.content}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="row reply">
                    <div className="col-sm-1 col-xs-1 reply-emojis">
                      <i className="fa fa-smile-o fa-2x"></i>
                    </div>
                    <div className="col-sm-1 col-xs-1 reply-recording">
                      <i
                        className="fa fa-microphone fa-2x"
                        aria-hidden="true"
                      ></i>
                    </div>
                    <div className="col-sm-9 col-xs-9 reply-main">
                      <input
                        className="form-control"
                        rows="1"
                        id="comment"
                        placeholder="Nhập câu hỏi của quý khách tại đây"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      ></input>
                    </div>
                    <div className="col-sm-1 col-xs-1 reply-send">
                      <button
                        className="fa fa-send fa-2x"
                        aria-hidden="true"
                        onClick={handleSendMessage}
                      >
                        {" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="35"
                          height="35"
                          fill="currentColor"
                          class="bi bi-send"
                          viewBox="0 0 16 16"
                        >
                          <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: chatStarted ? "none" : "block" }}>
        <h2>Nhập tên của bạn và bắt đầu trò chuyện</h2>
        <input
          type="text"
          placeholder="Tên người dùng"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={handleStartChat}>Bắt đầu</button>
      </div>
    </>
  );
};

export default UserChat;
