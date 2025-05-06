import { useState } from 'react'
import { Switch } from '@headlessui/react'
import { motion } from 'framer-motion'

const SearchForm = () => {
  const [domain, setDomain] = useState('')
  const [isContactInfo, setIsContactInfo] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    //  implement API call here
  }

  return (
    <motion.div 
      className="w-full max-w-lg px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="Enter domain name..."
            className="w-full px-3 py-4 text-xl bg-transparent border-b-2 border-gray-200 focus:border-blue-500 outline-none transition-all duration-300 placeholder-gray-400"
          />
        </div>
        
        <div className="flex items-center justify-center space-x-3">
          <span className={`text-sm ${!isContactInfo ? 'text-blue-500' : 'text-gray-500'}`}>
            Domain Info
          </span>
          <Switch
            checked={isContactInfo}
            onChange={setIsContactInfo}
            className={`${
              isContactInfo ? 'bg-blue-500' : 'bg-gray-200'
            } relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ease-in-out cursor-pointer`}
          >
            <span
              className={`${
                isContactInfo ? 'translate-x-6' : 'translate-x-1'
              } inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ease-in-out`}
            />
          </Switch>
          <span className={`text-sm ${isContactInfo ? 'text-blue-500' : 'text-gray-500'}`}>
            Contact Info
          </span>
        </div>

        <div className="text-center">
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-600 transition-colors duration-300 cursor-pointer shadow-lg"
          >
            Search
          </motion.button>
        </div>
      </form>
    </motion.div>
  )
}

export default SearchForm