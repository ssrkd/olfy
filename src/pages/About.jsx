import React, { useEffect, useRef, useState, useCallback } from "react";
const base = process.env.PUBLIC_URL;

const About = () => {
  const headerRef = useRef(null);
  const sectionsRef = useRef([]);
  const audioRef = useRef(null);
  const backgroundRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);

  // Параллакс эффект для фона
  const updateMousePosition = useCallback((e) => {
    setMousePosition({
      x: (e.clientX / window.innerWidth) * 100,
      y: (e.clientY / window.innerHeight) * 100,
    });
  }, []);

  // Прогресс скролла
  const updateScrollProgress = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.min(scrollTop / docHeight, 1);
    setScrollProgress(progress);
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('scroll', updateScrollProgress);
    
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('scroll', updateScrollProgress);
    };
  }, [updateMousePosition, updateScrollProgress]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Добавляем специальные эффекты для разных секций
            if (entry.target.classList.contains('text-reveal')) {
              const spans = entry.target.querySelectorAll('.word-span');
              spans.forEach((span, index) => {
                setTimeout(() => {
                  span.style.opacity = '1';
                  span.style.transform = 'translateY(0)';
                }, index * 100);
              });
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }
    
    sectionsRef.current.forEach(section => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const handleVideoClick = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.error("Audio play failed:", err));
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  // Функция для разбивки текста на слова с анимацией
  const createAnimatedText = (text, className = "") => {
    return text.split(' ').map((word, index) => (
      <span
        key={index}
        className={`word-span inline-block opacity-0 transform translate-y-4 transition-all duration-500 ${className}`}
        style={{ transitionDelay: `${index * 50}ms` }}
      >
        {word}&nbsp;
      </span>
    ));
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Прогресс бар */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-800">
        <div 
          className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress * 100}%` }}
        ></div>
      </div>

      {/* Динамический фон с параллаксом */}
      <div 
        ref={backgroundRef}
        className="fixed inset-0 pointer-events-none transition-all duration-700 ease-out"
        style={{
          transform: `translate(${(mousePosition.x - 50) * 0.02}px, ${(mousePosition.y - 50) * 0.02}px)`
        }}
      >
        <div 
          className="absolute top-1/4 -right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"
          style={{
            transform: `scale(${1 + scrollProgress * 0.5}) rotate(${scrollProgress * 360}deg)`
          }}
        ></div>
        <div 
          className="absolute bottom-1/4 -left-1/4 w-80 h-80 bg-gradient-to-r from-pink-500/20 to-orange-500/20 rounded-full blur-3xl animate-pulse"
          style={{
            transform: `scale(${1 + scrollProgress * 0.3}) rotate(${-scrollProgress * 180}deg)`,
            animationDelay: '1s'
          }}
        ></div>
        <div 
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-cyan-500/10 to-teal-500/10 rounded-full blur-2xl animate-pulse"
          style={{
            transform: `translate(-50%, -50%) scale(${1 + Math.sin(scrollProgress * Math.PI) * 0.5})`,
            animationDelay: '2s'
          }}
        ></div>
      </div>

      <div className="relative z-10 px-6 md:px-16 lg:px-24 xl:px-32">
        {/* Header с улучшенной типографикой */}
        <header 
          ref={headerRef}
          className="pt-32 pb-16 md:pt-48 md:pb-24 opacity-0 transform translate-y-8 transition-all duration-1000 ease-out"
        >
          <div className="max-w-6xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-light leading-[0.9] tracking-tight mb-8">
              <span className="block hover:text-purple-200 transition-colors duration-300">
                Olfy online store &
              </span>
              <span className="block text-transparent bg-gradient-to-r from-white via-purple-200 to-blue-300 bg-clip-text animate-gradient-x">
                парфюмерии,
              </span>
              <span className="block hover:text-blue-200 transition-colors duration-300">
                создающий уникальные
              </span>
              <span className="block font-extralight italic text-gray-400 hover:text-gray-300 transition-colors duration-300">
                веб-опыты.
              </span>
            </h1>
            
            <div className="w-24 h-px bg-gradient-to-r from-white to-transparent mt-12 animate-pulse"></div>
            
            {/* Добавляем интерактивные элементы */}
            <div className="mt-8 flex gap-4">
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="pb-32">
          {/* What we do - с анимированным текстом */}
          <section 
            ref={el => sectionsRef.current[0] = el}
            className="mb-24 md:mb-32 opacity-0 transform translate-y-8 transition-all duration-1000 ease-out delay-200 group"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 max-w-6xl">
              <div className="lg:col-span-3">
                <h2 className="text-sm uppercase tracking-widest text-gray-500 font-medium group-hover:text-purple-400 transition-colors duration-300">
                  01 — почему именно мы?
                </h2>
                <div className="w-full h-px bg-gradient-to-r from-purple-500/50 to-transparent mt-4 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </div>
              <div className="lg:col-span-9">
                <div className="relative overflow-hidden rounded-lg p-8 bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10">
                  <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed text-gray-300 font-light">
                    Выбирая парфюм, вы выбираете не просто аромат
                    вы создаете атмосферу
                    которая будет сопровождать вас каждый день.
                    <br /><br />
                    Наш онлайн-магазин - это место, где каждый сможет найти свой идеальный запах, а мы поможем вам в этом!
                  </p>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            </div>
          </section>

          {/* How we think - с интерактивными элементами */}
          <section 
            ref={el => sectionsRef.current[1] = el}
            className="mb-24 md:mb-32 opacity-0 transform translate-y-8 transition-all duration-1000 ease-out delay-400 group"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 max-w-6xl">
              <div className="lg:col-span-3">
                <h2 className="text-sm uppercase tracking-widest text-gray-500 font-medium group-hover:text-blue-400 transition-colors duration-300">
                  02 — Моя Карьера
                </h2>
                <div className="w-full h-px bg-gradient-to-r from-blue-500/50 to-transparent mt-4 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </div>
              <div className="lg:col-span-9">
                <div className="relative overflow-hidden rounded-lg p-8 bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10">
                  <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed text-gray-300 font-light">
                    Когда мне было 14-15 лет, я захотел купить себе AirPods Pro. Чтобы накопить на них, я начал искать поставщика с хорошей ценой и, в итоге, нашел. Вместе с знакомым я поехал, чтобы купить их, и качество оказалось действительно отличным. После этого я сказал: «А может, я их продам?» Он поддержал мою идею, и так началась моя предпринимательская история.
                    <br /><br />
                    Сначала я взял небольшой долг у мамы, чтобы купить товар оптом, и с тех пор стал заниматься продажами. Я пробовал разные ниши - одежду, кроссовки, игрушки, но в какой-то момент понял, что парфюмерия - это то, что меня действительно вдохновляет. Так я выбрал эту нишу и открыл свой онлайн-магазин.
                    <br /><br />
                    Кроме того, я учусь на IT-специалиста. Пишу код, создаю сайты, изучаю новые технологии и постоянно развиваюсь в этой сфере. Благодаря этим знаниям я смог создать этот сайт и продолжаю развивать свой бизнес. В будущем планирую расширять проект и использовать свои навыки для создания новых и интересных решений.
                  </p>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            </div>
          </section>

          {/* Where we are - с интерактивной картой эффектом */}
          <section 
            ref={el => sectionsRef.current[2] = el}
            className="mb-24 md:mb-32 opacity-0 transform translate-y-8 transition-all duration-1000 ease-out delay-600 group"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 max-w-6xl">
              <div className="lg:col-span-3">
                <h2 className="text-sm uppercase tracking-widest text-gray-500 font-medium group-hover:text-pink-400 transition-colors duration-300">
                  03 — где мы находимся?
                </h2>
                <div className="w-full h-px bg-gradient-to-r from-pink-500/50 to-transparent mt-4 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </div>
              <div className="lg:col-span-9">
                <div className="relative">
                  <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed text-gray-300 font-light">
                    Мы находимся в <span className="relative inline-block">
                      <span className="text-white font-normal bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent">
                        Астане
                      </span>
                      <span className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-pink-400 to-orange-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                    </span>.{' '}
                    Доставка по городу и <span className="text-white font-normal">по всему Казахстану</span> - быстро, удобно и с любовью к каждому заказу.
                    Ваш идеальный аромат уже в пути!
                  </p>
                  
                  {/* Интерактивные индикаторы доставки */}
                  <div className="mt-8 flex gap-4">
                    <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full hover:bg-green-500/20 transition-colors duration-300">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm text-green-400">Астана: в течение дня</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full hover:bg-blue-500/20 transition-colors duration-300">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                      <span className="text-sm text-blue-400">Казахстан: 3-5 дней</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Улучшенная Video Section */}
          <section 
            className="mt-24 flex justify-center items-center opacity-0 transform translate-y-8 transition-all duration-1000 ease-out delay-[1000ms]"
            ref={el => sectionsRef.current[4] = el}
          >
            <div className="relative w-full max-w-4xl">
              <div 
                className="relative aspect-video rounded-xl overflow-hidden shadow-2xl border border-gray-700 cursor-pointer group hover:shadow-3xl hover:shadow-purple-500/20 transition-all duration-500"
                onClick={handleVideoClick}
              >
                <video 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  autoPlay 
                  muted 
                  loop 
                  playsInline
                >
                  <source src={`${base}/assets/astana.mp4`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                
                {/* Overlay effects */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 border border-white/10 rounded-xl pointer-events-none group-hover:border-white/20 transition-colors duration-300"></div>
                
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                    <div className="w-6 h-6 border-l-4 border-t-4 border-b-4 border-transparent border-l-white transform translate-x-0.5"></div>
                  </div>
                </div>
                
                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-full shadow-lg border border-white/10">
                  {isPlaying ? (
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                      Музыка включена 🎵
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
                      Нажмите, чтобы включить музыку
                    </span>
                  )}
                </div>
              </div>

              {/* Decorative elements around video */}
              <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-purple-500/50 rounded-tl-lg"></div>
              <div className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-blue-500/50 rounded-tr-lg"></div>
              <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-pink-500/50 rounded-bl-lg"></div>
              <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-orange-500/50 rounded-br-lg"></div>
            </div>

            {/* Hidden Audio */}
            <audio ref={audioRef} loop>
              <source src={`${base}/assets/music.mp3`} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </section>

          {/* Enhanced Philosophy */}
          <section 
            ref={el => sectionsRef.current[3] = el}
            className="opacity-0 transform translate-y-8 transition-all duration-1000 ease-out delay-800 mt-32"
          >
            <div className="max-w-4xl">
              <div className="border-t border-gray-800 pt-16 relative">
                <div className="absolute top-0 left-0 w-24 h-px bg-gradient-to-r from-purple-500 to-blue-500"></div>
                
                <blockquote className="text-lg md:text-xl text-gray-400 italic leading-relaxed relative pl-8 border-l-2 border-gradient-to-b from-purple-500 to-blue-500">
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-gradient-to-br from-purple-500 to-blue-500 rotate-45"></div>
                  «Магия происходит, когда амбиции, изысканный аромат и инновационные технологии соединяются. Мы - ваш креативный катализатор в мире парфюмерии.»
                </blockquote>
                
                {/* Signature */}
                <div className="mt-8 text-right">
                  <div className="inline-block px-4 py-2 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full border border-purple-500/20">
                    <span className="text-sm text-purple-300 font-medium">— Команда Olfy</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* Floating action button */}
      <div className="fixed bottom-8 right-8 z-40">
        <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full shadow-lg hover:shadow-xl hover:shadow-purple-500/25 transition-all duration-300 cursor-pointer flex items-center justify-center group">
          <div className="w-6 h-6 border-2 border-white rounded-full group-hover:scale-110 transition-transform duration-200"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default About;