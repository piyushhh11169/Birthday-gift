import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef, useState, useEffect } from 'react';
import ScrollTrigger from 'gsap/ScrollTrigger';

import tempPhoto from '../assets/temp/tempPhoto.jpg';
import '../assets/css/Home.css';

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
    { id: 1, image: tempPhoto, caption: 'Our First Date' },
    { id: 2, image: tempPhoto, caption: 'Summer Adventures' },
    { id: 3, image: tempPhoto, caption: 'Together Forever' },
    { id: 4, image: tempPhoto, caption: 'Special Moments' },
    { id: 5, image: tempPhoto, caption: 'Beautiful Days' },
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

        <div className="container-main max-w-7xl w-full px-8 flex items-center justify-between gap-16">
          <div className="wish-text flex-1">
            <h1 className="text-7xl font-bold text-gray-800">
              <span className="inline-block">Happy</span>{' '}
              <span className="inline-block">Birthday</span>{' '}
              <span className="inline-block text-pink-600">My Love ❤️</span>
            </h1>
          </div>

          <div className="polaroids-container flex-1 relative h-96 flex items-center justify-center">
            <div className="polaroid absolute" style={{ transform: 'rotate(-10deg)', left: '1%', top: '2%' }}>
              <div className="polaroid-photo">
                <img src={tempPhoto} className="w-full h-full object-cover" alt="Memory 1" />
              </div>
              <p className="polaroid-caption">Memory 1</p>
            </div>

            <div className="polaroid absolute" style={{ transform: 'rotate(5deg)', left: '25%', top: '25%' }}>
              <div className="polaroid-photo bg-gradient-to-br from-blue-200 to-pink-200" />
              <p className="polaroid-caption">Memory 2</p>
            </div>

            <div className="polaroid absolute" style={{ transform: 'rotate(9deg)', right: '6%', top: '5%' }}>
              <div className="polaroid-photo bg-gradient-to-br from-yellow-200 to-pink-200" />
              <p className="polaroid-caption">Memory 3</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= LETTER SECTION ================= */}
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
              <p className="letter-line letter-date">January 24, 2026</p>
            </div>

            {/* Letter Body */}
            <div className="letter-body">
              <p className="letter-line letter-greeting">My Dearest Love,</p>

              <p className="letter-line letter-text">
                On this special day, I want you to know how much you mean to me.
              </p>

              <p className="letter-line letter-text">
                Every moment with you is a treasure, every smile you share lights up my world,
                and every day by your side is a gift I cherish deeply.
              </p>

              <p className="letter-line letter-text">
                You've brought so much joy, laughter, and love into my life, and I'm
                endlessly grateful for everything we've shared together.
              </p>

              <p className="letter-line letter-text">
                Happy Birthday, my love. Here's to many more beautiful memories,
                adventures, and moments that make life extraordinary.
              </p>

              <p className="letter-line letter-closing">
                Forever yours,
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
          Our Beautiful Memories 💕
        </h2>

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

          <div className="cards-wrapper flex justify-center items-center gap-8">
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