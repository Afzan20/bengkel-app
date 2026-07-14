import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer id="contact" className="scroll-mt-28">
      <div className="max-w-7xl mx-auto px-8 py-20">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Logo */}

          <div>
            <h1 className="text-3xl font-bold">GaragePro</h1>

            <p className="text-gray-400 mt-5 leading-8">
              Professional garage management system with online booking, repair
              tracking and transparent transactions.
            </p>
          </div>

          {/* Quick Links */}

          <div>
            <h2 className="font-bold text-xl mb-5">Quick Links</h2>

            <div className="space-y-3 text-gray-400">
              <a href="#home" className="block hover:text-white">
                Home
              </a>

              <a href="#services" className="block hover:text-white">
                Services
              </a>

              <a href="#about" className="block hover:text-white">
                About
              </a>

              <Link to="/login" className="block hover:text-white">
                Login
              </Link>
            </div>
          </div>

          {/* Contact */}

          <div>
            <h2 className="font-bold text-xl mb-5">Contact</h2>

            <div className="space-y-3 text-gray-400">
              <p>📍 Pekanbaru, Riau</p>

              <p>📞 +62 812-3456-7890</p>

              <p>✉️ garagepro@email.com</p>
            </div>
          </div>

          {/* Opening */}

          <div>
            <h2 className="font-bold text-xl mb-5">Opening Hours</h2>

            <div className="space-y-3 text-gray-400">
              <p>Monday - Friday</p>

              <p>08:00 - 17:00</p>

              <p>Saturday</p>

              <p>08:00 - 15:00</p>

              <p>Sunday : Closed</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-16 pt-8 flex justify-between items-center">
          <p className="text-gray-500">
            © 2026 GaragePro. All Rights Reserved.
          </p>

          <div className="flex gap-4 text-2xl">
            <span>📘</span>

            <span>📷</span>

            <span>💼</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
