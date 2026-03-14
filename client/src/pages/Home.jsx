
import React from 'react'
import Navbar from '../components/Navbar'
import { useSelector } from 'react-redux'
import { motion } from "motion/react";
import {
  BsRobot,
  BsMic,
  BsClock,
  BsBarChart,
  BsFileEarmarkText
} from "react-icons/bs";
import { HiSparkles } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AuthModel from '../components/AuthModel';

import evalImg from "../assets/ai-ans.png";
import resumeImg from "../assets/resume.png";
import pdfImg from "../assets/pdf.png";
import analyticsImg from "../assets/history.png";

import Footer from '../components/Footer';

function Home() {

  const { userData } = useSelector((state) => state.user)
  const [showAuth, setShowAuth] = useState(false);
  const navigate = useNavigate()

  return (

    <div className="min-h-screen flex flex-col text-white 
    bg-gradient-to-b from-[#020617] via-[#0f172a] to-black">

      <Navbar />

      <div className='flex-1 px-6 py-20'>
        <div className='max-w-6xl mx-auto'>

          {/* HERO BADGE */}

          <div className='flex justify-center mb-6'>
            <div className='bg-[#111827] text-gray-300 text-sm px-4 py-2 rounded-full flex items-center gap-2 border border-gray-700'>
              <HiSparkles size={16} className="text-purple-400" />
              AI Powered Smart Interview Platform
            </div>
          </div>

          {/* HERO */}

          <div className='text-center mb-28'>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-semibold leading-tight max-w-4xl mx-auto"
            >

              Get Hired Faster with

              <span className="block mt-2 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                AI-Powered Interview Practice
              </span>

            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className='text-gray-400 mt-6 max-w-2xl mx-auto text-lg'>

              Role-based mock interviews with smart follow-ups,
              adaptive difficulty and real-time performance evaluation.

            </motion.p>

            {/* BUTTONS */}

            <div className='flex flex-wrap justify-center gap-4 mt-10'>

              <motion.button
                onClick={() => {
                  if (!userData) {
                    setShowAuth(true)
                    return;
                  }
                  navigate("/interview")
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='bg-gradient-to-r from-purple-500 to-indigo-500 px-10 py-3 rounded-full shadow-lg hover:shadow-xl transition'
              >
                Start Interview
              </motion.button>

              <motion.button
                onClick={() => {
                  if (!userData) {
                    setShowAuth(true)
                    return;
                  }
                  navigate("/history")
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='border border-gray-700 px-10 py-3 rounded-full hover:bg-gray-800 transition'
              >
                View History
              </motion.button>

            </div>

          </div>

          {/* 3 STEP PROCESS */}

          <div className='mb-28'>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className='text-4xl text-purple-400 text-center font-semibold mb-6'
            >
              Interview Smarter. Improve Faster. Get Hired Sooner
            </motion.h2>

            <p className='text-gray-400 text-center mb-16'>
              Transform Your Interview Preparation with AI
            </p>

            <div className='grid md:grid-cols-3 gap-8'>

              {[
                {
                  number: "01",
                  icon: <BsRobot size={22} />,
                  title: "Pick Your Role",
                  desc: "Choose your target job domain to get tailored questions."
                },
                {
                  number: "02",
                  icon: <BsMic size={22} />,
                  title: "Answer Like It's Live",
                  desc: "Answer questions out loud in a simulated interview."
                },
                {
                  number: "03",
                  icon: <BsClock size={22} />,
                  title: "Get Feedback + Improve",
desc: "Receive AI-generated feedback and improve your interview skills."
                }
              ].map((card, index) => (

                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className='bg-[#070B1A] border border-purple-900/40 rounded-2xl p-10 text-center hover:border-purple-500 transition duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]'
                >

                  <p className='text-purple-500 text-xl mb-6'>{card.number}</p>

                  <div className='w-12 h-12 mx-auto mb-6 flex items-center justify-center rounded-lg bg-purple-900/30 text-purple-400'>
                    {card.icon}
                  </div>

                  <h3 className='text-lg font-semibold mb-3'>
                    {card.title}
                  </h3>

                  <p className='text-gray-400 text-sm'>
                    {card.desc}
                  </p>

                </motion.div>

              ))}

            </div>

            <div className='flex justify-center mt-14'>
              <div className='border border-purple-900/40 text-gray-400 text-sm px-6 py-2 rounded-full'>
                Simple 3-Step Process
              </div>
            </div>

          </div>

          {/* AI FEATURES */}

          <div className='mb-32'>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className='text-4xl font-semibold text-center mb-16'
            >

              Advanced AI
              <span className="ml-2 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Capabilities
              </span>

            </motion.h2>

            <div className='grid md:grid-cols-2 gap-10'>

              {[
                {
                  image: evalImg,
                  icon: <BsBarChart size={20} />,
                  title: "AI Answer Evaluation",
                  desc: "Scores communication, technical accuracy and confidence."
                },
                {
                  image: resumeImg,
                  icon: <BsFileEarmarkText size={20} />,
                  title: "Resume Based Interview",
                  desc: "Project-specific questions based on uploaded resume."
                },
                {
                  image: pdfImg,
                  icon: <BsFileEarmarkText size={20} />,
                  title: "Downloadable PDF Report",
                  desc: "Detailed strengths, weaknesses and improvement insights."
                },
                {
                  image: analyticsImg,
                  icon: <BsBarChart size={20} />,
                  title: "History & Analytics",
                  desc: "Track progress with performance graphs."
                }
              ].map((item, index) => (

                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className='bg-[#070B1A] border border-purple-900/40 rounded-3xl p-8 shadow-lg hover:border-purple-500 hover:shadow-[0_0_30px_rgba(168,85,247,0.2)] transition'
                >

                  <div className='flex flex-col md:flex-row items-center gap-8'>

                    <div className='w-full md:w-1/2 flex justify-center'>
                      <img src={item.image} alt={item.title} className='max-h-64' />
                    </div>

                    <div className='w-full md:w-1/2'>

                      <div className='bg-purple-900/20 text-purple-400 w-12 h-12 rounded-xl flex items-center justify-center mb-6'>
                        {item.icon}
                      </div>

                      <h3 className='font-semibold mb-3 text-xl'>
                        {item.title}
                      </h3>

                      <p className='text-gray-400 text-sm'>
                        {item.desc}
                      </p>

                    </div>

                  </div>

                </motion.div>

              ))}

            </div>

          </div>

        </div>
      </div>

      {showAuth && <AuthModel onClose={() => setShowAuth(false)} />}

      <Footer />

    </div>
  )
}

export default Home