import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/dashboard";
import MindMap from "./pages/MindMap";
import ChatbotPage from "./pages/ChatbotPage";
import SummaryPage from "./pages/SummaryPage";
import InterviewPage from "./pages/MockInterview";

const App = () => {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/mindmap" element={<MindMap />} />
        <Route path="/chatbot" element={<ChatbotPage />} />
        <Route path="/summary" element={<SummaryPage />} />
        <Route path="/interview" element={<InterviewPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;