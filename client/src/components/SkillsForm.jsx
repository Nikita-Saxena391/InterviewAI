// src/components/SkillsForm.jsx
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useContext, useState, useEffect } from 'react';
import { ResumeInfoContext } from '../context/ResumeInfoContext';
import axios from 'axios';
import { toast } from 'sonner';

const defaultSkill = { name: "", rating: 0 };

function SkillsForm({ enableNext }) {
  const { resumeInfo, setResumeInfo, resumeId } = useContext(ResumeInfoContext);
  const [skillsList, setSkillsList] = useState(resumeInfo?.skills?.length ? resumeInfo.skills : [defaultSkill]);

  useEffect(() => {
    setResumeInfo(prev => ({ ...prev, skills: skillsList }));
  }, [skillsList]);

  const handleChange = (index, name, value) => {
    const list = [...skillsList];
    list[index][name] = name === 'rating' ? Number(value) : value;
    setSkillsList(list);
  };

  const addSkill = () => setSkillsList([...skillsList, defaultSkill]);
  const removeSkill = () => setSkillsList(skillsList.slice(0, -1));

  const onSave = async () => {
    try {
      await axios.post(`/api/resume/${resumeId}/skills`, { skills: skillsList });
      toast.success("Skills saved successfully");
      enableNext(true);
    } catch (err) {
      toast.error("Failed to save skills");
      console.error(err);
    }
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-5">
      <h2 className="font-bold text-lg">Skills</h2>
      {skillsList.map((skill, index) => (
        <div key={index} className="grid grid-cols-2 gap-3 border p-3 my-3 rounded-lg">
          <Input placeholder="Skill Name" value={skill.name} onChange={e => handleChange(index, 'name', e.target.value)} />
          <Input type="number" placeholder="Rating (0-10)" value={skill.rating} onChange={e => handleChange(index, 'rating', e.target.value)} />
        </div>
      ))}
      <div className="flex justify-between mt-3">
        <div className="flex gap-2">
          <Button onClick={removeSkill}>- Remove</Button>
          <Button onClick={addSkill}>+ Add More</Button>
        </div>
        <Button onClick={onSave}>Save</Button>
      </div>
    </div>
  );
}

export default SkillsForm;