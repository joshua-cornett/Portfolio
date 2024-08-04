// src\contexts\PortfolioDataContext.jsx
import { createContext, useContext } from 'react';
import useFetch from '../utils/hooks/useFetch';

export const PortfolioDataContext = createContext(null);

export const PortfolioDataProvider = ({ children }) => {
  const {
    data: skillTypesData,
    isLoading: isLoadingSkillTypes,
    error: skillTypesError
  } = useFetch('/assets/data/skillTypes.json');
  const {
    data: skillsData,
    isLoading: isLoadingSkills,
    error: skillsError
  } = useFetch('/assets/data/skills.json');
  const {
    data: experiencesData,
    isLoading: isLoadingExperiences,
    error: experiencesError
  } = useFetch('/assets/data/experiences.json');
  const {
    data: tasksData,
    isLoading: isLoadingTasks,
    error: tasksError
  } = useFetch('/assets/data/tasks.json');

  const isLoading =
    isLoadingSkillTypes || isLoadingSkills || isLoadingExperiences || isLoadingTasks;
  const error = skillTypesError || skillsError || experiencesError || tasksError;

  const contextValue = {
    skillTypes: skillTypesData?.skillTypes || [],
    skills: skillsData?.skills || [],
    experiences: experiencesData?.experiences || [],
    tasks: tasksData?.tasks || [],
    isLoading,
    error
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <PortfolioDataContext.Provider value={contextValue}>{children}</PortfolioDataContext.Provider>
  );
};

export const usePortfolioDataContext = () => {
  return useContext(PortfolioDataContext);
};
