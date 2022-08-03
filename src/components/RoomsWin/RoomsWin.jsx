import "./styles.css";
import { useEffect, useRef, useContext } from "react";
import communal from "../../contexts/communal";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { updateRooms } from "../../slices/chatLogs";
import { ref, onValue, push, set } from "firebase/database";
import { db } from "../../firebase-config";
import RoomBox from "../RoomBox/RoomBox";

function RoomsWin() {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const status = useSelector((state) => state.status);
  let newRoom = useRef(null);
  let commCtxt = useContext(communal);

  useEffect(() => {
    if (!status.currentUser) Navigate("/404");
    populateRooms();
    // eslint-disable-next-line
  }, []);

  function addRoom(input) {
    const roomsListRef = ref(db, "rooms");
    const newRoomRef = push(roomsListRef);
    set(newRoomRef, { ...input });
  }

  function populateRooms() {
    const roomRef = ref(db, "rooms/");
    onValue(roomRef, (snapshot) => {
      const roomData = snapshot.val();
      console.log("roomData is", roomData);
      dispatch(updateRooms(roomData));
    });
  }

  return (
    <div id="roomsWin">
      <div id="roomsWinHotel">
        <div id="roomsWinHeader">Chatter Rooms</div>
        <div id="roomsWinHotelHall">{status.rooms ? status.rooms.map((ele) => <RoomBox roomInfo={ele} />) : null}</div>
        <div id="roomsWinInputBox">
          <input
            ref={newRoom}
            id="roomsWinInput"
            type="text"
            onKeyDown={(e) => {
              if (["Enter", "NumpadEnter"].includes(e.key)) {
                addRoom({ admin: status.currentUser.email, name: e.target.value });
                e.target.value = "";
              }
            }}
          />
          <button
            id="roomsWinAddBtn"
            onClick={() => {
              addRoom({ admin: status.currentUser.email, name: newRoom.current.value });
              newRoom.current.value = "";
            }}
          >
            Add Room
          </button>
        </div>
      </div>
    </div>
  );
}
export default RoomsWin;
