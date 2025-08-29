
import React from 'react';

interface GameOverScreenProps {
  score: number;
  highScore: number;
  onRestart: () => void;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({ score, highScore, onRestart }) => {
  return (
    <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-white z-10 p-4">
      <h2 className="text-6xl font-bold text-red-500 drop-shadow-lg mb-4">Game Over</h2>
      <div className="bg-gray-800 bg-opacity-80 p-6 rounded-lg shadow-2xl text-center">
        <p className="text-2xl mb-2">Your Score</p>
        <p className="text-5xl font-bold text-orange-400 mb-6">{score}</p>
        <p className="text-xl mb-2">High Score</p>
        <p className="text-3xl font-bold text-emerald-400 mb-8">{highScore}</p>
      </div>
      <button
        onClick={onRestart}
        className="mt-8 px-8 py-4 bg-emerald-500 text-white font-bold text-2xl rounded-xl shadow-lg hover:bg-emerald-600 transition-all transform hover:scale-105"
      >
        Play Again
      </button>
    </div>
  );
};

export default GameOverScreen;
