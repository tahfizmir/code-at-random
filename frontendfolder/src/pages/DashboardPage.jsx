import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, BookOpen, Map, Newspaper, ArrowLeft } from 'lucide-react';
import client from '../api/client';

const DashboardPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { role, skills } = location.state || {};

  const [skillData, setSkillData] = useState(null);
  const [roadmap, setRoadmap] = useState(null);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!role || !skills) {
      navigate('/');
      return;
    }

    const fetchData = async () => {
      try {
        const [skillRes, roadmapRes, newsRes] = await Promise.all([
          client.post('/skill-gap', { role, skills }),
          client.post('/roadmap', { role }),
          client.get('/news')
        ]);

        setSkillData(skillRes.data);
        setRoadmap(roadmapRes.data.roadmap);
        setNews(newsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [role, skills, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 space-y-4">
  <div className="bg-[#fff3cd] text-[#856404] p-3 rounded-lg border border-[#ffeaa7] max-w-md text-center">
    The server may take up to 50 seconds to respond on your first request
    because it’s hosted on a free Render instance that “sleeps” when idle.
    After the first response, everything will run fast and smoothly.
    Thanks for your patience!
  </div>

  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
</div>

    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Career Dashboard</h1>
            <p className="text-slate-600">Analysis for <span className="font-semibold text-primary">{role}</span></p>
          </div>
          <button onClick={() => navigate('/')} className="text-slate-500 hover:text-primary flex items-center gap-2 font-medium transition-colors">
            <ArrowLeft className="w-4 h-4" />
            New Analysis
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {/* Skill Gap Analysis */}
          <div className="card">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                <BookOpen className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-800">Skill Gap Analysis</h2>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-600">Match Score</span>
                <span className="text-2xl font-bold text-primary">{skillData.matchPercentage}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3">
                <div 
                  className="bg-primary h-3 rounded-full transition-all duration-1000" 
                  style={{ width: `${skillData.matchPercentage}%` }}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-semibold text-green-600 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> Matched Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillData.matchedSkills.map(skill => (
                    <span key={skill} className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium border border-green-100">
                      {skill}
                    </span>
                  ))}
                  {skillData.matchedSkills.length === 0 && <span className="text-slate-400 text-sm italic">No matches found</span>}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-red-500 mb-3 flex items-center gap-2">
                  <XCircle className="w-4 h-4" /> Missing Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillData.missingSkills.map(skill => (
                    <span key={skill} className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-sm font-medium border border-red-100">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100">
              <h3 className="font-semibold text-slate-800 mb-4">Recommendations</h3>
              <ul className="space-y-3">
                {skillData.recommendations.map((rec, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-600 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Career Roadmap */}
          <div className="card">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                <Map className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-800">Career Roadmap</h2>
            </div>

            <div className="space-y-8 relative before:absolute before:left-4 before:top-4 before:bottom-4 before:w-0.5 before:bg-slate-200">
              {roadmap.map((phase, idx) => (
                <div key={idx} className="relative pl-12">
                  <div className="absolute left-0 top-0 w-8 h-8 bg-white border-2 border-purple-500 rounded-full flex items-center justify-center font-bold text-purple-600 text-sm z-10">
                    {idx + 1}
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-1">{phase.phase}</h3>
                  <p className="text-slate-600 text-sm mb-3">{phase.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {phase.topics.map(topic => (
                      <span key={topic} className="px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded border border-purple-100">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tech News */}
        <div className="card">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
              <Newspaper className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">Latest Tech News</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((story, idx) => (
              <a 
                key={idx} 
                href={story.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group block p-4 rounded-lg bg-slate-50 hover:bg-white hover:shadow-md transition-all border border-slate-100"
              >
                <h3 className="font-semibold text-slate-800 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {story.title}
                </h3>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>by {story.by}</span>
                  <span>{story.score} pts</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
