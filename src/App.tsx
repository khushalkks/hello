// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import PublicLayout from "./Layouts/PublicLayout";
// import AppLayout from "./Layouts/AppLayout";
// import SignUp from "./pages/SignUp";
// import Login from "./pages/Login";    
// import MindMap from "./pages/MindMap";
// import ChatbotPage from "./pages/ChatbotPage";
// import Dashboard from "./pages/dashboard";
// import SummaryPage from "./pages/SummaryPage";
// import InterviewPage from "./pages/InterviewPage";
// const App = () => {
//   return (
//     <BrowserRouter>
//       <Routes>

//         {/* 🌐 Public pages (NO navbar) */}
//         <Route element={<PublicLayout />}>
//           <Route path="/" element={<Home />} />
//         </Route>

//         {/* 🔐 App pages (WITH navbar) */}
//         <Route element={<AppLayout />}>
//           {/* <Route path="/notebooks" element={<Notebook />} /> */}
//           <Route path="/dashboard" element={<Dashboard />} />
//           {/* <Route path="/notebooks/:notebookId" element={<Notebook />} /> */}
//           <Route path="/signup" element={<SignUp />} />
//           <Route path="/login" element={<Login/>} />
//           <Route path="/mindmap" element={<MindMap />} />
//           <Route path="/chatbot" element={<ChatbotPage/>} />
//           <Route path="/summary" element={<SummaryPage />} />
//           <Route path="/interview" element={<InterviewPage />} />
//         </Route>

//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default App;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/dashboard";
import MindMap from "./pages/MindMap";
import ChatbotPage from "./pages/ChatbotPage";
import SummaryPage from "./pages/SummaryPage";
import InterviewPage from "./pages/InterviewPage";

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