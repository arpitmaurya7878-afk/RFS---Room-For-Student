import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import ListYourHome from "./pages/ListYourHome.jsx";
import ListingDetails from "./pages/ListingDetails.jsx";
import MyListing from "./pages/MyListing.jsx";
import UpdateListing from "./pages/UpdateListing.jsx";
import Chat from "./pages/Chat.jsx";
import Chats from "./pages/Chats.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/list-your-home" element={<ListYourHome />} />
        <Route path="/listing/:id" element={<ListingDetails />} />
        <Route path="/my-listing" element={<MyListing />} />
        <Route path="/update-listing/:id" element={<UpdateListing />} />
        <Route path="/chats" element={<Chats />} />
        <Route path="/chat/:conversationId" element={<Chat />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


