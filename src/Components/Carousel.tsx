import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import tempPhoto from '../assets/temp/tempPhoto.jpg';

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Sample data - replace with your actual photos
  const slides = [
    { id: 1, image: tempPhoto, caption: 'Our First Date' },
    { id: 2, image: tempPhoto, caption: 'Summer Adventures' },
    { id: 3, image: tempPhoto, caption: 'Together Forever' },
    { id: 4, image: tempPhoto, caption: 'Special Moments' },
    { id: 5, image: tempPhoto, caption: 'Beautiful Days' },
  ];

  // Auto-play functionality
  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, [currentIndex]);

  const startAutoPlay = () => {
    stopAutoPlay();
    autoPlayRef.current = setTimeout(() => {
      nextSlide();
    }, 5000);
  };

  const stopAutoPlay = () => {
    if (autoPlayRef.current) {
      clearTimeout(autoPlayRef.current);
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Get visible slides (prev, current, next)
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

  // GSAP Animation
  useGSAP(() => {
    gsap.from('.carousel-card', {
      scale: 0.8,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
      stagger: 0.1,
    });
  }, [currentIndex]);

  return (
    <section className="carousel-section h-screen w-full flex flex-col justify-center items-center relative overflow-hidden">
      {/* Same background as hero */}
      <div className="floating-flowers-bg">
        {[...Array(6)].map((_, i) => (
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

      {/* Carousel Title */}
      <h2 className="carousel-title text-5xl font-bold text-gray-800 mb-12 z-10">
        Our Beautiful Memories 💕
      </h2>

      {/* Carousel Container */}
      <div ref={carouselRef} className="carousel-container relative w-full max-w-6xl px-4 z-10">
        
        {/* Cards Display */}
        <div className="cards-wrapper flex justify-center items-center gap-8">
          
          {/* Left Card (Smaller) */}
          <div 
            className="carousel-card side-card"
            onClick={() => prevSlide()}
          >
            <div className="polaroid-card">
              <div className="polaroid-image">
                <img 
                  src={visibleSlides.prev.image} 
                  alt={visibleSlides.prev.caption}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="polaroid-text">{visibleSlides.prev.caption}</p>
            </div>
          </div>

          {/* Center Card (Larger) */}
          <div className="carousel-card center-card">
            <div className="polaroid-card">
              <div className="polaroid-image">
                <img 
                  src={visibleSlides.current.image} 
                  alt={visibleSlides.current.caption}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="polaroid-text">{visibleSlides.current.caption}</p>
            </div>
          </div>

          {/* Right Card (Smaller) */}
          <div 
            className="carousel-card side-card"
            onClick={() => nextSlide()}
          >
            <div className="polaroid-card">
              <div className="polaroid-image">
                <img 
                  src={visibleSlides.next.image} 
                  alt={visibleSlides.next.caption}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="polaroid-text">{visibleSlides.next.caption}</p>
            </div>
          </div>

        </div>

        {/* Navigation Buttons */}
        <button 
          onClick={() => { prevSlide(); stopAutoPlay(); }}
          className="nav-button left-button"
          aria-label="Previous slide"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <button 
          onClick={() => { nextSlide(); stopAutoPlay(); }}
          className="nav-button right-button"
          aria-label="Next slide"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

      </div>

      {/* Dots Indicator */}
      <div className="dots-container flex gap-3 mt-12 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => { goToSlide(index); stopAutoPlay(); }}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Styles */}
      <style>{`
        /* Carousel Section Background */
        .carousel-section {
          background: linear-gradient(135deg, #fce4ec 0%, #f8bbd0 50%, #fce4ec 100%);
          position: relative;
        }

        /* Floating Flowers */
        .floating-flowers-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
          opacity: 0.3;
        }

        .flower-bg {
          position: absolute;
          font-size: 2rem;
          animation: floatFlower linear infinite;
        }

        @keyframes floatFlower {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
          }
        }

        /* Carousel Title */
        .carousel-title {
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        /* Carousel Container */
        .carousel-container {
          position: relative;
        }

        /* Cards Wrapper */
        .cards-wrapper {
          position: relative;
          min-height: 450px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        /* Carousel Cards */
        .carousel-card {
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
        }

        /* Side Cards (Smaller) */
        .side-card {
          transform: scale(0.8) translateY(20px);
          opacity: 0.7;
          cursor: pointer;
          z-index: 5;
        }

        .side-card:hover {
          opacity: 0.9;
          transform: scale(0.85) translateY(15px);
        }

        /* Center Card (Larger) */
        .center-card {
          transform: scale(1);
          opacity: 1;
          z-index: 10;
          position: relative;
        }

        /* Polaroid Card Styling */
        .polaroid-card {
          background: white;
          padding: 16px;
          padding-bottom: 60px;
          box-shadow: 
            0 8px 16px rgba(0, 0, 0, 0.15),
            0 20px 40px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          width: 280px;
          position: relative;
          display: block;
        }

        .center-card .polaroid-card {
          width: 350px;
        }

        .polaroid-card:hover {
          transform: translateY(-5px);
          box-shadow: 
            0 12px 24px rgba(0, 0, 0, 0.2),
            0 30px 60px rgba(0, 0, 0, 0.15);
        }

        .polaroid-image {
          width: 100%;
          height: 320px;
          background-color: #f0f0f0;
          overflow: hidden;
        }

        .center-card .polaroid-image {
          height: 400px;
        }

        .polaroid-text {
          margin-top: 16px;
          text-align: center;
          font-family: 'Courier New', monospace;
          font-size: 1rem;
          color: #333;
          font-weight: 500;
        }

        /* Navigation Buttons */
        .nav-button {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: white;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          transition: all 0.3s ease;
          border: none;
          color: #c44569;
          z-index: 20;
        }

        .nav-button:hover {
          background: #c44569;
          color: white;
          transform: translateY(-50%) scale(1.1);
          box-shadow: 0 6px 16px rgba(196, 69, 105, 0.3);
        }

        .left-button {
          left: -25px;
        }

        .right-button {
          right: -25px;
        }

        /* Dots Indicator */
        .dots-container {
          position: relative;
        }

        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.5);
          border: 2px solid #c44569;
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 0;
        }

        .dot:hover {
          background: rgba(196, 69, 105, 0.5);
          transform: scale(1.2);
        }

        .dot.active {
          background: #c44569;
          width: 32px;
          border-radius: 6px;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .carousel-title {
            font-size: 2.5rem;
            margin-bottom: 2rem;
          }

          .cards-wrapper {
            min-height: 380px;
          }

          .polaroid-card {
            width: 220px;
          }

          .center-card .polaroid-card {
            width: 280px;
          }

          .polaroid-image {
            height: 260px;
          }

          .center-card .polaroid-image {
            height: 320px;
          }

          .nav-button {
            width: 40px;
            height: 40px;
          }
        }

        @media (max-width: 768px) {
          .carousel-title {
            font-size: 2rem;
            padding: 0 1rem;
          }

          .side-card {
            display: none;
          }

          .cards-wrapper {
            min-height: 450px;
            justify-content: center;
          }

          .center-card .polaroid-card {
            width: 300px;
          }

          .center-card .polaroid-image {
            height: 360px;
          }

          .left-button {
            left: 10px;
          }

          .right-button {
            right: 10px;
          }
        }

        @media (max-width: 480px) {
          .carousel-title {
            font-size: 1.5rem;
          }

          .center-card .polaroid-card {
            width: 260px;
          }

          .center-card .polaroid-image {
            height: 300px;
          }

          .polaroid-text {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </section>
  );
}