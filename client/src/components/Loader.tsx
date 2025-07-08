import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

export default function Loader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, 50);

    // GSAP animation for the loader
    gsap.to('.loader-circle', {
      rotation: 360,
      duration: 2,
      repeat: -1,
      ease: 'linear'
    });

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-[#f0f2f5] to-[#00B2FF] z-50">
      <motion.div 
        className="flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative w-32 h-32 mb-8">
          <div className="loader-circle absolute inset-0 border-4 border-t-[#00B2FF] border-r-[#0084FF] border-b-[#00B2FF] border-l-transparent rounded-full"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-2xl font-bold text-[#050505]"
            >
              Hola
            </motion.div>
          </div>
        </div>
        
        <div className="w-64 h-2 bg-[#E4E6EB] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#0084FF] to-[#00B2FF]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        
        <motion.div 
          className="mt-4 text-[#65676B]"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Loading {progress}%
        </motion.div>
      </motion.div>
    </div>
  );
}