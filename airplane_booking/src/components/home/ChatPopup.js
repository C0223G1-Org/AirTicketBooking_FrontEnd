// import React, { useState } from "react";
// import UserChat from "../chat_messenger/UserChat";
// const HomePage = () => {
//     const [showChatbox, setShowChatbox] = useState(false);
//     const handleButtonClick = () => {
//         setShowChatbox(true);
//     };
//     return (
//         <div>
//             <button
//                 id="fpt_ai_livechat_button"
//                 className="fpt_ai_livechat_button_blink"
//                 style={{ background: "#EEEEEEEE" }}
//                 onClick={handleButtonClick}
//             >
//                 <img
//                     src="https://cdn-static-v3.fpt.ai/upload/cc5d89ad1a2ac3ef4db45d7acf2d1ed6/61b5ac99f8e432b71a75e90e9aa27963.png"
//                     alt="logobutton"
//                 />
//             </button>
//             {showChatbox && <UserChat />}
//         </div>
//     );
// };
// export default HomePage;