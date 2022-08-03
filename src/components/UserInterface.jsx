import "./styles.css";
import NavHeader from "./NavHeader/NavHeader";
import { useDispatch, useSelector } from "react-redux";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { getDatabase, ref, child, get, set } from "firebase/database";
import { auth, db } from "../firebase-config";
import { clientUser } from "../slices/chatLogs";
import { Outlet, useNavigate } from "react-router-dom";
import communal from "../contexts/communal";

function UserInterface() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.status);
  const Navigate = useNavigate();

  function loginGoogle() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // The signed-in user info. // result.user
        console.log("result.user is", result.user);
        const userObj = {
          displayName: result.user.displayName,
          email: result.user.email,
          avatarSrc: result.user.photoURL,
        };
        checkNew(userObj.displayName, userObj.email, userObj.avatarSrc);
        dispatch(clientUser(userObj));
        Navigate("rooms");
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  function logoutGoogle() {
    signOut(auth)
      .then(() => {
        console.log("Signed Out");
        dispatch(clientUser(false));
        Navigate("/");
      })
      .catch((error) => {
        alert(error);
      });
  }

  function checkNew(name, email, avatarSrc) {
    let userId = emailConvert(email);
    console.log("userId is", userId);
    const dbRef = ref(getDatabase()); // I don't understand this line . why new getDatabase when we have db
    get(child(dbRef, `users/${userId}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log("User already exists!:", snapshot.val());
        } else {
          console.log("No data available, recording new user...");
          writeNewUser(userId, name, email, avatarSrc);
        }
      })
      .catch((error) => {
        alert(error);
      });

    function writeNewUser(userId, name, email, avatarSrc) {
      set(ref(db, "users/" + userId), {
        username: name,
        email: email,
        avatarUrl: avatarSrc,
      });
    }
  }

  function emailConvert(email) {
    return email
      .split("")
      .map((ele) => (ele === "." ? "_" : ele))
      .join("");
  }

  return (
    <communal.Provider value={{ emailConvert }}>
      <div id="mainContainer">
        {status.currentUser ? <NavHeader logMeIn={loginGoogle} logMeOut={logoutGoogle} /> : null}
        <Outlet context={loginGoogle} />
      </div>
    </communal.Provider>
  );
}

export default UserInterface;
