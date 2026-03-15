// src/components/EducationForm.jsx
import { Input } from '@/src/components/ui/input';
import { Textarea } from '@/src/components/ui/textarea';
import { Button } from './ui/button';
import { useContext, useState, useEffect } from 'react';
import { ResumeInfoContext } from '../context/ResumeInfoContext';
import axios from 'axios';
import { toast } from 'sonner';

const defaultEducation = {
  universityName: "",
  degree: "",
  major: "",
  startDate: "",
  endDate: "",
  description: "",
};

function EducationForm({ enableNext }) {
  const { resumeInfo, setResumeInfo, resumeId } = useContext(ResumeInfoContext);
  const [educationalList, setEducationalList] = useState(
    resumeInfo?.educations?.length ? resumeInfo.educations : [defaultEducation]
  );

  useEffect(() => {
    setResumeInfo(prev => ({ ...prev, educations: educationalList }));
  }, [educationalList]);

  const handleChange = (index, name, value) => {
    const newList = [...educationalList];
    newList[index][name] = value;
    setEducationalList(newList);
  };

  const addEducation = () => setEducationalList([...educationalList, defaultEducation]);
  const removeEducation = () => setEducationalList(educationalList.slice(0, -1));

  const onSave = async () => {
    try {
      await axios.post(`/api/resume/${resumeId}/educations`, { educations: educationalList });
      toast.success("Education saved successfully");
      enableNext(true);
    } catch (err) {
      toast.error("Failed to save education");
      console.error(err);
    }
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-5">
      <h2 className="font-bold text-lg">Education</h2>
      {educationalList.map((item, index) => (
        <div key={index} className="grid grid-cols-2 gap-3 border p-3 my-3 rounded-lg">
          <div className="col-span-2">
            <label>University Name</label>
            <Input value={item.universityName} onChange={e => handleChange(index, 'universityName', e.target.value)} />
          </div>
          <Input placeholder="Degree" value={item.degree} onChange={e => handleChange(index, 'degree', e.target.value)} />
          <Input placeholder="Major" value={item.major} onChange={e => handleChange(index, 'major', e.target.value)} />
          <Input type="date" placeholder="Start Date" value={item.startDate} onChange={e => handleChange(index, 'startDate', e.target.value)} />
          <Input type="date" placeholder="End Date" value={item.endDate} onChange={e => handleChange(index, 'endDate', e.target.value)} />
          <div className="col-span-2">
            <label>Description</label>
            <Textarea value={item.description} onChange={e => handleChange(index, 'description', e.target.value)} />
          </div>
        </div>
      ))}
      <div className="flex justify-between mt-3">
        <div className="flex gap-2">
          <Button onClick={removeEducation}>- Remove</Button>
          <Button onClick={addEducation}>+ Add More</Button>
        </div>
        <Button onClick={onSave}>Save</Button>
      </div>
    </div>
  );
}

export default EducationForm;