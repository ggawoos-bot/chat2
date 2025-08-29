
import React, { useState, useCallback, useEffect } from 'react';
import { GameStatus } from './types';
import StartScreen from './components/StartScreen';
import GameOverScreen from './components/GameOverScreen';
import GameBoard from './components/GameBoard';
import { GAME_WIDTH, GAME_HEIGHT } from './constants';

const App: React.FC = () => {
  const [gameStatus, setGameStatus] = useState<GameStatus>('start');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  
  useEffect(() => {
    const storedHighScore = localStorage.getItem('catJumpHighScore');
    if (storedHighScore) {
      setHighScore(parseInt(storedHighScore, 10));
    }
  }, []);

  const handleStart = useCallback(() => {
    setScore(0);
    setGameStatus('playing');
  }, []);

  const handleGameOver = useCallback((finalScore: number) => {
    setScore(finalScore);
    const newHighScore = Math.max(highScore, finalScore);
    setHighScore(newHighScore);
    localStorage.setItem('catJumpHighScore', newHighScore.toString());
    setGameStatus('gameOver');
  }, [highScore]);
  
  const handleRestart = useCallback(() => {
    setGameStatus('start');
  }, []);

  return (
    <div className="w-full h-full flex justify-center items-center bg-gray-900">
      <div
        className="relative bg-blue-300 shadow-2xl"
        style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}
      >
        {gameStatus === 'start' && <StartScreen onStart={handleStart} />}
        {gameStatus === 'playing' && <GameBoard onGameOver={handleGameOver} />}
        {gameStatus === 'gameOver' && (
          <GameOverScreen score={score} highScore={highScore} onRestart={handleRestart} />
        )}
      </div>
    </div>
  );
};

export default App;
