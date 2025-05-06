import { motion } from "framer-motion";

const LoadingSpinner = () => {
  return (
    <motion.div
      className="w-4 h-4 border-2 border-white rounded-full border-t-transparent"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  );
};

export default LoadingSpinner;
