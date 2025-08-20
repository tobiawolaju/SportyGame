import { Routes, Route, Link } from "react-router-dom";
import TopBar from "./components/TopBar";
import Home from "./pages/Home";
import Matches from "./pages/Matches";

export default function App() {
  return (
    <>
      <TopBar />
      <nav className="bg-gray-100 px-4 py-2 flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/matches">Matches</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/matches" element={<Matches />} />
      </Routes>
    </>
  );
}
