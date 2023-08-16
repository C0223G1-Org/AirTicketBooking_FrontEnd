import React, { useEffect, useState } from "react";
import { database, ref, push, onValue, off } from "../../firebase-chat";
import "../../css/search_ticket/style-popup.css";

const AdminPage = () => {
  const [chats, setChats] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [adminMessage, setAdminMessage] = useState("");

  useEffect(() => {
    // Lấy danh sách các cuộc trò chuyện
    const chatsRef = ref(database, "chats");
    onValue(chatsRef, (snapshot) => {
      const data = snapshot.val();
      const chatList = data ? Object.keys(data) : [];
      setChats(chatList);
      console.log(chatList);
    });

    // Reset các tin nhắn khi không có cuộc trò chuyện được chọn
    if (!selectedChatId) {
      setChatMessages([]);
    }

    return () => {
      // Huỷ đăng ký khi component unmount
      off(chatsRef);
      if (selectedChatId) {
        const chatMessagesRef = ref(
          database,
          `chats/${selectedChatId}/messages`
        );
        off(chatMessagesRef);
      }
    };
  }, [selectedChatId]);

  useEffect(() => {
    if (selectedChatId) {
      // Lắng nghe tin nhắn của cuộc trò chuyện được chọn
      const chatMessagesRef = ref(database, `chats/${selectedChatId}/messages`);
      onValue(chatMessagesRef, (snapshot) => {
        const data = snapshot.val();
        const messages = data ? Object.values(data) : [];
        setChatMessages(messages);
      });
    }
  }, [selectedChatId]);

  const handleSelectChat = (chatId, userId) => {
    setSelectedChatId(chatId);
    console.log(chatId);
    console.log(userId);
  };

  const handleSendMessage = () => {
    if (adminMessage.trim() === "") return;

    const newAdminMessage = {
      sender: "admin",
      content: adminMessage,
      timestamp: Date.now(),
    };

    // Gửi tin nhắn từ admin tới cuộc trò chuyện được chọn
    push(ref(database, `chats/${selectedChatId}/messages`), newAdminMessage);

    setAdminMessage("");
  };

  return (
    <div id="message">
      <div className="container">
        <div
          id="fpt_ai_livechat_container_header_chat"
          style={{
            background: "#1F6987FF",
            color: "#ffffffff",
            height: "60px",
            zIndex: "999",
          }}
        >
          <div>
            <h4 style={{ position: "relative", top: "15px", left: "24px" }}>
              CodeGym AirLine
            </h4>
          </div>
        </div>

        <div className=" clearfix">
          {/* <div className="col-lg-12"> */}
          <div className="card-admin-chat chat-app ">
            <div className="row" >
              <div id="plist" className="people-list col-3">
                <ul className="list-unstyled chat-list mt-2 mb-0">
                  {chats.map((chatId, userId) => (
                    <li
                      className="clearfix"
                      key={chatId}
                      onClick={() => handleSelectChat(chatId, chats[chatId])}
                    >
                      <div className="about">
                        <div className="name">{userId}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              {/* <div className="chat-container  col-9">
                <div className="chat_messenger chat-history"> */}
              {/* <div className="chat-history"> */}
              <ul className=" chat-container  col-9 chat_messenger chat-history">
                {chatMessages.map((message, index) => (
                  <li
                    key={index}
                    className={`clearfix ${
                      message.sender === "admin"
                        ? "other-message-admin"
                        : "seft-message-user"
                    }`}
                  >
                    <div className="message">{message.content}</div>
                  </li>
                ))}
              </ul>
              {/* </div> */}
            </div>
            {/* </div>
             </div> */}
            <div className="row reply">
              <div className="col-sm-1 col-xs-1 reply-emojis">
                <i className="fa fa-smile-o fa-2x"></i>
              </div>
              <div className="col-sm-1 col-xs-1 reply-recording">
                <i className="fa fa-microphone fa-2x" aria-hidden="true"></i>
              </div>
              <div className="col-sm-9 col-xs-9 reply-main">
                <input
                  className="form-control"
                  rows="1"
                  id="comment"
                  placeholder="Nhập câu trả lời"
                  value={adminMessage}
                  onChange={(e) => setAdminMessage(e.target.value)}
                />
              </div>
              <div className="col-sm-1 col-xs-1 reply-send">
                <button
                  className="fa fa-send fa-2x"
                  aria-hidden="true"
                  onClick={handleSendMessage}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="35"
                    height="35"
                    fill="currentColor"
                    className="bi bi-send"
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
      {/* </div> */}
    </div>
  );
};
export default AdminPage;
