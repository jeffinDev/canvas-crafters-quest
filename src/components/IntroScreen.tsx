import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IntroScene } from "./Scene3D";

interface IntroScreenProps {
  onComplete: () => void;
}

export function IntroScreen({ onComplete }: IntroScreenProps) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(100), 200);
    const hideTimer = setTimeout(() => {
      setVisible(false);
      setTimeout(onComplete, 500);
    }, 3200);
    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center gradient-bg"
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.5 }}
        >
          <IntroScene />
          <div className="relative z-10 flex flex-col items-center">
            <motion.h1
              className="text-5xl md:text-7xl font-extrabold text-primary-foreground mb-4 animate-float text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              style={{ textShadow: "0 10px 30px rgba(0,0,0,0.3)" }}
            >
              Canveiro Formado
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-primary-foreground/90 mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Curso Completo de Canva
            </motion.p>
            <div className="w-64 md:w-80 h-1.5 bg-primary-foreground/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary-foreground rounded-full transition-all duration-[3000ms] ease-out"
                style={{ width: `${progress}%`, boxShadow: "0 0 20px rgba(255,255,255,0.5)" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
