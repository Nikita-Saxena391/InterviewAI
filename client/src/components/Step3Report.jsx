import React from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { motion } from "motion/react"
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

function Step3Report({ report }) {

  if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <p className="text-gray-400 text-lg">Loading Report...</p>
      </div>
    );
  }

  const navigate = useNavigate()

  const {
    finalScore = 0,
    confidence = 0,
    communication = 0,
    correctness = 0,
    questionWiseScore = [],
  } = report;

  const questionScoreData = questionWiseScore.map((score, index) => ({
    name: `Q${index + 1}`,
    score: score.score || 0
  }))

  const skills = [
    { label: "Confidence", value: confidence },
    { label: "Communication", value: communication },
    { label: "Correctness", value: correctness },
  ];

  let performanceText = "";
  let shortTagline = "";

  if (finalScore >= 8) {
    performanceText = "Ready for job opportunities.";
    shortTagline = "Excellent clarity and structured responses.";
  } else if (finalScore >= 5) {
    performanceText = "Needs minor improvement before interviews.";
    shortTagline = "Good foundation, refine articulation.";
  } else {
    performanceText = "Significant improvement required.";
    shortTagline = "Work on clarity and confidence.";
  }

  const score = finalScore;
  const percentage = (score / 10) * 100;

  
   const downloadPDF = () => {

const doc = new jsPDF("p", "mm", "a4");

const pageWidth = doc.internal.pageSize.getWidth();
const margin = 20;
const contentWidth = pageWidth - margin * 2;

let currentY = 25;

doc.setFont("helvetica", "bold");
doc.setFontSize(20);
doc.setTextColor(124, 58, 237);
doc.text("InterviewAI Performance Report", pageWidth / 2, currentY, { align: "center" });

currentY += 10;

doc.setFontSize(14);
doc.setTextColor(0,0,0);
doc.text(`Final Score: ${finalScore}/10`, margin, currentY);

currentY += 10;

doc.setFontSize(12);

doc.text(`Confidence: ${confidence}`, margin, currentY);
currentY += 8;

doc.text(`Communication: ${communication}`, margin, currentY);
currentY += 8;

doc.text(`Correctness: ${correctness}`, margin, currentY);

currentY += 15;

let advice = "";

if (finalScore >= 8) {
advice = "Excellent performance. Maintain confidence and structured answers.";
}
else if (finalScore >= 5) {
advice = "Good foundation shown. Improve clarity and structure.";
}
else {
advice = "Significant improvement required. Focus on clarity and confidence.";
}

doc.setFont("helvetica", "bold");
doc.text("Professional Advice", margin, currentY);

doc.setFont("helvetica", "normal");
doc.setFontSize(11);

const splitAdvice = doc.splitTextToSize(advice, contentWidth);

doc.text(splitAdvice, margin, currentY + 8);

currentY += 25;

autoTable(doc,{
startY: currentY,
head:[["#", "Question", "Score", "Feedback"]],
body: questionWiseScore.map((q,i)=>[
`${i+1}`,
q.question,
`${q.score}/10`,
q.feedback
]),
styles:{
fontSize:9,
cellPadding:5,
valign:"top"
},
headStyles:{
fillColor:[124,58,237],
textColor:255
},
alternateRowStyles:{
fillColor:[245,243,255]
}
})

doc.save("AI_Interview_Report.pdf");

};

  return (

<div className='min-h-screen bg-gradient-to-br from-black via-[#0f0f1a] to-purple-950 px-4 sm:px-6 lg:px-10 py-8'>

{/* HEADER */}

<div className='mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>

<div className='md:mb-10 w-full flex items-start gap-4 flex-wrap'>

<button
onClick={() => navigate("/history")}
className='mt-1 p-3 rounded-full bg-[#111827] border border-purple-900/40 shadow hover:shadow-purple-900/30 transition'
>
<FaArrowLeft className='text-purple-300' />
</button>

<div>
<h1 className='text-3xl font-bold text-purple-300'>
InterviewAI Insights
</h1>

<p className='text-gray-400 mt-2'>
AI-powered performance insights
</p>

</div>
</div>

<button
onClick={downloadPDF}
className='bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-[0_0_20px_rgba(168,85,247,0.35)] transition font-semibold'>
Download PDF
</button>

</div>

{/* GRID */}

<div className='grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8'>

{/* LEFT COLUMN */}

<div className='space-y-6'>

<motion.div
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
className="bg-[#0f172a] border border-purple-900/40 rounded-3xl shadow-xl p-8 text-center"
>

<h3 className="text-gray-400 mb-6">
Overall Performance
</h3>

<div className='relative w-24 h-24 mx-auto'>

<CircularProgressbar
value={percentage}
text={`${score}/10`}
styles={buildStyles({
textSize: "18px",
pathColor: "#a855f7",
textColor: "#a855f7",
trailColor: "#374151",
})}
/>

</div>

<p className="text-gray-500 mt-3 text-sm">
Out of 10
</p>

<div className="mt-4">
<p className="font-semibold text-white">
{performanceText}
</p>

<p className="text-gray-400 text-sm mt-1">
{shortTagline}
</p>

</div>

</motion.div>


<motion.div
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
className='bg-[#0f172a] border border-purple-900/40 rounded-3xl shadow-xl p-8'
>

<h3 className="text-lg font-semibold text-purple-300 mb-6">
Skill Evaluation
</h3>

<div className='space-y-5'>

{skills.map((s, i) => (

<div key={i}>

<div className='flex justify-between mb-2 text-gray-300'>

<span>{s.label}</span>

<span className='font-semibold text-purple-400'>
{s.value}
</span>

</div>

<div className='bg-gray-700 h-3 rounded-full'>

<div
className='bg-gradient-to-r from-purple-500 to-indigo-500 h-full rounded-full'
style={{ width: `${s.value * 10}%` }}
></div>

</div>

</div>

))}

</div>

</motion.div>

</div>


{/* RIGHT COLUMN */}

<div className='lg:col-span-2 space-y-6'>

<motion.div
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
className='bg-[#0f172a] border border-purple-900/40 rounded-3xl shadow-xl p-8'
>

<h3 className="text-lg font-semibold text-purple-300 mb-6">
Performance Trend
</h3>

<div className='h-72'>

<ResponsiveContainer width="100%" height="100%">
<AreaChart data={questionScoreData}>

<CartesianGrid strokeDasharray="3 3" stroke="#374151"/>

<XAxis dataKey="name" stroke="#9ca3af"/>

<YAxis domain={[0, 10]} stroke="#9ca3af"/>

<Tooltip />

<Area
type="monotone"
dataKey="score"
stroke="#a855f7"
fill="#6d28d9"
strokeWidth={3}
/>

</AreaChart>
</ResponsiveContainer>

</div>

</motion.div>


<motion.div
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
className='bg-[#0f172a] border border-purple-900/40 rounded-3xl shadow-xl p-8'
>

<h3 className="text-lg font-semibold text-purple-300 mb-6">
Question Breakdown
</h3>

<div className='space-y-6'>

{questionWiseScore.map((q, i) => (

<div
key={i}
className='bg-[#111827] p-6 rounded-2xl border border-purple-900/40'
>

<div className='flex justify-between mb-4'>

<div>

<p className="text-xs text-gray-400">
Question {i + 1}
</p>

<p className="font-semibold text-white">
{q.question || "Question not available"}
</p>

</div>

<div className='bg-purple-900/40 text-purple-300 px-3 py-1 rounded-full font-bold text-sm'>
{q.score ?? 0}/10
</div>

</div>

<div className='bg-purple-950/40 border border-purple-800/40 p-4 rounded-lg'>

<p className='text-xs text-purple-400 font-semibold mb-1'>
AI Feedback
</p>

<p className='text-sm text-gray-300 leading-relaxed'>

{q.feedback && q.feedback.trim() !== ""
? q.feedback
: "No feedback available for this question."}

</p>

</div>

</div>

))}

</div>

</motion.div>

</div>

</div>

</div>

  )
}

export default Step3Report