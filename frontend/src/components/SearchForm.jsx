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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!domain) return;

    setIsLoading(true);
    setResults(null);
    setError(null);

    try {
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
        className={`w-1/2 transition-all duration-300 ${
          results ? "transform -translate-y-20" : ""
        }`}
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
            <span
              className={`text-sm ${
                !isContactInfo ? "text-blue-500" : "text-gray-500"
              }`}
            >
              Domain Info
            </span>
            <Switch
              checked={isContactInfo}
              onChange={handleToggleChange}
              className={`${
                isContactInfo ? "bg-blue-500" : "bg-gray-200"
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
                isContactInfo ? "text-blue-500" : "text-gray-500"
              }`}
            >
              Contact Info
            </span>
          </div>

          <div className="text-center">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center space-x-2"
              disabled={isLoading}
            >
              {isLoading ? <LoadingSpinner /> : <span>Search</span>}
            </motion.button>
          </div>
        </form>
      </motion.div>

      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-500 text-center mt-4"
        >
          {error}
        </motion.div>
      )}

      <AnimatePresence>
        {results && (
          <div className="w-3/4">
            <ResultsDisplay
              data={results}
              type={isContactInfo ? "contact_info" : "domain_info"}
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchForm;
