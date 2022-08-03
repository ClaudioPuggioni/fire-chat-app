import "./styles.css";
import { useSelector } from "react-redux/es/exports";

function NavHeader(props) {
  const status = useSelector((state) => state.status);

  return (
    <div id="navHeader">
      <div id="navHeaderTitle">ChatterBox</div>
      {!status.currentUser ? (
        <button
          id="navHeaderLogin"
          onClick={() => {
            props.logMeIn();
          }}
        >
          Login
        </button>
      ) : (
        <div id="loggedInDiv">
          <img id="avatarImg" src={status.currentUser.avatarSrc} alt="user avatar" />
          <button
            id="navHeaderLogout"
            onClick={() => {
              props.logMeOut();
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default NavHeader;
