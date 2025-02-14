"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Sun, Moon, Github, Linkedin, Mail } from "lucide-react";

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(false);
  
  return (
    <div className={darkMode ? "bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white min-h-screen" : "bg-gradient-to-r from-blue-100 via-white to-gray-200 text-black min-h-screen"}>
      <div className="container mx-auto px-6 py-12">
        <header className="flex justify-between items-center mb-8">
          <motion.h1 
            className="text-5xl font-extrabold tracking-wide"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Abhinava Bugudi
          </motion.h1>
          <motion.div whileHover={{ scale: 1.1 }}>
            <Button onClick={() => setDarkMode(!darkMode)} className="p-3 rounded-full shadow-lg">
              {darkMode ? <Sun size={24} /> : <Moon size={24} />}
            </Button>
          </motion.div>
        </header>
        
        <section className="mb-12">
          <motion.h2 className="text-4xl font-semibold mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>About Me</motion.h2>
          <p className="text-lg leading-relaxed">Software Engineer specializing in Machine Learning, Android (Jetpack Compose), and Full-Stack Development. Passionate about AI, mobile development, and creating impactful solutions.</p>
        </section>
        
        <section className="mb-12">
          <motion.h2 className="text-4xl font-semibold mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>Projects</motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {["Voxscribe - Handwriting Recognition", "Housing Price Prediction Model", "Android Country Guessing Game"].map((project, index) => (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.1, rotate: 2 }}
                whileTap={{ scale: 0.9 }}
                className="transition-all duration-500"
              >
                <Card className="p-6 rounded-2xl shadow-2xl cursor-pointer bg-white dark:bg-gray-800 hover:shadow-xl">
                  <CardContent>
                    <h3 className="text-xl font-bold mb-2">{project}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Click to view on GitHub</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
        
        <section className="mb-12">
          <motion.h2 className="text-4xl font-semibold mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>Contact</motion.h2>
          <div className="flex gap-6">
            <motion.a href="https://github.com/yourgithub" target="_blank" className="p-3 rounded-full bg-gray-800 text-white hover:bg-gray-700 shadow-lg" whileHover={{ scale: 1.2 }}>
              <Github size={30} />
            </motion.a>
            <motion.a href="https://linkedin.com/in/yourlinkedin" target="_blank" className="p-3 rounded-full bg-blue-600 text-white hover:bg-blue-500 shadow-lg" whileHover={{ scale: 1.2 }}>
              <Linkedin size={30} />
            </motion.a>
            <motion.a href="mailto:your.email@example.com" className="p-3 rounded-full bg-red-600 text-white hover:bg-red-500 shadow-lg" whileHover={{ scale: 1.2 }}>
              <Mail size={30} />
            </motion.a>
          </div>
        </section>
      </div>
    </div>
  );
}