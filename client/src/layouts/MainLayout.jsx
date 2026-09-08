import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

function MainLayout() {
  return (
    <div className="main-layout">
      <Navbar />

      <main className="main-content">
        <h1>Inventory Management System</h1>
        <p>
          Welcome to the Inventory Management System.
        </p>
        <p>
          Main content will be added in future sprints.
        </p>
      </main>

      <Footer />
    </div>
  );
}

export default MainLayout;