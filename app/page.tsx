"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sun, Moon, Github, Linkedin, Mail, Menu, X, Download } from "lucide-react";

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  // ✅ Track cursor movement
  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", updateCursor);
    return () => window.removeEventListener("mousemove", updateCursor);
  }, []);

  // ✅ Ensure dark mode loads correctly on first render
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme");
      if (storedTheme === "dark") setDarkMode(true);
    }
  }, []);

  // ✅ Smooth scrolling to sections
  // ✅ Fix scrolling to match section IDs correctly
  const scrollToSection = (id: string) => {
    const sectionIds: { [key: string]: string } = {
      "home": "home",
      "summary": "summary",
      "projects": "projects",
      "education": "education",
      "skills": "skills",
      "work experience": "work-experience", // Fix ID matching
      "contact me": "contact", // Fix ID matching
    };

    const section = document.getElementById(sectionIds[id.toLowerCase()]);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };


   // ✅ Handle Click for Ripple Effect
  const handleClick = (e: React.MouseEvent) => {
    const newRipple = { x: e.clientX, y: e.clientY, id: Date.now() };
    setRipples((prev) => [...prev, newRipple]);

    // Remove the ripple after animation
    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id));
    }, 600);
  };

  return (
    <div className={darkMode ? "bg-gray-900 text-white min-h-screen" : "bg-gray-50 text-black min-h-screen"}>

      {/* ✅ Spotlight Effect (Cursor Follower) */}
      <motion.div
        className="fixed top-0 left-0 w-screen h-screen pointer-events-none"
        animate={{ x: cursorPos.x - 100, y: cursorPos.y - 100 }} // ✅ Offset for better centering
        transition={{ type: "tween", duration: 0.2, ease: "easeOut" }}
      >
        <div
          className="w-64 h-64 bg-gradient-to-r from-blue-500 to-purple-600 opacity-30 rounded-full blur-3xl absolute"
        />
      </motion.div>

      {/* ✅ Ripple Effect on Click */}
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          className="absolute w-20 h-20 bg-white/30 rounded-full pointer-events-none"
          style={{ top: ripple.y - 40, left: ripple.x - 40 }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{ duration: 0.6 }}
        />
      ))}
      
      {/* ✅ Navigation Bar */}
      {/* ✅ Updated Navigation Bar (With Summary & Work Experience) */}
      <nav className="fixed top-0 left-0 w-full z-50">
        {/* ✅ Hamburger Menu Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className={`p-3 rounded-full transition-all shadow-lg fixed top-5 left-5 ${
            darkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-black"
          }`}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>

        {/* ✅ Expanding Navbar */}
        <motion.div
          className={`fixed top-0 left-0 w-full shadow-lg backdrop-blur-lg transition-all ${
            darkMode ? "bg-gray-900/90 text-white" : "bg-white/80 text-black"
          } ${isOpen ? "h-24 opacity-100" : "h-0 opacity-0"} overflow-hidden`}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? "100px" : "0px" }}
          transition={{ duration: 0.4 }}
        >
          <ul className="flex justify-center space-x-6 text-lg p-4">
            {["Home", "Summary", "Projects", "Education", "Skills", "Work Experience", "Contact Me"].map((item) => (
              <li key={item}>
                <button
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="transition-all hover:text-blue-400"
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </motion.div>
      </nav>


      {/* ✅ Home Section */}
      <section id="home" className="container mx-auto px-6 py-20 min-h-screen flex flex-col justify-center text-center">
        <motion.h1 className="text-6xl font-extrabold" initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          Abhinava Bugudi
        </motion.h1>
        <motion.p className="mt-4 text-lg text-gray-400" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}>
          Software Engineer | Machine Learning Developer | Database Specialist
        </motion.p>
        
        {/* ✅ Dark Mode Toggle (Centered Below Name) */}
        <motion.button
          onClick={() => setDarkMode(!darkMode)}
          className="p-3 mt-6 mx-auto flex items-center justify-center rounded-full shadow-lg transition-all transform hover:scale-110 bg-gray-800 text-white"
          whileHover={{ scale: 1.1 }}
        >
          {darkMode ? <Sun size={24} /> : <Moon size={24} />}
        </motion.button>
      </section>

      {/* ✅ Summary Section */}
      <section id="summary" className="container mx-auto px-6 py-20">
        <motion.div  whileHover={{ scale: 1.05 }} className={`p-6 rounded-lg shadow-lg backdrop-blur-md ${darkMode ? "bg-gray-800/80 text-white" : "bg-gray-100/90 text-black"}`}>
          <h2 className="text-4xl font-semibold mb-4">Summary</h2>
          <p className="text-lg">
            Passionate software engineer with experience in machine learning, backend development, and mobile app development. Proficient in Python, Java, Kotlin, and various frameworks such as Django and Jetpack Compose. Experienced in building AI-powered applications, real-world predictive models, and full-stack solutions.
          </p>
        </motion.div>
      </section>

      {/* ✅ Projects Section */}
      <section id="projects" className="container mx-auto px-6 py-20">
        <h2 className="text-4xl font-semibold mb-4">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: "Voxscribe", desc: "AI handwriting recognition app.", github: "https://github.com/yourgithub/voxscribe" },
            { name: "Housing Price Prediction", desc: "ML model predicting real estate prices.", github: "https://github.com/yourgithub/housing-price-prediction" },
            { name: "Android Country Guessing Game", desc: "A Kotlin-based mobile quiz game.", github: "https://github.com/yourgithub/country-quiz" },
          ].map((project, index) => (
            <motion.div key={index} whileHover={{ scale: 1.05 }} className={`p-6 rounded-lg shadow-lg backdrop-blur-md ${darkMode ? "bg-gray-800/80 text-white" : "bg-gray-100/90 text-black"}`}>
              <h3 className="text-xl font-bold">{project.name}</h3>
              <p className="text-sm">{project.desc}</p>
              <a href={project.github} className="text-blue-500 hover:underline">View on GitHub</a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ✅ Education Section */}
      <section id="education" className="container mx-auto px-6 py-20">
        <motion.div  whileHover={{ scale: 1.05 }}className={`p-6 rounded-lg shadow-lg backdrop-blur-md ${darkMode ? "bg-gray-800/80 text-white" : "bg-gray-100/90 text-black"}`}>
          <h2 className="text-4xl font-semibold mb-4">Education</h2>
          <p className="text-lg">BSc Software Engineering, University of Westminster</p>
          <p className="text-md text-gray-400 italic mt-1">September 2020 - June 2024</p>
          <h3 className="text-xl font-semibold mt-4">Relevant Coursework</h3>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Machine Learning & AI Development</li>
            <li>Software Architecture & Design</li>
            <li>Database Systems & Big Data Analytics</li>
            <li>Data Structures & Algorithms</li>
          </ul>
        </motion.div>
      </section>

      {/* ✅ Skills Section */}
      <section id="skills" className="container mx-auto px-6 py-20">
        <h2 className="text-4xl font-semibold mb-4">Skills</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[
            { category: "Programming", items: ["Python", "Java", "Kotlin"] },
            { category: "Machine Learning", items: ["TensorFlow", "Scikit-Learn", "Pandas"] },
            { category: "Back-End", items: ["Django", "Flask", "FastAPI"] },
            { category: "Mobile Development", items: ["Jetpack Compose", "Android", "Firebase"] },
            { category: "Database & Tools", items: ["SQL", "PostgreSQL", "MongoDB"] },
            { category: "DevOps & Git", items: ["GitHub Actions", "Docker", "CI/CD Pipelines"] },
          ].map((skill, index) => (
            <motion.div key={index} whileHover={{ scale: 1.05 }} className={`p-6 rounded-lg shadow-lg backdrop-blur-md ${darkMode ? "bg-gray-800/80 text-white" : "bg-gray-100/90 text-black"}`}>
              <h3 className="text-xl font-bold">{skill.category}</h3>
              <ul className="list-disc pl-4 mt-2">
                {skill.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ✅ Work Experience Section */}
      <section id="work-experience" className="container mx-auto px-6 py-20">
        <motion.div   whileHover={{ scale: 1.05 }} className={`p-6 rounded-lg shadow-lg backdrop-blur-md ${darkMode ? "bg-gray-800/80 text-white" : "bg-gray-100/90 text-black"}`}>
          <h2 className="text-4xl font-semibold mb-4">Work Experience</h2>
          <h3 className="text-2xl font-bold">Uniqlo - Retail Associate</h3>
          <p className="text-md text-gray-400 italic mt-1">April 2023 - Present</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Provided excellent customer service and assisted with inventory management.</li>
            <li>Developed teamwork and problem-solving skills in a fast-paced environment.</li>
            <li>Managed stock and checkout operations efficiently.</li>
          </ul>
        </motion.div>
      </section>

      {/* ✅ Contact Section (Includes GitHub, LinkedIn, Email) */}
      <section id="contact" className="container mx-auto px-6 py-20 text-center">
        <h2 className="text-4xl font-semibold mb-4">Contact Me</h2>
        <p className="text-lg text-gray-400">Feel free to connect with me:</p>
        <div className="flex justify-center gap-6 mt-6">
          <motion.a href="https://github.com/yourgithub"  whileHover={{ scale: 1.05 }} className="p-3 rounded-full transition-all bg-gray-800 text-white hover:bg-gray-700">
            <Github size={30} />
          </motion.a>
          <motion.a href="https://linkedin.com/in/yourlinkedin" whileHover={{ scale: 1.05 }} className="p-3 rounded-full transition-all bg-blue-600 text-white hover:bg-blue-500">
            <Linkedin size={30} />
          </motion.a>
          <motion.a href="mailto:your.email@example.com"  whileHover={{ scale: 1.05 }} className="p-3 rounded-full transition-all bg-red-600 text-white hover:bg-red-500">
            <Mail size={30} />
          </motion.a>
        </div>

        {/* ✅ Resume Download Button (Fixed & Animated) */}
        <motion.a
          href="/resume.pdf"
          download
          className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-lg shadow-lg flex items-center justify-center gap-3 hover:from-blue-600 hover:to-blue-800"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95, opacity: 0.8 }}
        >
          <Download size={24} />
          Download Resume
        </motion.a>
      </section>
    </div>
  );
}
