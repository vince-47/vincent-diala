import { motion } from "framer-motion";
import { useRef } from "react";

const HeroSection = () => {
  const imageRef = useRef(null);

  const handleMouseMove = (e) => {
    const element = imageRef.current;
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = ((y / rect.height) - 0.5) * -15;
    const rotateY = ((x / rect.width) - 0.5) * 30;

    element.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  };

  const handleMouseLeave = () => {
    const element = imageRef.current;
    element.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
  };

  return (
    <section id="hero" className="h-screen flex xl:flex-row flex-col-reverse items-center justify-between lg:px-24 px-10 relative overflow-hidden">



      {/* Left Section */}
      <div className="z-40 xl:mb-0 mb-[20%]">
        <motion.h1
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 40,
            damping: 25,
            delay: 1.3,
            duration: 1.5,
          }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold z-10 mb-6">
          Hi, I'm <br /> Vincent Diala
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 40,
            damping: 25,
            delay: 1.8,
            duration: 1.5,
          }}
          className="text-xl md:text-1xl lg:text-2xl text-purple-200 max-w-2xl">
          A fresh graduate and passionate Frontend Developer dedicated to crafting clean, user-friendly web experiences. I recently earned my degree from San Beda College Alabang and I'm excited to bring creativity and precision to every project I take on.
        </motion.p>
      </div>

      {/* Right Section - Enhanced 3D Image Card */}
      <motion.div
        initial={{ opacity: 0, rotateY: 45, scale: 0.9 }}
        animate={{ opacity: 1, rotateY: 0, scale: 1 }}
        transition={{
          duration: 1.2,
          delay: 1.2,
          type: "spring",
          stiffness: 50,
        }}
        className="relative w-[400px] h-[500px] xl:right-[5%] right-0 top-[-10%] lg:top-0 perspective-[1200px] z-30"
      >
        <div
          ref={imageRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative w-full h-full p-[2px] rounded-[28px] bg-gradient-to-b from-black via-[#1f1f2e] to-[#9a74cf20] shadow-[0_20px_80px_rgba(144,115,255,0.35)] transition-transform duration-300 ease-out"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Inner Glass Card */}
          <div className="w-full h-full bg-gradient-to-b from-black via-[#1f1f2e] to-[#9a74cf20] backdrop-blur-lg rounded-[24px] relative overflow-hidden shadow-lg z-10">
            {/* Glow/Highlight */}
            <div className="absolute -top-20 -left-20 w-80 h-80 bg-purple-500 opacity-10 rounded-full blur-3xl z-0" />
            <img
              src="/images/person.png"
              alt="3D Framed Person"
              className="w-full h-full object-cover rounded-[20px] border border-purple-400/30 shadow-2xl relative z-10"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
