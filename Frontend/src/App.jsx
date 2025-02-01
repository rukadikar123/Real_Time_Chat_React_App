import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Homepage from "./Components/Homepage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/homepage" element={<Homepage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
