import { motion } from "framer-motion";

const Header = () => {
  return (
    <motion.header
      className="fixed top-0 left-0 p-6 z-50 backdrop-blur-sm bg-white/30 m-4 rounded-lg"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-xl font-light text-[#5B6E94] tracking-wide hover:text-red-500 transition-colors duration-300 border-2 p-2">
        DomainScout
      </h1>
    </motion.header>
  );
};

export default Header;
