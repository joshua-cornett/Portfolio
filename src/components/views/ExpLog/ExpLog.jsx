import { Skills, Experiences } from './index';

const ExpLog = () => {
  return (
    <div className="exp-log">
      <div className="exp-log-section">
        <h2 className="exp-log-header">[ EXPERIENCES ]</h2>
        <Experiences />
      </div>
      <div className="exp-log-section">
        <h2 className="exp-log-header">[ SKILLS ]</h2>
        <Skills />
      </div>
    </div>
  );
};

export default ExpLog;
