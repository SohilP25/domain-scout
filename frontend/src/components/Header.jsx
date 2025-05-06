import { motion } from 'framer-motion'

const Header = () => {
  return (
    <motion.header 
      className="fixed top-0 left-0 p-6 z-50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-xl font-light text-gray-800 tracking-wide">
        DomainScout
      </h1>
    </motion.header>
  )
}

export default Header