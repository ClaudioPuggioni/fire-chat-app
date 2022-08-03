import "./styles.css";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

function ChatBox(props) {
  const status = useSelector((state) => state.status);
  let [userIsSender, setUserIsSender] = useState(false);

  useEffect(() => {
    status.currentUser.email === props.msgInfo.senderEmail ? setUserIsSender(true) : setUserIsSender(false);
  }, []);

  //Date().toLocaleString()
  //style={{ left: props.sender === "user" ? "-5px" : "" }}
  return (
    <div className="chatBoxUser" style={{ alignSelf: userIsSender ? "flex-start" : "flex-end" }}>
      <div className="email">{userIsSender ? props.msgInfo.senderEmail : null}</div>
      <div className="date">{props.msgInfo.date}</div>
      <div className="chatBox" style={{ backgroundColor: userIsSender ? "#BADEFC" : "#FFBDC9", alignSelf: userIsSender ? "flex-start" : "flex-end" }}>
        <div className="tri" style={{ left: userIsSender ? "-8px" : "", right: userIsSender ? "" : "-8px", color: userIsSender ? "#BADEFC" : "#FFBDC9" }}>
          ▼
        </div>
        <div className="msg">{props.msgInfo.message}</div>
      </div>
    </div>
  );
}

export default ChatBox;
