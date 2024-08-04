// src\components\views\SkillDetails.jsx

import React from 'react';
import { useParams } from 'react-router-dom';
//hooks
import useAccordion from '../../utils/hooks/useAccordion';
// contexts..
import { usePortfolioDataContext } from '../../contexts/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const SkillDetails = () => {
  const { skillId } = useParams();
  const { skills, experiences, tasks } = usePortfolioDataContext(); // Use the custom hook
  const [expandedExperienceId, toggleExpandedExperience] = useAccordion();

  // Find the skill based on skillId
  const skill = skills.find((s) => s.id === skillId);

  if (!skill) {
    return <div>Skill not found.</div>;
  }

  return (
    <div className="exp-log-section">
      <h2 className="exp-log-header">[ {skill.skill} ]</h2>
      <div>
        <p>
          <b>Proficiency:</b> {skill.proficiency}
        </p>
        <p>
          <b>Years of Experience:</b> {skill.yearsExperience}
        </p>
        <h3>Work Experience:</h3>
        <ul>
          {skill.experiences.map((experienceId) => {
            const exp = experiences.find((e) => e.id === experienceId);
            if (!exp) return null; // Handle case where experience is not found

            return (
              <li key={exp.id} className="experience-item">
                <button onClick={() => toggleExpandedExperience(exp.id)}>
                  {exp.jobTitle} @ {exp.company}
                  <FontAwesomeIcon
                    icon={expandedExperienceId === exp.id ? faChevronUp : faChevronDown}
                    className="expand-icon"
                  />
                </button>
                {expandedExperienceId === exp.id && (
                  <div className="experience-details">
                    <p>{exp.summary}</p>
                    <h4>Tasks:</h4>
                    <ul className="task-list">
                      {exp.tasks.map((taskId) => {
                        const task = tasks.find((t) => t.id === taskId);
                        if (!task) return null;

                        return <li key={task.id}>{task.task}</li>;
                      })}
                    </ul>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default SkillDetails;
