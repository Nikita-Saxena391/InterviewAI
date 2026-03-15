// src/context/ResumeInfoContext.js
import React, { createContext, useState } from "react";

export const ResumeInfoContext = createContext();

export const ResumeInfoProvider = ({ children }) => {
  const [resumeInfo, setResumeInfo] = useState({});
  const [resumeId, setResumeId] = useState("");

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo, resumeId, setResumeId }}>
      {children}
    </ResumeInfoContext.Provider>
  );
};