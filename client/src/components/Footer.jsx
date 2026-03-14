import React from 'react'
import { BsRobot } from 'react-icons/bs'
import { HiSparkles } from "react-icons/hi";

function Footer() {
  return (
    <div className='bg-[#020617] flex justify-center px-6 py-12 border-t border-purple-900/40'>

      <div className='w-full max-w-6xl text-center'>

        {/* LOGO */}

        <div className='flex justify-center items-center gap-3 mb-4'>
          <div className='bg-purple-600 text-white p-2 rounded-lg'>
             <HiSparkles size={16} />
          </div>

          <h2 className='font-semibold text-white text-lg'>
            InterviewAI
          </h2>
        </div>

        {/* DESCRIPTION */}

        <p className='text-gray-400 text-sm max-w-xl mx-auto leading-relaxed'>
          AI-powered interview preparation platform designed to improve
          communication skills, technical depth and professional confidence.
        </p>

        {/* SMALL COPYRIGHT */}

       <p className="text-center py-6 text-gray-400 text-sm border-t border-purple-900/30">
  © 2026 InterviewAI • Crafted with ❤️ by Nikita Saxena
</p>

      </div>

    </div>
  )
}

export default Footer