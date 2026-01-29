import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef, useState, useEffect } from 'react';
import ScrollTrigger from 'gsap/ScrollTrigger';


import '../assets/css/Home.css';

import hero1 from '../assets/Collage/2.jpg';
import hero2 from '../assets/Collage/27.jpg';
import hero3 from '../assets/Collage/17.jpg';

import image1 from '../assets/Collage/4.jpg';
import image2 from '../assets/Collage/6.jpg';
import image4 from '../assets/Collage/31.jpg';
import image5 from '../assets/Collage/32.jpg';
import image6 from '../assets/Collage/37.jpg';
import image7 from '../assets/Collage/38.jpg';


import image9 from '../assets/Collage/18.jpg';
import image10 from '../assets/Collage/25.jpg';
import image11 from '../assets/Collage/27.jpg';
import image12 from '../assets/Collage/35.jpg';





gsap.registerPlugin(ScrollTrigger);

export default function MainPage() {
  const container = useRef<HTMLElement | null>(null);
  const letterRef = useRef<HTMLDivElement | null>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('left');
  const autoPlayRef = useRef<number | null>(null);



  /* ------------------ Carousel Data ------------------ */
  const slides = [
    { id: 1, image: image1, caption: 'what a pose!😉' },
    { id: 2, image: image2, caption: 'Temperature is getting high!🥵' },
    { id: 4, image: image4, caption: 'What a night it was, You did make up and looking sooooo beautifull!' },
    { id: 5, image: image5, caption: 'Bindi with this smile, uufff😘' },
    { id: 5, image: image6, caption: 'What a cuteness' },
    { id: 5, image: image7, caption: 'looking so innocent and cute' },
    { id: 5, image: image9, caption: 'This loook, will kill me' },
    { id: 5, image: image10, caption: 'kya hi sundar lg rhe ho aap' },
    { id: 5, image: image11, caption: 'Damn, This beautyy' },
    { id: 5, image: image12, caption: 'koi itna cute kese lg skta h' },
  ];

  /* ------------------ Carousel Logic ------------------ */
  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, [currentIndex]); // Restart timer when index changes

  useEffect(() => {
    if (!carouselRef.current) return;
  
    // Slide animation based on direction
    const slideDistance = direction === 'left' ? -50 : 50;
    
    gsap.fromTo(
      carouselRef.current.querySelectorAll('.carousel-card'),
      { 
        x: slideDistance, 
        opacity: 0.7,
        scale: 0.95 
      },
      {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.1,
        overwrite: 'auto',
      }
    );
  }, [currentIndex, direction]);

  const startAutoPlay = () => {
    stopAutoPlay();
    autoPlayRef.current = window.setTimeout(() => {
      nextSlide();
    }, 5000); // Auto-advance every 5 seconds
  };

  const stopAutoPlay = () => {
    if (autoPlayRef.current) {
      clearTimeout(autoPlayRef.current);
    }
  };

  const nextSlide = () => {
    setDirection('left');
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection('right');
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 'left' : 'right');
    setCurrentIndex(index);
  };

  const getVisibleSlides = () => {
    const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
    const nextIndex = (currentIndex + 1) % slides.length;

    return {
      prev: slides[prevIndex],
      current: slides[currentIndex],
      next: slides[nextIndex],
    };
  };

  const visibleSlides = getVisibleSlides();

  /* ------------------ GSAP Animations ------------------ */
  useGSAP(
    () => {
      // HERO animation (runs once)
      const heroTimeline = gsap.timeline({
        defaults: { ease: 'power2.out' },
      });
  
      heroTimeline
        .from('.wish-text h1 span', {
          y: 60,
          opacity: 0,
          duration: 1,
          stagger: 0.3,
        })
        .from(
          '.polaroid',
          {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'back.out(1.2)',
          },
          '-=0.3'
        );
  
      // LETTER scroll trigger (created ONCE)
      gsap.timeline({
        scrollTrigger: {
          trigger: '.letter-section',
          start: 'top 80%',
          end: 'top 20%',
          toggleActions: 'play none none reverse',
        },
      })
        .from('.vintage-paper', {
          y: 100,
          opacity: 0,
          duration: 1.2,
          ease: 'power3.out',
        })
        .from(
          '.letter-line',
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
          },
          '-=0.6'
        )
        .from(
          '.heart-stamp',
          {
            scale: 0,
            rotation: -180,
            opacity: 0,
            duration: 0.8,
            ease: 'back.out(1.7)',
          },
          '-=0.4'
        );
  
      // CAROUSEL scroll trigger (created ONCE)
      gsap.timeline({
        scrollTrigger: {
          trigger: '.carousel-section',
          start: 'top 75%',
          end: 'top 25%',
          toggleActions: 'play none none reverse',
        },
      })
        .from('.carousel-title', {
          y: 50,
          opacity: 0,
          duration: 0.8,
        })
        .from(
          '.carousel-card',
          {
            scale: 0.7,
            opacity: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: 'back.out(1.2)',
          },
          '-=0.4'
        )
        .from(
          '.dots-container',
          {
            y: 20,
            opacity: 0,
            duration: 0.5,
          },
          '-=0.3'
        );
    },
    { scope: container }
  );
  

  return (
    <main ref={container} className="w-full">
      {/* ================= HERO SECTION ================= */}
      <section className="hero-section h-screen w-full flex justify-center items-center relative overflow-hidden">
        {/* Floating flowers background */}
        <div className="floating-flowers-bg">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="flower-bg"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${15 + Math.random() * 10}s`,
              }}
            >
              🌸
            </div>
          ))}
        </div>

        <button 
          onClick={()=>{
            localStorage.removeItem('auth_secret_key');
            window.location.reload();
          }}
          className='logout-btn'
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          Log Out
        </button>

        <div className="container-main max-w-7xl w-full px-8 flex items-center justify-between gap-16 flex-col-reverse lg:flex-row">
          
        
          <div className="wish-text flex-1 text-center lg:text-left">
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-800">
              <span className="inline-block">Happy</span>{' '}
              <span className="inline-block">Birthday</span>{' '}
              <span className="inline-block text-pink-600">My Love ❤️</span>
            </h1>
          </div>

        
          <div className="polaroids-container h-64 flex-1 relative sm:h-80 md:h-96 lg:h-96 flex items-center justify-center w-full">
            <div className="polaroid absolute" style={{ transform: 'rotate(-10deg)', left: '0%', top: '0%' }}>
              <div className="polaroid-photo">
                <img src={hero1} className="w-full h-full object-cover" alt="Memory 1" />
              </div>
              <p className="polaroid-caption">Memory 1</p>
            </div>

            <div className="polaroid absolute" style={{ transform: 'rotate(5deg)', left: '25%', top: '25%' }}>
              <div className="polaroid-photo bg-gradient-to-br from-blue-200 to-pink-200">
              <img src={hero2} className="w-full h-full object-cover" alt="Memory 2" />
              </div>
              <p className="polaroid-caption">Memory 2</p>
            </div>

            <div className="polaroid absolute" style={{ transform: 'rotate(9deg)', right: '6%', top: '5%' }}>
              <div className="polaroid-photo bg-gradient-to-br from-yellow-200 to-pink-200">
              <img src={hero3} className="w-full h-full object-full" alt="Memory 2" />
              </div>
              <p className="polaroid-caption">Memory 3</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= LETTER SECTION ================= */}
      {/* NO CHANGES BELOW THIS LINE - Everything else remains exactly the same */}
      <section ref={letterRef} className="letter-section h-screen w-full flex justify-center items-center relative overflow-hidden">
        {/* Floating flowers background */}
        <div className="floating-flowers-bg">
          {[...Array(8)].map((_, i) => (
            <div
              key={`letter-${i}`}
              className="flower-bg"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${15 + Math.random() * 10}s`,
              }}
            >
              🌸
            </div>
          ))}
        </div>

        

        {/* Vintage Paper Letter */}
        <div className="vintage-paper">

          <div className="paper-content">
            {/* Letter Header */}
            <div className="letter-header">
              <p className="letter-date">January 30, 2026</p>
            </div>

            {/* Letter Body */} 
            <div className="letter-body">
              <p className="letter-line letter-greeting">Happy Birthday Jaan,</p>

              <p className="letter-line letter-text">
              I know ye thoda unique way h letter dene ka but thiss long distance....
