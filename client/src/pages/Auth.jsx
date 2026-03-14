import React from "react";
import { BsRobot } from "react-icons/bs";
import { IoSparkles } from "react-icons/io5";
import { motion } from "motion/react";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from "firebase/auth";

import { auth, provider } from "../utils/firebase";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

const ServerUrl = "http://localhost:8000";

function Auth({ isModel = false }) {

  const dispatch = useDispatch();

  const handleGoogleAuth = async () => {
    try {

      const response = await signInWithPopup(auth, provider);
      const user = response.user;

      const name = user.displayName;
      const email = user.email;

      const result = await axios.post(
        ServerUrl + "/api/auth/google",
        { name, email },
        { withCredentials: true }
      );

      dispatch(setUserData(result.data));

    } catch (error) {
      console.log(error);
    }
  };

  return (

    <div
      className={`w-full ${
        isModel
          ? "py-4"
          : "min-h-screen flex items-center justify-center px-6 py-20 bg-gradient-to-b from-[#020617] via-[#0f172a] to-black"
      }`}
    >

      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}

        className={`w-full ${
          isModel
            ? "max-w-md p-8 rounded-3xl"
            : "max-w-lg p-12 rounded-[32px]"
        }
        bg-[#070B1A] border border-purple-900/40 shadow-xl`}
      >

        {/* LOGO */}

        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="bg-purple-600 text-white p-2 rounded-lg">
            <BsRobot size={18} />
          </div>

          <h2 className="font-semibold text-lg text-white">
            InterviewAI
          </h2>
        </div>

        {/* TITLE */}

        <h1 className="text-2xl md:text-3xl font-semibold text-center leading-snug mb-4 text-white">

          Continue with{" "}

          <span className="bg-purple-900/40 text-purple-300 px-3 py-1 rounded-full inline-flex items-center gap-2">
            <IoSparkles size={16} />
            AI Smart Interview
          </span>

        </h1>

        {/* DESCRIPTION */}

        <p className="text-gray-400 text-center text-sm md:text-base leading-relaxed mb-8">

          Sign in to start AI-powered mock interviews,
          track your progress and unlock detailed performance insights.

        </p>

        {/* GOOGLE BUTTON */}

       <motion.button
  onClick={handleGoogleAuth}
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="w-full flex items-center justify-center gap-3 py-3 
  bg-white text-black rounded-full shadow-md
  border border-purple-200
  hover:shadow-[0_0_20px_rgba(168,85,247,0.35)]
  transition"
>
  <FcGoogle size={20} />
  Continue with Google
</motion.button>
      </motion.div>

    </div>

  );
}

export default Auth;