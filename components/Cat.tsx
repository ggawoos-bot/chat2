
import React from 'react';
import { Vector2D } from '../types';

interface CatProps {
  position: Vector2D;
  velocity: Vector2D;
}

const Cat: React.FC<CatProps> = ({ position, velocity }) => {
  const isFalling = velocity.y > 0.5;
  const isJumping = velocity.y < -0.5;

  return (
    <div
      className="absolute transition-transform duration-100"
      style={{
        left: position.x,
        top: position.y,
        width: 45,
        height: 45,
        transform: `translateX(-50%)`,
      }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <g>
          {/* Body */}
          <path d="M 50,30 C 25,30 25,70 50,70 C 75,70 75,30 50,30" fill="#f97316"/>
          <path d="M 50,60 C 30,60 30,95 50,95 C 70,95 70,60 50,60" fill="#f97316"/>
          
          {/* Ears */}
          <path d="M 30,30 Q 30,15 40,25" fill="#f97316"/>
          <path d="M 70,30 Q 70,15 60,25" fill="#f97316"/>
          <path d="M 33,32 Q 33,25 38,28" fill="#fca5a5"/>
          <path d="M 67,32 Q 67,25 62,28" fill="#fca5a5"/>
          
          {/* Eyes */}
          <circle cx="40" cy="45" r={isFalling ? 2 : 5} fill="white"/>
          <circle cx="60" cy="45" r={isFalling ? 2 : 5} fill="white"/>
          <circle cx="40" cy="45" r={isFalling ? 1 : 2} fill="black"/>
          <circle cx="60" cy="45" r={isFalling ? 1 : 2} fill="black"/>
          
          {/* Nose & Mouth */}
          <path d="M 48,53 Q 50,56 52,53" fill="#fca5a5"/>
          <path d="M 50,55 L 50,60" stroke="black" strokeWidth="1"/>
          <path d="M 45,60 Q 50,65 55,60" stroke="black" strokeWidth="1" fill="none"/>

          {/* Whiskers */}
          <path d="M 35,52 L 25,50" stroke="black" strokeWidth="1"/>
          <path d="M 35,55 L 25,55" stroke="black" strokeWidth="1"/>
          <path d="M 35,58 L 25,60" stroke="black" strokeWidth="1"/>
          <path d="M 65,52 L 75,50" stroke="black" strokeWidth="1"/>
          <path d="M 65,55 L 75,55" stroke="black" strokeWidth="1"/>
          <path d="M 65,58 L 75,60" stroke="black" strokeWidth="1"/>

          {/* Tail */}
          <path d="M 60,85 Q 80,80 75,65" stroke="#f97316" strokeWidth="8" fill="none" strokeLinecap="round"/>

           {/* Feet */}
           <ellipse cx={isJumping ? "38" : "40"} cy="92" rx="8" ry="4" fill="#fca5a5" transform={`rotate(${isJumping ? -10 : 0} 40 92)`} />
           <ellipse cx={isJumping ? "62" : "60"} cy="92" rx="8" ry="4" fill="#fca5a5" transform={`rotate(${isJumping ? 10 : 0} 60 92)`} />
        </g>
      </svg>
    </div>
  );
};

export default Cat;
