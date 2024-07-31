import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Intro, ExpLog, Sidequests } from '../views';
// import '../../styles/pip-boy.css';

const View = () => {
  const location = useLocation();
  const [currentPathname, setCurrentPathname] = useState(location.pathname);
  const viewRef = useRef(null);

  useEffect(() => {
    setCurrentPathname(location.pathname);

    const viewElement = viewRef.current;
    if (viewElement) {
      viewElement.classList.add('activate-wave');

      setTimeout(() => {
        viewElement.classList.remove('activate-wave');
      }, 800);
    }
  }, [location]);

  return (
    <div ref={viewRef} className="view">
      <div className={`screen ${currentPathname}`}>
        <Routes>
          <Route path="/intro" element={<Intro data-active={currentPathname === '/intro'} />} />
          <Route
            path="/exp-log"
            element={<ExpLog data-active={currentPathname === '/exp-log'} />}
          />
          <Route
            path="/sidequests"
            element={<Sidequests data-active={currentPathname === '/sidequests'} />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default View;
