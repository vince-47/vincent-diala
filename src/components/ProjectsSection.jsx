import { useState } from "react";
import { SlShareAlt } from "react-icons/sl";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const projects = [
  {
    id: 1,
    title: "GREENERATION",
    imageSrc: "/images/project-1.png",
    url: "https://greeneration.sbca.online/",
    description:
      "A web platform that helps locate recycling centers in the Philippines and promotes eco-friendly living.",
  },
  {
    id: 2,
    title: "Dental Clinic Management System",
    imageSrc: "/images/project-2.png",
    url: "https://2021300272.sbca.online/Thesis/login/index.html",
    description:
      "A web-based system that helps dental clinics manage appointments, billing, and records efficiently.",
  },
  {
    id: 3,
    title: "My Portfolio",
    imageSrc: "/images/myportfolio.png",
    url: "#hero",
    description:
      "A personal web portfolio showcasing frontend development work using React, TailwindCSS, and GSAP.",
  },
];

const ProjectsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalData, setModalData] = useState(null);
  const [direction, setDirection] = useState(0);

  const currentProject = projects[currentIndex];

  const openModal = (project) => setModalData(project);
  const closeModal = () => setModalData(null);

  const handleClick = (url) => {
    if (url.startsWith("#")) {
      const target = document.querySelector(url);
      target?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  const handleNext = () => {
    if (currentIndex < projects.length - 1) {
      setDirection(1);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <section
      id="projects"
      className="relative w-full min-h-screen bg-[#f6f6f6] py-20 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Section Title */}
      <div className="text-center mb-12 px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black">
          Featured Projects
        </h2>
        <div className="w-20 h-1 bg-black mx-auto mt-2"></div>
      </div>

      {/* Project Display */}
      <div className="relative w-full max-w-4xl h-[70vh] overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentProject.id}
            custom={direction}
            initial={{ x: direction > 0 ? 300 : -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction > 0 ? -300 : 300, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 px-4 flex flex-col items-center justify-center text-center"
          >
            <img
              src={currentProject.imageSrc}
              alt={currentProject.title}
              onClick={() => openModal(currentProject)}
              className="mx-auto max-h-[60vh] rounded-2xl shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300"
            />
            <h3
              onClick={() => handleClick(currentProject.url)}
              className="mt-6 text-xl md:text-2xl font-semibold text-black hover:text-gray-600 cursor-pointer flex justify-center items-center gap-2"
            >
              {currentProject.title} <SlShareAlt />
            </h3>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <div className="absolute z-10 top-1/2 left-0 right-0 px-4 flex justify-between items-center -translate-y-1/2">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`bg-black/70 text-white p-2 rounded-full hover:bg-black transition ${
              currentIndex === 0 ? "opacity-30 cursor-not-allowed" : "opacity-100"
            }`}
          >
            <FaChevronLeft className="text-xl" />
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex === projects.length - 1}
            className={`bg-black/70 text-white p-2 rounded-full hover:bg-black transition ${
              currentIndex === projects.length - 1
                ? "opacity-30 cursor-not-allowed"
                : "opacity-100"
            }`}
          >
            <FaChevronRight className="text-xl" />
          </button>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalData && (
          <motion.div
            key="modal-backdrop"
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              key="modal-content"
              className="bg-gradient-to-br from-[#1f1f2e] to-[#3c3c4e] text-white rounded-2xl p-8 max-w-md shadow-xl"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold mb-2">{modalData.title}</h3>
              <p className="text-sm text-gray-200 leading-relaxed">
                {modalData.description}
              </p>
              <button
                className="mt-6 px-4 py-2 bg-violet-600 hover:bg-violet-700 rounded transition duration-300"
                onClick={closeModal}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsSection;
