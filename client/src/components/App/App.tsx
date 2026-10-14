import "./App.css";
import { Routes, Route } from "react-router-dom";
import Intro from "../Pages/Intro/Intro";
import AppLayout from "../Components/AppLayout/AppLayout";
import KnowledgeBase from "../Pages/KnowledgeBase/KnowledgeBase";
import Chat from "../Pages/Chat/Chat";

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Intro />} />
        <Route path="/knowledge" element={<KnowledgeBase />} />
        <Route path="/chat" element={<Chat />} />
      </Route>
    </Routes>
  );
}

export default App;
