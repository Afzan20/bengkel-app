import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 40);
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id], footer[id]");

    function handleActive() {
      const scrollY = window.scrollY + 120;

      let current = "home";

      sections.forEach((section) => {
        if (scrollY >= section.offsetTop) {
          current = section.id;
        }
      });

      // kalau sudah mentok paling bawah halaman
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 5
      ) {
        current = "contact";
      }

      setActiveSection(current);
    }

    window.addEventListener("scroll", handleActive);

    handleActive();

    return () => window.removeEventListener("scroll", handleActive);
  }, []);

  function scrollToSection(id) {
    const section = document.getElementById(id);

    if (!section) return;

    const navbarHeight = 90;

    window.scrollTo({
      top: section.getBoundingClientRect().top + window.scrollY - navbarHeight,
      behavior: "smooth",
    });
  }

  const menuClass = (id) =>
    `
  relative
  transition-all
  duration-300
  cursor-pointer
  after:absolute
  after:left-0
  after:-bottom-1
  after:h-[2px]
  after:bg-[#DEE33E]
  after:transition-all
  ${
    activeSection === id
      ? "text-[#9FA324] after:w-full"
      : "text-black after:w-0 hover:text-[#9FA324] hover:after:w-full"
  }
`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl shadow-xl py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
        {/* Logo */}

        <Link to="/" className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#DEE33E] flex items-center justify-center font-bold text-xl shadow-md">
            G
          </div>

          <div>
            <h1 className="text-2xl font-bold">GaragePro</h1>

            <p className="text-xs text-gray-500">Car Service Center</p>
          </div>
        </Link>

        {/* Menu */}

        <nav className="hidden md:flex items-center gap-10">
          {[
            { id: "home", label: "Home" },
            { id: "services", label: "Services" },
            { id: "about", label: "About" },
            { id: "contact", label: "Contact" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="relative pb-2 text-lg font-medium transition-colors"
            >
              <span
                className={
                  activeSection === item.id
                    ? "text-[#9FA324]"
                    : "text-black hover:text-[#9FA324]"
                }
              >
                {item.label}
              </span>

              {activeSection === item.id && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute left-0 right-0 -bottom-1 h-[3px] rounded-full bg-[#DEE33E]"
                  transition={{
                    type: "spring",
                    stiffness: 450,
                    damping: 35,
                  }}
                />
              )}
            </button>
          ))}
        </nav>

        {/* Button */}

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-6 py-3 rounded-xl bg-[#DEE33E] hover:bg-[#cad12d] transition font-semibold shadow-md"
          >
            Register
          </Link>
        </div>
      </div>
    </header>
  );
}
