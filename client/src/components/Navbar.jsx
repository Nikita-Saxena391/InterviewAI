import React, { useState } from "react";
import { motion } from "motion/react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { BsRobot, BsCoin } from "react-icons/bs";
import { HiOutlineLogout } from "react-icons/hi";
import { FaUserAstronaut } from "react-icons/fa";

import { ServerUrl } from "../utils/server";
import { setUserData } from "../redux/userSlice";
import AuthModel from "../components/AuthModel";
import { HiSparkles } from "react-icons/hi";

function Navbar() {

  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showCreditPopup, setShowCreditPopup] = useState(false);
  const [showUserPopup, setShowUserPopup] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  const handleLogout = async () => {
    try {

      await axios.get(ServerUrl + "/api/auth/logout", {
        withCredentials: true,
      });

      dispatch(setUserData(null));
      setShowCreditPopup(false);
      setShowUserPopup(false);

      navigate("/");

    } catch (error) {
      console.log(error);
    }
  };

  return (

    <div className="bg-[#020617] flex justify-center px-4 pt-6">

      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}

        className="w-full max-w-6xl bg-[#0f172a] rounded-[24px] shadow-lg border border-gray-700 px-8 py-4 flex justify-between items-center relative"
      >

        {/* Logo */}

        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-3 cursor-pointer"
        >

          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-2 rounded-lg">
             <HiSparkles size={16} className="text-white-500" />
          </div>

          <h1 className="font-semibold hidden md:block text-lg text-white">
            InterviewAI
          </h1>

        </div>

        {/* Right Section */}

        <div className="flex items-center gap-6 relative">

          {/* Credits */}

          <div className="relative">

            <button
              onClick={() => {
                if (!userData) {
                  setShowAuth(true);
                  return;
                }

                setShowCreditPopup(!showCreditPopup);
                setShowUserPopup(false);
              }}

              className="flex items-center gap-2 bg-[#020617] border border-gray-700 px-4 py-2 rounded-full text-sm hover:bg-[#111827] text-white"
            >

              <BsCoin size={18} />

              {userData?.credits || 0}

            </button>

            {showCreditPopup && (

              <div className="absolute right-[-50px] mt-3 w-64 bg-[#0f172a] shadow-xl border border-gray-700 rounded-lg p-5 z-50 text-white">

                <p className="text-sm text-gray-400 mb-4">
                  Need more credits to continue interviews?
                </p>

                <button
                  onClick={() => navigate("/pricing")}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-lg text-sm"
                >
                  Buy more Credits
                </button>

              </div>

            )}

          </div>

          {/* Avatar */}

          <div className="relative">

            <button
              onClick={() => {

                if (!userData) {
                  setShowAuth(true);
                  return;
                }

                setShowUserPopup(!showUserPopup);
                setShowCreditPopup(false);
              }}

              className="w-9 h-9 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full flex items-center justify-center font-semibold"
            >

              {
                userData
                  ? userData?.name?.slice(0, 1).toUpperCase()
                  : <FaUserAstronaut size={16} />
              }

            </button>

            {showUserPopup && (

              <div className="absolute right-0 mt-3 w-48 bg-[#0f172a] shadow-xl border border-gray-700 rounded-xl p-4 z-50 text-white">

                <p className="text-md text-blue-400 font-medium mb-1">
                  {userData?.name}
                </p>

                <p className="text-xs text-gray-400 mb-3">
                  {userData?.email}
                </p>

                <button
                  onClick={() => navigate("/history")}
                  className="w-full text-left text-sm py-2 hover:text-white text-gray-400"
                >
                  Interview History
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full text-left text-sm py-2 flex items-center gap-2 text-red-400"
                >
                  Logout
                  <HiOutlineLogout />
                </button>

              </div>

            )}

          </div>

        </div>

      </motion.div>

      {/* Auth Modal */}

      {showAuth && <AuthModel onClose={() => setShowAuth(false)} />}

    </div>

  );

}

export default Navbar;