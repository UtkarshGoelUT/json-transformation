import React, { useEffect } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { gapi } from "gapi-script";
import { Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function GoogleLoginButton(props) {
  const clientId = process.env.REACT_APP_CLIENTID;
  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "https://www.googleapis.com/auth/userinfo.profile",
      });
    };
    gapi.load("client:auth2", initClient);
  });

  const onSuccess = (res) => {
    toast.success("Authentication successful!");
    props.setUser(res.profileObj);
  };

  const onFailure = (err) => {
    toast.error("Authentication failed!");
    console.log("failed", err);
  };

  const logOut = () => {
    props.setUser(null);
    toast.success("Logout successful!");
  };

  return (
    <div>
      {props.user ? (
        <GoogleLogout
          clientId={clientId}
          buttonText="Logout"
          onLogoutSuccess={logOut}
          render={(renderProps) => (
            <Button
              variant="dark"
              style={{
                display: "flex",
                fontFamily: "Roboto Mono",
                cursor: "pointer",
                background: "white",
                color: "black",
                height: "40px",
                border: "0",
              }}
              onClick={renderProps.onClick}
            >
              <img
                style={{
                  height: "22px",
                  margin: "1px 10px 0 0",
                }}
                src={require("../images/google-logo.png")}
                alt="not found"
              />
              <p style={{ color: "rgb(60, 60, 60)" }}>Logout</p>
            </Button>
          )}
        />
      ) : (
        <GoogleLogin
          render={(renderProps) => (
            <Button
              variant="dark"
              style={{
                display: "flex",
                fontFamily: "Roboto Mono",
                cursor: "pointer",
                background: "white",
                color: "black",
                height: "40px",
                border: "0",
              }}
              onClick={renderProps.onClick}
            >
              <img
                style={{
                  height: "22px",
                  margin: "1px 10px 0 0",
                }}
                src={require("../images/google-logo.png")}
                alt="not found"
              />
              <p style={{ color: "rgb(60, 60, 60)" }}>Login</p>
            </Button>
          )}
          clientId={clientId}
          buttonText="Log In"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={"single_host_origin"}
          isSignedIn={true}
        />
      )}
      <ToastContainer />
    </div>
  );
}
export default GoogleLoginButton;
