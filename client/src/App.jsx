import React from "react";
import { LoggedInRouter, LoggedOutRouter } from "./routes";
import { setAxiosDefault, setToken } from "./axiosdefaults";

function App() {
  const user = JSON.parse(localStorage.getItem("loginUser"));
  setAxiosDefault();
  if (user && user.token) setToken(user.token);
  return <>{user ? <LoggedInRouter /> : <LoggedOutRouter />}</>;
}

export default App;
