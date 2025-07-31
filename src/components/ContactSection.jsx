import { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { AnimatePresence, motion } from "framer-motion"
import { FiX } from "react-icons/fi"

const ContactSection = () => {
  const [contactFormOpen, setContactFormOpen] = useState(false)
  const openContactForm = () => setContactFormOpen(true)
  const closeContactForm = () => setContactFormOpen(false)

  const circleRef = useRef(null)
  const sectionRef = useRef(null)
  const initialTextRef = useRef(null)
  const finalTextRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const cleanup = () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === sectionRef.current) {
          st.kill(true)
        }
      })
    }

    cleanup()

    gsap.set(circleRef.current, { scale: 1, backgroundColor: "white" })
    gsap.set(initialTextRef.current, { opacity: 1 })
    gsap.set(finalTextRef.current, { opacity: 0 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=200%",
        pin: true,
        scrub: 0.5,
        anticipatePin: 1,
        fastScrollEnd: true,
        preventOverlaps: true,
        invalidateOnRefresh: true,
      },
    })

    tl.to(circleRef.current, {
      scale: 5,
      backgroundColor: "#ffffffff",
      ease: "power1.inOut",
      duration: 0.5,
    }, 0)

    tl.to(initialTextRef.current, {
      opacity: 0,
      ease: "power1.out",
      duration: 0.2,
    }, 0.1)

    tl.to(circleRef.current, {
      scale: 17,
      backgroundImage: "linear-gradient(to bottom, black, #1f1f2e, #9a74cf20)",
      boxShadow: "0 0 50px 20px rgba(233, 213, 255, 0.3)",
      ease: "power2.inOut",
      duration: 0.5,
    }, 0.5)

    tl.to(finalTextRef.current, {
      opacity: 1,
      ease: "power2.in",
      duration: 0.2,
    }, 0.7)

    return cleanup
  }, [])

  return (
    <>
      <section
        id="contact"
        ref={sectionRef}
        className="flex items-center justify-center bg-gradient-to-b from-black via-[#1f1f2e] to-[#9a74cf20] relative"
        style={{ overscrollBehavior: "none" }}
      >
        <div
          ref={circleRef}
          className="w-24 sm:w-28 md:w-32 h-24 sm:h-28 md:h-32 rounded-full flex items-center justify-center relative transition-shadow duration-1000 shadow-violet-300/50 shadow-lg bg-white"
        >
          <p
            ref={initialTextRef}
            className="text-black font-bold text-base sm:text-lg md:text-xl absolute inset-0 flex items-center text-center"
          >
            SCROLL DOWN
          </p>

          <div
            ref={finalTextRef}
            className="text-center relative flex flex-col items-center justify-center opacity"
          >
            <h1 className="text-white md:w-[10rem] w-[20rem] lg:scale-[0.4] sm:scale-[0.25] scale-[0.07] md:font-bold text-sm sm:text-base leading-none mb-5">
              Bringing Designs to Life with Code
            </h1>

            <p className="text-white lg:w-[40rem] w-[20rem] absolute sm:mt-3 mt-1 md:scale-[0.1] scale-[0.068]">
              I'm a front-end developer passionate about building modern and responsive websites. I'm eager to collaborate and keep learning through real-world projects.
            </p>

            <button
              onClick={openContactForm}
              className="px-10 py-2 rounded-xl bg-black hover:bg-white hover:text-black transition-all duration-500 scale-[0.1] absolute sm:mt-19 mt-7 text-nowrap"
            >
              Contact Me
            </button>
          </div>
        </div>
      </section>

      {/* Contact Form Modal */}
      <AnimatePresence>
        {contactFormOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-24 px-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 30 }}
              transition={{
                type: "spring",
                damping: 30,
                stiffness: 200,
                duration: 0.8,
              }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-gray-300">Get In Touch</h1>
                <button onClick={closeContactForm}>
                  <FiX className="w-5 h-5 text-gray-300 font-extrabold" />
                </button>
              </div>

              {/* FormSubmit form */}
              <form
                action="https://formsubmit.co/vincentdiala14@email.com"  // ✅ REPLACE THIS
                method="POST"
                className="space-y-4"
              >
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_next" value="https://yourwebsite.com/thank-you" />

                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="Your Name"
                    className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-gray-700"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="Your Email"
                    className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-gray-700"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                    Message
                  </label>
                  <textarea
                    rows="4"
                    id="message"
                    name="message"
                    required
                    placeholder="How can we help you?"
                    className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-gray-700"
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full px-4 py-2 bg-gradient-to-r from-violet-600 to-violet-400 hover:from-violet-700 hover:to-purple-700 transition-all duration-300 rounded-lg shadow-md hover:shadow-lg hover:shadow-violet-600/50"
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ContactSection
