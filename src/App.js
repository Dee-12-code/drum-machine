import React, { useState, useEffect, useCallback, useMemo } from 'react';
import './App.css';

const App = () => {
  const drumPads = useMemo(() => [
    { key: 'Q', sound: 'Heater 1', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3' },
    { key: 'W', sound: 'Heater 2', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3' },
    { key: 'E', sound: 'Heater 3', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3' },
    { key: 'A', sound: 'Heater 4', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3' },
    { key: 'S', sound: 'Clap', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3' },
    { key: 'D', sound: 'Open-HH', src: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3' },
    { key: 'Z', sound: "Kick-n'-Hat", src: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3' },
    { key: 'X', sound: 'Kick', src: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3' },
    { key: 'C', sound: 'Closed-HH', src: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3' }
  ], []);

  const [display, setDisplay] = useState('');

  const playSound = (key, sound) => {
    const audio = document.getElementById(key);
    audio.currentTime = 0;
    audio.play();
    setDisplay(sound);
  };

  const handleKeyPress = useCallback((event) => {
    const pad = drumPads.find(p => p.key === event.key.toUpperCase());
    if (pad) playSound(pad.key, pad.sound);
  }, [drumPads]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <div id="drum-machine" className="container text-center">
      <div id="display" className="display mb-4">{display}</div>
      <div className="drum-pads d-flex flex-wrap justify-content-center">
        {drumPads.map(pad => (
          <div
            key={pad.key}
            id={pad.sound}
            className="drum-pad btn btn-primary m-2"
            onClick={() => playSound(pad.key, pad.sound)}
          >
            {pad.key}
            <audio className="clip" id={pad.key} src={pad.src}></audio>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
