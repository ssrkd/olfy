import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const text = "OLFY KZ® ONLINE SHOP PERFUME";

const Preloader = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 20);

    const timeout = setTimeout(() => {
      onFinish(); // переход к Home после 2.2 секунд
    }, 2200);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [onFinish]);

  return (
    <div className="fixed inset-0 bg-black flex flex-col justify-center items-center overflow-hidden z-50">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="w-full px-4"
        >
          {/* Анимация текста */}
          <motion.div className="flex justify-center space-x-4 text-white uppercase font-semibold tracking-widest text-center text-xl md:text-3xl">
            {text.split(" ").map((word, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ opacity: 1, x: 0 }}
                animate={{ opacity: 1, x: 0 }}
              >
                {word}
              </motion.span>
            ))}
          </motion.div>

          {/* Полоса загрузки с адаптацией для мобильных устройств */}
          <div className="fixed bottom-0 left-0 w-full h-1 bg-gray-800">
            <motion.div
              className="h-full bg-green-500"
              style={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Preloader;
