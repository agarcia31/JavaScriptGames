import React, { useState, useEffect } from 'react';

function Timer(props) {
  const [secondsLeft, setSecondsLeft] = useState(props.seconds);

  useEffect(() => {
    if (secondsLeft === 0) {
      props.onTimeUp();
    } else {
      const timerId = setTimeout(() => {
        setSecondsLeft(secondsLeft - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    }
  }, [secondsLeft, props]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    <div className="text-2xl">
      Time left: {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
    </div>
  );
}

export default Timer;
