import backgroundMusic from '../assets/bg-music.mp3';
import { useState, useEffect } from 'react';
import useSound from 'use-sound';

const BackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [play, { stop, sound }] = useSound(backgroundMusic, { volume });

  const handlePlay = () => {
    play();
    setIsPlaying(true);
  };

  const handleStop = () => {
    stop();
    setIsPlaying(false);
  };

  const handleVolumeChange = (event) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
    if (sound) {
      sound.volume(newVolume);
    }
  };

  useEffect(() => {
    if (sound) {
      sound.volume(volume);
    }
  }, [volume, sound]);

  return (
    <div className='music-container'>
      <button  onClick={isPlaying ? handleStop : handlePlay}>
        {isPlaying ? 'Stop Music' : 'Play Music'}
      </button>
      <div>
        <label className='volume-label'>Volume: {Math.round(volume * 100)}</label>
        <input className='volume-input' 
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={handleVolumeChange} 
        />
      </div>
    </div>
  );
};

export default BackgroundMusic;
