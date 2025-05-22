import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import GoogleLogin from "./GoogleLogin";
import Dashboard from "./Dashboard";
import PageNotFound from "./PageNotFound";
import { GoogleOAuthProvider } from "@react-oauth/google";
function App() {
  const GoogleAuthWrapper = () => {
    return (
      <GoogleOAuthProvider clientId="207553178352-ei874ekj97a67q9tgsf6tc63cokj7ssl.apps.googleusercontent.com">
        <GoogleLogin></GoogleLogin>
      </GoogleOAuthProvider>
    );
  };
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<GoogleAuthWrapper />} />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
