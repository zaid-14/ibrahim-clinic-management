function Footer() {
  return (
    <footer className="bg-green-900 text-white py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-6 text-center">

        <p className="text-l text-gray-300">

          © {new Date().getFullYear()} Ibrahim Clinic |
          All Rights Reserved.

        </p>

        <p className="text-xs text-gray-300 mt-2">

          Designed & Developed for Dr. Aftab A. Khan (B.U.M.S.)

        </p>

      </div>
    </footer>
  );
}

export default Footer;