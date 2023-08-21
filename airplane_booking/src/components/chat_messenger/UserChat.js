// UserChat.jsx
import React, { useState, useEffect,useRef } from "react";
import { database, ref, push, onValue, set } from "../../firebase-chat.js";
import "../../css/search_ticket/style-popup.css";
const UserChat = () => {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [chatStarted, setChatStarted] = useState(false);
  const [chatId, setChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [adminMessages, setAdminMessages] = useState([]);
  const [chatForm, setChatForm] = useState(false);
  const [showChatbox, setShowChatbox] = useState(false);
  const [showButton, setShowbutton] = useState(false);
  const [hasSentStartMessage, setHasSentStartMessage] = useState(false);
  const bottomRef = useRef(null);
  const [isFirstMessage, setIsFirstMessage] = useState(true);
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
    if (username.trim() === "") return;
    // Tạo room chat riêng cho người dùng
    const chatRef = push(ref(database, "chats"));
    const currentTime = new Date();
    const newChatId = chatRef.key;
    // Lưu tên người dùng và chat ID vào database
    push(ref(database, `chats/${newChatId}/user`), newChatId);
    push(ref(database, `users/${username}`), newChatId);
    const userRef = ref(database, `users/${username}`);
    set(userRef, {
      chatId: newChatId,
      timestamp: currentTime.toLocaleDateString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
        second:"2-digit"
      }),
    });

    const startMessage = {
      sender: "admin",
      content: `Chào ${username}, Chúc bạn một ngày tốt lành. Tôi là trợ lý ảo của Codegym Airline, Bạn cần chúng tôi trợ giúp điều gì ?`,
      timestamp: currentTime.toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
        
      }),
    };
    push(ref(database, `chats/${username}/messages`), startMessage);
    setChatId(username);
    setChatStarted(true);
    setChatForm(!chatForm);
  };
  console.log(showChatbox);

  const handleSendMessage = () => {
    if (message.trim() === "") return;
    const currentTime = new Date();
    const newMessage = {
      sender: username,
      content: message,
      timestamp: currentTime.toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    const userRef = ref(database, `users/${username}`);
    set(userRef, {
      chatId: username,
      timestamp: currentTime.toLocaleDateString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
        // second:"2-digit"  
      }),
    });
    // Gửi tin nhắn mới lên database
    push(ref(database, `chats/${chatId}/messages`), newMessage);
    if (isFirstMessage) {
      // Gửi tin nhắn bắt đầu từ phía admin
      const startMessage = {
        sender: "admin",
        content: `Cảm ơn bạn đã liên hệ với chúng tôi, Tư vấn viên của Codegym Airline sẽ phản hồi bạn trong thời gian sớm nhất!`,
        timestamp: currentTime.toLocaleTimeString("vi-VN", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      push(ref(database, `chats/${username}/messages`), startMessage);
      // Cập nhật biến trạng thái isFirstMessage
      setIsFirstMessage(false);
    }
    setMessage("");
  };

  const scrollToElement = () => {
    const element = document.getElementById("targetElement");
    if (element!=null) {
      element.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });

    }
  }
  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    scrollToElement()
  }, [messages,adminMessages]);

  return (
    <>
      <div>
        {chatForm && (
          <div
            className="form-popup"
            style={{
              height: "400px",
              display: chatStarted ? "block" : "none",
            }}
          >
            <h2 className="h22">CodeGym AirLine</h2>
            <div className="row clearfix">
              <div 
              id="style-7"
                // className="col-lg-12"
                style={{ overflowY: "scroll", height: "280px" }}
              >

                <div className="chat-history">
                <div id="targetElement">
                  <ul className="m-b-0">
                    {messages.map((message, index) => (
                      <li
                        key={index}
                        className={`clearfix ${message.sender === "admin"
                          ? "seft-message-user"
                          : "other-message-admin"
                          }`}
                      >
                        <div  className="message" >{message.content} <br /><span style={{fontSize:'10px',float:'left'}}> {message.timestamp}</span></div>
                      </li>
                    ))}
                    {adminMessages.map((msg, index) => (
                      <li key={index} className="clearfix">
                        <div className="message other-message">
                          {msg.content}
                        </div>
                      </li>
                    ))}
                    <div ref={bottomRef} />
                  </ul>

                  </div>
                </div>
              </div>
            </div>
            <div className="row reply" style={{ height: '50px' }}>
              <div className="col-sm-10 col-xs-10 reply-main">
                <input
                  onKeyDown={(event) => {
                    if (event.keyCode == 13) {
                      handleSendMessage();
                    }
                  }}
                  class="chat__conversation-panel__input panel-item"
                  placeholder="Nhập câu hỏi của quý khách tại đây"
                  rows="1"
                  // id="comment"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></input>
              </div>
              <a
                className="chat__conversation-panel__button panel-item btn-icon  "
                aria-hidden="true"
                onClick={handleSendMessage}
              >
                {" "}
                <svg style={{ top: '35px', left: '10px' }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-reactid="1036">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </a>

            </div>
          </div>
        )}
        {showChatbox && (
          <div
            className="form-popup"
            style={{ display: chatForm ? "none" : "block" }}
          >
            <h2 className="h23">Nhập tên của bạn để bắt đầu trò chuyện: </h2>
            <input
              style={{ position: "relative" }}
              class="chat__conversation-panel__input panel-item"
              placeholder="Nhập tên của bạn..."
              onKeyDown={(event) => {
                if (event.keyCode == 13) {
                  handleStartChat();
                }
              }}
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)} />
            <button className="chat__conversation-panel__button panel-item btn-icon send-message-button" onClick={handleStartChat}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-reactid="1036">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
            {/* <button onClick={handleStartChat}>  <i className="fa-solid fa-check"></i></button> */}
          </div>
        )}
        {/* popup */}
        <div>
          {chatForm == false ? (
            <button
              id="fpt_ai_livechat_button"
              className="fpt_ai_livechat_button_blink"
              style={{ background: "#EEEEEEEE" }}
              onClick={() => {
                setShowChatbox(!showChatbox);
                setShowbutton(!showButton);
                console.log(showButton);
              }}
            >
              <img
                src="https://cdn-static-v3.fpt.ai/upload/cc5d89ad1a2ac3ef4db45d7acf2d1ed6/61b5ac99f8e432b71a75e90e9aa27963.png"
                alt="logobutton"
              />
            </button>
          ) : (
            <button
              id="fpt_ai_livechat_button"
              className="fpt_ai_livechat_button_blink"
              style={{ background: "#EEEEEEEE" }}
              onClick={() => {
                setChatForm(!chatForm);
                setShowChatbox(!showChatbox);
                // setShowbutton(showButton)
              }} >
              <img src="https://img.icons8.com/external-bluetone-bomsymbols-/91/external-close-digital-design-bluetone-set-2-bluetone-bomsymbols-.png" alt="external-close-digital-design-bluetone-set-2-bluetone-bomsymbols-" />
            </button>
          )}
        </div>
      </div>
    </>
  );
};
export default UserChat;