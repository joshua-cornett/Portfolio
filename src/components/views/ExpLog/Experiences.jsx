const Experiences = () => {
  // dummy job data
  const jobData = [
    {
      title: 'Front-End Developer',
      company: 'Acme Corp',
      dates: '2022-Present',
      description: '...'
    }
  ];

  return (
    <div className="experiences-container">
      {jobData.map((job) => (
        <button key={job.title} className="experience-button">
          {job.title} @ {job.company} ({job.dates})
          {/* Pop-up or dialog on click with job.description */}
        </button>
      ))}
    </div>
  );
};

export default Experiences;
