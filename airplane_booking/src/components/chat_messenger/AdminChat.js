import React, { useEffect, useState,useRef } from "react";
import { database, ref, push, onValue, off, orderByChild,query } from "../../firebase-chat";
import "../../css/search_ticket/style-popup.css";

const AdminPage = () => {
  const [chats, setChats] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [adminMessage, setAdminMessage] = useState("");
  const [userName, setUserName] = useState("");
  const bottomRef = useRef(null); // Tham chiếu tới phần tử cuối cùng
 const [flag,setFlag]=useState(false)
  // const list= async () =>{
  //     const ordersref = collection(database, "users");
  //     const q = query(ordersref, orderBy("timezone", "desc"));
  //     const querysnapshot = await q.get();
  //     console.log(querysnapshot);
  //   }
  //   useEffect(()=>{
  //     list()
  //   },[])
  useEffect(() => {
    // Lấy danh sách các cuộc trò chuyện
    const chatsRef = ref(database, "users");

    onValue(chatsRef, (snapshot) => {
      const data = snapshot.val();
      // const chatList = data ? Object.keys(data) : [];
      console.log(data);

      let dataObj=Object.values(data);
      let dataKey=Object.keys(data)
      console.log(dataObj);

      for (let i = 0; i < dataObj.length; i++) {
        for (let j = i; j < dataObj.length-1; j++) {
          let bag;
          let key;
          if (dataObj[i].timestamp<dataObj[j+1].timestamp) {
            key=dataKey[i]
            bag=dataObj[i];
          
            dataObj[i]=dataObj[j+1];
            dataKey[i]=dataKey[j+1];

            dataObj[j+1]=bag
            dataKey[j+1]=key
          }
        }
      }
      setChats(dataKey);
       console.log(dataKey);
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

  const scrollToElement = () => {
    const element = document.getElementById("targetElement");
    element.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
  }

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    scrollToElement()
  }, [chatMessages]);

  useEffect(() => {
    if (selectedChatId) {
      // Lắng nghe tin nhắn của cuộc trò chuyện được chọn
      const chatMessagesRef = ref(database, `chats/${selectedChatId}/messages`);
      onValue(chatMessagesRef, (snapshot) => {
        const data = snapshot.val();
        const messages = data ? Object.values(data) : [];
        console.log(messages);
        setChatMessages(messages);
      });
    }
  }, [selectedChatId]);

  useEffect(() => {
    if (selectedChatId) {
      const userNameRef = ref(
        database,
        `chats/${selectedChatId}/user/${selectedChatId}`
      );
      onValue(userNameRef, (snapshot) => {
        const data = snapshot.val();
        const name = data ? data.sender : "";
        setUserName(name);
      });
    }
  }, [selectedChatId]);

  const handleSelectChat = (chatId) => {
    setSelectedChatId(chatId);
    console.log(chatId);
  };

  const handleSendMessage = () => {
    if (adminMessage.trim() === "") return;
    const currentTime = new Date();
    const newAdminMessage = {
      sender: "admin",
      content: adminMessage,
      timestamp: currentTime.toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
        second:"2-digit"
      }),
    };

    // Gửi tin nhắn từ admin tới cuộc trò chuyện được chọn
    push(ref(database, `chats/${selectedChatId}/messages`), newAdminMessage);

    setAdminMessage("");
  };

  return (

    <div id="message" style={{ paddingLeft: '250px' }}>
      <div
        style={{
          width: '80%',
          background: "#1F6987FF",
          color: "#ffffffff",
          height: "60px",
          zIndex: "999",
        }}>
        <div>
          <h4
            style={{
              position: "relative",
              top: "15px",
              left: "24px",
              color: "rgb(223, 165, 18)",
              textTransform: "uppercase",
              fontWeight: "bold",
            }}
          >
            CodeGym AirLine
          </h4>
        </div>
      </div>
      <div className="row people-list " style={{ height: "400px", background: "#fff", width: '80%' }} >
        <div className=" chat-app col-3" style={{ height: "400px", borderRight: '2px solid rgb(6, 133, 170)' }} id="style-8">
          <ul  >
            {chats.map((chatId) => (
              <li

                className={` ${selectedChatId === chatId ? "selected-user" : ""
                  }`}
                key={chatId}
                onClick={() => handleSelectChat(chatId)}
              >
                <div className="about">
                  <div
                    className={`name ${selectedChatId === chatId ? "bold" : ""
                      }`}
                  >
                    {chatId}
                  </div>
                </div>
              </li>
            ))}
          </ul>



        </div>
        <div className=" col-9 " >
          <div className="row chat-app" style={{ height: '350px' }} id="style-8">
            <div id="targetElement">
            <ul className=" chat-container chat_messenger chat-history"  >
              {chatMessages.map((message, index) => (
                <li
                  key={index}
                  className={`clearfix ${message.sender === "admin"
                    ? "other-message-admin"
                    : "seft-message-user"
                    }`}
                >
                  <div className="message">
                    {message.content} <br /> <span style={{ fontSize: '10px', float: 'left' }}>{message.timestamp}</span>
                  </div>
                </li>

              ))}
               <div ref={bottomRef} />
            </ul>

            </div>
          </div>
          <div className="row reply">
            <div className="col-11">
              <input
                onKeyDown={(event) => {
                  if (event.keyCode == 13) {
                    handleSendMessage();
                  }
                }}
                className="form-control"
                rows="1"
                id="comment"
                placeholder="Nhập câu trả lời"
                value={adminMessage}
                onChange={(e) => setAdminMessage(e.target.value)}
              />
            </div>
           
            <a
              className="chat__conversation-panel__button panel-item btn-icon "
              aria-hidden="true"
              onClick={handleSendMessage}
            >
              {" "}
              <svg style={{ top: '20px', left: '20px' }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-reactid="1036">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </a>

          </div>
        </div>
      </div>
    </div>

  );
};
export default AdminPage;
