// src\components\views\Experiences.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { usePortfolioDataContext } from '../../contexts/PortfolioDataContext';
import useAccordion from '../../utils/hooks/useAccordion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const Experiences = () => {
  const { experiences, tasks, skills, isLoading, error } = usePortfolioDataContext();
  const [expandedExperienceId, toggleExpandedExperience] = useAccordion();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!experiences || !tasks || !skills) return <div>No data available.</div>;

  return (
    <div className="exp-log-section">
      <h2 className="exp-log-header">[ EXPERIENCES ]</h2>
      <ul>
        {experiences.map((exp) => {
          // Derive skills used in this experience from tasks
          const experienceSkills = exp.tasks.reduce((skillSet, taskId) => {
            const task = tasks.find((t) => t.id === taskId);
            if (task) {
              task.skills.forEach((skillId) => skillSet.add(skillId));
            }
            return skillSet;
          }, new Set());

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

                      return (
                        <li key={`task-${task.id}`}>
                          {task.task}
                          <ul className="applicable-skills">
                            {task.skills.map((skillId) => {
                              const skill = skills.find((s) => s.id === skillId);
                              if (!skill) return null;
                              return (
                                <li key={`skill-${skill.id}`}>
                                  <Link to={`/skills/${skill.id}`}>{skill.skill}</Link>
                                </li>
                              );
                            })}
                          </ul>
                        </li>
                      );
                    })}
                  </ul>

                  <h4>Required Skills:</h4>
                  <ul>
                    {[...experienceSkills].map((skillId) => {
                      const skill = skills.find((s) => s.id === skillId);
                      if (!skill) return null;

                      return (
                        <li key={skill.id}>
                          <Link to={`/skills/${skill.id}`}>{skill.skill}</Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Experiences;
