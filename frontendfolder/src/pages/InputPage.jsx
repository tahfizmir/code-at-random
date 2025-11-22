import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Code2, Sparkles } from 'lucide-react';

const InputPage = () => {
  const [role, setRole] = useState('Frontend Developer');
  const [skills, setSkills] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (role && skills) {
      navigate('/dashboard', { state: { role, skills } });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-6">
            <Sparkles className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            Career Path Analyzer
          </h1>
          <p className="text-lg text-slate-600">
            Discover your skill gaps and get a personalized roadmap to your dream job.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-slate-100">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Target Role
              </label>
              <div className="relative">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="input-field appearance-none bg-white"
                >
                  <option value="Frontend Developer">Frontend Developer</option>
                  <option value="Backend Developer">Backend Developer</option>
                  <option value="Full Stack Developer">Full Stack Developer</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <Code2 className="w-5 h-5" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Current Skills
              </label>
              <textarea
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="e.g. HTML, CSS, JavaScript, React..."
                className="input-field min-h-[120px] resize-none"
              />
              <p className="mt-2 text-sm text-slate-500">
                Separate skills with commas.
              </p>
            </div>

            <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2 group">
              Analyze My Career Path
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InputPage;
