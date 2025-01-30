import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Components/Login';
import Homepage from './Components/Homepage';
import { io } from 'socket.io-client';

const socket = io("http://localhost:3000");
function App() {
  const [userName, setUserName] = useState("");

  return (
    <>
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login userName={userName} setUserName={setUserName}  socket={socket}/>}/>
            <Route path="/homepage" element={<Homepage userName={userName} setUserName={setUserName} socket={socket}/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
