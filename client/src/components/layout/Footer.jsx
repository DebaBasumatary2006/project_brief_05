function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <span className="footer-brand">Inventory Management System</span>
      <p className="footer-copyright">© {currentYear} Inventory Management System</p>
      <p className="footer-team">Developed by Project Brief 05 Team</p>
    </footer>
  );
}

export default Footer;