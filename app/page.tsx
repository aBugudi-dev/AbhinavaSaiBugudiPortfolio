"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from "framer-motion";
import { Sun, Moon, Github, Linkedin, Mail, Menu, X, Download, ArrowUpRight } from "lucide-react";

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const { scrollY } = useScroll();
  const navY = useSpring(useTransform(scrollY, [0, 100], [0, -50]), { stiffness: 500, damping: 50 });

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", updateCursor);
    return () => window.removeEventListener("mousemove", updateCursor);
  }, []);

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

  const cardVariants = {
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
  
  const projects = [
    {
      name: "VolvoxForex – Time-Series Forecasting",
      role: "Data Science Project Lead",
      description: [
        "Conducted extensive **Feature Engineering**, creating over **50 predictive variables** from raw time-series data and news sentiment.",
        "Developed and backtested a **Time-Series Forecasting** model using **LSTMs**, achieving **85% directional accuracy**.",
        "Translated model outputs into **actionable trading strategy recommendations** and built a **React dashboard** for visualization and analysis.",
        "Engineered the underlying **AWS data pipeline** (Lambda, S3) to ingest and process over **2GB** of data daily."
      ],
      link: "https://volvoxforex.online/",
    },
    {
      name: "BuzNear – Customer Analytics & Experimentation",
      role: "AI Developer Intern",
      description: [
        "Performed **Exploratory Data Analysis (EDA)** on a **750,000+ row** customer dataset to understand user behavior and inform modeling strategies.",
        "Built and evaluated several **Classification Models** (including a Transformer-based solution) to improve product recommendations.",
        "Designed and analyzed an **A/B test** that validated a **15% CTR uplift**, demonstrating direct business impact.",
        "Wrote complex **SQL queries** for data extraction and created **Power BI dashboards** to communicate findings to stakeholders."
      ],
      link: "https://sanspro.com/",
    },
    {
      name: "Voxscribe – Computer Vision (Deep Learning)",
      role: "Final Year Project",
      description: [
        "Managed the end-to-end modeling process for a **Computer Vision** problem, from data preprocessing of the **130,000+ image EMNIST dataset** to final model evaluation.",
        "Trained a **Convolutional Neural Network (CNN)** in TensorFlow, achieving **90% accuracy** on the validation set.",
        "Analyzed model performance using **confusion matrices** and implemented a top-3 prediction system to improve user-facing accuracy.",
        "Optimized the final model for production using **TensorFlow Lite (TFLite)**, reducing its size by over **75%**."
      ],
      link: "https://github.com/aBugudi-dev/Voxscribe",
    },
    {
      name: "Maze Taxi Pathfinder – Reinforcement Learning",
      role: "Optimization Project",
      description: [
        "Applied **Reinforcement Learning (Q-learning)** to solve an optimization problem, training an agent to find the most efficient path.",
        "Designed and tuned the **reward matrices** and exploration strategy (epsilon-greedy) to improve the agent's learning rate and final policy.",
        "Visualized agent performance and policies using heatmaps in Python to analyze and communicate the results of experiments."
      ],
      link: "https://github.com/aBugudi-dev/Taxi-robot-Machine-learning-path-finding",
    },
];

const experiences = [
    {
      title: "AI Developer Intern",
      company: "BuzNear",
      dates: "Jun 2024 – Sep 2024",
      description: [
        "Fine-tuned a **12-layer BERT model** for product recommendation, resulting in a **15% CTR uplift** in live A/B testing.",
        "Owned an **NLP summarization microservice** that cleared a **70,000-item** product description backlog, reducing manual workload by 40%.",
        "Wrote complex **SQL queries** to extract and aggregate data from a **750,000+ row** user interaction database.",
        "Collaborated within a cross-functional **Agile** team, participating in code reviews and sprint planning."
      ]
    },
    {
      title: "Tech Lead",
      company: "University Robotics Society",
      dates: "Sep 2023 – May 2024",
      description: [
        "Led a team of student engineers on projects in object detection and autonomous navigation.",
        "Developed control software in **Python** and **OpenCV** for real-time object detection and pathfinding.",
        "Interfaced software with **Arduino-based** hardware, managing the full systems integration for robotic agents.",
        "Mentored junior members on programming best practices, Git version control, and problem-solving."
      ]
    },
    {
      title: "Teaching Volunteer",
      company: "Newham Public Library",
      dates: "2023",
      description: [
        "Designed and delivered simple, easy-to-understand workshops on basic computing and digital literacy for elderly community members.",
        "Demonstrated strong communication and empathy by simplifying complex technical topics for a non-technical audience.",
        "Fostered a supportive learning environment, helping to improve tech inclusion and confidence among participants."
      ]
    }
];


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

      {/* Navigation Bar Fixed Container */}
      <motion.div style={{ y: navY }} className="fixed top-0 left-0 w-full z-50">
        {/* Hamburger Menu Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className={`p-3 rounded-full transition-all shadow-lg fixed top-5 left-5 z-[51] ${
            darkMode ? "bg-gray-800 text-white hover:bg-gray-700" : "bg-gray-200 text-black hover:bg-gray-300"
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>

        {/* Dark Mode Toggle */}
        <motion.button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-3 rounded-full shadow-lg transition-all fixed top-5 right-5 z-50 ${
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
              className={`fixed top-0 left-0 w-full h-full shadow-xl backdrop-blur-xl transition-all duration-300 ${
                darkMode ? "bg-gray-900/95 text-white" : "bg-white/90 text-black"
              } flex items-center justify-center p-4 md:p-0`}
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <ul className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 space-x-0 md:space-x-8 text-xl md:text-lg">
                {sectionNames.map((item) => (
                  <motion.li key={item}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: sectionNames.indexOf(item) * 0.05 }}
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
          Abhinava Sai Bugudi
        </motion.h1>
        <motion.h2
          className="text-3xl md:text-4xl font-semibold text-gray-700 dark:text-gray-300 mb-6 max-w-4xl"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        >
          Data Scientist & Machine Learning Engineer
        </motion.h2>
        <motion.p
          className="mt-4 text-lg md:text-xl max-w-3xl leading-relaxed text-gray-600 dark:text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
        >
          Specializing in predictive modeling, time-series forecasting, NLP, and
          cloud-based data pipelines. I turn raw datasets into actionable
          insights and production-ready solutions.
        </motion.p>
      </section>

      {/* --- Separator --- */}
      <div className="w-1/2 mx-auto border-t border-gray-300 dark:border-gray-700 my-10"></div>


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
            <p className="text-lg leading-relaxed text-left">
               I’m a Data Scientist with a strong foundation in software engineering and hands-on expertise in predictive modeling, time-series forecasting, and NLP. My projects range from achieving 85% accuracy in live FX forecasting to driving a 15% uplift in e-commerce CTR through machine learning experimentation. With experience in cloud-native pipelines, BI dashboards, and full-stack development, I bridge the gap between advanced analytics and real-world business impact.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* --- Separator --- */}
      <div className="w-1/2 mx-auto border-t border-gray-300 dark:border-gray-700 my-10"></div>


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
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className={`p-8 rounded-xl shadow-xl transition-colors duration-300 ${darkMode ? "bg-gray-800/80 hover:bg-gray-700/80" : "bg-white/90 hover:bg-gray-100/90"} border border-gray-200 dark:border-gray-700 project-card-hover-effect flex flex-col`}
              variants={cardVariants}
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
              <div className="flex-grow">
                <h3 className="text-2xl font-bold mb-2 text-purple-600 dark:text-purple-400 leading-tight">{project.name}</h3>
                <p className="text-sm font-semibold mb-4 text-gray-500 dark:text-gray-400">{project.role}</p>
                <ul className="list-disc pl-5 space-y-2 text-md leading-relaxed mb-4 text-left">
                    {project.description.map((point, i) => (
                        <li key={i} dangerouslySetInnerHTML={{ __html: point.replace(/\*\*(.*?)\*\*/g, '<strong class="text-blue-400 dark:text-blue-300 font-semibold">$1</strong>') }} />
                    ))}
                </ul>
              </div>
              {project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex items-center gap-2 text-blue-500 hover:underline font-medium group text-lg self-start">
                  Explore Project
                  <ArrowUpRight size={20} className="transform transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              )}
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* --- Separator --- */}
      <div className="w-1/2 mx-auto border-t border-gray-300 dark:border-gray-700 my-10"></div>


      {/* Skills Section */}
      <section id="skills" className="container mx-auto px-6 py-20 relative z-10">
        <h2 className="text-4xl font-bold mb-10 text-center text-green-500 dark:text-green-400">Skills</h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {[
            {
              category: "Python",
              items: [
                "Core: Data structures, OOP, scripting",
                "Frameworks: Flask, FastAPI, Scikit-learn, TensorFlow, PyTorch",
                "Use cases: APIs, ML models (NLP, CV), ETL pipelines",
                "Environment: Conda, Jupyter, Docker, Git"
              ]
            },
            {
              category: "SQL / T-SQL",
              items: [
                "Core: Stored Procedures, Views, Triggers, Query Optimisation",
                "SQL Server Ecosystem: MSSQL, SSMS, SSIS (ETL), SSRS (Reporting)",
                "HA/DR: Log Shipping, Replication, Mirroring, Backup/Restore strategies",
                "Use cases: DBA tasks, migrations, performance tuning, data integrity checks"
              ]
            },
            {
              category: "Java",
              items: [
                "Core: OOP, multithreading, concurrency",
                "Frameworks: Spring Boot basics, JDBC",
                "Use cases: Concurrent systems (queues, scheduling), coursework projects",
                "Environment: IntelliJ, Maven, Git"
              ]
            },
            {
              category: "JavaScript",
              items: [
                "Core: ES6+, DOM, async programming",
                "Frameworks: React, Chart.js, Tailwind CSS",
                "Use cases: Portfolio UI, dashboards, interactive data viz",
                "Environment: Node.js, npm, GitHub"
              ]
            },
            {
              category: "R",
              items: [
                "Core: Statistical modelling, data manipulation",
                "Libraries: ggplot2, dplyr, caret",
                "Use cases: Hypothesis testing, data analysis coursework",
                "Environment: RStudio, Jupyter"
              ]
            },
            {
              category: "Cloud & DevOps",
              items: [
                "Azure: AI services, Data Factory, basic DevOps pipelines",
                "AWS: Lambda, S3, EC2",
                "GCP: BigQuery",
                "Tools: Docker, GitHub Actions (CI/CD)"
              ]
            }
          ].map((skill, index) => (
            <motion.div
              key={index}
              className={`p-6 rounded-xl shadow-xl transition-colors duration-300 ${
                darkMode ? "bg-gray-800/80 hover:bg-gray-700/80" : "bg-white/90 hover:bg-gray-100/90"
              } border border-gray-200 dark:border-gray-700 skill-card-hover-effect`}
              variants={itemVariants}
              whileHover={{
                scale: 1.02,
                boxShadow: darkMode
                  ? "0 10px 20px rgba(0, 0, 0, 0.3)"
                  : "0 10px 20px rgba(0, 0, 0, 0.08)",
                rotateZ: [0, 1, -1, 0]
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <h3 className="text-xl font-bold mb-4 text-center border-b pb-2 border-gray-300 dark:border-gray-600 text-green-400">
                {skill.category}
              </h3>
              <ul className="list-inside space-y-2 text-md">
                {skill.items.map((item, idx) => (
                  <motion.li
                    key={idx}
                    className="flex items-center"
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




      {/* --- Separator --- */}
      <div className="w-1/2 mx-auto border-t border-gray-300 dark:border-gray-700 my-10"></div>

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
              className={`p-6 rounded-xl shadow-xl transition-colors duration-300 ${darkMode ? "bg-gray-800/80 hover:bg-gray-700/80" : "bg-white/90 hover:bg-gray-100/90"} border border-gray-200 dark:border-gray-700 cert-card-hover-effect flex items-center`}
              variants={itemVariants}
              whileHover={{
                scale: 1.02,
                boxShadow: darkMode ? "0 10px 20px rgba(0, 0, 0, 0.3)" : "0 10px 20px rgba(0, 0, 0, 0.08)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <span className="text-3xl text-yellow-500 mr-4">🏆</span>
              <p className="text-lg font-medium">{cert}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

       {/* --- Separator --- */}
      <div className="w-1/2 mx-auto border-t border-gray-300 dark:border-gray-700 my-10"></div>

      {/* Experience Section */}
      <section id="experience" className="container mx-auto px-6 py-20 relative z-10">
        <h2 className="text-4xl font-bold mb-10 text-center text-orange-500 dark:text-orange-400">Experience</h2>
        <motion.div
            className="max-w-4xl mx-auto space-y-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
        >
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className={`p-8 rounded-xl shadow-xl transition-colors duration-300 ${darkMode ? "bg-gray-800/80" : "bg-white/90"} border border-gray-200 dark:border-gray-700`}
              variants={cardVariants}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.2 }}
            >
              <h3 className="text-2xl font-bold text-orange-400">{exp.title} – {exp.company}</h3>
              <p className="text-md text-gray-500 dark:text-gray-400 italic mt-1 mb-3">{exp.dates}</p>
              <ul className="list-disc pl-5 space-y-2 text-lg text-left">
                {exp.description.map((point, i) => (
                  <li key={i} dangerouslySetInnerHTML={{ __html: point.replace(/\*\*(.*?)\*\*/g, '<strong class="text-blue-400 dark:text-blue-300 font-semibold">$1</strong>') }} />
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </section>

       {/* --- Separator --- */}
      <div className="w-1/2 mx-auto border-t border-gray-300 dark:border-gray-700 my-10"></div>


      {/* Contact Section */}
      <section id="contact" className="container mx-auto px-6 py-20 text-center relative z-10">
        <h2 className="text-4xl font-bold mb-6 text-center text-red-500 dark:text-red-400">Get In Touch</h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
          I&apos;m always open to new ideas, collaborations, and opportunities. Let&apos;s connect!
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
          href="/AbhinavaSaiBugudi_Resume.pdf"
          download="AbhinavaSaiBugudi_Resume.pdf"
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