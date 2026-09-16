import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { BRAND_CONFIG } from '../config/brand';

export const AnnouncementBar: React.FC = () => {
  const announcements = BRAND_CONFIG.announcements;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || announcements.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, announcements.length]);

  const current = announcements[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + announcements.length) % announcements.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % announcements.length);
  };

  return (
    <div 
      id="store-announcement-bar"
      role="region"
      aria-label="Promotional announcements"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="bg-[#25231F] text-[#F5F1EB] text-xs sm:text-[13px] border-b border-[#3A3631] relative z-40 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-9 flex items-center justify-between">
        {/* Previous button */}
        <button
          id="announcement-prev-btn"
          onClick={handlePrev}
          aria-label="Previous announcement"
          className="p-1 text-[#E6E0D8]/70 hover:text-white transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#E6E0D8]"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>

        {/* Current message */}
        <div className="flex-1 text-center px-2 truncate overflow-hidden">
          {current.link ? (
            current.link.startsWith('http') ? (
              <a
                id={`announcement-link-${current.id}`}
                href={current.link}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline tracking-wide inline-flex items-center gap-1.5 font-light"
              >
                {current.highlight && (
                  <span className="uppercase text-[10px] tracking-widest font-medium bg-[#6D2638] text-[#FFFEFC] px-1.5 py-0.5 rounded-[2px]">
                    {current.highlight}
                  </span>
                )}
                <span className="truncate">{current.text}</span>
              </a>
            ) : (
              <Link
                id={`announcement-link-${current.id}`}
                to={current.link}
                className="hover:underline tracking-wide inline-flex items-center gap-1.5 font-light"
              >
                {current.highlight && (
                  <span className="uppercase text-[10px] tracking-widest font-medium bg-[#6D2638] text-[#FFFEFC] px-1.5 py-0.5 rounded-[2px]">
                    {current.highlight}
                  </span>
                )}
                <span className="truncate">{current.text}</span>
              </Link>
            )
          ) : (
            <span className="tracking-wide font-light truncate">
              {current.highlight && (
                <span className="uppercase text-[10px] tracking-widest font-medium bg-[#6D2638] text-[#FFFEFC] px-1.5 py-0.5 rounded-[2px] mr-1.5">
                  {current.highlight}
                </span>
              )}
              {current.text}
            </span>
          )}
        </div>

        {/* Next button */}
        <button
          id="announcement-next-btn"
          onClick={handleNext}
          aria-label="Next announcement"
          className="p-1 text-[#E6E0D8]/70 hover:text-white transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#E6E0D8]"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
