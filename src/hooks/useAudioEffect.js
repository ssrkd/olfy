import { useEffect } from "react";

const useAudioEffect = () => {
  useEffect(() => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    const playSound = (freq) => {
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime);

      gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime); // громкость

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.3); // 0.3 сек
    };

    const onScroll = () => playSound(440);
    const onClick = () => playSound(660);

    window.addEventListener("scroll", onScroll);
    window.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("click", onClick);
    };
  }, []);
};

export default useAudioEffect;
