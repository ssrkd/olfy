// src/pages/Home.jsx
import React, { useEffect } from "react";
import Carousel3D from "../components/Carousel3D";
import EnhancedVideoGallery from "../components/Carousel3D";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import FooterNav from "../components/FooterNav";
import About from "./About";
import Сontact from './Contact'; 

const Wrapper = styled.div`
  background: black;
  color: white;
  min-height: 100vh;
  overflow-x: hidden;
  padding-bottom: 100px;
`;

const Home = ({ activeTab, setActiveTab, audioSrc }) => {

  // 🔁 Автоматическая прокрутка вверх при смене вкладки
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeTab]);

  return (
    <Wrapper>
      {/* 👇 Добавляем setActiveTab для обработки клика по логотипу */}
      <Navbar audioSrc={audioSrc} setActiveTab={setActiveTab} />

      {activeTab === "Парфюмы" && <Carousel3D />}

      {activeTab === "О нас" && <About />}

      {activeTab === "Контакт" && <Сontact />}

      <FooterNav active={activeTab} setActive={setActiveTab} />
    </Wrapper>
  );
};

export default Home;
