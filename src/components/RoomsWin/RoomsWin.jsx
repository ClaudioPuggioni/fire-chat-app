import "./styles.css";
import { useEffect, useRef, useContext, useState } from "react";
import communal from "../../contexts/communal";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { updateRooms } from "../../slices/chatLogs";
import { ref, onValue, push, set, remove } from "firebase/database";
import { db } from "../../firebase-config";
import RoomBox from "../RoomBox/RoomBox";

function RoomsWin() {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const status = useSelector((state) => state.status);
  let newRoom = useRef(null);
  let commCtxt = useContext(communal);
  let hotelRef = useRef(null);
  let [height, setHeight] = useState(null);
  let [width, setWidth] = useState(null);

  useEffect(() => {
    if (!status.currentUser) Navigate("/404");
    populateRooms();
    setHeight(window.innerHeight);
    setWidth(window.innerWidth);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    console.log("height:", window.innerHeight);
    window.addEventListener("resize", () => setHeight(window.innerHeight));
    window.addEventListener("resize", () => setWidth(window.innerWidth));
    return () => {
      window.removeEventListener("resize", () => setHeight(window.innerHeight));
      window.removeEventListener("resize", () => setWidth(window.innerWidth));
    };
  }, []);

  function addRoom(input) {
    const roomsListRef = ref(db, "rooms");
    const newRoomRef = push(roomsListRef);
    set(newRoomRef, { ...input });
  }

  function delRoom(roomID) {
    const delRoomRef = ref(db, `rooms/${roomID}`);
    remove(delRoomRef);
  }

  function populateRooms() {
    const roomRef = ref(db, "rooms/");
    onValue(roomRef, (snapshot) => {
      const roomData = snapshot.val();
      console.log("roomData is", roomData);
      dispatch(updateRooms(roomData));
    });
  }

  function widthCalc() {
    let modWidth = 295;
    if (window.innerHeight < 410) {
      if (status.rooms.length > 1 && width >= 569) modWidth += 264;
      if (status.rooms.length > 2 && width >= 833) modWidth += 264;
      if (status.rooms.length > 3 && width >= 1097) modWidth += 264;
      if (status.rooms.length > 4 && width >= 1360) modWidth += 264;
      if (status.rooms.length > 5 && width >= 1625) modWidth += 264;
      if (status.rooms.length > 6 && width >= 1890) modWidth += 264;
    } else if (window.innerHeight < 499) {
      if (status.rooms.length > 2 && width >= 569) modWidth += 264;
      if (status.rooms.length > 4 && width >= 833) modWidth += 264;
      if (status.rooms.length > 6 && width >= 1097) modWidth += 264;
      if (status.rooms.length > 8 && width >= 1360) modWidth += 264;
      if (status.rooms.length > 10 && width >= 1625) modWidth += 264;
      if (status.rooms.length > 12 && width >= 1890) modWidth += 264;
    } else if (window.innerHeight < 590) {
      if (status.rooms.length > 3 && width >= 569) modWidth += 264;
      if (status.rooms.length > 6 && width >= 833) modWidth += 264;
      if (status.rooms.length > 9 && width >= 1097) modWidth += 264;
      if (status.rooms.length > 12 && width >= 1360) modWidth += 264;
      if (status.rooms.length > 15 && width >= 1625) modWidth += 264;
      if (status.rooms.length > 18 && width >= 1890) modWidth += 264;
    } else if (window.innerHeight < 679) {
      if (status.rooms.length > 4 && width >= 569) modWidth += 264;
      if (status.rooms.length > 8 && width >= 833) modWidth += 264;
      if (status.rooms.length > 12 && width >= 1097) modWidth += 264;
      if (status.rooms.length > 16 && width >= 1360) modWidth += 264;
      if (status.rooms.length > 20 && width >= 1625) modWidth += 264;
      if (status.rooms.length > 24 && width >= 1890) modWidth += 264;
    } else if (window.innerHeight < 764) {
      if (status.rooms.length > 5 && width >= 569) modWidth += 264;
      if (status.rooms.length > 10 && width >= 833) modWidth += 264;
      if (status.rooms.length > 15 && width >= 1097) modWidth += 264;
      if (status.rooms.length > 20 && width >= 1360) modWidth += 264;
      if (status.rooms.length > 25 && width >= 1625) modWidth += 264;
      if (status.rooms.length > 30 && width >= 1890) modWidth += 264;
    } else if (window.innerHeight >= 764) {
      if (status.rooms.length > 6 && width >= 569) modWidth += 264;
      if (status.rooms.length > 12 && width >= 833) modWidth += 264;
      if (status.rooms.length > 18 && width >= 1097) modWidth += 264;
      if (status.rooms.length > 24 && width >= 1360) modWidth += 264;
      if (status.rooms.length > 30 && width >= 1625) modWidth += 264;
      if (status.rooms.length > 36 && width >= 1890) modWidth += 264;
    }
    return modWidth;
  }

  return (
    <div id="roomsWin">
      <div ref={hotelRef} id="roomsWinHotel" style={{ width: `${widthCalc()}px` }}>
        <div id="roomsWinHeader">Chatter Rooms</div>
        <div id="roomsWinHotelHall">{status.rooms ? status.rooms.map((ele) => <RoomBox roomInfo={ele} handleDel={delRoom} />) : null}</div>
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
