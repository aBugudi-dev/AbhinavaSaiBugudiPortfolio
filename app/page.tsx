"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from "framer-motion";
import { Sun, Moon, Github, Linkedin, Mail, Menu, X, Download, ArrowUpRight } from "lucide-react";

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  // Use scroll for header animation - we'll only animate Y position for nav, not hide it
  const { scrollY } = useScroll();
  const navY = useSpring(useTransform(scrollY, [0, 100], [0, -100]), { stiffness: 500, damping: 50 }); // Only animate Y to move header up slightly

  // Track cursor movement for subtle background effect
  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", updateCursor);
    return () => window.removeEventListener("mousemove", updateCursor);
  }, []);

  // Sync dark mode state with localStorage and HTML class
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme");
      if (storedTheme === "dark") {
        setDarkMode(true);
        document.documentElement.classList.add("dark");
      } else {
        setDarkMode(false);
        document.documentElement.classList.remove("dark");
      }
    }
  }, []);

  // Apply dark mode class and save to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (darkMode) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
    }
  }, [darkMode]);

  // Smooth scrolling to sections
  const scrollToSection = (id: string) => {
    const sectionIds: { [key: string]: string } = {
      "home": "home",
      "about me": "about-me",
      "key projects": "key-projects",
      "skills": "skills",
      "certifications": "certifications",
      "experience": "experience",
      "contact": "contact",
    };

    const section = document.getElementById(sectionIds[id.toLowerCase()]);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsOpen(false);
    }
  };

  const sectionNames = ["Home", "About Me", "Key Projects", "Skills", "Certifications", "Experience", "Contact"];

  // Framer Motion Variants for Staggering
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const projectCardVariants = {
    offscreen: {
      y: 100,
      opacity: 0,
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 1.2
      }
    }
  };


  return (
    <div className={`${darkMode ? "bg-gradient-to-br from-gray-950 to-gray-800 text-white" : "bg-gradient-to-br from-gray-50 to-gray-100 text-black"} min-h-screen font-sans antialiased relative overflow-hidden animated-background-pattern`}>

      {/* Subtle Background Gradients/Shapes (Aura-like effect, follows cursor) */}
      <motion.div
        className="fixed inset-0 w-full h-full pointer-events-none z-0"
        initial={{ backgroundPosition: '0% 0%' }}
        animate={{ backgroundPosition: `${cursorPos.x / 20}% ${cursorPos.y / 20}%` }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
        style={{
          backgroundImage: `radial-gradient(circle at ${cursorPos.x}px ${cursorPos.y}px, ${darkMode ? 'rgba(59,130,246,0.15)' : 'rgba(147,197,253,0.2)'} 0%, transparent 40%)`,
        }}
      />

      {/* Navigation Bar Fixed Container (Always visible for Hamburger) */}
      <motion.div style={{ y: navY }} className="fixed top-0 left-0 w-full z-50">
        {/* Hamburger Menu Button (Always visible) */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className={`p-3 rounded-full transition-all shadow-lg fixed top-5 left-5 z-[51] ${ // Fixed position, high z-index
            darkMode ? "bg-gray-800 text-white hover:bg-gray-700" : "bg-gray-200 text-black hover:bg-gray-300"
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>

        {/* Dark Mode Toggle (Always visible) */}
        <motion.button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-3 rounded-full shadow-lg transition-all fixed top-5 right-5 z-50 ${ // Fixed position
            darkMode ? "bg-gray-800 text-white hover:bg-gray-700" : "bg-gray-200 text-black hover:bg-gray-300"
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle dark mode"
        >
          {darkMode ? <Sun size={24} /> : <Moon size={24} />}
        </motion.button>

        {/* Expanding Navbar Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className={`fixed top-0 left-0 w-full h-full shadow-xl backdrop-blur-xl transition-all duration-300 ${ // Full height overlay
                darkMode ? "bg-gray-900/95 text-white" : "bg-white/90 text-black"
              } flex items-center justify-center p-4 md:p-0`}
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <ul className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 space-x-0 md:space-x-8 text-xl md:text-lg">
                {sectionNames.map((item) => (
                  <motion.li key={item}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + sectionNames.indexOf(item) * 0.05 }}
                  >
                    <button
                      onClick={() => scrollToSection(item)}
                      className="relative group font-medium text-lg md:text-xl px-3 py-2 rounded-lg transition-all duration-300 hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                    >
                      {item}
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
                    </button>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>


      {/* Home Section (Hero) */}
      <section id="home" className="container mx-auto px-6 py-24 min-h-screen flex flex-col justify-center items-center text-center relative z-10">
        <motion.h1
          className="text-6xl md:text-7xl lg:text-8xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 mb-4 tracking-tighter"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          Hi, I&apos;m Abhinava Bugudi
        </motion.h1>
        <motion.h2
          className="text-3xl md:text-4xl font-semibold text-gray-700 dark:text-gray-300 mb-6 max-w-4xl"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        >
          A <span className="font-bold text-blue-500 dark:text-blue-400">Data-Driven Problem Solver</span> and <span className="font-bold text-purple-600 dark:text-purple-500">Tech Innovator</span>.
        </motion.h2>
        <motion.p
          className="mt-4 text-lg md:text-xl max-w-3xl leading-relaxed text-gray-600 dark:text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
        >
          From AI-powered forex predictions to robotics maze navigation, I build real-world solutions that bridge code and impact. With a background in Software Engineering and a deep interest in fintech, automation, and intelligent systems, I thrive on turning complex challenges into intuitive technologies.
        </motion.p>
      </section>

      ---

      {/* About Me Section */}
      <section id="about-me" className="container mx-auto px-6 py-20 relative z-10">
        <motion.div
          className={`p-8 md:p-12 rounded-xl shadow-2xl transition-colors duration-300 ${darkMode ? "bg-gray-800/80 text-white" : "bg-white/90 text-black"} border border-gray-200 dark:border-gray-700 gradient-border`}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-4xl font-bold mb-6 text-center text-blue-500 dark:text-blue-400">About Me</h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="prose lg:prose-lg xl:prose-xl max-w-none dark:prose-invert"
          >
            <p className="text-lg leading-relaxed mb-4">
              I&apos;m a final-year <strong className="text-blue-500 dark:text-blue-300">Software Engineering student</strong> at the University of Westminster, passionate about machine learning, NLP, and applied data science. My work spans fintech, robotics, healthcare, and education &mdash; combining research-backed development with hands-on engineering.
            </p>
            <p className="text-lg leading-relaxed">
              I&apos;ve built end-to-end platforms, contributed to recommendation systems, and deployed scalable AI systems across web and mobile environments. Whether I&apos;m building a currency forecasting engine or solving a dynamic maze with reinforcement learning, I bring data, logic, and user empathy into everything I do.
            </p>
          </motion.div>
        </motion.div>
      </section>

      ---

      {/* Key Projects Section */}
      <section id="key-projects" className="container mx-auto px-6 py-20 relative z-10">
        <h2 className="text-4xl font-bold mb-10 text-center text-purple-500 dark:text-purple-400">Key Projects</h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {[
            {
              name: "VolvoxForex.online – AI-Powered Currency Forecasting Platform",
              role: "Founder & Full Stack Developer",
              desc: "Developed a deep learning model using LSTM to predict forex movements based on real-time economic indicators and past trends. Incorporated news sentiment using VADER, and used feature engineering to align lagged macro variables with target currencies. Built the full-stack platform using Flask (backend) and React (frontend), and deployed forecasts and volatility charts live. Used previous trading simulations and forex strategy insights to guide feature selection and model tuning.",
              link: "https://github.com/aBugudi-devz/VolvoxForex.online",
            },
            {
              name: "Maze Taxi Pathfinder – Q-Learning Robotics Project",
              role: "Academic Project",
              desc: "Trained a Q-learning agent to find optimal routes in a dynamic maze, simulating a smart taxi&apos;s navigation system. Designed reward matrices, implemented epsilon-greedy exploration, and visualized policies with heatmaps. Project reinforced my understanding of reinforcement learning in physical pathfinding scenarios.",
              link: "https://github.com/aBugudi-dev/Taxi-robot-Machine-learning-path-finding",
            },
            {
              name: "BuzNear – AI Intern for India-Based E-commerce Platform",
              role: "AI Developer Intern",
              desc: "Built a hybrid recommendation system (collaborative filtering + popularity model) to improve customer engagement. Fine-tuned DistilBERT for automatic product categorisation. Used Pegasus and GPT-based summarisation for auto-generating product review highlights. Improved semantic product search with Word2Vec and cosine similarity.",
              link: null
            },
            {
              name: "Voxscribe – Handwriting Recognition Note-Taking App",
              role: "Final Year Project",
              desc: "Built a CRNN-CTC model to transcribe handwritten notes using the EMNIST dataset. Integrated into an Android app using a live TFLite-powered API. Supported live letter-by-letter recognition and formatting tools. Focused on speed, reliability, and accessibility for students and professionals alike.",
              link: "https://github.com/aBugudi-dev/Voxscribe",
            },
          ].map((project, index) => (
            <motion.div
              key={index}
              className={`p-8 rounded-xl shadow-xl transition-colors duration-300 ${darkMode ? "bg-gray-800/80 hover:bg-gray-700/80" : "bg-white/90 hover:bg-gray-100/90"} border border-gray-200 dark:border-gray-700 project-card-hover-effect`}
              variants={projectCardVariants}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.2 }}
              custom={index}
              whileHover={{
                scale: 1.03,
                boxShadow: darkMode ? "0 15px 30px rgba(0, 0, 0, 0.4)" : "0 15px 30px rgba(0, 0, 0, 0.1)",
                y: -5
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div>
                <h3 className="text-2xl font-bold mb-2 text-blue-400 dark:text-blue-300 leading-tight">{project.name}</h3>
                <p className="text-sm font-semibold mb-4 text-gray-500 dark:text-gray-400">{project.role}</p>
                <p className="text-md leading-relaxed mb-4">{project.desc}</p>
              </div>
              {project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex items-center gap-2 text-blue-500 hover:underline font-medium group text-lg">
                  Explore Project
                  <ArrowUpRight size={20} className="transform transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              )}
            </motion.div>
          ))}
        </motion.div>
      </section>

      ---

      {/* Skills Section */}
      <section id="skills" className="container mx-auto px-6 py-20 relative z-10">
        <h2 className="text-4xl font-bold mb-10 text-center text-green-500 dark:text-green-400">Skills</h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {[
            { category: "Languages", items: ["Python", "Java", "JavaScript", "SQL", "R"] },
            { category: "ML/AI", items: ["TensorFlow", "PyTorch", "Scikit-learn", "NLP", "Transformers", "Reinforcement Learning", "Recommender Systems"] },
            { category: "Tools & Frameworks", items: ["Flask", "React", "HuggingFace", "OpenCV", "FastAPI", "LangChain", "Git", "Docker"] },
            { category: "Cloud", items: ["Azure AI", "Render", "BigQuery"] },
            { category: "Dev & Data", items: ["ETL pipelines", "Pandas", "NumPy", "CI/CD", "SQL Server"] },
          ].map((skill, index) => (
            <motion.div
              key={index}
              className={`p-6 rounded-xl shadow-xl transition-colors duration-300 ${darkMode ? "bg-gray-800/80 hover:bg-gray-700/80" : "bg-white/90 hover:bg-gray-100/90"} border border-gray-200 dark:border-gray-700 skill-card-hover-effect`}
              variants={itemVariants}
              whileHover={{
                scale: 1.02,
                boxShadow: darkMode ? "0 10px 20px rgba(0, 0, 0, 0.3)" : "0 10px 20px rgba(0, 0, 0, 0.08)",
                rotateZ: [0, 1, -1, 0]
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <h3 className="text-xl font-bold mb-4 text-center border-b pb-2 border-gray-300 dark:border-gray-600 text-green-400">{skill.category}</h3>
              <ul className="list-inside list-disc space-y-2 text-md">
                {skill.items.map((item, idx) => (
                  <motion.li key={idx} className="flex items-center"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ delay: idx * 0.05 + 0.3 }}
                  >
                    <span className="text-blue-500 dark:text-blue-400 mr-2">&bull;</span> {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </section>

      ---

      {/* Certifications Section */}
      <section id="certifications" className="container mx-auto px-6 py-20 relative z-10">
        <h2 className="text-4xl font-bold mb-10 text-center text-teal-500 dark:text-teal-400">Certifications</h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {[
            "Microsoft Certified: Azure AI Fundamentals (AI-900)",
            "Google Cloud Professional Machine Learning Engineer",
            "DeepLearning.AI – NLP with Transformers",
            "Coursera – Applied Data Science with Python (University of Michigan)",
            "Data Analytics & Business Intelligence – University of Westminster Summer School",
          ].map((cert, index) => (
            <motion.div
              key={index}
              className={`p-6 rounded-xl shadow-xl transition-colors duration-300 ${darkMode ? "bg-gray-800/80 hover:bg-gray-700/80" : "bg-white/90 hover:bg-gray-100/90"} border border-gray-200 dark:border-gray-700 cert-card-hover-effect`}
              variants={itemVariants}
              whileHover={{
                scale: 1.02,
                boxShadow: darkMode ? "0 10px 20px rgba(0, 0, 0, 0.3)" : "0 10px 20px rgba(0, 0, 0, 0.08)",
                background: darkMode ? "linear-gradient(to right, #4B5563, #374151)" : "linear-gradient(to right, #F3F4F6, #E5E7EB)"
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <span className="text-3xl text-yellow-500 mr-4">★</span>
              <p className="text-lg font-medium">{cert}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="container mx-auto px-6 py-20 relative z-10">
        <h2 className="text-4xl font-bold mb-10 text-center text-orange-500 dark:text-orange-400">Experience</h2>
        <motion.div
          className="grid grid-cols-1 gap-8 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div
            className={`p-8 rounded-xl shadow-xl transition-colors duration-300 ${darkMode ? "bg-gray-800/80 hover:bg-gray-700/80" : "bg-white/90 hover:bg-gray-100/90"} border border-gray-200 dark:border-gray-700 experience-card-hover-effect`}
            variants={itemVariants}
            whileHover={{
              scale: 1.02,
              boxShadow: darkMode ? "0 10px 20px rgba(0, 0, 0, 0.3)" : "0 10px 20px rgba(0, 0, 0, 0.08)",
              background: darkMode ? "linear-gradient(to bottom right, #4B5563, #374151)" : "linear-gradient(to bottom right, #F3F4F6, #E5E7EB)"
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <h3 className="text-2xl font-bold text-orange-400">AI Developer Intern – BuzNear</h3>
            <p className="text-md text-gray-500 dark:text-gray-400 italic mt-1 mb-3">2023 – 2024</p>
            <ul className="list-disc pl-6 space-y-2 text-lg">
              {["Enhanced product discovery and summarisation pipelines in e-commerce.", "Gained hands-on experience with NLP, embeddings, vector search, and AI automation."].map((item, idx) => (
                <motion.li key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ delay: idx * 0.05 + 0.3 }}
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className={`p-8 rounded-xl shadow-xl transition-colors duration-300 ${darkMode ? "bg-gray-800/80 hover:bg-gray-700/80" : "bg-white/90 hover:bg-gray-100/90"} border border-gray-200 dark:border-gray-700 experience-card-hover-effect`}
            variants={itemVariants}
            whileHover={{
              scale: 1.02,
              boxShadow: darkMode ? "0 10px 20px rgba(0, 0, 0, 0.3)" : "0 10px 20px rgba(0, 0, 0, 0.08)",
              background: darkMode ? "linear-gradient(to bottom right, #4B5563, #374151)" : "linear-gradient(to bottom right, #F3F4F6, #E5E7EB)"
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <h3 className="text-2xl font-bold text-orange-400">Teaching Volunteer – Newham Public Library</h3>
            <ul className="list-disc pl-6 space-y-2 text-lg mt-3">
              <motion.li
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: 0.3 }}
              >
                Taught digital literacy and computing skills to elderly community members, fostering tech inclusion.
              </motion.li>
            </ul>
          </motion.div>

          <motion.div
            className={`p-8 rounded-xl shadow-xl transition-colors duration-300 ${darkMode ? "bg-gray-800/80 hover:bg-gray-700/80" : "bg-white/90 hover:bg-gray-100/90"} border border-gray-200 dark:border-gray-700 experience-card-hover-effect`}
            variants={itemVariants}
            whileHover={{
              scale: 1.02,
              boxShadow: darkMode ? "0 10px 20px rgba(0, 0, 0, 0.3)" : "0 10px 20px rgba(0, 0, 0, 0.08)",
              background: darkMode ? "linear-gradient(to bottom right, #4B5563, #374151)" : "linear-gradient(to bottom right, #F3F4F6, #E5E7EB)"
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <h3 className="text-2xl font-bold text-orange-400">Tech Lead – University Robotics Society</h3>
            <ul className="list-disc pl-6 space-y-2 text-lg mt-3">
              <motion.li
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: 0.3 }}
              >
                Led object detection and real-time navigation systems using OpenCV and Arduino for autonomous pathfinding bots.
              </motion.li>
            </ul>
          </motion.div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="container mx-auto px-6 py-20 text-center relative z-10">
        <h2 className="text-4xl font-bold mb-6 text-center text-red-500 dark:text-red-400">Contact</h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
          Want to collaborate, hire, or just chat about tech? I&apos;m always open to new ideas and connections.
        </p>

        <div className="flex flex-col items-center gap-6">
          <motion.a
            href="mailto:abhinavasaibugudi04@gmail.com"
            className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-800 text-white font-semibold rounded-full shadow-lg flex items-center justify-center gap-3 hover:from-red-700 hover:to-red-900 transition-all text-xl group contact-button-hover-effect"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(220, 38, 38, 0.3)", y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            <Mail size={28} className="transition-transform group-hover:-translate-y-1" /> abhinavasaibugudi04@gmail.com
          </motion.a>

          <div className="flex justify-center gap-6 mt-4">
            <motion.a href="https://www.linkedin.com/in/bugudi-abhinava-sai/" target="_blank" rel="noopener noreferrer"
              className="p-4 rounded-full transition-all bg-blue-600 text-white hover:bg-blue-500 shadow-md transform hover:scale-115 social-icon-hover-effect"
              whileHover={{ scale: 1.15, boxShadow: "0 8px 16px rgba(59, 130, 246, 0.4)", rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              aria-label="LinkedIn profile"
            >
              <Linkedin size={32} />
            </motion.a>
            <motion.a href="https://github.com/aBugudi-dev" target="_blank" rel="noopener noreferrer"
              className="p-4 rounded-full transition-all bg-gray-800 text-white hover:bg-gray-700 shadow-md transform hover:scale-115 social-icon-hover-effect"
              whileHover={{ scale: 1.15, boxShadow: "0 8px 16px rgba(0, 0, 0, 0.4)", rotate: -5 }}
              whileTap={{ scale: 0.9 }}
              aria-label="GitHub repositories"
            >
              <Github size={32} />
            </motion.a>
          </div>
        </div>

        {/* Resume Download Button */}
        <motion.a
          href="/resume.pdf"
          download="Abhinava_Bugudi_Resume.pdf"
          className="mt-12 inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-semibold rounded-full shadow-lg gap-3 hover:from-purple-700 hover:to-indigo-800 transition-all text-xl group contact-button-hover-effect"
          whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(124, 58, 237, 0.3)", y: -3 }}
          whileTap={{ scale: 0.95 }}
        >
          <Download size={24} className="transition-transform group-hover:translate-y-1" />
          Download Resume
        </motion.a>
      </section>

      {/* Footer */}
      <footer className={`py-8 text-center text-sm ${darkMode ? "bg-gray-950 text-gray-500" : "bg-gray-100 text-gray-700"} mt-20 border-t border-gray-200 dark:border-gray-700`}>
        <p>&copy; {new Date().getFullYear()} Abhinava Bugudi. All rights reserved.</p>
        <p>Built with Next.js, Tailwind CSS, and Framer Motion.</p>
      </footer>
    </div>
  );
}