to maine socha ki ek site banaya jaye
I hope aapko ye site acha laga ho. Aapka favourite color pink h, isiliye maine pink theme me banaya h 
              </p>

              <p className="letter-line letter-text">
              I hope you understand my situation now, aapse vc bhi nhi kr paunga. Mera destiny kuch khrb sa h, aapke birthday ke din hi meeting aa gya. Isliye maine ek video banaya tha aapko wish kaarne ke liye (thoda rude face tha, I know).
              </p>

              <p className="letter-line letter-text">
              This day is very special for me as today is my love birthday or I can say my girl birthday.
I know maine aapke liye kuch gift nhi liya, but gift to aapko in-person dunga 😘.
              </p>

              <p className="letter-line letter-text">
              (pata nhi aaj itna kese likh diya maine) 
              </p>
              <p className="letter-line letter-text">
              I come to know about this beautifull feeling because of you
You are the reason I belive in love, maine abhi tk kisi ke liye bhi aisa feel nhi kiya jesa mai aapke liye krta hun... I LOVE YOU.
              </p>
              <p className="letter-line letter-text">
              I have never thought that someone can love the way you love me, my girl. Mujhe nhi laga tha ki iss rude personality koi love kr skta h. Aapne mere iss rude personality ko jhela aur isse soft bana diya. Sorry, agar maine kabhi bhi(I mean mostly) rudely behave kiya hoga aur aapko bura laga ho.
              </p>
              <p className="letter-line letter-text">
              Wese aaj birthday to aapka h, but you give me gifts everyday by saying I LOVE YOU
