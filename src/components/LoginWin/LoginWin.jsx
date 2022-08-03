import "./styles.css";
import { useOutletContext } from "react-router-dom";

function LoginWin() {
  const loginGoogle = useOutletContext();

  return (
    <div id="loginWin">
      <div id="loginHeader">ChatterBox</div>

      <button id="loginBtn" onClick={() => loginGoogle()}>
        <img id="googleIcon" src="/assets/google.svg" alt="google icon" />
        Login With Google
      </button>
    </div>
  );
}

export default LoginWin;
