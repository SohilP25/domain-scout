import { motion } from "framer-motion";

const DomainInfoTable = ({ data }) => {
  const formatHostnames = (hostnames) => {
    if (!Array.isArray(hostnames)) return hostnames || "N/A";
    const hostnamesStr = hostnames.join(", ");
    return hostnamesStr.length > 25
      ? hostnamesStr.slice(0, 22) + "..."
      : hostnamesStr;
  };

  return (
    <table className="w-full divide-y divide-gray-200">
      <thead>
        <tr>
          <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 w-[15%]">
            Domain Name
          </th>
          <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 w-[15%]">
            Registrar
          </th>
          <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 w-[17.5%]">
            Registration Date
          </th>
          <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 w-[17.5%]">
            Expiration Date
          </th>
          <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 w-[15%]">
            Domain Age
          </th>
          <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 w-[20%]">
            Hostnames
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        <tr>
          <td className="py-3 px-4 text-sm text-gray-900">{data.domainName}</td>
          <td className="py-3 px-4 text-sm text-gray-900">{data.registrarName}</td>
          <td className="py-3 px-4 text-sm text-gray-900">
            {data.registrarRegistrationDate}
          </td>
          <td className="py-3 px-4 text-sm text-gray-900">{data.expirationDate}</td>
          <td className="py-3 px-4 text-sm text-gray-900">
            {data.estimatedDomainAge}
          </td>
          <td className="py-3 px-4 text-sm text-gray-900">
            {formatHostnames(data.hostnames)}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

const ContactInfoTable = ({ data }) => (
  <table className="w-full divide-y divide-gray-200">
    <thead>
      <tr>
        <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 w-1/4">
          Registrant Name
        </th>
        <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 w-1/4">
          Technical Contact
        </th>
        <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 w-1/4">
          Administrative Contact
        </th>
        <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 w-1/4">
          Contact Email
        </th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-200">
      <tr>
        <td className="py-3 px-4 text-sm text-gray-900">{data.registrantName}</td>
        <td className="py-3 px-4 text-sm text-gray-900">
          {data.technicalContactName}
        </td>
        <td className="py-3 px-4 text-sm text-gray-900">
          {data.administrativeContactName}
        </td>
        <td className="py-3 px-4 text-sm text-gray-900">{data.contactEmail}</td>
      </tr>
    </tbody>
  </table>
);

const ResultsDisplay = ({ data, type }) => {
  if (!data) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full mt-8"
    >
      <div className="bg-white/50 backdrop-blur-sm rounded-lg shadow-lg p-6">
        <div className="overflow-auto">
          {type === "domain_info" ? (
            <DomainInfoTable data={data} />
          ) : (
            <ContactInfoTable data={data} />
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ResultsDisplay;
