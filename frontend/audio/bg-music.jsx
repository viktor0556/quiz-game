import backgroundMusic from '../assets/bg-music.mp3';
import { useState } from 'react';
import useSound from 'use-sound';

const BackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [play, { stop }] = useSound(backgroundMusic);

  const handlePlay = () => {
    play();
    setIsPlaying(true);
  };

  const handleStop = () => {
    stop();
    setIsPlaying(false);
  };

  return (
    <div>
      <button onClick={isPlaying ? handleStop : handlePlay}>
        {isPlaying ? 'Stop Music' : 'Play Music'}
      </button>
    </div>
  );
};

export default BackgroundMusic;
