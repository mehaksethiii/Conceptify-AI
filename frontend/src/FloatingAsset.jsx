import React, { useState, useEffect, useRef } from 'react';
import './FloatingAsset.css';

export const useParallax = (speed = 0.5) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY * speed);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return offset;
};

export const FloatingAsset = ({ type = 'sphere', speed = 0.5, size = 100, style = {} }) => {
  const parallaxOffset = useParallax(speed);
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - (left + width / 2)) * 0.2;
    const y = (e.clientY - (top + height / 2)) * 0.2;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      className={`floating-asset asset-${type}`}
      style={{
        ...style,
        width: size,
        height: size,
        transform: `translate3d(${position.x}px, ${position.y + parallaxOffset}px, 0)`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="asset-inner"></div>
    </div>
  );
};
