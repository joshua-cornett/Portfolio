const Skills = () => {
  const skillsData = [
    { name: 'JavaScript', proficiency: 90, projects: ['Project A', 'Project B'] },
    { name: 'React', proficiency: 85, projects: ['Project C'] }
    // ... other skills
  ];

  return (
    <div className="skills-container">
      {skillsData.map((skill) => (
        <div key={skill.name} className="skill">
          <div className="skill-bar" style={{ width: `${skill.proficiency}%` }}>
            <span className="skill-name">{skill.name}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Skills;
