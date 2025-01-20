import React from "react";
import { motion } from "framer-motion";

const PageWrapper = ({ children }) => {
  return (
    <motion.div
      className="h-full m-4 p-2 bg-white border rounded-lg"
      initial={{ opacity: 0, y: 20 }} // Başlangıç konumu
      animate={{ opacity: 1, y: 0 }} // Animasyonlu son konumu
      exit={{ opacity: 0, y: -20 }} // Çıkış animasyonu
      transition={{ duration: 0.8 }}
    >
      {children}
    </motion.div>
  );
};

export default PageWrapper;