and I will never forget the day when you say I love you first time. that day was the best day of my life.
              </p>
              <p className="letter-line letter-text">
              Aur aapki beauty ki kya hi baat kru mai, every time I start admiring you, I end up never satisfied because the more I see you, the more I want. As I said earlier, In a most selfish way, no one will admire you the way I admires you.
I never find anyone as beautifull and cute like you. 
I love everything about you and which is related to you.
              </p>
              <p/>
              <p className='letter-line letter-text'>
              Whenever I feel sad or don't feel good, talking to you and seeing your picture makes me feel relieved and brings happiness.
              At Last, Remember one thing, whatever the situation would be in future, you will always be loved by me. There is no any other situation exists in which I cannot love you.
              </p>

              <p className='letter-line letter-text'>
              You are the reason for my smile.. Thank you for everything you does to me knowingly or unknowingly.
              </p>
              <p className='letter-line letter-text'>
                Again, Happy Birthday My Love.
                I hope aapka aaj ka din sabse jyada acha jaye.
              </p>

              <p className="letter-line letter-closing">
                I LOVE YOU ❤️
                <br />
                <span className="signature">Your Love</span>
              </p>
            </div>

            {/* Vintage Wax Seal with Heart */}
            <div className="heart-stamp">
              <div className="relative w-24 h-24 rounded-full flex items-center justify-center shadow-2xl" style={{
                background: 'radial-gradient(circle, #7f1d1d 0%, #991b1b 50%, #7f1d1d 100%)',
              }}>
                <div className="absolute inset-0 rounded-full opacity-30" style={{
                  background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4), transparent 50%)',
                }} />
                <svg width="50" height="50" viewBox="0 0 24 24" fill="currentColor" className="text-rose-200 opacity-80">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CAROUSEL SECTION ================= */}
      <section className="carousel-section h-screen w-full flex flex-col justify-center items-center relative overflow-hidden">
        {/* Floating flowers background */}
        <div className="floating-flowers-bg">
          {[...Array(8)].map((_, i) => (
            <div
              key={`carousel-${i}`}
              className="flower-bg"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${15 + Math.random() * 10}s`,
              }}
            >
              🌸
            </div>
          ))}
        </div>

        <h2 className="carousel-title text-5xl font-bold mb-24 z-10">
          Admiring You💕
        </h2>
        <p className="carousel z-10 text-center">
          These are the some photos of you I adore the most.
        </p>

        <div ref={carouselRef} className="carousel-container relative w-full max-w-6xl px-4 z-10">
          {/* Navigation Arrows */}
          <button
            onClick={() => {
              stopAutoPlay();
              prevSlide();
            }}
            className="carousel-nav-btn carousel-nav-left"
            aria-label="Previous slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <button
            onClick={() => {
              stopAutoPlay();
              nextSlide();
            }}
            className="carousel-nav-btn carousel-nav-right"
            aria-label="Next slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          <div className="cards-wrapper flex justify-center items-center gap-8 h-[420px]">
            <div className="carousel-card side-card" onClick={() => {
              stopAutoPlay();
              prevSlide();
            }}>
              <img src={visibleSlides.prev.image} alt={visibleSlides.prev.caption} className="w-full h-full object-cover" />
              <div className="carousel-caption">{visibleSlides.prev.caption}</div>
            </div>

            <div className="carousel-card center-card">
              <img src={visibleSlides.current.image} alt={visibleSlides.current.caption} className="w-full h-full object-cover" />
              <div className="carousel-caption">{visibleSlides.current.caption}</div>
            </div>

            <div className="carousel-card side-card" onClick={() => {
              stopAutoPlay();
              nextSlide();
            }}>
              <img src={visibleSlides.next.image} alt={visibleSlides.next.caption} className="w-full h-full object-cover" />
              <div className="carousel-caption">{visibleSlides.next.caption}</div>
            </div>
          </div>

          <div className="dots-container flex justify-center gap-3 mt-80">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => {
                  stopAutoPlay();
                  goToSlide(index);
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Progress Bar */}
          {/* <div className="carousel-progress-container">
            <div 
              className="carousel-progress-bar"
              style={{
                animation: 'progressBar 5s linear infinite',
                animationPlayState: autoPlayRef.current ? 'running' : 'paused'
              }}
            />
          </div> */}
        </div>
      </section>
    </main>
  );
}