import { useState } from "react";
import { Switch } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import LoadingSpinner from "./LoadingSpinner";
import ResultsDisplay from "./ResultsDisplay";
import { fetchDomainInfo } from "../services/api";

const SearchForm = () => {
  const [domain, setDomain] = useState("");
  const [isContactInfo, setIsContactInfo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleToggleChange = (checked) => {
    setIsContactInfo(checked);
    setResults(null);
  };

  const validateDomain = (domain) => {
    const hasTLD = /\.[a-z]{2,}$/i.test(domain);
    if (!hasTLD) {
      throw new Error(
        "Please enter a domain name with a valid TLD (e.g., .com, .net, .org)"
      );
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!domain) return;

    setIsLoading(true);
    setResults(null);
    setError(null);

    try {
      validateDomain(domain);
      const data = await fetchDomainInfo(
        domain,
        isContactInfo ? "contact_info" : "domain_info"
      );
      setResults(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <motion.div
        className={`w-1/2 transition-all duration-500 backdrop-blur-sm bg-white/40 rounded-2xl p-8 ${
          results ? "transform -translate-y-20" : ""
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative group">
            <input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="Enter domain name..."
              className="w-full px-3 py-4 text-4xl bg-transparent border-b-2 border-gray-200 group-hover:border-[#4A9C96]/50 focus:border-[#4A9C96] outline-none transition-all duration-300 placeholder-gray-400 text-[#4A9C96]"
            />
          </div>

          <div className="flex items-center justify-center space-x-3">
            <span
              className={`text-sm ${
                !isContactInfo ? "text-[#4A9C96]" : "text-[#6E7582]"
              }`}
            >
              Domain Info
            </span>
            <Switch
              checked={isContactInfo}
              onChange={handleToggleChange}
              className={`${
                isContactInfo ? "bg-[#4A9C96]" : "bg-gray-200"
              } relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ease-in-out cursor-pointer`}
            >
              <span
                className={`${
                  isContactInfo ? "translate-x-6" : "translate-x-1"
                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ease-in-out`}
              />
            </Switch>
            <span
              className={`text-sm ${
                isContactInfo ? "text-[#4A9C96]" : "text-[#6E7582]"
              }`}
            >
              Contact Info
            </span>
          </div>

          <div className="flex justify-center">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-2 text-white bg-[#5B6E94] hover:bg-[#4A5D83] rounded-full transition-all duration-300 flex items-center justify-center space-x-2 shadow-sm hover:shadow-md"
              disabled={isLoading}
            >
              {isLoading ? <LoadingSpinner /> : <span>Search</span>}
            </motion.button>
          </div>
        </form>
      </motion.div>

      {error && (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed top-4 right-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg shadow-lg backdrop-blur-sm"
        >
          {error}
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        {results && (
          <motion.div
            className="w-3/4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <ResultsDisplay
              data={results}
              type={isContactInfo ? "contact_info" : "domain_info"}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchForm;
