import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import { ServerUrl } from '../App'
import { FaArrowLeft } from 'react-icons/fa'

function InterviewHistory() {

    const [interviews, setInterviews] = useState([])
    const navigate = useNavigate()

    useEffect(() => {

        const getMyInterviews = async () => {

            try {

                const result = await axios.get(
                    ServerUrl + "/api/interview/get-interview",
                    { withCredentials: true }
                )

                setInterviews(result.data)

            } catch (error) {
                console.log(error)
            }

        }

        getMyInterviews()

    }, [])


    return (

<div className='min-h-screen bg-gradient-to-br from-black via-[#0f0f1a] to-purple-950 py-10'>

<div className='w-[90vw] lg:w-[70vw] max-w-[90%] mx-auto'>


{/* HEADER */}

<div className='mb-10 w-full flex items-start gap-4 flex-wrap'>

<button
onClick={() => navigate("/")}

className='mt-1 p-3 rounded-full bg-[#111827] border border-purple-900/40 shadow hover:shadow-purple-900/40 transition'
>

<FaArrowLeft className='text-purple-300' />

</button>

<div>

<h1 className='text-3xl font-bold text-purple-300'>
Interview Sessions
</h1>

<p className='text-gray-400 mt-2'>
Track your past interviews and performance reports
</p>

</div>

</div>


{/* EMPTY STATE */}

{interviews.length === 0 ?

<div className='bg-[#0f172a] border border-purple-900/40 p-10 rounded-2xl shadow-xl text-center'>

<p className='text-gray-400'>
No interviews found. Start your first interview.
</p>

</div>

:

<div className='grid gap-6'>


{interviews.map((item, index) => (

<div

key={index}

onClick={() => navigate(`/report/${item._id}`)}

className='bg-[#0f172a] border border-purple-900/40 p-6 rounded-2xl shadow-lg hover:shadow-[0_0_20px_rgba(168,85,247,0.25)] transition-all duration-300 cursor-pointer'
>


<div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>

<div>

<h3 className="text-lg font-semibold text-white">
{item.role}
</h3>

<p className="text-gray-400 text-sm mt-1">
{item.experience} • {item.mode}
</p>

<p className="text-xs text-gray-500 mt-2">
{new Date(item.createdAt).toLocaleDateString()}
</p>

</div>


<div className='flex items-center gap-6'>


{/* SCORE */}

<div className="text-right">

<p className="text-xl font-bold text-white">
{item.finalScore || 0}/10
</p>

<p className="text-xs text-gray-500">
Overall Score
</p>

</div>


{/* STATUS BADGE */}

<span

className={`px-4 py-1 rounded-full text-xs font-medium

${item.status === "completed"

? "bg-purple-900/40 text-purple-300"

: "bg-yellow-900/40 text-yellow-300"

}

`}

>

{item.status}

</span>


</div>

</div>

</div>

))}

</div>

}

</div>

</div>

)

}

export default InterviewHistory