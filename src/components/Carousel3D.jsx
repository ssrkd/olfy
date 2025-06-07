import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useSwipeable } from 'react-swipeable';

const videos = [
  { url: '/assets/perfume1.mp4', title: 'Jean Paul Gaultier Le Male', description: 'Аромат, который олицетворяет силу и мягкость в одном флаконе. Сладкие и пряные ноты лаванды, ванили и мяты создают уникальную гармонию, придавая аромату чувственность и решительность. Это парфюм для мужчин, которые не боятся быть смелыми, но всегда остаются элегантными.' },
  { url: '/assets/perfume2.mp4', title: 'Armani Stronger With You', description: 'Аромат, наполненный энергией и страстью. С его насыщенными нотами ванили, кашемирового дерева и кардамона он создаёт тёплую, уютную атмосферу, которая идеально подчеркивает уверенность и харизму. Парфюм для мужчины, который сильный, но в то же время чувственный, и всегда остаётся верным себе.' },
  { url: '/assets/perfume3.mp4', title: 'Paco Rabanne 1 Million', description: 'Аромат, который воплощает роскошь, уверенность и обаяние. Золотистая композиция сочетает в себе свежие цитрусовые ноты, пряности корицы и амбры, создавая яркое и запоминающееся впечатление. Это парфюм для мужчины, который привык быть в центре внимания и не боится выделяться.' },
  { url: '/assets/perfume4.mp4', title: 'Bleu de Chanel', description: 'Аромат, который сочетает в себе свежесть цитрусовых и древесные ноты, создавая образ стильного и независимого мужчины. Лаванда, кедр и сандал образуют гармоничное облако, которое ощущается как изысканность и сила, придавая уверенности и загадочности.' },
  { url: '/assets/perfume5.mp4', title: 'YSL Y Eau de Parfum', description: 'Элегантный и современный аромат, который олицетворяет дух амбиции и решительности. Сочетание свежих цитрусовых нот с древесным аккордом и оттенками шалфея и фужера создаёт свежую, но в то же время глубокую композицию, идеально подходящую для уверенного и целеустремлённого мужчины.' },
  { url: '/assets/perfume6.mp4', title: 'Paco Rabanne Invictus', description: 'Аромат, который сочетает в себе мужественность и свежесть, создавая динамичную и захватывающую композицию. Это современный и уверенный в себе парфюм с нотами грейпфрута, лавра и амбры, символизирующий победу и силу.' },
];

// Стили
const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(to bottom right, #1f2937, #000, #1f2937);
  padding: 2rem;
  @media (min-width: 768px) {
    padding: 3rem;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  h1 {
    font-size: 2.5rem;
    font-weight: 300;
    color: white;
    margin-bottom: 1rem;
    letter-spacing: 0.05em;
  }
  p {
    color: #9ca3af;
    margin-top: 1.5rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    font-size: 1.125rem;
  }
`;

const Grid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr;
  max-width: 1200px;
  margin: auto;
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Card = styled.div`
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
  background: linear-gradient(to bottom, #1f2937, #111827);
  transition: transform 0.5s, box-shadow 0.5s;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.5);
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 20px 30px rgba(251, 191, 36, 0.2);
  }
`;

const VideoWrapper = styled.div`
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
`;

const StyledVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s;
  ${Card}:hover & {
    transform: scale(1.1);
  }
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.6), transparent, transparent);
  opacity: 0;
  transition: opacity 0.3s;
  ${Card}:hover & {
    opacity: 1;
  }
`;

const Content = styled.div`
  padding: 1.5rem;
  h3 {
    font-size: 1.25rem;
    color: white;
    font-weight: 600;
    margin-bottom: 0.5rem;
    transition: color 0.3s;
    ${Card}:hover & {
      color: #fbbf24;
    }
  }
  p {
    color: #9ca3af;
    font-size: 0.875rem;
    line-height: 1.5;
    margin-bottom: 1rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  button {
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    font-weight: 500;
    transition: all 0.2s;
  }
  button:first-child {
    flex: 1;
    background: linear-gradient(to right, #f59e0b, #d97706);
    color: white;
    &:hover {
      background: linear-gradient(to right, #d97706, #b45309);
      transform: scale(1.05);
    }
  }
  button:last-child {
    border: 1px solid #4b5563;
    color: #d1d5db;
    &:hover {
      border-color: #fbbf24;
      color: #fbbf24;
    }
  }
`;

const Footer = styled.div`
  text-align: center;
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid #1f2937;
  p {
    color: #6b7280;
    font-size: 0.875rem;
  }
`;

const MobileSwipe = styled.div`
  margin-bottom: 2rem;
  @media (min-width: 768px) {
    display: none;
  }
`;

const EnhancedVideoGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRefs = useRef([]);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => setCurrentIndex((prev) => (prev + 1) % videos.length),
    onSwipedRight: () => setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length),
    trackMouse: true,
  });

  const renderCard = (video, index) => (
    <Card key={index}>
      <VideoWrapper>
        <StyledVideo
          ref={(el) => (videoRefs.current[index] = el)}
          src={video.url}
          autoPlay
          muted
          loop
          playsInline
        />
        <Overlay />
      </VideoWrapper>

      <Content>
        <h3>{video.title}</h3>
        <p>{video.description}</p>
      </Content>
    </Card>
  );

  return (
    <Container>
      <Header>
        <h1>Коллекция Парфюмерии</h1>
        <p>Откройте для себя нашу изысканную коллекцию роскошных ароматов</p>
      </Header>

      <MobileSwipe {...swipeHandlers}>
        {renderCard(videos[currentIndex], currentIndex)}
      </MobileSwipe>

      <Grid>
        {videos.map((video, index) => renderCard(video, index))}
      </Grid>

      <Footer>
        <p>Наведите курсор на карточки для предварительного просмотра • Видео воспроизводятся автоматически</p>
      </Footer>
    </Container>
  );
};

export default EnhancedVideoGallery;
