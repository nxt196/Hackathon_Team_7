import React, { useState, useEffect } from 'react';

const ThreeHourCountdown = () => {
  const THREE_HOURS_IN_MS = 3 * 60 * 60 * 1000;

  const getRemainingTime = () => {
    const now = Date.now();
    const timeSinceEpoch = now % THREE_HOURS_IN_MS;
    return THREE_HOURS_IN_MS - timeSinceEpoch;
  };

  const [timeLeft, setTimeLeft] = useState(getRemainingTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getRemainingTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 rounded-xl shadow-md bg-[#F9F7F7] border-2 border-[#DBE2EF] text-[#112D4E] font-[Garamond]">
      <span className="flex items-center justify-center space-x-2 text-center">
        <span className="text-xl font-medium text-[#3F72AF]">Update In: </span>
        <span className="text-3xl font-bold tracking-wide">{formatTime(timeLeft)}</span>
      </span>
    </div>
  );
};

export default ThreeHourCountdown;
