import React from 'react';
import { motion } from 'framer-motion';
import logo from "../assets/logo/logo.jpeg";

const AnimatedImage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 1,
        ease: "easeInOut",
      }}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <motion.img
        src={logo}
        alt="Animated"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={{
          width: '400px',
          height: 'auto',
          borderRadius: '20px',
        }}
      />
    </motion.div>
  );
};

export default AnimatedImage;
