// src/App.jsx
import React, { useState } from "react";
import Preloader from "./components/Preloader";
import Home from "./pages/Home";

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
        return "/assets/work.mp3";
      case "О нас":
        return "/assets/about.mp3";
      case "Контакт":
        return "/assets/contact.mp3";
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
