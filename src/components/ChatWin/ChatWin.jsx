import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { getDatabase, ref, onValue, get, child, push, set } from "firebase/database";
import { db } from "../../firebase-config";
import { setMsgs, setChat } from "../../slices/chatLogs";
import ChatBox from "../ChatBox/ChatBox";

function ChatWin() {
  const status = useSelector((state) => state.status);
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const inputMsg = useRef(null);
  const bottomDiv = useRef(null);
  const chatBoxRef = useRef(null);

  useEffect(() => {
    console.log("ping! ran ChatWin useEffect~!");
    console.log("ping! ran ChatWin useEffect~!");
    console.log("ping! ran ChatWin useEffect~!");
    if (!status.currentUser) Navigate("/404");
    populateChat();

    setTimeout(() => {
      bottomDiv.current.scrollIntoView({ behavior: "smooth" });
    }, 30);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    bottomDiv.current.scrollIntoView({ behavior: "smooth" });
    // eslint-disable-next-line
  }, [status.messages]);

  function populateChat() {
    // const dbRef = ref(getDatabase()); // I don't understand this line . why new getDatabase when we have db
    // get(child(dbRef, `rooms/${status.currChat.roomId}/messages`))
    //   .then((snapshot) => {
    //     if (snapshot.exists()) {
    //       console.log("Messages already exist!:", snapshot.val());
    const messagesRef = ref(db, `rooms/${status.currChat.roomId}/messages`);
    onValue(messagesRef, (snapshot) => {
      const messageData = snapshot.val();
      if (messageData) dispatch(setMsgs(messageData));
      //   });
      // } else {
      //   console.log("No messages available.");
      // }
      // }).catch((error) => {
      //   alert(error);
    });
  }

  function sendMsg(msg) {
    // Create a new post reference with an auto-generated id
    const messagesRef = ref(db, `rooms/${status.currChat.roomId}/messages`);
    const newPostRef = push(messagesRef);
    set(newPostRef, {
      ...msg,
    });
  }

  //Date().toLocaleString()

  return (
    <div id="chatWin">
      <div id="chatWinContainer">
        <div ref={chatBoxRef} id="chatBox">
          <div id="chatWinHeader">
            <button id="returnArrowBtn" onClick={() => dispatch(setChat(null)) && dispatch(setMsgs(false)) && Navigate("/rooms")}>
              <img id="returnArrowIcon" src="/assets/return-arrow.svg" alt="return to rooms icon" />
            </button>
            {status.currChat.roomName}
          </div>
          {status.messages ? status.messages.map((ele, idx) => <ChatBox msgInfo={ele} admin={status.currChat.roomAdmin} />) : null}
          <div ref={bottomDiv}></div>
        </div>
        <div id="inpuDiv">
          <input
            ref={inputMsg}
            id="inputBox"
            type="text"
            onKeyDown={(e) => {
              if (["Enter", "NumpadEnter"].includes(e.key)) {
                sendMsg({ sender: status.currentUser.displayName, senderEmail: status.currentUser.email, date: Date(), message: e.target.value });
                e.target.value = "";
              }
            }}
          />
          <button
            id="inputSend"
            onClick={() => {
              sendMsg({ sender: status.currentUser.displayName, senderEmail: status.currentUser.email, date: Date(), message: inputMsg.current.value });
              inputMsg.current.value = "";
            }}
          >
            SEND
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatWin;
