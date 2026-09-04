import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SystemMap from "./pages/SystemMap";
import AgentPage from "./pages/AgentPage";
import ChatPage from "./pages/ChatPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SystemMap />} />
        <Route path="/agent/:agentId" element={<AgentPage />} />
        <Route path="/chat" element={<ChatPage />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;