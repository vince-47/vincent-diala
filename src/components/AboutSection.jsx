import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import {
  FaHtml5,
  FaCss3Alt,
  FaPhp,
  FaReact,
  FaFigma,
  FaJava,
  FaPython,
  FaJsSquare,
} from "react-icons/fa";
import { SiTailwindcss, SiMysql, SiMongodb } from "react-icons/si";

const techIcons = [
  { icon: <FaHtml5 />, color: "text-orange-500", name: "HTML5" },
  { icon: <FaCss3Alt />, color: "text-blue-500", name: "CSS3" },
  { icon: <FaPhp />, color: "text-indigo-400", name: "PHP" },
  { icon: <FaJsSquare />, color: "text-yellow-400", name: "JavaScript" },
  { icon: <FaJava />, color: "text-red-600", name: "Java" },
  { icon: <FaPython />, color: "text-blue-300", name: "Python" },
  { icon: <FaReact />, color: "text-cyan-400", name: "React" },
  { icon: <SiTailwindcss />, color: "text-cyan-300", name: "Tailwind CSS" },
  { icon: <SiMysql />, color: "text-yellow-300", name: "MySQL" },
  {
  icon: (
    <img
      src="/images/supabase.png"
      alt="Supabase"
      className="w-10 h-10 object-contain"
    />
  ),
  color: "",
  name: "Supabase",
},

  { icon: <FaFigma />, color: "text-pink-500", name: "Figma" },
];

const AboutSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const introRef = useRef(null);
  const iconRefs = useRef([]);
  const starsRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      titleRef.current,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
        },
      }
    );

    gsap.fromTo(
      introRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        },
      }
    );

    gsap.fromTo(
      iconRefs.current,
      { y: 40, opacity: 0, scale: 0.8 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        stagger: 0.15,
        ease: "back.out(1.7)",
        duration: 0.7,
        scrollTrigger: {
          trigger: introRef.current,
          start: "top 70%",
        },
      }
    );

    starsRef.current.forEach((star, index) => {
      const direction = index % 2 === 0 ? 1 : -1;
      const speed = 0.5 + Math.random() * 0.5;

      gsap.to(star, {
        x: direction * (100 + index * 10),
        y: direction * -60 - index * 10,
        rotation: direction * 360,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: speed,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === sectionRef.current) {
          trigger.kill();
        }
      });
    };
  }, []);

  const addToStars = (el) => {
    if (el && !starsRef.current.includes(el)) {
      starsRef.current.push(el);
    }
  };

  const setIconRef = (el, index) => {
    if (el) iconRefs.current[index] = el;
  };

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="min-h-[150vh] py-24 relative overflow-hidden"
    >
      {/* Stars Background */}
      <div className="absolute inset-0 -z-10">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            ref={addToStars}
            className="absolute rounded-full animate-twinkle"
            style={{
              width: `${8 + i * 2}px`,
              height: `${8 + i * 2}px`,
              backgroundColor: "white",
              opacity: 0.15 + Math.random() * 0.5,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 flex flex-col items-center text-center">
        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl font-extrabold text-white mb-12 tracking-tight"
        >
          About Me
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 max-w-3xl mx-auto text-purple-100 text-lg md:text-xl leading-relaxed mb-20"
        >
          I'm{" "}
          <strong className="text-purple-300">a dedicated Frontend Developer</strong>, who builds fast and polished web apps using React, Tailwind CSS, and JavaScript. I also integrate back-end support with PHP, MySQL, and MongoDB to deliver smooth, responsive applications.
        </motion.div>

        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">SKILLS</h2>

        <div
          ref={introRef}
          className="flex flex-wrap justify-center gap-8 max-w-5xl mx-auto"
        >
          {techIcons.map((item, index) => (
            <div
              key={index}
              ref={(el) => setIconRef(el, index)}
              className="relative group cursor-pointer"
            >
              <motion.div
                whileHover={{
                  scale: 1.15,
                  rotateY: 10,
                  boxShadow: "0px 0px 25px rgba(255,255,255,0.4)",
                }}
                className={`w-24 h-24 md:w-28 md:h-28 bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl flex items-center justify-center ${item.color}`}
              >
                <span className="text-5xl">{item.icon}</span>
              </motion.div>

              <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs md:text-sm px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 group-hover:-translate-y-2 transition-all duration-300 z-10 pointer-events-none shadow-lg">
                {item.name}
              </div>
            </div>
          ))}

          {/* Additional custom icons using images */}
{[
  {
    src: "/images/vs code.png",
    alt: "VS Code",
    label: "VS Code",
  },
  {
    src: "/images/franer.png",
    alt: "Framer Motion",
    label: "Framer Motion",
  },
  {
    src: "/images/spline.png",
    alt: "Spline",
    label: "Spline",
  },
].map((item, idx) => (
  <div
    key={`custom-${idx}`}
    className="relative group cursor-pointer"
  >
    <motion.div
      whileHover={{
        scale: 1.15,
        rotateY: 10,
        boxShadow: "0px 0px 25px rgba(255,255,255,0.4)",
      }}
      className="w-24 h-24 md:w-28 md:h-28 bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl flex items-center justify-center"
    >
      <img
        src={item.src} // Image source
        alt={item.alt}
        className="w-12 h-12 object-contain"
      />
    </motion.div>

    <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs md:text-sm px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 group-hover:-translate-y-2 transition-all duration-300 z-10 pointer-events-none shadow-lg">
      {item.label}
    </div>
  </div>
))}

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
