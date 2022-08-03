import "./styles.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setChat } from "../../slices/chatLogs";

function RoomBox(props) {
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div
      id="roomBox"
      onClick={() => {
        dispatch(setChat(props.roomInfo));
        Navigate("/chat");
      }}
    >
      <div id="roomBoxName">{props.roomInfo.roomName}</div>
      <div id="roomBoxAdmin">Admin: {props.roomInfo.roomAdmin}</div>
    </div>
  );
}

export default RoomBox;
