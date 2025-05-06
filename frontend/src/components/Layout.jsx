import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F7FA] via-white to-[#E2E8F0]">
      <Header />
      <main className="flex items-center justify-center min-h-screen">
        {children}
      </main>
    </div>
  );
};

export default Layout;
