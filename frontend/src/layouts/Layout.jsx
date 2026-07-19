import Navbar from "../components/Navbar";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto p-6">
        {children}
      </div>
    </>
  );
}