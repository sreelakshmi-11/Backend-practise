import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { googleAuth } from "./api";

const GoogleLogin = () => {
  const responseGoogle = async (authResult) => {
    try {
      if (authResult["code"]) {
        const result = await googleAuth(authResult["code"]);
        const { email, name, image } = result.data.user;
        console.log("result.data.user", result.data.user);
      }
    } catch (err) {
      console.error("error while requesting google code", err);
    }
  };
  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });
  return (
    <div className="app">
      <button onClick={googleLogin}>Login with Google</button>
    </div>
  );
};

export default GoogleLogin;
