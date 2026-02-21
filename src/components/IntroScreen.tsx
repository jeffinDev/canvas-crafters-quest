import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IntroScene } from "./Scene3D";
import { Progress } from "@/components/ui/progress";

interface IntroScreenProps {
  onComplete: () => void;
}

export function IntroScreen({ onComplete }: IntroScreenProps) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(100), 300);
    const hideTimer = setTimeout(() => {
      setVisible(false);
      setTimeout(onComplete, 400);
    }, 3500);
    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Subtle gradient background */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(258_90%_62%/0.12),transparent_70%)]" />
          
          <IntroScene />

          <div className="relative z-10 flex flex-col items-center">
            <motion.div
              className="mb-2 text-sm font-medium tracking-[0.3em] uppercase text-muted-foreground"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Plataforma de Ensino
            </motion.div>
            
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-foreground mb-2 text-center tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
            >
              Canveiro<span className="gradient-text"> Formado</span>
            </motion.h1>

            <motion.p
              className="text-muted-foreground text-sm mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              Domine o design gráfico profissional
            </motion.p>

            <motion.div
              className="w-48"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <Progress 
                value={progress} 
                className="h-1 bg-secondary" 
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
