import React, { useEffect, useState, useRef } from 'react';
import './CursorPetals.css';

// Muted, beautiful pastel flower colors
const PETAL_COLORS = ['#ffb7b2', '#ffdac1', '#e2f0cb', '#b5ead7', '#c7ceea', '#f8b195', '#f67280', '#c06c84'];

export default function CursorPetals() {
    const [petals, setPetals] = useState([]);
    const lastPosRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        let isThrottled = false;

        const handleMouseMove = (e) => {
            if (isThrottled) return;

            const { clientX, clientY } = e;
            const dx = clientX - lastPosRef.current.x;
            const dy = clientY - lastPosRef.current.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Spawn a petal if the mouse moves enough distance
            if (distance > 20) {
                lastPosRef.current = { x: clientX, y: clientY };
                isThrottled = true;

                const newPetal = {
                    id: Date.now() + Math.random(),
                    x: clientX,
                    y: clientY,
                    color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
                    size: Math.random() * 12 + 10, // 10px to 22px
                    rotation: Math.random() * 360,
                    drift: (Math.random() - 0.5) * 80 // -40px to 40px left/right drift
                };

                setPetals((prev) => [...prev, newPetal].slice(-40)); // keep max 40 petals for performance

                setTimeout(() => {
                    isThrottled = false;
                }, 40); // 40ms spawn cooldown
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    // Cleanup old petals regularly
    useEffect(() => {
        if (petals.length > 0) {
            const interval = setInterval(() => {
                const now = Date.now();
                // Remove petals older than 2.5 seconds (2000ms animation + 500ms buffer)
                setPetals((prev) => prev.filter(p => now - parseInt(p.id) < 2500));
            }, 500);
            return () => clearInterval(interval);
        }
    }, [petals]);

    return (
        <div className="cursor-petals-container">
            {petals.map((petal) => (
                <div
                    key={petal.id}
                    className="petal"
                    style={{
                        left: petal.x,
                        top: petal.y,
                        backgroundColor: petal.color,
                        width: petal.size,
                        height: petal.size,
                        '--rotation': `${petal.rotation}deg`,
                        '--drift': `${petal.drift}px`
                    }}
                />
            ))}
        </div>
    );
}
