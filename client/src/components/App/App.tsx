import "./App.css";
import { Routes, Route } from "react-router-dom";
import Intro from "../../Pages/Intro/Intro";
import AppLayout from "../AppLayout/AppLayout";
import KnowledgeBase from "../../Pages/KnowledgeBase/KnowledgeBase";
import Chat from "../../Pages/Chat/Chat";
import Login from '../../Pages/Login/Login.tsx';
import Register from '../../Pages/Register/Register.tsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Intro />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<AppLayout />}>
        <Route path="/knowledge" element={<KnowledgeBase />} />
        <Route path="/chat" element={<Chat />} />
      </Route>
    </Routes>
  );
}

export default App;