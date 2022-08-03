import { configureStore } from "@reduxjs/toolkit";
import chatLogs from "./slices/chatLogs";

const store = configureStore({
  reducer: {
    status: chatLogs,
  },
});

export default store;
