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
    <table className="min-w-full table-fixed">
      <thead>
        <tr>
          <th className="py-3 px-4 text-left text-sm font-medium text-[#6E7582] w-[16.66%]">
            Domain Name
          </th>
          <th className="py-3 px-4 text-left text-sm font-medium text-[#6E7582] w-[16.66%]">
            Registrar
          </th>
          <th className="py-3 px-4 text-left text-sm font-medium text-[#6E7582] w-[16.66%]">
            Registration Date
          </th>
          <th className="py-3 px-4 text-left text-sm font-medium text-[#6E7582] w-[16.66%]">
            Expiration Date
          </th>
          <th className="py-3 px-4 text-left text-sm font-medium text-[#6E7582] w-[16.66%]">
            Domain Age
          </th>
          <th className="py-3 px-4 text-left text-sm font-medium text-[#6E7582] w-[16.66%]">
            Hostnames
          </th>
        </tr>
      </thead>
      <tbody>
        <tr className="transition-colors duration-200 hover:bg-[#F5F7FA]/50">
          <td className="py-3 px-4 text-sm text-[#2D3142] break-words">
            {data.domainName}
          </td>
          <td className="py-3 px-4 text-sm text-[#2D3142] break-words">
            {data.registrarName}
          </td>
          <td className="py-3 px-4 text-sm text-[#2D3142] break-words">
            {data.registrarRegistrationDate}
          </td>
          <td className="py-3 px-4 text-sm text-[#2D3142] break-words">
            {data.expirationDate}
          </td>
          <td className="py-3 px-4 text-sm text-[#2D3142] break-words">
            {data.estimatedDomainAge}
          </td>
          <td className="py-3 px-4 text-sm text-[#2D3142] break-words">
            {formatHostnames(data.hostnames)}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

const ContactInfoTable = ({ data }) => (
  <table className="min-w-full table-fixed">
    <thead>
      <tr>
        <th className="py-3 px-4 text-left text-sm font-medium text-[#6E7582] w-1/4">
          Registrant Name
        </th>
        <th className="py-3 px-4 text-left text-sm font-medium text-[#6E7582] w-1/4">
          Technical Contact
        </th>
        <th className="py-3 px-4 text-left text-sm font-medium text-[#6E7582] w-1/4">
          Administrative Contact
        </th>
        <th className="py-3 px-4 text-left text-sm font-medium text-[#6E7582] w-1/4">
          Contact Email
        </th>
      </tr>
    </thead>
    <tbody>
      <tr className="transition-colors duration-200 hover:bg-[#F5F7FA]/50">
        <td className="py-3 px-4 text-sm text-[#2D3142] break-words">
          {data.registrantName}
        </td>
        <td className="py-3 px-4 text-sm text-[#2D3142] break-words">
          {data.technicalContactName}
        </td>
        <td className="py-3 px-4 text-sm text-[#2D3142] break-words">
          {data.administrativeContactName}
        </td>
        <td className="py-3 px-4 text-sm text-[#2D3142] break-words">
          {data.contactEmail}
        </td>
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
      className="w-[95%] max-w-7xl mx-auto mt-8"
    >
      <div className="bg-white/80 backdrop-blur-md rounded-lg shadow-lg p-6 overflow-x-auto ring-1 ring-black/5">
        <div className="min-w-[800px] lg:min-w-0">
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
