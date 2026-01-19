const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-sm text-muted-foreground">
          © {currentYear} Shreejan Sapkota. Built with passion and curiosity.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
