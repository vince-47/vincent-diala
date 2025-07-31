import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SlShareAlt } from "react-icons/sl";
import { motion, AnimatePresence } from "framer-motion";

// Project Images data with description and URL
const projectImages = [
  {
    id: 1,
    title: "GREENERATION",
    imageSrc: "/images/project-1.png",
    url: "https://greeneration.sbca.online/",
    description: "A web platform that helps locate recycling centers in the Philippines and promotes eco-friendly living.",
  },
  {
    id: 2,
    title: "Dental Clinic Management System",
    imageSrc: "/images/project-2.png",
    url: "https://2021300272.sbca.online/Thesis/login/index.html",
    description: "A full-featured web-based system designed to help dental clinics manage appointments, records, and billing efficiently.",
  },
  {
    id: 3,
    title: "My Portfolio",
    imageSrc: "/images/myportfolio.png",
    url: "#hero",
    description: "A personal developer portfolio showcasing front-end projects built using React, Tailwind CSS, and GSAP animations.",
  },
];

const ProjectsSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const titleLineRef = useRef(null);
  const triggerRef = useRef(null);
  const horizontalRef = useRef(null);

  const [modalData, setModalData] = useState(null);

  const openModal = (project) => {
    setModalData(project);
  };

  const closeModal = () => {
    setModalData(null);
  };

  const handleTitleClick = (url) => {
    if (url.startsWith("#")) {
      const section = document.querySelector(url);
      section?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      titleRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    gsap.fromTo(
      titleLineRef.current,
      { width: "0%", opacity: 0 },
      {
        width: "100%",
        opacity: 1,
        duration: 1.5,
        ease: "power3.inOut",
        delay: 0.3,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    gsap.fromTo(
      triggerRef.current,
      { y: 100, rotationX: 20, opacity: 0 },
      {
        y: 0,
        rotationX: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        delay: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      }
    );

    gsap.fromTo(
      sectionRef.current,
      { backgroundPosition: "50% 0%" },
      {
        backgroundPosition: "50% 100%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );

    const horizontalScroll = gsap.to(".panel", {
      xPercent: -100 * (projectImages.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: triggerRef.current,
        start: "top top",
        end: () => `+=${horizontalRef.current.offsetWidth}`,
        pin: true,
        scrub: 1,
        snap: {
          snapTo: 1 / (projectImages.length - 1),
          duration: { main: 0.2, max: 0.3 },
          delay: 0.1,
        },
        invalidateOnRefresh: true,
      },
    });

    const panels = gsap.utils.toArray(".panel");
    panels.forEach((panel) => {
      const image = panel.querySelector(".project-image");
      const imageTitle = panel.querySelector(".project-title");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: panel,
          containerAnimation: horizontalScroll,
          start: "left right",
          end: "right left",
          scrub: true,
        },
      });

      tl.fromTo(image, { scale: 0, rotate: -20 }, { scale: 1, rotate: 1, duration: 0.5 });

      if (imageTitle) {
        tl.fromTo(imageTitle, { y: 30 }, { y: -100, duration: 0.3 }, 0.2);
      }
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-20 bg-[#f6f6f6] overflow-hidden"
    >
      {/* Section title */}
      <div className="container mx-auto px-4 mb-16 relative z-10">
        <h2
          ref={titleRef}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-black text-center mb-4 opacity-0"
        >
          Featured Projects
        </h2>
        <div
          ref={titleLineRef}
          className="w-0 h-1 bg-gradient-to-r from-black to-black mx-auto opacity-0"
        ></div>
      </div>

      {/* Horizontal Scroll Section */}
      <div ref={triggerRef} className="overflow-hidden opacity-0">
        <div
          ref={horizontalRef}
          className="horizontal-section flex md:w-[300%] w-[320%]"
        >
          {projectImages.map((project) => (
            <div
              key={project.id}
              className="panel relative flex items-center justify-center w-screen"
            >
              <div className="relative w-full h-full flex flex-col items-center justify-center p-4 sm:p-8 md:p-12">
                <img
                  onClick={() => openModal(project)}
                  className="project-image max-w-full max-h-full rounded-2xl object-cover cursor-pointer"
                  src={project.imageSrc}
                  alt="Project-img"
                />
                <h2
                  onClick={() => handleTitleClick(project.url)}
                  className="project-title flex items-center gap-3 md:text-3xl text-sm md:font-bold text-black mt-6 z-50 text-nowrap hover:text-gray-400 transition-colors duration-300 cursor-pointer"
                >
                  {project.title} <SlShareAlt />
                </h2>
              </div>
            </div>
          ))}
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
              <p className="text-sm text-gray-200 leading-relaxed">{modalData.description}</p>
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
