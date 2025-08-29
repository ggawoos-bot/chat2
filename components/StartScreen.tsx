import React, { useState, useEffect } from 'react';
import { generateMission } from '../lib/gemini';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  const [mission, setMission] = useState<string>('');
  const [isLoadingMission, setIsLoadingMission] = useState<boolean>(true);

  useEffect(() => {
    const fetchMission = async () => {
      setIsLoadingMission(true);
      const generatedMission = await generateMission();
      setMission(generatedMission);
      setIsLoadingMission(false);
    };
    fetchMission();
  }, []);


  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white z-10 p-4">
      <h1 className="text-6xl font-bold text-orange-400 drop-shadow-lg mb-4" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>Cat Jump</h1>
      <p className="text-lg mb-2 text-center">Help the cat climb as high as possible!</p>
      <p className="text-md mb-6 text-center text-gray-300">Use Arrow Keys or tap on the left/right side of the screen to move.</p>
      
      <div className="w-full max-w-sm mx-auto my-6 p-4 bg-gray-800 bg-opacity-60 rounded-lg border border-emerald-500 shadow-lg transition-opacity duration-500">
        <h3 className="text-xl font-bold text-center text-emerald-400 mb-2">🌟 Today's Mission 🌟</h3>
        {isLoadingMission ? (
            <p className="text-lg text-center text-gray-300 animate-pulse">Generating challenge...</p>
        ) : (
            <p className="text-lg text-center text-white italic">"{mission}"</p>
        )}
      </div>

      <button
        onClick={onStart}
        className="px-8 py-4 bg-emerald-500 text-white font-bold text-2xl rounded-xl shadow-lg hover:bg-emerald-600 transition-all transform hover:scale-105"
      >
        Start Game
      </button>
    </div>
  );
};

export default StartScreen;