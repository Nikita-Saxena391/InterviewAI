// src/components/ExperienceForm.jsx
import React, { useContext, useState, useEffect } from 'react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { ResumeInfoContext } from '../context/ResumeInfoContext';
import axios from 'axios';
import { toast } from 'sonner';

const defaultExperience = {
  title: '', companyName: '', city: '', state: '', startDate: '', endDate: '', workSummary: '', currentlyWorking: false
};

function ExperienceForm({ enableNext }) {
  const { resumeInfo, setResumeInfo, resumeId } = useContext(ResumeInfoContext);
  const [experienceList, setExperienceList] = useState(resumeInfo.experiences?.length ? resumeInfo.experiences : [defaultExperience]);

  useEffect(() => {
    setResumeInfo(prev => ({ ...prev, experiences: experienceList }));
  }, [experienceList]);

  const handleChange = (index, name, value) => {
    const list = [...experienceList];
    list[index][name] = value;
    setExperienceList(list);
  };

  const addExperience = () => setExperienceList([...experienceList, defaultExperience]);
  const removeExperience = () => setExperienceList(experienceList.slice(0, -1));

  const improveAI = async (index) => {
    try {
      const { workSummary } = experienceList[index];
      const { data } = await axios.patch(`/api/resume/${resumeId}/summary-ai`, { summary: workSummary });
      handleChange(index, 'workSummary', data.summary);
      toast.success("Experience improved!");
    } catch (err) {
      toast.error("AI improvement failed");
      console.error(err);
    }
  };

  const onSave = async () => {
    try {
      await axios.post(`/api/resume/${resumeId}/experiences`, { experiences: experienceList });
      toast.success("Experiences saved!");
      enableNext(true);
    } catch (err) {
      toast.error("Failed to save experiences");
      console.error(err);
    }
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-5">
      <h2 className="font-bold text-lg">Professional Experience</h2>
      {experienceList.map((exp, index) => (
        <div key={index} className="grid grid-cols-2 gap-3 border p-3 my-3 rounded-lg">
          <Input placeholder="Title" value={exp.title} onChange={e => handleChange(index, 'title', e.target.value)} />
          <Input placeholder="Company Name" value={exp.companyName} onChange={e => handleChange(index, 'companyName', e.target.value)} />
          <Input placeholder="City" value={exp.city} onChange={e => handleChange(index, 'city', e.target.value)} />
          <Input placeholder="State" value={exp.state} onChange={e => handleChange(index, 'state', e.target.value)} />
          <Input type="date" placeholder="Start Date" value={exp.startDate} onChange={e => handleChange(index, 'startDate', e.target.value)} />
          <Input type="date" placeholder="End Date" value={exp.endDate} onChange={e => handleChange(index, 'endDate', e.target.value)} />
          <Textarea placeholder="Work Summary" value={exp.workSummary} onChange={e => handleChange(index, 'workSummary', e.target.value)} className="col-span-2"/>
          <div className="col-span-2 flex gap-2">
            <Button onClick={() => improveAI(index)}>Improve with AI</Button>
          </div>
        </div>
      ))}
      <div className="flex justify-between mt-3">
        <div className="flex gap-2">
          <Button onClick={removeExperience}>- Remove</Button>
          <Button onClick={addExperience}>+ Add More</Button>
        </div>
        <Button onClick={onSave}>Save</Button>
      </div>
    </div>
  );
}

export default ExperienceForm;