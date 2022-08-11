import "./styles.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setChat } from "../../slices/chatLogs";

function RoomBox(props) {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const status = useSelector((state) => state.status);

  return (
    <div
      id="roomBox"
      onClick={() => {
        dispatch(setChat(props.roomInfo));
        Navigate("/chat");
      }}
    >
      <div id="roomBoxName">{props.roomInfo.roomName}</div>
      <button
        className="delRoom"
        style={{ display: props.roomInfo.roomAdmin === status.currentUser.email ? "flex" : "none" }}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          props.handleDel(props.roomInfo.roomId);
        }}
      >
        <img className="delBtnImg" src="/assets/x-button.svg" alt="delete button" />
      </button>
      <div id="roomBoxAdmin">Admin: {props.roomInfo.roomAdmin}</div>
    </div>
  );
}

export default RoomBox;
