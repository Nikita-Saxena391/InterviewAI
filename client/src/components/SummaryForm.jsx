// src/components/SummaryForm.jsx
import React, { useContext, useState } from 'react';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { ResumeInfoContext } from '../context/ResumeInfoContext';
import axios from 'axios';
import { toast } from 'sonner';

function SummaryForm({ enableNext }) {
  const { resumeInfo, setResumeInfo, resumeId } = useContext(ResumeInfoContext);
  const [summary, setSummary] = useState(resumeInfo.summary || '');
  const [loading, setLoading] = useState(false);

  const improveAI = async () => {
    try {
      setLoading(true);
      const { data } = await axios.patch(`/api/resume/${resumeId}/summary-ai`, { summary });
      setSummary(data.summary);
      setResumeInfo(prev => ({ ...prev, summary: data.summary }));
      toast.success("Improved by AI!");
    } catch (err) {
      toast.error("AI improvement failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const onSave = async () => {
    setResumeInfo(prev => ({ ...prev, summary }));
    enableNext(true);
    toast.success("Summary saved!");
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-5">
      <h2 className="font-bold text-lg">Professional Summary</h2>
      <Textarea className="mt-2" value={summary} onChange={(e)=>setSummary(e.target.value)} />
      <div className="mt-3 flex gap-2">
        <Button onClick={improveAI} disabled={loading}>{loading ? "Improving..." : "Improve with AI"}</Button>
        <Button onClick={onSave}>Save</Button>
      </div>
    </div>
  );
}

export default SummaryForm;