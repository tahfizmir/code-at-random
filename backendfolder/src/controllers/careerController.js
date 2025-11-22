const rolesData = require('../data/roles.json');

exports.analyzeSkillGap = (req, res) => {
  const { role, skills } = req.body;

  if (!role || !skills) {
    return res.status(400).json({ error: 'Role and skills are required' });
  }

  const targetRole = rolesData[role];

  if (!targetRole) {
    return res.status(404).json({ error: 'Role not found. Try "Frontend Developer", "Backend Developer", or "Full Stack Developer".' });
  }

  // Normalizing skills for comparison
  const userSkills = skills.split(',').map(s => s.trim().toLowerCase());
  const requiredSkills = targetRole.skills;

  const matchedSkills = requiredSkills.filter(reqSkill => 
    userSkills.includes(reqSkill.toLowerCase())
  );

  const missingSkills = requiredSkills.filter(reqSkill => 
    !userSkills.includes(reqSkill.toLowerCase())
  );

  const matchPercentage = Math.round((matchedSkills.length / requiredSkills.length) * 100);

  res.json({
    role,
    matchPercentage,
    matchedSkills,
    missingSkills,
    recommendations: missingSkills.map(skill => `Learn ${skill} to improve your profile.`)
  });
};

exports.getRoadmap = (req, res) => {
  const { role } = req.body;

  if (!role) {
    return res.status(400).json({ error: 'Role is required' });
  }

  const targetRole = rolesData[role];

  if (!targetRole) {
    return res.status(404).json({ error: 'Role not found' });
  }

  res.json({
    role,
    roadmap: targetRole.roadmap
  });
};
