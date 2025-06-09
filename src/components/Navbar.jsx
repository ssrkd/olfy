import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes, css } from "styled-components";
import { DateTime } from "luxon";
const base = "https://pub-5be99c1007dc4a7990d981035f6042dd.r2.dev";

// Анимация звуковых точек
const soundWave = keyframes`
  0%, 100% {
    transform: scale(1);
    opacity: 0.4;
  }
  50% {
    transform: scale(1.6);
    opacity: 1;
  }
`;

const Nav = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: ${({ scrolled }) => (scrolled ? '12px 40px' : '20px 40px')};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  background: ${({ scrolled }) => (scrolled ? 'rgba(0, 0, 0, 0.95)' : 'rgba(0, 0, 0, 0.8)')};
  backdrop-filter: blur(20px);
  border-bottom: 1px solid ${({ scrolled }) => (scrolled ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)')};
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    padding: ${({ scrolled }) => (scrolled ? '12px 20px' : '16px 20px')};
    justify-content: space-between;
  }
`;

const Logo = styled.img`
  position: absolute;
  left: 40px;
  width: 80px;
  height: auto;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    width: 60px;
    left: 20px;
  }
`;

const SoundWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  color: #ffffff;
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  transition: all 0.3s ease;

  &:hover {
    color: #4ecdc4;
  }

  @media (max-width: 768px) {
    font-size: 10px;
  }
`;

const Bars = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 2px);
  grid-template-rows: repeat(3, 2px);
  gap: 2px;
  margin-right: 12px;
`;

const Dot = styled.div`
  width: 2px;
  height: 2px;
  background: #ffffff;
  border-radius: 1px;
  opacity: ${({ isSoundOn }) => (isSoundOn ? 0.9 : 0.15)};
  animation: ${({ isSoundOn }) =>
    isSoundOn
      ? css`${soundWave} 1.4s ease-in-out infinite`
      : "none"};
  animation-delay: ${({ delay }) => delay}s;
  transition: opacity 0.4s ease;
`;

const NavRight = styled.div`
  position: absolute;
  right: 40px;
  display: flex;
  align-items: center;
  gap: 32px;

  @media (max-width: 768px) {
    right: 20px;
    gap: 20px;
  }
`;

const Button = styled.button`
  background: #ffffff;
  color: #000000;
  border: none;
  border-radius: 50px;
  padding: 12px 24px;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.5s ease;
  }

  &:hover::before {
    left: 100%;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255, 255, 255, 0.2);
  }

  &:active {
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 13px;
  }
`;

const ClockWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  color: white;
  font-family: 'Courier New', monospace;
  font-size: 11px;
  font-weight: 500;
`;

const CityTime = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: ${({ dim }) => (dim ? '#aaa' : '#fff')};
  opacity: ${({ dim }) => (dim ? 0.6 : 1)};
  font-weight: ${({ dim }) => (dim ? 400 : 600)};
`;

const TextBlock = styled.div`
  display: flex;
  justify-content: space-between;
  width: 160px;
`;

const Circle = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${({ dim }) => (dim ? '#777' : '#fff')};
  opacity: ${({ dim }) => (dim ? 0.4 : 1)};
`;

const Moon = styled(Circle)`
  position: relative;

  &::after {
    content: '';
    position: absolute;
    left: 2px;
    top: 0;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: black;
  }
`;

const ClockWidget = () => {
  const [time, setTime] = useState({ time: "", isDay: true });

  useEffect(() => {
    const updateTime = () => {
      const astana = DateTime.now().setZone("Asia/Almaty");
      setTime({
        time: astana.toFormat("HH:mm"),
        isDay: astana.hour >= 6 && astana.hour < 18,
      });
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ClockWrapper>
      <CityTime dim={!time.isDay}>
        {time.isDay ? <Circle /> : <Moon />}
        <TextBlock>
          <span>ASTANA, KZ</span>
          <span>{time.time} GMT+5</span>
        </TextBlock>
      </CityTime>
    </ClockWrapper>
  );
};

const Navbar = ({ audioSrc, setActiveTab }) => {
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = audioSrc || "";
      audioRef.current.load();
      if (isSoundOn && audioSrc) {
        audioRef.current.play().catch((err) => {
          console.log("Audio play failed:", err);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isSoundOn, audioSrc]);

  const handleLogoClick = (e) => {
    e.preventDefault();
    setActiveTab("Парфюмы"); // 👈 переходит на вкладку Work
    window.history.pushState({}, "", "/");
  };

  const toggleSound = () => {
    setIsSoundOn(!isSoundOn);
  };

  return (
    <Nav scrolled={isScrolled}>
      <a href="/" onClick={handleLogoClick}>
        <Logo src={`${base}/logo.png`} alt="logo" />
      </a>

      <SoundWrapper onClick={toggleSound}>
        <Bars>
          {Array.from({ length: 24 }).map((_, i) => (
            <Dot key={i} delay={Math.random()} isSoundOn={isSoundOn} />
          ))}
        </Bars>
        <span>SOUND [{isSoundOn ? "ON" : "OFF"}]</span>
      </SoundWrapper>

      <NavRight>
        <ClockWidget />
        <a href="https://wa.me/77768883007" target="_blank" rel="noopener noreferrer">
          <Button>Заказать</Button>
        </a>
      </NavRight>

      <audio ref={audioRef} loop />
    </Nav>
  );
};

export default Navbar;
