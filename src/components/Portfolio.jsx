/*
GameDev Portfolio
File: Portfolio.jsx
Author: Robert Lyons
*/

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function Portfolio() {
  const [selected, setSelected] = useState(null)
  const [currentImage, setCurrentImage] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  // Hero slideshow images — update paths with your real screenshots
  const heroImages = [
    './assets/hero1.jpg',
    './assets/hero2.jpg',
    './assets/hero3.jpg',
    './assets/hero4.jpg'
  ]

  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length)
    }, 4000) // change image every 4 seconds
    return () => clearInterval(interval)
  }, [heroImages.length, isPaused])

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + heroImages.length) % heroImages.length)
  }

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % heroImages.length)
  }

  const projects = [
    {
      id: 1,
      title: 'Trading Space',
      role: 'Lead Developer / Designer',
      engine: 'Unity • C# • Shader Graph',
      desc: 'Final Year Project — a puzzle game exploring swap-based mechanics, environmental storytelling, and subtle audio cues to guide the player.',
      img: './assets/tradingSpace_preview.jpg',
      play: 'itch-link-here',
      repo: 'https://github.com/robofett28/TradingSpace'
    }
  ]

  return (
    <div className="min-h-screen bg-black text-gray-100">
      <header className="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-red-500">Robert Lyons</h1>
        <nav className="space-x-4 text-sm">
          <a href="#projects" className="text-gray-400 hover:text-red-500">Projects</a>
          <a href="#about" className="text-gray-400 hover:text-red-500">About</a>
          <a href="#contact" className="text-gray-400 hover:text-red-500">Contact</a>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-6">
        {/* HERO */}
        <section className="flex flex-col items-center text-center py-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h2 className="text-4xl md:text-6xl font-bold mb-4 text-white">Crafting Puzzles with Purpose</h2>
            <p className="max-w-2xl mx-auto text-gray-400 text-lg mb-8">Final Year Game Development student at the University of Limerick — designing games that challenge perception and reward curiosity.</p>
            <div className="flex gap-3 justify-center">
              <a href="#projects" className="px-6 py-3 bg-red-600 text-black rounded-md font-semibold hover:bg-red-700">View Projects</a>
              <a href="/Robert_Lyons_CV.pdf" download className="px-6 py-3 border border-gray-700 rounded-md text-gray-300 hover:text-red-500">Download CV</a>
            </div>
          </motion.div>

          {/* Auto-fading hero slideshow with hover pause and manual controls */}
          <div
            className="relative mt-12 w-full max-w-4xl h-[400px] overflow-hidden rounded-2xl border border-gray-800 shadow-xl"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {heroImages.map((img, index) => (
              <motion.img
                key={index}
                src={img}
                alt={`Hero ${index}`}
                className="absolute top-0 left-0 w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: index === currentImage ? 1 : 0 }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
              />
            ))}

            {/* Navigation Arrows */}
            <button
              onClick={prevImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
              {heroImages.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full ${i === currentImage ? 'bg-red-500' : 'bg-gray-600'}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="py-12">
          <h3 className="text-2xl font-bold text-red-500 mb-2">Selected Projects</h3>
          <p className="text-gray-400 text-sm mb-6">Focused prototypes complete with code and playable builds.</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p) => (
              <motion.article key={p.id} whileHover={{ y: -6 }} className="rounded-xl bg-gradient-to-b from-gray-900 to-black p-4 border border-gray-800 hover:border-red-600">
                <div className="rounded-lg overflow-hidden aspect-[16/9] bg-black">
                  <img src={p.img} alt={p.title} className="object-cover w-full h-full" />
                </div>
                <div className="mt-3">
                  <h4 className="font-semibold text-white">{p.title}</h4>
                  <div className="text-xs text-gray-500">{p.engine}</div>
                  <p className="mt-2 text-gray-300 text-sm line-clamp-3">{p.desc}</p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex gap-2">
                    <a href={p.play} target="_blank" rel="noreferrer" className="text-xs px-3 py-1 bg-red-600 text-black rounded-sm font-medium hover:bg-red-700">Play</a>
                    <a href={p.repo} target="_blank" rel="noreferrer" className="text-xs px-3 py-1 border border-gray-700 rounded-sm text-gray-300 hover:text-red-500">Code</a>
                  </div>
                  <button onClick={() => setSelected(p)} className="text-xs text-gray-400 hover:text-red-500 underline">Details</button>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="py-12">
          <div className="grid md:grid-cols-3 gap-6 items-start">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold text-red-500 mb-3">About Me</h3>
              <p className="text-gray-300 mb-4">I’m Robert Lyons, a final-year Video Game Development student at the University of Limerick. I specialise in puzzle mechanics, player progression systems, and refined level design. My approach blends logical design with creative expression.</p>
              <ul className="grid sm:grid-cols-2 gap-2 text-sm text-gray-400">
                <li><strong>Languages:</strong> C#, C++, Python</li>
                <li><strong>Engines:</strong> Unity, Unreal</li>
                <li><strong>Tools:</strong> Git, Blender, Substance</li>
                <li><strong>Focus:</strong> Gameplay Systems, Puzzle Design, Prototyping, QA</li>
              </ul>
            </div>
            <div className="bg-gray-900/60 p-4 rounded-xl border border-gray-800">
              <h4 className="font-semibold text-white">Education</h4>
              <p className="text-sm text-gray-300 mt-2">BSc Video Game Development — University of Limerick</p>
              <p className="text-xs text-gray-400 mt-4">Currently completing my Final Year Project — developing a Unity-based puzzle game that challenges perception and spatial reasoning.</p>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-12">
          <div className="rounded-xl bg-gray-900/80 p-6 border border-gray-800 text-center">
            <h3 className="text-2xl font-bold text-red-500 mb-2">Contact</h3>
            <p className="text-gray-300">Email: <a href="mailto:lyonsr71@gmail.com" className="underline hover:text-red-500">lyonsr71@gmail.com</a></p>
            <p className="text-gray-400 text-sm mt-2">LinkedIn • GitHub • Itch.io</p>
            <a href="/Robert_Lyons_CV.pdf" download className="inline-block mt-4 px-4 py-2 bg-red-600 text-black rounded-md font-semibold hover:bg-red-700">Download CV (PDF)</a>
          </div>
        </section>
      </main>

      <footer className="mt-12 py-8 text-center text-gray-500 text-sm border-t border-gray-800">© {new Date().getFullYear()} Robert Lyons — Portfolio built with React & Tailwind</footer>

      {/* DETAILS MODAL */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/70" onClick={() => setSelected(null)} />
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative z-10 max-w-3xl w-full p-6 bg-black rounded-2xl border border-gray-800">
            <div className="flex items-start gap-4">
              <div className="w-1/3 overflow-hidden rounded-lg">
                <img src={selected.img} alt={selected.title} className="object-cover w-full h-40" />
              </div>
              <div className="flex-1">
                <h4 className="text-xl font-semibold text-red-500">{selected.title}</h4>
                <div className="text-xs text-gray-500">{selected.role} • {selected.engine}</div>
                <p className="mt-3 text-gray-300">{selected.desc}</p>
                <div className="mt-4 flex gap-3">
                  <a href={selected.play} target="_blank" rel="noreferrer" className="px-3 py-2 bg-red-600 text-black rounded hover:bg-red-700">Play</a>
                  <a href={selected.repo} target="_blank" rel="noreferrer" className="px-3 py-2 border border-gray-700 rounded text-gray-300 hover:text-red-500">Code</a>
                  <button onClick={() => setSelected(null)} className="px-3 py-2 border border-gray-700 rounded text-gray-300 hover:text-red-500">Close</button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}