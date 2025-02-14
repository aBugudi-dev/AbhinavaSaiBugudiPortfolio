"use client";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Sun, Moon, Github, Linkedin, Mail, Download, Menu, X } from "lucide-react";

import { useNavigate } from "react-router-dom";

function Navbar({ darkMode, setDarkMode }: { darkMode: boolean; setDarkMode: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // FIX: Enables forced navigation

  return (
    <nav className="fixed top-5 left-5 z-50">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-3 rounded-full transition-all shadow-lg fixed ${darkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-black"} ${isOpen ? "opacity-0" : "opacity-100"}`}
        animate={{ opacity: isOpen ? 0 : 1 }}
      >
        <Menu size={24} />
      </motion.button>

      {isOpen && (
        <motion.div
          className={`absolute top-0 left-0 w-64 p-5 rounded-lg shadow-xl backdrop-blur-lg transition-all ${darkMode ? "bg-gray-900/90 text-white" : "bg-gray-100/90 text-black"}`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4">
            <X size={24} />
          </button>
          <ul className="space-y-6 text-lg">
            <li>
              {/* 🔥 FIX: When clicking Home, force navigate to Home and refresh */}
              <button
                onClick={() => {
                  navigate("/"); // Force navigation to Home
                  window.location.reload(); // Hard refresh to re-render Home
                }}
                className={`transition-all hover:underline ${darkMode ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-black"}`}
              >
                Home
              </button>
            </li>
            {["Projects", "Education", "Skills", "Contact"].map((item, index) => (
              <li key={index}>
                <Link
                  to={`/${item.toLowerCase()}`}
                  className={`relative transition-all hover:underline ${darkMode ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-black"}`}
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </nav>
  );
}


function PageWrapper({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  useEffect(() => {}, [location]);

  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4 }}
      className="container mx-auto px-6 py-12"
    >
      {children}
    </motion.div>
  );
}

function Home({ darkMode, setDarkMode }: { darkMode: boolean; setDarkMode: React.Dispatch<React.SetStateAction<boolean>> }) {
  return (
    <PageWrapper>
      <motion.div 
        className="flex flex-col items-center justify-center min-h-screen text-center"
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1 }}
      >
        <motion.h1 className={`text-6xl font-extrabold tracking-wide ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
          Abhinava Bugudi
        </motion.h1>
        <motion.p className={`mt-4 text-lg ${darkMode ? "text-gray-400" : "text-gray-700"}`} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}>
          Software Engineer | Machine Learning Developer | Database Specialist
        </motion.p>
        
        {/* 🔥 FIX: Dark Mode Button (No More Hover Glitch) */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-3 mt-6 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110 hover:bg-opacity-80 bg-gray-800 text-white"
        >
          {darkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </motion.div>
    </PageWrapper>
  );
}



function Projects({ darkMode }: { darkMode: boolean }) {
  const projects = [
    { name: "Voxscribe - Handwriting Recognition", desc: "An AI-powered app that converts handwriting to text.", github: "https://github.com/yourgithub/voxscribe" },
    { name: "Housing Price Prediction Model", desc: "A machine learning model predicting real estate prices.", github: "https://github.com/yourgithub/housing-price-prediction" },
    { name: "Android Country Guessing Game", desc: "A fun Kotlin-based mobile quiz game.", github: "https://github.com/yourgithub/country-quiz" }
  ];

  return (
    <PageWrapper>
      <motion.div className={`p-6 rounded-lg shadow-lg ${darkMode ? "bg-gray-800/80" : "bg-gray-200/80"} backdrop-blur-md`}>
        <h2 className="text-4xl font-semibold mb-4">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div key={index} whileHover={{ scale: 1.05 }} className={`p-6 rounded-2xl shadow-lg transition-all ${darkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-black"}`}>
              <h3 className="text-xl font-bold mb-2">{project.name}</h3>
              <p className="text-sm">{project.desc}</p>
              <a href={project.github} className="text-blue-500 hover:underline">View on GitHub</a>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </PageWrapper>
  );
}


function Education({ darkMode }: { darkMode: boolean }) {
  return (
    <PageWrapper>
      <motion.div className={`p-6 rounded-lg shadow-lg ${darkMode ? "bg-gray-800/80" : "bg-gray-200/80"} backdrop-blur-md`}>
        <h2 className="text-4xl font-semibold mb-4">Education</h2>
        <p className="text-lg">BSc Software Engineering, University of Westminster</p>
        <ul className="list-disc pl-6">
          <li>Machine Learning & AI Development</li>
          <li>Software Architecture & Design</li>
          <li>Data Structures & Algorithms</li>
        </ul>
      </motion.div>
    </PageWrapper>
  );
}

function Skills({ darkMode }: { darkMode: boolean }) {
  const skills = [
    { category: "Programming", items: ["Python", "Java", "Kotlin"] },
    { category: "Machine Learning", items: ["TensorFlow", "Scikit-Learn"] },
    { category: "Back-End", items: ["Django", "Flask"] },
    { category: "Mobile Development", items: ["Jetpack Compose", "Android"] },
    { category: "Database & Tools", items: ["SQL", "Firebase", "Git"] },
  ];

  return (
    <PageWrapper>
      <h2 className="text-4xl font-semibold mb-4">Skills</h2>
      <div className="flex flex-wrap justify-center gap-8">
        {skills.map((skill, index) => (
          <motion.div key={index} className={`p-4 rounded-lg shadow-lg ${darkMode ? "bg-gray-800/80" : "bg-gray-200/80"} backdrop-blur-md`}>
            <h3 className="text-xl font-bold">{skill.category}</h3>
            <ul className="list-disc pl-6">
              {skill.items.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </PageWrapper>
  );
}

function Contact({ darkMode }: { darkMode: boolean }) {
  return (
    <PageWrapper>
      <motion.div className={`p-6 rounded-lg shadow-lg ${darkMode ? "bg-gray-800/80" : "bg-gray-200/80"} backdrop-blur-md`}>
        <h2 className="text-4xl font-semibold mb-4">Contact Me</h2>
        <p className="text-lg">Feel free to reach out to me through the following platforms:</p>
        <div className="flex gap-6 mt-6 justify-center">
          <motion.a href="https://github.com/yourgithub" className="p-3 rounded-full transition-all bg-gray-800 text-white hover:bg-gray-700"><Github size={30} /></motion.a>
          <motion.a href="https://linkedin.com/in/yourlinkedin" className="p-3 rounded-full transition-all bg-blue-600 text-white hover:bg-blue-500"><Linkedin size={30} /></motion.a>
          <motion.a href="mailto:your.email@example.com" className="p-3 rounded-full transition-all bg-red-600 text-white hover:bg-red-500"><Mail size={30} /></motion.a>
        </div>
      </motion.div>
    </PageWrapper>
  );
}

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Router>
      <div className={darkMode ? "bg-gray-900 text-white min-h-screen" : "bg-gray-50 text-black min-h-screen"}>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <Routes>
          <Route path="/" element={<Home darkMode={darkMode} setDarkMode={setDarkMode} />} />
          <Route path="/projects" element={<Projects darkMode={darkMode} />} />
          <Route path="/education" element={<Education darkMode={darkMode} />} />
          <Route path="/skills" element={<Skills darkMode={darkMode} />} />
          <Route path="/contact" element={<Contact darkMode={darkMode} />} />
        </Routes>
      </div>
    </Router>
  );
}
