// src\components\views\ExperienceDetails.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePortfolioDataContext } from '../../contexts/PortfolioDataContext';
import useAccordion from '../../utils/hooks/useAccordion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const ExperienceDetails = () => {
  const { experienceId } = useParams();
  const { experiences, tasks, skills } = usePortfolioDataContext();
  const [expandedSection, toggleExpandedSection] = useAccordion();

  if (!experiences || !tasks || !skills) {
    return <div>Loading or error...</div>;
  }

  const experience = experiences.find((exp) => exp.id === experienceId);

  if (!experience) {
    return <div>Experience not found.</div>;
  }

  return (
    <div className="exp-log-section">
      <h2 className="exp-log-header">[ {experience.jobTitle} ]</h2>
      <div>
        <h3>{experience.company}</h3>
        <p>
          {experience.startDate} - {experience.endDate}
        </p>
        <p>{experience.summary}</p>

        {/* Tasks Section */}
        <button onClick={() => toggleExpandedSection('tasks')}>
          <h4>Tasks</h4>
          <FontAwesomeIcon
            icon={expandedSection === 'tasks' ? faChevronUp : faChevronDown}
            className="expand-icon"
          />
        </button>
        {expandedSection === 'tasks' && (
          <ul className="task-list">
            {experience.tasks.map((taskId) => {
              const task = tasks.find((t) => t.id === taskId);
              if (!task) return null;

              return (
                <li key={task.id}>
                  {task.task}
                  <ul className="applicable-skills">
                    {task.skills.map((skillId) => {
                      const skill = skills.find((s) => s.id === skillId);
                      if (!skill) return null;
                      return (
                        <li key={skill.id}>
                          <Link to={`/skills/${skill.id}`}>{skill.skill}</Link>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            })}
          </ul>
        )}

        {/* Skills Section */}
        <button onClick={() => toggleExpandedSection('skills')}>
          <h4>Required Skills</h4>
          <FontAwesomeIcon
            icon={expandedSection === 'skills' ? faChevronUp : faChevronDown}
            className="expand-icon"
          />
        </button>
        {expandedSection === 'skills' && (
          <ul>
            {experience.skills.map((skillId) => {
              const skill = skills.find((s) => s.id === skillId);
              if (!skill) return null;
              return (
                <li key={skill.id}>
                  <Link to={`/skills/${skill.id}`}>{skill.skill}</Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ExperienceDetails;
