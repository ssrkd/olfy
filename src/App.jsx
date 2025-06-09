// src/App.jsx
import React, { useState } from "react";
import Preloader from "./components/Preloader";
import Home from "./pages/Home";
const base = "https://pub-5be99c1007dc4a7990d981035f6042dd.r2.dev";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Парфюмы");

  const handlePreloadFinish = () => {
    console.log("Preloader finished");
    setIsLoading(false);
  };

  const getAudioForTab = (tab) => {
  switch (tab) {
    case "Парфюмы":
      return `${base}/work.mp3`;
    case "О нас":
      return `${base}/about.mp3`;
    case "Контакт":
      return `${base}/contact.mp3`;
    default:
      return null;
  }
};

  const audioSrc = getAudioForTab(activeTab);

  return (
    <>
      {isLoading ? (
        <Preloader onFinish={handlePreloadFinish} />
      ) : (
        <Home
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          audioSrc={audioSrc}
        />
      )}
    </>
  );
};

export default App;
