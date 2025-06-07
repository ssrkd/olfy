import React, { useEffect, useRef, useState, useCallback } from "react";

const Contacts = () => {
  const headerRef = useRef(null);
  const sectionsRef = useRef([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copiedItem, setCopiedItem] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  // Update mouse position for parallax
  const updateMousePosition = useCallback((e) => {
    setMousePosition({
      x: (e.clientX / window.innerWidth) * 100,
      y: (e.clientY / window.innerHeight) * 100,
    });
  }, []);

  // Update scroll progress
  const updateScrollProgress = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.min(scrollTop / docHeight, 1);
    setScrollProgress(progress);
  }, []);

  useEffect(() => {
    // Initial visibility trigger
    const timer = setTimeout(() => setIsVisible(true), 100);
    
    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('scroll', updateScrollProgress);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('scroll', updateScrollProgress);
    };
  }, [updateMousePosition, updateScrollProgress]);

  // Enhanced scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) scale(1)';
            entry.target.classList.add('animate-pulse-once');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  // Enhanced clipboard function with toast notification
  const copyToClipboard = async (text, type) => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
        setCopiedItem(type);
        setTimeout(() => setCopiedItem(null), 2000);
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopiedItem(type);
        setTimeout(() => setCopiedItem(null), 2000);
      }
    } catch (err) {
      console.error('Error copying to clipboard:', err);
    }
  };

  const socialLinks = [
    {
      name: "Telegram",
      url: "https://t.me/olfykz",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
        </svg>
      ),
      gradient: "from-blue-400 to-blue-600",
      hoverGradient: "hover:from-blue-500 hover:to-blue-700",
      description: "Telegram канал",
      shadowColor: "hover:shadow-blue-500/25"
    },
    {
      name: "WhatsApp",
      url: "https://wa.me/77768883007",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.119"/>
        </svg>
      ),
      gradient: "from-green-400 to-green-600",
      hoverGradient: "hover:from-green-500 hover:to-green-700",
      description: "Связь 24/7 в WhatsApp",
      shadowColor: "hover:shadow-green-500/25"
    },
    {
      name: "Instagram",
      url: "https://instagram.com/olfy.kz",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.017 0C8.396 0 7.989.013 7.041.048 6.094.082 5.52.204 5.012.401a5.9 5.9 0 0 0-2.134 1.388A5.9 5.9 0 0 0 .49 4.923C.294 5.43.172 6.003.138 6.95.103 7.898.09 8.304.09 11.925s.013 4.027.048 4.975c.034.947.156 1.521.353 2.028.194.5.5.938.85 1.32a5.9 5.9 0 0 0 1.32.85c.507.197 1.08.319 2.028.353.948.035 1.354.048 4.975.048s4.027-.013 4.975-.048c.947-.034 1.521-.156 2.028-.353.5-.194.938-.5 1.32-.85a5.9 5.9 0 0 0 .85-1.32c.197-.507.319-1.08.353-2.028.035-.948.048-1.354.048-4.975s-.013-4.027-.048-4.975c-.034-.947-.156-1.521-.353-2.028a5.9 5.9 0 0 0-.85-1.32A5.9 5.9 0 0 0 19.08.49C18.573.294 18 .172 17.052.138 16.104.103 15.698.09 12.077.09h-.06zm-.06 2.25c3.578 0 4.004.014 5.42.048 1.31.06 2.018.274 2.491.456.626.244 1.073.535 1.544 1.006s.762.918 1.006 1.544c.182.473.396 1.181.456 2.491.034 1.416.048 1.842.048 5.42s-.014 4.004-.048 5.42c-.06 1.31-.274 2.018-.456 2.491-.244.626-.535 1.073-1.006 1.544s-.918.762-1.544 1.006c-.473.182-1.181.396-2.491.456-1.416.034-1.842.048-5.42.048s-4.004-.014-5.42-.048c-1.31-.06-2.018-.274-2.491-.456-.626-.244-1.073-.535-1.544-1.006s-.762-.918-1.006-1.544c-.182-.473-.396-1.181-.456-2.491-.034-1.416-.048-1.842-.048-5.42s.014-4.004.048-5.42c.06-1.31.274-2.018.456-2.491.244-.626.535-1.073 1.006-1.544s.918-.762 1.544-1.006c.473-.182 1.181-.396 2.491-.456 1.416-.034 1.842-.048 5.42-.048zm0 3.831a5.834 5.834 0 1 0 0 11.668 5.834 5.834 0 0 0 0-11.668zm0 9.618a3.784 3.784 0 1 1 0-7.568 3.784 3.784 0 0 1 0 7.568zm7.427-9.836a1.36 1.36 0 1 1-2.72 0 1.36 1.36 0 0 1 2.72 0z"/>
        </svg>
      ),
      gradient: "from-pink-400 to-rose-600",
      hoverGradient: "hover:from-pink-500 hover:to-rose-700",
      description: "Следите за нами в Instagram",
      shadowColor: "hover:shadow-pink-500/25"
    },
    {
      name: "TikTok",
      url: "https://tiktok.com/@olfy.kz",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-.88-.05A6.33 6.33 0 0 0 5.76 20.5a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.8-.5z"/>
        </svg>
      ),
      gradient: "from-gray-700 to-black",
      hoverGradient: "hover:from-gray-600 hover:to-gray-900",
      description: "Креативный контент в TikTok",
      shadowColor: "hover:shadow-gray-500/25"
    }
  ];

  const contactInfo = [
    {
      label: "Телефон",
      value: "+7 (776) 888-30-07",
      displayValue: "+7 (776) 888-30-07",
      action: () => copyToClipboard("+77768883007", "Телефон"),
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      href: "tel:+77768883007"
    },
    {
      label: "Email",
      value: "olfykz@gmail.com",
      displayValue: "olfykz@gmail.com",
      action: () => copyToClipboard("olfykz@gmail.com", "Email"),
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      href: "mailto:olfykz@gmail.com"
    },
    {
      label: "Адрес",
      value: "Астана, Казахстан",
      displayValue: "Астана, Казахстан",
      action: null,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      map: true
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Custom CSS */}
      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse-once {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-pulse-once {
          animation: pulse-once 0.6s ease-out;
        }
      `}</style>

      {/* Toast Notification */}
      {copiedItem && (
        <div className="fixed top-20 right-6 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 animate-bounce">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>{copiedItem} скопирован!</span>
          </div>
        </div>
      )}

      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-800">
        <div
          className="h-full bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress * 100}%` }}
        ></div>
      </div>

      {/* Enhanced animated background */}
      <div
        className="fixed inset-0 pointer-events-none transition-all duration-700 ease-out"
        style={{
          transform: `translate(${(mousePosition.x - 50) * 0.02}px, ${(mousePosition.y - 50) * 0.02}px)`,
        }}
      >
        <div
          className="absolute top-1/4 -right-1/4 w-96 h-96 bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-full blur-3xl animate-pulse"
          style={{
            transform: `scale(${1 + scrollProgress * 0.5}) rotate(${scrollProgress * 360}deg)`,
          }}
        ></div>
        <div
          className="absolute bottom-1/4 -left-1/4 w-80 h-80 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse"
          style={{
            transform: `scale(${1 + scrollProgress * 0.3}) rotate(${-scrollProgress * 180}deg)`,
            animationDelay: '1s',
          }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-2xl animate-pulse"
          style={{
            transform: `translate(-50%, -50%) scale(${1 + Math.sin(scrollProgress * Math.PI) * 0.5})`,
            animationDelay: '2s',
          }}
        ></div>
        
        {/* Additional floating elements */}
        <div className="absolute top-20 left-20 w-4 h-4 bg-green-400/30 rounded-full animate-float"></div>
        <div className="absolute top-40 right-32 w-3 h-3 bg-teal-400/40 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-1/3 w-5 h-5 bg-blue-400/20 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 md:px-16 lg:px-24 xl:px-32">
        <header
          ref={headerRef}
          className={`pt-32 pb-16 md:pt-48 md:pb-24 transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
          }`}
        >
          <div className="max-w-6xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-light leading-[0.9] tracking-tight mb-8">
              <span className="block hover:text-green-200 transition-colors duration-300 cursor-default">
                Свяжитесь с
              </span>
              <span className="block text-transparent bg-gradient-to-r from-white via-green-200 to-teal-300 bg-clip-text animate-gradient-x cursor-default">
                командой Olfy
              </span>
              <span className="block font-extralight italic text-gray-400 hover:text-gray-300 transition-colors duration-300 cursor-default">
                мы всегда на связи.
              </span>
            </h1>
            
            <div className="w-24 h-px bg-gradient-to-r from-white to-transparent mt-12 animate-pulse"></div>
            
            <div className="mt-8 flex gap-4">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </header>

        <main className="pb-32">
          <div className="max-w-6xl mx-auto">
            
            {/* Contact Information */}
            <section
              ref={el => sectionsRef.current[0] = el}
              className="opacity-0 transform translate-y-8 transition-all duration-1000 ease-out delay-200 mb-20"
            >
              <h2 className="text-3xl md:text-4xl font-light mb-12 text-center text-green-400">
                Контактная информация
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {contactInfo.map((contact, index) => (
                  <div key={index} className="relative">
                    <div
                      className={`group p-8 rounded-2xl bg-gray-900/30 backdrop-blur-sm border border-gray-700/50 hover:border-green-500/50 transition-all duration-300 ${
                        contact.action ? 'cursor-pointer' : ''
                      } hover:transform hover:scale-105 hover:shadow-xl hover:shadow-green-500/10`}
                      onClick={contact.action}
                    >
                      <div className="flex flex-col items-center text-center space-y-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                          <div className="text-green-400 group-hover:text-green-300 transition-colors duration-300 relative z-10">
                            {contact.icon}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-xl font-medium text-white mb-2">{contact.label}</h3>
                          {contact.href ? (
                            <a
                              href={contact.href}
                              className="text-gray-400 group-hover:text-green-400 transition-colors duration-300 hover:underline"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {contact.displayValue}
                            </a>
                          ) : (
                            <p className="text-gray-400 group-hover:text-green-400 transition-colors duration-300">
                              {contact.displayValue}
                            </p>
                          )}
                        </div>
                        {contact.action && (
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Map for address */}
                    {contact.map && (
                      <div className="mt-4 rounded-2xl overflow-hidden border border-gray-700/50 hover:border-green-500/30 transition-colors duration-300">
                        <iframe
                          title="Astana Location"
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d146861.89544941096!2d71.290406!3d51.160522!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x42458539f4cb8e3b%3A0xc2f8d98a0a7dc434!2sAstana!5e0!3m2!1sen!2skz!4v1685961234567"
                          width="100%"
                          height="200"
                          style={{ border: 0 }}
                          allowFullScreen=""
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          className="grayscale hover:grayscale-0 transition-all duration-500"
                        ></iframe>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Social Networks */}
            <section
              ref={el => sectionsRef.current[1] = el}
              className="opacity-0 transform translate-y-8 transition-all duration-1000 ease-out delay-400"
            >
              <h2 className="text-3xl md:text-4xl font-light mb-12 text-center text-teal-400">
                Наши социальные сети
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group block p-8 rounded-2xl bg-gradient-to-br ${social.gradient} ${social.hoverGradient} transform hover:scale-105 transition-all duration-300 hover:shadow-2xl ${social.shadowColor} relative overflow-hidden`}
                  >
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    
                    <div className="flex flex-col items-center text-center space-y-4 relative z-10">
                      <div className="text-white group-hover:scale-110 transition-transform duration-300 animate-float" style={{ animationDelay: `${index * 0.5}s` }}>
                        {social.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">{social.name}</h3>
                        <p className="text-white/80 text-sm group-hover:text-white transition-colors duration-300">
                          {social.description}
                        </p>
                      </div>
                      <div className="opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </section>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-800/50 py-12 mt-20">
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex justify-center items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">O</span>
              </div>
              <span className="text-2xl font-light text-white">Olfy</span>
              <span>© 2025 Olfy. Все права защищены.</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Contacts;