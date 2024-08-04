// src\components\views\Skills.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { usePortfolioDataContext } from '../../contexts/PortfolioDataContext';
import useAccordion from '../../utils/hooks/useAccordion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const Skills = () => {
  const { skillTypes, skills, isLoading, error } = usePortfolioDataContext();
  const [expandedSkillTypeId, toggleExpandedSkillType] = useAccordion();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!skillTypes || !skills) return <div>No data available.</div>;

  return (
    <div className="exp-log-section">
      <h2 className="exp-log-header">[ SKILLS ]</h2>
      <div className="skill-list">
        {skillTypes.map((skillType) => (
          <div key={skillType.id} className="skill-type">
            <button
              onClick={() => toggleExpandedSkillType(skillType.id)}
              className="skill-type-button"
              aria-expanded={expandedSkillTypeId === skillType.id}
            >
              <h3>{skillType.type}</h3>
              <FontAwesomeIcon
                icon={expandedSkillTypeId === skillType.id ? faChevronUp : faChevronDown}
                className="expand-icon"
              />
            </button>
            {expandedSkillTypeId === skillType.id && (
              <ul className="skill-items">
                {skillType.skills.map((skillId) => {
                  const skill = skills.find((s) => s.id === skillId);
                  if (!skill) return null;

                  return (
                    <li key={skill.id} className="skill-item">
                      <Link to={`/skills/${skill.id}`}>
                        <span className="skill-name">{skill.skill}</span> -{' '}
                        <span className="skill-proficiency">{skill.proficiency}</span> (
                        {skill.yearsExperience} years)
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
