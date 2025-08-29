import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CatState, PlatformState, Vector2D } from '../types';
import {
  GAME_WIDTH, GAME_HEIGHT, GRAVITY, JUMP_FORCE, HORIZONTAL_SPEED,
  HORIZONTAL_FRICTION, PLATFORM_HEIGHT, PLATFORM_MIN_WIDTH, PLATFORM_MAX_WIDTH,
  PLATFORM_START_COUNT, PLATFORM_SPAWN_RANGE_Y, CAMERA_SCROLL_THRESHOLD_RATIO, MAX_HORIZONTAL_SPEED
} from '../constants';
import Cat from './Cat';
import Platform from './Platform';

interface GameBoardProps {
  onGameOver: (score: number) => void;
}

const GameBoard: React.FC<GameBoardProps> = ({ onGameOver }) => {
  const [cat, setCat] = useState<CatState>({
    position: { x: GAME_WIDTH / 2, y: GAME_HEIGHT - 100 },
    velocity: { x: 0, y: 0 },
  });
  const [platforms, setPlatforms] = useState<PlatformState[]>([]);
  const [score, setScore] = useState(0);
  const [cameraY, setCameraY] = useState(0);
  
  const moveDirection = useRef<'left' | 'right' | null>(null);
  // FIX: Provide an initial value to `useRef` to satisfy stricter type checks and initialize it as null.
  const gameLoopRef = useRef<number | null>(null);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const lastPlatformId = useRef(0);

  // FIX: The `yEnd` parameter was unused. Removing it from the function signature.
  const generatePlatforms = useCallback((count: number, yStart: number): PlatformState[] => {
    const newPlatforms: PlatformState[] = [];
    let currentY = yStart;
    for (let i = 0; i < count; i++) {
        currentY -= Math.random() * (PLATFORM_SPAWN_RANGE_Y[1] - PLATFORM_SPAWN_RANGE_Y[0]) + PLATFORM_SPAWN_RANGE_Y[0];
        const width = Math.random() * (PLATFORM_MAX_WIDTH - PLATFORM_MIN_WIDTH) + PLATFORM_MIN_WIDTH;
        const x = Math.random() * (GAME_WIDTH - width);
        newPlatforms.push({ id: lastPlatformId.current++, position: { x: x + width/2, y: currentY }, width });
    }
    return newPlatforms;
  }, []);

  useEffect(() => {
    // FIX: Removed the third argument as it is no longer needed after updating `generatePlatforms`.
    const initialPlatforms = generatePlatforms(PLATFORM_START_COUNT, GAME_HEIGHT - 50);
    // Add a wide starting platform
    initialPlatforms.push({
      id: lastPlatformId.current++,
      position: { x: GAME_WIDTH / 2, y: GAME_HEIGHT - 50 },
      width: GAME_WIDTH - 40,
    });
    setPlatforms(initialPlatforms);
    setCat({
      position: { x: GAME_WIDTH / 2, y: GAME_HEIGHT - 100 },
      velocity: { x: 0, y: JUMP_FORCE },
    });
  // FIX: Added `generatePlatforms` to the dependency array to follow hooks best practices.
  }, [generatePlatforms]);

  const gameLoop = useCallback(() => {
    setCat(prevCat => {
      let { position, velocity } = { ...prevCat };
      
      // Horizontal movement
      if (moveDirection.current === 'left') {
        velocity.x -= HORIZONTAL_SPEED * 0.2;
      } else if (moveDirection.current === 'right') {
        velocity.x += HORIZONTAL_SPEED * 0.2;
      }
      
      velocity.x = Math.max(-MAX_HORIZONTAL_SPEED, Math.min(MAX_HORIZONTAL_SPEED, velocity.x));
      velocity.x *= HORIZONTAL_FRICTION;
      position.x += velocity.x;

      // Wall bouncing
      if (position.x < 20) {
          position.x = 20;
          velocity.x *= -0.5;
      }
      if (position.x > GAME_WIDTH - 20) {
          position.x = GAME_WIDTH - 20;
          velocity.x *= -0.5;
      }

      // Vertical movement & gravity
      velocity.y += GRAVITY;
      position.y += velocity.y;
      
      // Platform collision (only when falling)
      if (velocity.y > 0) {
        platforms.forEach(p => {
            const catBottom = position.y + 45; // 45 is cat height
            const catLeft = position.x - 22.5; // 22.5 is half cat width
            const catRight = position.x + 22.5;

            const platformTop = p.position.y;
            const platformLeft = p.position.x - p.width / 2;
            const platformRight = p.position.x + p.width / 2;

            if (catBottom >= platformTop && 
                catBottom <= platformTop + PLATFORM_HEIGHT &&
                catRight > platformLeft && 
                catLeft < platformRight) 
            {
                velocity.y = JUMP_FORCE;
                position.y = platformTop - 45;
            }
        });
      }
      
      return { position, velocity };
    });

    // Camera and Score update
    setCameraY(prevCameraY => {
        const cameraThreshold = GAME_HEIGHT * CAMERA_SCROLL_THRESHOLD_RATIO;
        let newCameraY = prevCameraY;
        if (cat.position.y < prevCameraY + cameraThreshold) {
            newCameraY = cat.position.y - cameraThreshold;
        }
        setScore(Math.floor(Math.max(0, -newCameraY / 10)));
        return newCameraY;
    });

    // Platform management
    setPlatforms(prevPlatforms => {
        let highestPlatform = Math.min(...prevPlatforms.map(p => p.position.y));
        const newPlatforms: PlatformState[] = [];
        if (highestPlatform > cameraY - 100) {
            // FIX: Removed the third argument as it is no longer needed after updating `generatePlatforms`.
            newPlatforms.push(...generatePlatforms(1, highestPlatform));
        }
        // Remove off-screen platforms
        return [...prevPlatforms.filter(p => p.position.y < cameraY + GAME_HEIGHT + 100), ...newPlatforms];
    });

    // Game over condition
    if (cat.position.y > cameraY + GAME_HEIGHT) {
      onGameOver(score);
      return;
    }

    gameLoopRef.current = requestAnimationFrame(gameLoop);
  }, [cat.position.y, cameraY, platforms, score, onGameOver, generatePlatforms]);

  useEffect(() => {
    gameLoopRef.current = requestAnimationFrame(gameLoop);
    return () => {
      // FIX: Check against null to avoid issues with falsy IDs like 0.
      if(gameLoopRef.current !== null) cancelAnimationFrame(gameLoopRef.current);
    };
  // FIX: Added `gameLoop` to dependency array to ensure the animation frame callback always has the latest game state and logic.
  }, [gameLoop]);

  // Handle Keyboard Controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        moveDirection.current = 'left';
      } else if (e.key === 'ArrowRight') {
        moveDirection.current = 'right';
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (
        (e.key === 'ArrowLeft' && moveDirection.current === 'left') ||
        (e.key === 'ArrowRight' && moveDirection.current === 'right')
      ) {
        moveDirection.current = null;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = gameAreaRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    moveDirection.current = x < GAME_WIDTH / 2 ? 'left' : 'right';
  };

  const handlePointerUp = () => {
    moveDirection.current = null;
  };

  const backgroundStyle = {
    background: `linear-gradient(to bottom, #87ceeb ${Math.max(0, 10-score/100)}%, #1e3a8a ${100-score/100}%, #0c1445)`,
    backgroundPositionY: `${cameraY * 0.5}px`,
  };

  return (
    <div
      ref={gameAreaRef}
      className="relative w-full h-full overflow-hidden select-none cursor-pointer"
      style={{ width: GAME_WIDTH, height: GAME_HEIGHT, ...backgroundStyle }}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <div className="absolute top-2 right-2 text-white font-bold text-3xl z-10 p-2 rounded-lg bg-black/30">
        Score: {score}
      </div>
      <div style={{ transform: `translateY(-${cameraY}px)` }}>
        <Cat position={cat.position} velocity={cat.velocity} />
        {platforms.map(p => (
          <Platform key={p.id} position={p.position} width={p.width} />
        ))}
      </div>
    </div>
  );
};

export default GameBoard;