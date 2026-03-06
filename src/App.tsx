import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Notebook from "./pages/Notebook";
import PublicLayout from "./Layouts/PublicLayout";
import AppLayout from "./Layouts/AppLayout";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";    
import MindMap from "./pages/MindMap";
import Quiz from "./pages/Quiz";
import ChatbotPage from "./pages/ChatbotPage";
import Dashboard from "./pages/dashboard";
import SummaryPage from "./pages/SummaryPage";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* 🌐 Public pages (NO navbar) */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
        </Route>

        {/* 🔐 App pages (WITH navbar) */}
        <Route element={<AppLayout />}>
          <Route path="/notebooks" element={<Notebook />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/notebooks/:notebookId" element={<Notebook />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/mindmap" element={<MindMap />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/chatbot" element={<ChatbotPage/>} />
          <Route path="/summary" element={<SummaryPage />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default App;
