import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const HeroSection = () => {
  const imageRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Treat ≤768px as mobile
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseMove = (e) => {
    if (isMobile) return;

    const element = imageRef.current;
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = ((y / rect.height) - 0.5) * -15;
    const rotateY = ((x / rect.width) - 0.5) * 30;

    element.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    imageRef.current.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col-reverse xl:flex-row items-center justify-center xl:justify-between lg:px-24 px-6 pt-10 relative overflow-hidden"
    >
      {/* Left Section */}
      <div className="z-40 xl:mb-0 mb-10 text-center xl:text-left">
        <motion.h1
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 40,
            damping: 25,
            delay: 0.8,
            duration: 1.5,
          }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold z-10 mb-6 text-white"
        >
          Hi, I'm <br /> Vincent Diala
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 40,
            damping: 25,
            delay: 1.2,
            duration: 1.5,
          }}
          className="text-lg md:text-xl lg:text-2xl text-purple-200 max-w-2xl"
        >
          A fresh graduate and passionate Frontend Developer dedicated to
          crafting clean, user-friendly web experiences. I recently earned my
          degree from San Beda College Alabang and I'm excited to bring
          creativity and precision to every project I take on.
        </motion.p>
      </div>

      {/* Right Section - Responsive 3D Image */}
      <motion.div
        initial={{ opacity: 0, rotateY: 45, scale: 0.9 }}
        animate={{ opacity: 1, rotateY: 0, scale: 1 }}
        transition={{
          duration: 1.2,
          delay: 1,
          type: "spring",
          stiffness: 50,
        }}
        className="relative w-full max-w-[320px] md:max-w-[400px] xl:max-w-[450px] mx-auto xl:mx-0 xl:right-[5%] mt-10 xl:mt-0 z-30"
      >
        <div
          ref={imageRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative w-full aspect-[3/4] p-[2px] rounded-[28px] bg-gradient-to-b from-black via-[#1f1f2e] to-[#9a74cf20] shadow-[0_20px_80px_rgba(144,115,255,0.35)] transition-transform duration-300 ease-out"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Inner Glass Card */}
          <div className="w-full h-full bg-gradient-to-b from-black via-[#1f1f2e] to-[#9a74cf20] backdrop-blur-lg rounded-[24px] relative overflow-hidden shadow-lg z-10">
            {/* Glow Effect */}
            <div className="absolute -top-20 -left-20 w-80 h-80 bg-purple-500 opacity-10 rounded-full blur-3xl z-0" />
            <img
              src="/images/person.png"
              alt="Vincent Diala"
              className="w-full h-full object-cover rounded-[20px] border border-purple-400/30 shadow-2xl relative z-10"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
