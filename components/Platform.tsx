
import React from 'react';
import { Vector2D } from '../types';
import { PLATFORM_HEIGHT } from '../constants';

interface PlatformProps {
  position: Vector2D;
  width: number;
}

const Platform: React.FC<PlatformProps> = ({ position, width }) => {
  return (
    <div
      className="absolute bg-emerald-500 rounded-lg shadow-lg border-2 border-emerald-700"
      style={{
        left: position.x,
        top: position.y,
        width: width,
        height: PLATFORM_HEIGHT,
        transform: `translateX(-50%)`,
      }}
    >
      <div className="w-full h-full bg-emerald-400 rounded-md opacity-50"></div>
    </div>
  );
};

export default Platform;
