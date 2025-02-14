"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Sun, Moon, Github, Linkedin, Mail } from "lucide-react";


export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(false);
  
  return (
    <div className={darkMode ? "bg-gray-900 text-white min-h-screen" : "bg-gray-100 text-black min-h-screen"}>
      <div className="container mx-auto px-6 py-12">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Abhinava Bugudi</h1>
          <Button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
        </header>
        
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4">About Me</h2>
          <p className="text-lg">Software Engineer specializing in Machine Learning, Android (Jetpack Compose), and Full-Stack Development. Passionate about AI, mobile development, and creating impactful solutions.</p>
        </section>
        
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {["Voxscribe - Handwriting Recognition", "Housing Price Prediction Model", "Android Country Guessing Game"].map((project, index) => (
              <motion.div whileHover={{ scale: 1.05 }} key={index}>
                <Card className="p-6 rounded-2xl shadow-lg cursor-pointer">
                  <CardContent>
                    <h3 className="text-xl font-bold mb-2">{project}</h3>
                    <p className="text-sm">Click to view on GitHub</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
        
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4">Contact</h2>
          <div className="flex gap-4">
            <a href="https://github.com/yourgithub" target="_blank" className="p-2 rounded-full bg-gray-800 text-white hover:bg-gray-700">
              <Github size={24} />
            </a>
            <a href="https://linkedin.com/in/yourlinkedin" target="_blank" className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-500">
              <Linkedin size={24} />
            </a>
            <a href="mailto:your.email@example.com" className="p-2 rounded-full bg-red-600 text-white hover:bg-red-500">
              <Mail size={24} />
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
