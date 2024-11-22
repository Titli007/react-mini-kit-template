import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import QAPage from "./pages/QAPage";
import SingleQA from "./pages/SingleQA"; // Import the SingleQA page

export default function App() {
  return (
    <main className="flex flex-col justify-center items-center h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/question" element={<QAPage />} />
          <Route path="/question/:id" element={<SingleQA />} /> {/* New route for single question */}
        </Routes>      
      </BrowserRouter>
    </main>
  );
}
