import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'
import { useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setUserData } from './redux/userSlice'
import InterviewPage from './pages/InterviewPage'
import InterviewHistory from './pages/InterviewHistory'
import Pricing from './pages/Pricing'
import InterviewReport from './pages/InterviewReport'
import CareerGuide from "./pages/CareerGuide";
import CareerHome from "./pages/CareerHome";
import RoadmapHistory from './pages/RoadmapHistory';



import Chat from "./components/Chat";
// App.jsx




export const ServerUrl  = "https://interviewai-app.onrender.com"

function App() {

  const dispatch = useDispatch()
  useEffect(()=>{
    const getUser = async () => {
      try {
        const result = await axios.get(ServerUrl + "/api/user/current-user", {withCredentials:true})
        dispatch(setUserData(result.data))
      } catch (error) {
        console.log(error)
        dispatch(setUserData(null))
      }
    }
    getUser()

  },[dispatch])
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/auth' element={<Auth/>}/>
      <Route path='/interview' element={<InterviewPage/>}/>
      <Route path='/history' element={<InterviewHistory/>}/>
      <Route path='/pricing' element={<Pricing/>}/>
      <Route path='/report/:id' element={<InterviewReport/>}/>
       <Route path="/career" element={<CareerHome />} />
      <Route path="/career/:id" element={<CareerGuide />} />

      {/* NEW ROUTE for saved roadmap */}
      <Route path="/roadmap/:id" element={<CareerGuide />} />
      <Route path="/roadmap/history" element={<RoadmapHistory />} />
        
  

<Route path="/chat" element={<Chat />} />




    </Routes>
  )
}

export default App
