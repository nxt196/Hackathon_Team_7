import React, { useState, useEffect } from 'react';

const ThreeHourCountUp = () => {
  const THREE_HOURS_IN_MS = 3 * 60 * 60 * 1000;

  const getElapsedTime = () => {
    const now = Date.now();
    return now % THREE_HOURS_IN_MS;
  };

  const [elapsedTime, setElapsedTime] = useState(getElapsedTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime(getElapsedTime());
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
      <div
          className="max-w-md mx-auto mt-10 p-4 rounded-xl shadow-md border-2 border-[#DBE2EF] text-[#F9F7F7]"
          style={{ fontFamily: 'Garamond, serif' }}
      >

      <span className="flex items-center justify-center space-x-2 text-center">
        <span className="text-xl font-medium text-[#DBE2EF]">
          Time since last update:
        </span>
        <span className="text-3xl font-bold tracking-wide">
          {formatTime(elapsedTime)}
        </span>
      </span>
      </div>
  );
};

export default ThreeHourCountUp;
