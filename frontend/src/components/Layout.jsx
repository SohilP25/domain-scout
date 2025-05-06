import Header from "./Header"

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="flex items-center justify-center min-h-screen">
        {children}
      </main>
    </div>
  )
}

export default Layout