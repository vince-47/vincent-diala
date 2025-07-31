import { motion, AnimatePresence } from "framer-motion";
import { FiGithub, FiLinkedin, FiInstagram, FiMenu, FiX } from "react-icons/fi";
import { useState, useEffect } from "react";
import { Link } from "react-scroll";

const navVariants = {
  hidden: {
    y: -60,
    opacity: 0,
    transition: { duration: 0.2, ease: "easeInOut" },
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

const navItemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
};

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    setShowNavbar(lastScrollY > currentScrollY || currentScrollY < 10);
    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <motion.header
      initial="hidden"
      animate={showNavbar ? "visible" : "hidden"}
      variants={navVariants}
      className="fixed top-0 left-0 w-full z-50 transition-all duration-300 backdrop-blur-md bg-black/50"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 25,
            delay: 0.3,
            duration: 1.2,
          }}
          className="flex items-center"
        >
          <span className="text-xl font-bold bg-gradient-to-r from-gray-300 to-gray-100 bg-clip-text text-transparent">
            Vincent Diala
          </span>
        </motion.div>

        {/* Desktop Nav */}
        <motion.nav className="lg:flex hidden space-x-8" variants={navVariants}>
          {[
            { to: "hero", label: "Home" },
            { to: "projects", label: "Projects" },
            { to: "experience", label: "Skills" },
            { to: "contact", label: "Contact" },
          ].map(({ to, label }) => (
            <motion.div key={to} variants={navItemVariants}>
              <Link
                to={to}
                smooth={true}
                duration={800}
                offset={-50}
                spy={true}
                activeClass="text-white font-semibold"
                className="relative text-white hover:text-white font-medium transition-colors duration-300 group cursor-pointer"
              >
                {label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
              </Link>
            </motion.div>
          ))}
        </motion.nav>

        {/* Desktop Socials */}
        <div className="md:flex hidden items-center space-x-4">
          {[
            { Icon: FiGithub, href: "https://github.com/vince-47" },
            { Icon: FiInstagram, href: "https://www.instagram.com/vince_diala/" },
            {
              Icon: FiLinkedin,
              href: "https://www.linkedin.com/in/vincent-diala-125880219",
            },
          ].map(({ Icon, href }, index) => (
            <motion.a
              key={index}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.3, duration: 0.8 }}
              className="text-white hover:text-white transition-colors duration-300"
            >
              <Icon className="w-5 h-5" />
            </motion.a>
          ))}
        </div>

        {/* Resume Button */}
        <motion.a
          href="/RESUME-DIALA.pdf"
          download
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 1.6,
            duration: 0.8,
            type: "spring",
            stiffness: 100,
            damping: 15,
          }}
          className="ml-4 px-4 py-2 rounded-xl bg-gray-300 text-black font-bold hover:bg-black hover:text-white transition-all duration-500"
        >
          My Resume
        </motion.a>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center justify-end px-4 pb-3">
        <motion.button whileTap={{ scale: 0.7 }} onClick={toggleMenu} className="text-gray-300">
          {isOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="md:hidden bg-white dark:bg-gray-900 shadow-lg px-4 py-5 space-y-5 overflow-hidden"
          >
            <nav className="flex flex-col space-y-3">
              {["hero", "projects", "experience", "contact"].map((to) => (
                <Link
                  key={to}
                  to={to}
                  smooth={true}
                  duration={800}
                  offset={-50}
                  onClick={toggleMenu}
                  className="text-gray-300 font-medium py-2 cursor-pointer"
                >
                  {to.charAt(0).toUpperCase() + to.slice(1)}
                </Link>
              ))}
            </nav>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex space-x-5">
                {[
                  { Icon: FiGithub, href: "https://github.com/vince-47" },
                  { Icon: FiInstagram, href: "https://www.instagram.com/vince_diala/" },
                  {
                    Icon: FiLinkedin,
                    href: "https://www.linkedin.com/in/vincent-diala-125880219",
                  },
                ].map(({ Icon, href }, index) => (
                  <a href={href} target="_blank" rel="noopener noreferrer" key={index}>
                    <Icon className="h-5 w-5 text-gray-300" />
                  </a>
                ))}
              </div>

              <button
                onClick={toggleModal}
                className="mt-4 block w-full px-4 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-violet-400 font-bold text-white text-center"
              >
                Contact Me
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-sm flex justify-center items-center px-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.4 }}
              className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl w-full max-w-md p-6 border border-gray-700 text-white"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">📞 Get In Touch</h2>
                <button onClick={toggleModal}>
                  <FiX className="w-6 h-6 hover:text-red-400 transition" />
                </button>
              </div>

              <div className="space-y-5">
                <div className="flex justify-between items-center bg-gray-700/50 px-4 py-3 rounded-xl">
                  <div>
                    <p className="text-sm opacity-70">Email</p>
                    <p className="text-lg font-semibold">
                      <a href="mailto:vincentdiala14@gmail.com" className="hover:underline">
                        vincentdiala14@gmail.com
                      </a>
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText("vincentdiala14@gmail.com");
                      console.log("Email copied");
                    }}
                    className="text-sm px-3 py-1 rounded-lg bg-violet-600 hover:bg-violet-700 transition"
                  >
                    Copy
                  </button>
                </div>

                <div className="flex justify-between items-center bg-gray-700/50 px-4 py-3 rounded-xl">
                  <div>
                    <p className="text-sm opacity-70">Phone</p>
                    <p className="text-lg font-semibold">
                      <a href="tel:+639166667143" className="hover:underline">
                        +63 916 666 7143
                      </a>
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText("09166667143");
                      console.log("Phone copied");
                    }}
                    className="text-sm px-3 py-1 rounded-lg bg-violet-600 hover:bg-violet-700 transition"
                  >
                    Copy
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
