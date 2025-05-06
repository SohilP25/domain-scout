import { motion } from 'framer-motion'

const ResultsDisplay = ({ data, type }) => {
  if (!data) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mt-8"
    >
      <div className="bg-white/50 backdrop-blur-sm rounded-lg shadow-lg p-6">
        <table className="w-full">
          <tbody>
            {Object.entries(data).map(([key, value]) => (
              <tr key={key} className="border-b border-gray-100 last:border-0">
                <td className="py-3 text-gray-600 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </td>
                <td className="py-3 text-gray-900">
                  {Array.isArray(value) ? value.join(', ') : value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}

export default ResultsDisplay