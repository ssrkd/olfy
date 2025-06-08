import React, { useEffect, useRef } from "react";
import styled from "styled-components";
const base = process.env.PUBLIC_URL;

const Footer = styled.div`
  position: fixed;
  bottom: 2rem;
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 100;
`;

const NavContainer = styled.div`
  display: flex;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 999px;
  padding: 6px;
  gap: 4px;
`;

const NavItem = styled.div`
  padding: 0.6rem 1.5rem;
  border-radius: 999px;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  color: ${({ active }) => (active ? "#000" : "#fff")};
  background: ${({ active }) => (active ? "#fff" : "transparent")};
  transition: all 0.3s ease;

  &:hover {
    background: ${({ active }) => (active ? "#fff" : "rgba(255, 255, 255, 0.15)")};
  }
`;

const FooterNav = ({ active, setActive }) => {
  const clickSoundRef = useRef(null);

  useEffect(() => {
  clickSoundRef.current = new Audio(`${base}/assets/click.mp3`);
  clickSoundRef.current.volume = 0.7;
  clickSoundRef.current.load();
}, []);

  const handleClick = (item) => {
    if (clickSoundRef.current) {
      clickSoundRef.current.currentTime = 0;
      clickSoundRef.current.play().catch((err) => {
        console.log("Click sound failed to play:", err);
      });
    }
    setActive(item);
  };

  return (
    <Footer>
      <NavContainer>
        {["Парфюмы", "О нас", "Контакт"].map((item) => (
          <NavItem
            key={item}
            active={active === item}
            onClick={() => handleClick(item)}
          >
            {item}
          </NavItem>
        ))}
      </NavContainer>
    </Footer>
  );
};

export default FooterNav;
