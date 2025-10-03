import { useState,useRef } from 'react'
import './App.css'
import { Auth } from './components/Auth.jsx'
import Cookies from 'universal-cookie'
import { Chat } from './components/chat.jsx'

function App() {
  const cookies = new Cookies()
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"))
  const [room, setRoom] = useState("")
  const roomInputRef = useRef(null)

  if (!isAuth) {
    return (
      <div className="App">
        <Auth setIsAuth={setIsAuth}/>
      </div>
    )
  }
  return (<div>{room ? (
    <Chat />
  ) : (
    <div className="room">
      <label>Enter Room Name :</label>
      <input ref={roomInputRef}/>
      <button onClick={() => setRoom(roomInputRef.current.value)}>
        Enter Chat</button>
    </div>)}
  </div>
  );
}

export default App