import { createSlice } from "@reduxjs/toolkit/";

const chatLogs = createSlice({
  name: "status",
  initialState: { currentUser: false, rooms: false, currChat: null, messages: false, navHeader: false },
  reducers: {
    clientUser: (state, action) => {
      if (!state.currentUser) state.currentUser = action.payload;
      if (action.payload === false) state.currentUser = false;
      console.log("state.currentUser is", state.currentUser);
    },
    updateRooms: (state, action) => {
      let data = Object.entries(action.payload);
      state.rooms = data.map((ele) => ({ roomId: ele[0], roomName: ele[1].name, roomAdmin: ele[1].admin }));
      console.log("state.rooms is", state.rooms);
    },
    setChat: (state, action) => {
      state.currChat = action.payload;
      console.log("state.currChat is", state.currChat);
    },
    setMsgs: (state, action) => {
      state.messages = Object.values(action.payload);
      console.log(state.messages);
    },
  },
});

export const { updateRooms, clientUser, setChat, setMsgs } = chatLogs.actions;

export default chatLogs.reducer;
