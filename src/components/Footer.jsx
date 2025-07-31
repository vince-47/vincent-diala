import { FiGithub, FiLinkedin, FiInstagram } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-14 px-6 mt-0">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center flex-col md:flex-row gap-8 md:gap-0">
          {/* Footer Note */}
          <p className="text-white text-lg">@ 2025 Vincent Diala</p>

          {/* Connect Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">
              Connect
            </h3>
            <div className="flex space-x-4">
              <a
                className="text-white hover:text-white transition-colors"
                href="https://github.com/vince-47"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiGithub className="w-5 h-5" />
              </a>

              <a
                className="text-white hover:text-white transition-colors"
                href="https://www.instagram.com/vince_diala/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiInstagram className="w-5 h-5" />
              </a>

              <a
                className="text-white hover:text-white transition-colors"
                href="https://www.linkedin.com/in/vincent-diala-125880219"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiLinkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
