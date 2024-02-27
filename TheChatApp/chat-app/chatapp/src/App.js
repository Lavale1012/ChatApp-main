import "./index.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./components/Chat";
import DarkModeToggle from "./components/DarkModeToggle";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };
  const newRoom = () => {
    setShowChat(false);
  };

  return (
    <div className=" dark:bg-slate-700 m-none transition duration-300 ">
      <div className="p-3 dark:bg-slate-700 m-none transition duration-300">
        <DarkModeToggle />
      </div>

      <div className="App w-screen min-h-screen  dark:bg-slate-700 text-gray-800 font-sans grid place-items-center transition duration-300">
        {!showChat ? (
          <div className="joinChatContainer flex flex-col text-center   mb-44">
            <h3 className="text-3xl mb-4 dark:text-white transition duration-300 ">
              Quick Chat
            </h3>
            <input
              type="text"
              placeholder="John..."
              className=" transition duration-300 w-60 h-10 bg-slate-100 dark:bg-slate-800 my-2  border-none rounded-md p-1 text-base dark:text-white"
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Room ID..."
              className="transition duration-300 w-60 h-10 bg-slate-100 dark:bg-slate-800 my-2  border-none rounded-md p-1 text-base dark:text-white"
              onChange={(event) => {
                setRoom(event.target.value);
              }}
            />
            <button
              onClick={joinRoom}
              className=" transition duration-300  w-60 h-12 my-2 border-none rounded-md p-1 text-base bg-blue-600 text-white cursor-pointer hover:bg-blue-700 transition duration-300"
            >
              Join A Room!
            </button>
          </div>
        ) : (
          <Chat
            socket={socket}
            username={username}
            room={room}
            newRoom={newRoom}
          />
        )}
      </div>
    </div>
  );
}

export default App;
