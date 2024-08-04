// src\App.jsx
import { BrowserRouter as Router } from 'react-router-dom';

import Header from './components/shared/Header';
import View from './components/shared/View';
import Footer from './components/shared/Footer';

import { ContextWrapper, DialogueProvider, PortfolioDataProvider } from './contexts/index';

//debug > utils
import ErrorBoundary from './utils/debug/ErrorBoundary';

// globals
const providers = [PortfolioDataProvider, DialogueProvider];

const App = () => {
  return (
    <ErrorBoundary>
      <Router>
        <ContextWrapper providers={providers}>
          <Header></Header>
          <View></View>
          <Footer></Footer>
        </ContextWrapper>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
