import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import VideoUpload from "./components/VideoUpload";
import { Toaster } from "react-hot-toast";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Toaster></Toaster>

      <div className="flex flex-col items-center space-y-9 justify-center py-9">
        <h1 className="text-3xl font-extrabold text-gray-700">
          Video streaming app{" "}
        </h1>

        <VideoUpload />
      </div>
    </>
  );
}

export default App;
