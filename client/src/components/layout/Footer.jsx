function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>
        Inventory Management System
      </p>

      <p>
        © {currentYear} Inventory Management System
      </p>

      <p>
        Developed by Team
      </p>
    </footer>
  );
}

export default Footer;